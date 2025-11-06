import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-transparent border-t border-border">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Sagar Chopda. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;