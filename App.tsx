import React from 'react';
import { useTheme } from './hooks/useTheme';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Education from './components/Education';
import Experience from './components/Experience';

const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`${theme} bg-background text-foreground transition-colors duration-500`}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <About />
        <Education />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;