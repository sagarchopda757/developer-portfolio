import React, { useEffect, useMemo, useState } from 'react';
import {
  Cloud,
  fetchSimpleIcons,
  ICloud,
  renderSimpleIcon,
  SimpleIcon,
} from 'react-icon-cloud';
import { useTheme } from '../hooks/useTheme';

type IconData = Awaited<ReturnType<typeof fetchSimpleIcons>>;

const cloudProps: Omit<ICloud, 'children'> = {
  containerProps: {
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: 'default',
    tooltip: 'native',
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: '#0000',
    maxSpeed: 0.04,
    minSpeed: 0.02,
  },
};

const renderCustomIcon = (icon: SimpleIcon, theme: 'light' | 'dark') => {
  const bgHex = theme === 'light' ? '#ffffff' : '#171717'; // card color
  const fallbackHex = theme === 'light' ? '#242424' : '#ffffff'; // foreground color
  const minContrastRatio = theme === 'dark' ? 2 : 1.2;

  return renderSimpleIcon({
    icon,
    bgHex,
    fallbackHex,
    minContrastRatio,
    size: 42,
    aProps: {
      href: undefined,
      target: undefined,
      rel: undefined,
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => e.preventDefault(),
    },
  });
};

type DynamicCloudProps = {
  iconSlugs: string[];
};

const IconCloud: React.FC<DynamicCloudProps> = ({ iconSlugs }) => {
  const [data, setData] = useState<IconData | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    fetchSimpleIcons({ slugs: iconSlugs })
      .then(setData)
      .catch(console.error);
  }, [iconSlugs]);

  const renderedIcons = useMemo(() => {
    if (!data) return null;
    return Object.values(data.simpleIcons).map((icon) =>
      renderCustomIcon(icon as SimpleIcon, theme)
    );
  }, [data, theme]);

  if (!renderedIcons) {
    return <div>Loading icons...</div>;
  }

  return (
    <Cloud {...cloudProps}>
      <>{renderedIcons}</>
    </Cloud>
  );
};

export default IconCloud;