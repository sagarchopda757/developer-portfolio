import React from 'react';
import { DownloadIcon } from './icons/Icons';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/80 backdrop-blur-sm">
      <div className="container mx-auto max-w-3xl text-center">
        <img 
          src="https://media.licdn.com/dms/image/v2/D4D03AQFRqbzYDSKoMw/profile-displayphoto-shrink_200_200/B4DZT431NvHkAY-/0/1739342173699?e=1764201600&v=beta&t=gCPM3q-3LQCraxukBNiC4Sh9kZAnBFmD1DZrsWwwNyU" 
          alt="Sagar Chopda" 
          className="rounded-full shadow-lg mx-auto w-48 h-48 object-cover border-4 border-border mb-8"
        />
        <div className="text-lg text-muted-foreground mb-10 space-y-4">
          <p>
            I'm a full-stack developer with over 3 years of experience designing and developing scalable web applications. My expertise lies in Node.js, React, MongoDB, and AWS, with a proven ability to integrate complex APIs and automate workflows. I'm passionate about creating efficient, high-performance applications that balance clean design with solid engineering, and I thrive in collaborative environments.
          </p>
          <p>
            Lately, I’ve been diving deep into AI—experimenting with <u><strong className="font-semibold text-foreground">LLMs, RAGs, Vector Databases, and Prompt Engineering</strong> to build smarter, more intuitive applications.</u>
          </p>
        </div>
        <a 
          href="https://drive.google.com/file/d/1yyJuTl86DhN1Utv_uy1FEUvCddRhsxnp/view"
          download="Sagar Chopda - Resume.pdf" 
          className="inline-flex items-center gap-3 px-8 py-4 text-lg font-bold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-transform transform hover:scale-105 shadow-lg"
        >
          <DownloadIcon />
          Download Resume
        </a>
      </div>
    </section>
  );
};

export default About;