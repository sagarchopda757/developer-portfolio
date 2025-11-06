import React from 'react';
import {
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  SunIcon,
  MoonIcon,
  CodeIcon,
  UserIcon,
  WrenchIcon,
  GraduationCapIcon,
  BriefcaseIcon,
  DownloadIcon,
} from './icons/Icons';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const navLinks = [
    { href: 'experience', label: 'Experience', icon: <BriefcaseIcon className="w-6 h-6" /> },
    { href: 'projects', label: 'Projects', icon: <CodeIcon className="w-6 h-6" /> },
    { href: 'about', label: 'About', icon: <UserIcon className="w-6 h-6" /> },
    { href: 'education', label: 'Education', icon: <GraduationCapIcon className="w-6 h-6" /> },
    { href: 'skills', label: 'Skills', icon: <WrenchIcon className="w-6 h-6" /> },
    { href: 'contact', label: 'Contact', icon: <MailIcon className="w-6 h-6" /> },
  ];
  
  const socialLinks = [
    { href: 'https://github.com/sagarchopda757', label: 'GitHub', icon: <GithubIcon className="w-6 h-6" /> },
    { href: 'https://www.linkedin.com/in/sagar-chopda', label: 'LinkedIn', icon: <LinkedinIcon className="w-6 h-6" /> },
  ];

  const actionButtons = [
     { href: 'https://drive.google.com/file/d/1yyJuTl86DhN1Utv_uy1FEUvCddRhsxnp/view', label: 'Download Resume', icon: <DownloadIcon className="w-6 h-6" />, download: true },
     { onClick: toggleTheme, label: 'Toggle Theme', icon: theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" /> },
  ];

  return (
    <>
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
        <div className="w-full max-w-lg sm:w-auto sm:max-w-none">
          <div className="flex items-center justify-center p-2 space-x-2 bg-card/70 backdrop-blur-lg rounded-full shadow-md overflow-x-auto no-scrollbar border border-border">
            {navLinks.map((link) => (
              <div key={link.href} className="relative group">
                <a href={`#${link.href}`} onClick={(e) => handleNavClick(e, link.href)} className="flex items-center justify-center w-12 h-12 text-foreground rounded-full hover:bg-muted transition-colors" aria-label={link.label}>
                  {link.icon}
                </a>
                <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 text-xs text-primary-foreground bg-primary rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                  {link.label}
                </span>
              </div>
            ))}

            <div className="h-8 w-px bg-border" />

            {socialLinks.map((link) => (
              <div key={link.label} className="relative group">
                <a href={link.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 text-foreground rounded-full hover:bg-muted transition-colors" aria-label={link.label}>
                  {link.icon}
                </a>
                <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 text-xs text-primary-foreground bg-primary rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                  {link.label}
                </span>
              </div>
            ))}
            
            <div className="h-8 w-px bg-border" />

            {actionButtons.map((button) => (
               <div key={button.label} className="relative group">
                {button.href ? (
                    <a href={button.href} download={button.download} className="flex items-center justify-center w-12 h-12 text-foreground rounded-full hover:bg-muted transition-colors" aria-label={button.label}>
                        {button.icon}
                    </a>
                ) : (
                    <button onClick={button.onClick} className="flex items-center justify-center w-12 h-12 text-foreground rounded-full hover:bg-muted transition-colors" aria-label={button.label}>
                        {button.icon}
                    </button>
                )}
                 <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 text-xs text-primary-foreground bg-primary rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                   {button.label}
                 </span>
               </div>
            ))}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;