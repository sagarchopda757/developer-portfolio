import React from 'react';

export interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  details: string[];
  liveLink?: string;
  repoLink?: string;
}

export interface Skill {
  name: string;
  icon: React.ReactNode;
}