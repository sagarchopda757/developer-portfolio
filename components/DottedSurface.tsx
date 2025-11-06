import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useTheme } from '../hooks/useTheme';
import { cn } from '../lib/utils';

type DottedSurfaceProps = Omit<React.ComponentProps<'div'>, 'ref'>;

const DottedSurface: React.FC<DottedSurfaceProps> = ({ className, ...props }) => {
	const { theme } = useTheme();
	const [isReady, setIsReady] = useState(false);

	const containerRef = useRef<HTMLDivElement>(null);
	const animationIdRef = useRef<number | null>(null);
	const sceneRef = useRef<{
		scene: THREE.Scene;
		camera: THREE.PerspectiveCamera;
		renderer: THREE.WebGLRenderer;
	} | null>(null);

	// Wait for container to have dimensions
	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const checkDimensions = () => {
			const { clientWidth, clientHeight } = container;
			if (clientWidth > 0 && clientHeight > 0) {
				setIsReady(true);
			}
		};

		// Check immediately
		checkDimensions();

		// Use ResizeObserver to detect when container gets dimensions
		const resizeObserver = new ResizeObserver(checkDimensions);
		resizeObserver.observe(container);

		return () => {
			resizeObserver.disconnect();
		};
	}, []);

	useEffect(() => {
		const container = containerRef.current;
		if (!container || !isReady) return;

		const SEPARATION = 150;
		const AMOUNTX = 40;
		const AMOUNTY = 60;
		const { clientWidth, clientHeight } = container;

		const scene = new THREE.Scene();
    const fogColor = theme === 'dark' ? 0x121212 : 0xf5f5f5;
		scene.fog = new THREE.Fog(fogColor, 2000, 10000);

		const camera = new THREE.PerspectiveCamera(
			60,
			clientWidth / clientHeight,
			1,
			10000,
		);
		camera.position.set(0, 355, 1220);

		const renderer = new THREE.WebGLRenderer({
			alpha: true,
			antialias: true,
		});
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(clientWidth, clientHeight);
		renderer.setClearColor(0x000000, 0);

		container.appendChild(renderer.domElement);

		const positions: number[] = [];
		const colors: number[] = [];
		const geometry = new THREE.BufferGeometry();
    const particleColor = theme === 'dark' ? new THREE.Color(0xc8c8c8) : new THREE.Color(0x242424);

		for (let ix = 0; ix < AMOUNTX; ix++) {
			for (let iy = 0; iy < AMOUNTY; iy++) {
				const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
				const y = 0;
				const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;
				positions.push(x, y, z);
        colors.push(particleColor.r, particleColor.g, particleColor.b);
			}
		}

		geometry.setAttribute(
			'position',
			new THREE.Float32BufferAttribute(positions, 3),
		);
		geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

		const material = new THREE.PointsMaterial({
			size: 8,
			vertexColors: true,
			transparent: true,
			opacity: 0.8,
			sizeAttenuation: true,
		});

		const points = new THREE.Points(geometry, material);
		scene.add(points);

		let count = 0;

		const animate = () => {
			animationIdRef.current = requestAnimationFrame(animate);

			const positionAttribute = geometry.attributes.position;
			const positionsArray = positionAttribute.array as Float32Array;

			let i = 0;
			for (let ix = 0; ix < AMOUNTX; ix++) {
				for (let iy = 0; iy < AMOUNTY; iy++) {
					const index = i * 3;
					positionsArray[index + 1] =
						Math.sin((ix + count) * 0.3) * 50 +
						Math.sin((iy + count) * 0.5) * 50;
					i++;
				}
			}

			positionAttribute.needsUpdate = true;
			renderer.render(scene, camera);
			count += 0.1;
		};

		const handleResize = () => {
			const container = containerRef.current;
			if (!container) return;
			const { clientWidth, clientHeight } = container;
			camera.aspect = clientWidth / clientHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(clientWidth, clientHeight);
		};

		window.addEventListener('resize', handleResize);
		
		sceneRef.current = {
			scene,
			camera,
			renderer,
		};

		animate();

		return () => {
			window.removeEventListener('resize', handleResize);
			if (animationIdRef.current !== null) {
				cancelAnimationFrame(animationIdRef.current);
				animationIdRef.current = null;
			}
			if (sceneRef.current) {
				scene.traverse((object) => {
					if (object instanceof THREE.Points) {
						object.geometry.dispose();
            const material = object.material as THREE.Material;
            material.dispose();
					}
				});
				sceneRef.current.renderer.dispose();
				if (containerRef.current && sceneRef.current.renderer.domElement.parentNode) {
					containerRef.current.removeChild(sceneRef.current.renderer.domElement);
				}
			}
		};
	}, [theme, isReady]);

	return (
		<div
			ref={containerRef}
			className={cn('pointer-events-none absolute inset-0 z-0', className)}
			{...props}
		/>
	);
}

export default DottedSurface;