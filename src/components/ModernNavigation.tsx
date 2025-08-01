import React, { useState, useEffect } from 'react';
import { Menu, X, Zap, BarChart3, Settings, Linkedin, BookOpen } from 'lucide-react';
import { DarkModeToggle } from './DarkModeToggle';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavigationProps {
  onAnalyze?: () => void;
}

export const ModernNavigation: React.FC<NavigationProps> = ({ onAnalyze }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navigationItems = [
    { label: 'Features', icon: Zap, href: '#features' },
    { label: 'About', icon: BarChart3, href: '#about' },
    { label: 'Get Started', icon: Settings, href: '#get-started' },
  ];

  const socialLinks = [
    { label: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/steven-law-b918b530b/' },
    { label: 'Newsletter', icon: BookOpen, href: 'https://version-one-newsletter-35e73f.beehiiv.com/' },
  ];

  return (
    <>
      {/* Main Navigation */}
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-glass/95 backdrop-blur-xl border-b border-glass-border shadow-glass"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3 relative z-20">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-bold text-xl text-foreground whitespace-nowrap">
                Web Vitals
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-6">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-lg",
                        "text-sm font-medium text-muted-foreground",
                        "hover:text-foreground hover:bg-glass/50",
                        "transition-all duration-200 group"
                      )}
                    >
                      <Icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                      {item.label}
                    </a>
                  );
                })}
              </div>

              <div className="flex items-center gap-3">
                {/* Social Links */}
                <div className="flex items-center gap-2">
                  {socialLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center",
                          "text-muted-foreground hover:text-foreground",
                          "hover:bg-glass/50 transition-all duration-200",
                          "hover:scale-110"
                        )}
                        aria-label={link.label}
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    );
                  })}
                </div>

                {/* Dark Mode Toggle */}
                <DarkModeToggle />

                {/* CTA Button */}
                <Button
                  variant="glow"
                  size="sm"
                  onClick={onAnalyze}
                  className="ml-2 whitespace-nowrap"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Analyze Site
                </Button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-3 z-10">
              <DarkModeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(!isOpen);
                }}
                className="h-10 w-10 rounded-lg bg-glass backdrop-blur-xl border border-glass-border"
              >
                {isOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 md:hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu Panel */}
          <div 
            className="absolute top-20 left-4 right-4 bg-glass backdrop-blur-xl border border-glass-border rounded-2xl shadow-elevation p-6 animate-slide-up max-h-[calc(100vh-6rem)] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-6">
              {/* Navigation Items */}
              <div className="space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-lg",
                        "text-foreground hover:bg-glass/50",
                        "transition-all duration-200 group"
                      )}
                    >
                      <Icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-200" />
                      <span className="font-medium">{item.label}</span>
                    </a>
                  );
                })}
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4 pt-4 border-t border-glass-border">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-lg",
                        "text-muted-foreground hover:text-foreground",
                        "hover:bg-glass/50 transition-all duration-200"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm">{link.label}</span>
                    </a>
                  );
                })}
              </div>

              {/* CTA Button */}
              <Button
                variant="glow"
                onClick={() => {
                  setIsOpen(false);
                  onAnalyze?.();
                }}
                className="w-full"
              >
                <Zap className="w-4 h-4 mr-2" />
                Analyze Your Site
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}; 