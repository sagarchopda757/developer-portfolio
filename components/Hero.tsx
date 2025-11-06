import React from 'react';
import { motion } from 'framer-motion';
import { LampContainer } from './Lamp';

const Hero: React.FC = () => {
  const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: 'easeInOut',
        }}
        className="mt-8 bg-gradient-to-br from-muted-foreground to-foreground py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        Sagar Chopda
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.4,
          duration: 0.8,
          ease: 'easeInOut',
        }}
        className="mt-4 text-lg text-center text-muted-foreground max-w-3xl mx-auto"
      >
        A results-driven software engineer passionate about creating efficient, high-performance web applications.
      </motion.p>
      <motion.div
         initial={{ opacity: 0, y: 100 }}
         whileInView={{ opacity: 1, y: 0 }}
         transition={{
           delay: 0.5,
           duration: 0.8,
           ease: 'easeInOut',
         }}
         className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8"
      >
         <a 
            href="#projects" 
            onClick={(e) => handleScrollClick(e, 'projects')}
            className="px-8 py-3 font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-transform transform hover:scale-105 shadow-lg"
         >
            View Projects
         </a>
         <a 
            href="#contact" 
            onClick={(e) => handleScrollClick(e, 'contact')}
            className="px-8 py-3 font-semibold rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-transform transform hover:scale-105 shadow-lg"
         >
            Contact Me
         </a>
      </motion.div>
    </LampContainer>
  );
};

export default Hero;