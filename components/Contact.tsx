import React, { useState } from 'react';
import { LinkedinIcon, MailIcon } from './icons/Icons';
import DottedSurface from './DottedSurface';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:sagarchopda757@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-transparent overflow-hidden">
      <DottedSurface />
      <div className="relative z-10 container mx-auto max-w-3xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
        <p className="text-lg text-muted-foreground mb-8">
          I'm currently open to new opportunities. Feel free to reach out if you have a project in mind or just want to connect!
        </p>

        <div className="bg-card/80 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-left font-medium mb-1">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder="Your Name" 
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-md bg-background/50 border border-border focus:ring-2 focus:ring-ring focus:outline-none transition" 
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-left font-medium mb-1">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="Your Email" 
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-md bg-background/50 border border-border focus:ring-2 focus:ring-ring focus:outline-none transition" 
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-left font-medium mb-1">Message</label>
              <textarea 
                id="message" 
                name="message" 
                rows={4} 
                placeholder="Your Message" 
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-md bg-background/50 border border-border focus:ring-2 focus:ring-ring focus:outline-none transition">
              </textarea>
            </div>
            <button type="submit" className="w-full px-8 py-3 font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all transform hover:scale-105 shadow-lg">
              Send Message
            </button>
          </form>
        </div>

        <div className="mt-12">
            <p className="mb-4 text-muted-foreground">Or reach me directly:</p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                <a href="mailto:sagarchopda757@gmail.com" className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                    <MailIcon />
                    sagarchopda757@gmail.com
                </a>
                <a href="https://www.linkedin.com/in/sagar-chopda" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                    <LinkedinIcon />
                    LinkedIn
                </a>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;