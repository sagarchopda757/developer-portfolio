import React from 'react';
import { GraduationCap } from 'lucide-react';
import { Timeline, type TimelineItem } from './ui/timeline';

const educationData: TimelineItem[] = [
  {
    id: '1',
    title: 'Master’s in Computer Application (MCA)',
    description: 'LDRP Institute of Technology and Research, Gandhinagar, Gujarat',
    timestamp: '2023',
    status: 'completed',
    icon: <GraduationCap className="h-3 w-3" />,
  },
  {
    id: '2',
    title: 'Bachelor’s in Computer Application (BCA)',
    description: 'K.K. Wagh Science and Computer Science College, Nashik, Maharashtra',
    timestamp: '2021',
    status: 'completed',
    icon: <GraduationCap className="h-3 w-3" />,
  },
];

const Education: React.FC = () => {
  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/80 backdrop-blur-sm">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Education</h2>
        <div className="max-w-3xl mx-auto">
          <Timeline items={educationData} timestampPosition="bottom" showTimestamps={true} />
        </div>
      </div>
    </section>
  );
};

export default Education;