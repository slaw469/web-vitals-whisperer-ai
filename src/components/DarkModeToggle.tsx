import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const DarkModeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(true); // Default to dark mode
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check if we're on the client side
    setMounted(true);
    
    // Get saved theme or default to dark
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // Default to dark mode unless explicitly set to light
    const shouldBeDark = saved === 'light' ? false : true;
    
    setIsDark(shouldBeDark);
    
    // Apply theme immediately - default to dark
    if (shouldBeDark) {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    // Update DOM classes
    if (newIsDark) {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
    
    // Save to localStorage
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
  };

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full bg-glass backdrop-blur-xl border border-glass-border" />
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={cn(
        "relative h-10 w-10 rounded-full",
        "bg-glass backdrop-blur-xl border border-glass-border",
        "hover:shadow-glow transition-all duration-300",
        "group overflow-hidden"
      )}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-full" />
      
      {/* Icon container with smooth transitions */}
      <div className="relative flex items-center justify-center w-full h-full">
        <Sun
          className={cn(
            "absolute h-5 w-5 transition-all duration-500 ease-spring",
            "text-amber-500",
            isDark
              ? "scale-0 rotate-90 opacity-0"
              : "scale-100 rotate-0 opacity-100"
          )}
        />
        <Moon
          className={cn(
            "absolute h-5 w-5 transition-all duration-500 ease-spring",
            "text-blue-400",
            isDark
              ? "scale-100 rotate-0 opacity-100"
              : "scale-0 -rotate-90 opacity-0"
          )}
        />
      </div>

      {/* Ripple effect on click */}
      <div className="absolute inset-0 rounded-full opacity-0 group-active:opacity-30 bg-current transition-opacity duration-150" />
    </Button>
  );
};

// Compact version for mobile
export const CompactDarkModeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('theme');
    // Default to dark mode unless explicitly set to light
    const shouldBeDark = saved === 'light' ? false : true;
    
    setIsDark(shouldBeDark);
    
    if (shouldBeDark) {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
    
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
  };

  if (!mounted) {
    return <div className="w-20 h-8 rounded-lg bg-glass backdrop-blur-xl border border-glass-border" />;
  }

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative flex items-center gap-2 px-3 py-2 rounded-lg",
        "bg-glass backdrop-blur-xl border border-glass-border",
        "hover:shadow-elevation transition-all duration-200",
        "text-sm font-medium text-foreground",
        "group"
      )}
      aria-label="Toggle theme"
    >
      <div className="relative w-4 h-4">
        <Sun
          className={cn(
            "absolute w-4 h-4 transition-all duration-300",
            "text-amber-500",
            isDark ? "scale-0 opacity-0" : "scale-100 opacity-100"
          )}
        />
        <Moon
          className={cn(
            "absolute w-4 h-4 transition-all duration-300",
            "text-blue-400",
            isDark ? "scale-100 opacity-100" : "scale-0 opacity-0"
          )}
        />
      </div>
      <span className="hidden sm:inline">
        {isDark ? 'Light' : 'Dark'}
      </span>
    </button>
  );
}; 