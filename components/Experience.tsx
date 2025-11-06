import React from 'react';

const ExperienceCard = ({
  title,
  company,
  date,
  achievements
}: {
  title: string;
  company: string;
  date: string;
  achievements: string[];
}) => {
  return (
    <div className="w-full p-4 space-y-4 group">
      <div className="flex justify-center gap-2 items-end relative">
        <div className="text-xl md:text-2xl font-bold whitespace-nowrap text-foreground group-hover:text-primary transition-all duration-300 ease-out">{title}</div>
        <span className="w-full border-b-[1px] border-dashed border-border group-hover:border-primary transition-all duration-300 ease-out mb-2"></span>
        <div className="text-muted-foreground whitespace-nowrap uppercase group-hover:text-primary font-mono text-xs md:text-sm">{date}</div>
      </div>
      <div className="text-muted-foreground md:text-lg">
        <p className="font-semibold text-foreground/90 mb-2">{company}</p>
        <ul className="list-disc list-inside space-y-1 text-sm md:text-base">
            {achievements.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
      </div>
    </div>
  );
};

const experienceData = [
  {
    title: "Software Engineer",
    company: "Owision, Sweden",
    date: "June 2021 - Present",
    achievements: [
        "Architected scalable backend solutions for high-traffic applications, improving performance and reliability.",
        "Developed and integrated Stripe payment systems, reducing transaction errors by 30%.",
        "Engineered custom Monday.com applications, automating workflows and improving team productivity by 40%.",
        "Collaborated with cross-functional teams using Agile methodologies to deliver quality software."
    ]
  },
];

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/80 backdrop-blur-sm">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Experience</h2>
        <div className="flex flex-col space-y-8 justify-start max-w-3xl mx-auto">
          {experienceData.map((exp, index) => (
            <ExperienceCard
              key={index}
              title={exp.title}
              company={exp.company}
              date={exp.date}
              achievements={exp.achievements}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;