import React, { useState } from 'react';
import type { Project } from '../types';
import { GithubIcon, ExternalLinkIcon, WrenchIcon } from './icons/Icons';
import ProjectModal from './ProjectModal';

const projectsData: Project[] = [
  {
    title: 'Sync To Sheet',
    description: 'A Stripe-to-Google Sheets integration for real-time synchronization of transactions and customer data, with an intuitive UI for non-technical users.',
    image: 'https://d1wqzb5bdbcre6.cloudfront.net/0342244546c90f80a7e1bf4d01a48fbcc19cb492f4fe26ddd3f0b96f3873779d/68747470733a2f2f66696c65732e7374726970652e636f6d2f6c696e6b732f4d44423859574e6a6446387855457058547a6c4554574e56595464755354644e66475a7358327870646d566655315a36576e526b4f553969574570315446646a52326c734e54564a55334a4b303070326a5958413056/636c69656e743d4150505f4d41524b4554504c414345',
    tags: ['Stripe API', 'Google Sheets API', 'React', 'Node.js', 'OAuth'],
    details: [
        "Securely authenticated with Stripe and Google APIs using OAuth 2.0.",
        "Implemented webhooks for real-time data updates from Stripe events.",
        "Designed a user-friendly dashboard for mapping fields and managing sync settings.",
        "Ensured data integrity and provided detailed logging for sync history and error handling."
    ],
    liveLink: 'https://marketplace.stripe.com/apps/sync-to-sheets',
  },
  {
    title: 'Skillioz Platform',
    description: 'A resume parsing platform that extracts structured data and matches it with job descriptions, featuring an analytics dashboard and an AI-powered copilot.',
    image: 'https://media.licdn.com/dms/image/v2/D4D0BAQG3SwHnFStB_w/company-logo_100_100/B4DZU_C6OEGcAU-/0/1740519482601/skillioz_logo?e=1764201600&v=beta&t=syP59Qu2AmVMw1PBdAfDjRCTov8MoomRGI9h2qz3sHA',
    tags: ['React', 'Node.js', 'MongoDB', 'AI/RAG', 'AWS', 'Parallel Processing'],
     details: [
        "Built a scalable backend to handle parallel processing of large volumes of resumes for efficient data extraction.",
        "Developed a comprehensive RESTful API to support the frontend dashboard and analytics features.",
        "Integrated a RAG (Retrieval-Augmented Generation) model to provide AI-driven recommendations and parsing.",
        "Created an interactive chatbot to improve user onboarding and provide instant support."
    ],
    liveLink: 'https://www.skillioz.ai',
  },
  {
    title: 'Foodarna App Ecosystem',
    description: 'A community-based food app ecosystem connecting home chefs and food lovers, with separate apps for customer ordering and driver delivery/routing.',
    image: 'https://media.licdn.com/dms/image/v2/D4D0BAQH1vRox76qnRA/company-logo_200_200/company-logo_200_200/0/1685224939650/foodarna_logo?e=1764201600&v=beta&t=BGypCYXOpI1KEQOEb23zMx95fGuEnXW4n34hykdPTIA',
    tags: ['React Native', 'Node.js', 'MongoDB', 'Real-time Tracking', 'Sockets'],
    details: [
        "Developed two separate React Native applications from scratch for customers and delivery drivers.",
        "Implemented real-time geolocation tracking for orders using WebSockets for live updates.",
        "Integrated a secure payment gateway (Stripe) for seamless order processing.",
        "Designed and managed the MongoDB database schema for users, orders, and restaurants."
    ],
  },
  {
    title: 'express template generator',
    description: 'Express Template Generator is a CLI tool designed to quickly scaffold out the foundation of an Express.js application',
    image: 'https://media.licdn.com/dms/image/sync/v2/D4D27AQFMe7JvZAIx3Q/articleshare-shrink_160/articleshare-shrink_160/0/1738676382600?e=1763020800&v=beta&t=OW_H_6rvH0IREl8SId0CuuZ_g5lfQhO7207zfsZsacI',
    tags: ['Node.js','npm package','Express', 'Template Engine', 'CLI'],
    details: [
      "Created an npm package for generating Express.js templates with a user-friendly CLI.",
      "Express Template Generator is a CLI tool designed to quickly scaffold out the foundation of an Express.js application.",
      "It helps developers get started with building web applications and APIs by generating boilerplate code.",
      "pre-configured with essential features like routing, middleware, and template engines.",
      "This package currently supports EJS templates and provides a clean, modular folder structure with built-in utilities for logging, pagination, and structured responses."
    ],
    liveLink: 'https://www.npmjs.com/package/express-template-generator',
  },
  {
    title: 'Latency Js',
    description: 'Latency Js is a library for measuring the latency of a API Application.',
    image: 'https://media.licdn.com/dms/image/sync/v2/D4D27AQFMe7JvZAIx3Q/articleshare-shrink_160/articleshare-shrink_160/0/1738676382600?e=1763020800&v=beta&t=OW_H_6rvH0IREl8SId0CuuZ_g5lfQhO7207zfsZsacI',
    tags: ['Node.js', 'npm package', 'Latency', 'API', 'Performance'],
    details: [
      "🔍 Track API Response Times: Monitor how long your API endpoints take to respond",
      "⚙️ Customizable Thresholds: Set different thresholds for different HTTP methods",
      "📝 Flexible Logging: Configure log levels, file paths, and console output",
      "🎨 Colored Logs: Visual distinction between different log levels",
      "🔌 Easy Integration: Simple setup with Express.js applications",
    ],
    liveLink: 'https://www.npmjs.com/package/latencyjs',
  }
];

const ProjectCard: React.FC<{ project: Project; onCardClick: () => void }> = ({ project, onCardClick }) => (
  <div onClick={onCardClick} className="bg-card/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col cursor-pointer border border-border">
    <div className="p-6 flex flex-col flex-grow">
      <div className="flex items-center mb-4">
        <img src={project.image} alt={`${project.title} logo`} className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-border"/>
        <h3 className="text-xl font-bold text-card-foreground">{project.title}</h3>
      </div>
      <p className="text-muted-foreground mb-4 flex-grow text-sm">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map(tag => (
          <span key={tag} className="text-xs font-semibold px-2.5 py-1 bg-primary/10 text-primary rounded-full">{tag}</span>
        ))}
      </div>
      <div className="mt-auto pt-4 flex items-center justify-between border-t border-border">
        <p className="text-sm text-muted-foreground flex items-center gap-1">Click to see details <WrenchIcon className="w-4 h-4" /></p>
        <div className="flex items-center space-x-4">
          {project.repoLink && <a onClick={e => e.stopPropagation()} href={project.repoLink} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><GithubIcon /></a>}
          {project.liveLink && <a onClick={e => e.stopPropagation()} href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><ExternalLinkIcon /></a>}
        </div>
      </div>
    </div>
  </div>
);

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/80 backdrop-blur-sm">
      <div className="container mx-auto relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map(project => (
            <ProjectCard key={project.title} project={project} onCardClick={() => setSelectedProject(project)} />
          ))}
        </div>
      </div>
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </section>
  );
};

export default Projects;