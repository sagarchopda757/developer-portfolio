import React, { useEffect, useState } from 'react';
import IconCloud from './IconCloud';
import { fetchSimpleIcons } from 'react-icon-cloud';

type IconData = Awaited<ReturnType<typeof fetchSimpleIcons>>;

const iconSlugs = [
  'nodedotjs',
  'typescript',
  'javascript',
  'n8n',
  'passport',
  'express',
  'github',
  'mongodb',
  'chatbot',
  'python',
  'react',
  'nextdotjs',
  'postgresql',
  'mysql',
  'docker',
  'git',
  'html5',
  'css3',
  'sequelize',
  'jquery',
  
];

const Skills: React.FC = () => {
  const [data, setData] = useState<IconData | null>(null);

  useEffect(() => {
    fetchSimpleIcons({ slugs: iconSlugs })
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/80 backdrop-blur-sm">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Technical Skills</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative flex h-full min-h-[300px] lg:min-h-[400px] w-full items-center justify-center">
            <IconCloud iconSlugs={iconSlugs} />
          </div>
          <div className="flex flex-wrap justify-center items-center gap-6">
            {data ? (
              Object.values(data.simpleIcons).map((icon: any) => (
                <div
                  key={icon.slug}
                  className="flex flex-col items-center justify-center gap-2 p-4 bg-background/50 rounded-lg border border-border transition-all duration-300 hover:shadow-lg hover:border-primary"
                  style={{ minWidth: '120px' }}
                >
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-10 dark:drop-shadow-[0_0_2px_rgba(255,255,255,0.7)]"
                    style={{ fill: `#${icon.hex}` }}
                  >
                    <title>{icon.title}</title>
                    <path d={icon.path} />
                  </svg>
                  <span className="font-medium text-foreground text-sm text-center">{icon.title}</span>
                </div>
              ))
            ) : (
              <p className="text-foreground">Loading skills...</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;