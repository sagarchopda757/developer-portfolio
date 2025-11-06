import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import type { Project } from '../types';
import { CloseIcon, GithubIcon, ExternalLinkIcon } from './icons/Icons';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-title"
    >
      <div 
        className="relative bg-card rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col animate-zoom-in-sm border border-border"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center">
                <img src={project.image} alt={project.title} className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-border" />
                <h2 id="project-title" className="text-2xl font-bold text-card-foreground">{project.title}</h2>
            </div>
            <button 
                onClick={onClose} 
                className="p-2 text-muted-foreground rounded-full hover:bg-muted transition-colors"
                aria-label="Close project details"
            >
                <CloseIcon />
            </button>
        </div>

        <div className="p-8 overflow-y-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map(tag => (
              <span key={tag} className="text-xs font-semibold px-2.5 py-1 bg-primary/10 text-primary rounded-full">{tag}</span>
            ))}
          </div>

          <p className="text-muted-foreground mb-6">{project.description}</p>
          
          <h3 className="text-xl font-bold mb-3 text-primary">Key Features & Details</h3>
          <ul className="list-disc list-inside space-y-2 text-foreground mb-6">
            {project.details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>
        
        <div className="mt-auto p-6 flex items-center justify-end space-x-4 border-t border-border rounded-b-lg bg-background/50">
          {project.repoLink && <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-semibold"><GithubIcon /> GitHub</a>}
          {project.liveLink && <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-semibold"><ExternalLinkIcon /> View App</a>}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ProjectModal;