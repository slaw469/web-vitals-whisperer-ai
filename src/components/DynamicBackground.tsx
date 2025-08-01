import React, { useEffect, useState } from 'react';
import placeholderImage from '@/assets/hero-video-placeholder.svg';
import './DynamicBackground.css';

export const DynamicBackground: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Define color classes statically for Tailwind
  const getColorClass = (color: string) => {
    switch (color) {
      case 'success': return 'bg-success';
      case 'warning': return 'bg-warning';
      case 'danger': return 'bg-danger';
      case 'primary': return 'bg-primary';
      default: return 'bg-primary';
    }
  };

  if (!mounted) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-background" />
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Static background image as fallback */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 transition-opacity duration-1000"
        style={{ backgroundImage: `url(${placeholderImage})` }}
      />
      
      {/* Gradient overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-success/5" />
      
      {/* Animated overlay elements */}
      <div className="absolute inset-0">
        {/* Floating data particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={`particle-${i}`}
              className={`absolute rounded-full dynamic-float-${i % 4} particle-shimmer`}
              style={{
                width: `${Math.random() * 8 + 4}px`,
                height: `${Math.random() * 8 + 4}px`,
                left: `${10 + (i * 6)}%`,
                top: `${15 + (i * 4)}%`,
                backgroundColor: i % 4 === 0 ? 'hsl(var(--primary) / 0.4)' : 
                                 i % 4 === 1 ? 'hsl(var(--success) / 0.4)' :
                                 i % 4 === 2 ? 'hsl(var(--warning) / 0.4)' :
                                 'hsl(var(--danger) / 0.4)',
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${4 + (i % 3)}s`,
                boxShadow: '0 0 10px currentColor',
              }}
            />
          ))}
        </div>
        
        {/* Animated performance chart lines */}
        <svg 
          className="absolute inset-0 w-full h-full opacity-20" 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
          style={{ zIndex: 1 }}
        >
          <defs>
            <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--success))" stopOpacity="0.8" />
              <stop offset="100%" stopColor="hsl(var(--success))" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--warning))" stopOpacity="0.8" />
              <stop offset="100%" stopColor="hsl(var(--warning))" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="lineGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--danger))" stopOpacity="0.8" />
              <stop offset="100%" stopColor="hsl(var(--danger))" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          
          {/* LCP line */}
          <path
            d="M0 60 Q25 55 50 50 Q75 45 100 40"
            stroke="url(#lineGradient1)"
            strokeWidth="0.8"
            fill="none"
            className="dynamic-draw-line"
            style={{ animationDelay: '0.5s' }}
          />
          
          {/* FID line */}
          <path
            d="M0 70 Q25 68 50 65 Q75 63 100 60"
            stroke="url(#lineGradient2)"
            strokeWidth="0.8"
            fill="none"
            className="dynamic-draw-line"
            style={{ animationDelay: '1s' }}
          />
          
          {/* CLS line */}
          <path
            d="M0 80 Q25 78 50 75 Q75 73 100 70"
            stroke="url(#lineGradient3)"
            strokeWidth="0.8"
            fill="none"
            className="dynamic-draw-line"
            style={{ animationDelay: '1.5s' }}
          />
        </svg>
        
        {/* Pulsing data points */}
        <div className="absolute inset-0">
          {[
            { x: 15, y: 25, color: 'success', delay: 2 },
            { x: 35, y: 35, color: 'warning', delay: 2.5 },
            { x: 55, y: 45, color: 'danger', delay: 3 },
            { x: 75, y: 30, color: 'primary', delay: 3.5 },
            { x: 85, y: 40, color: 'success', delay: 4 },
            { x: 25, y: 65, color: 'warning', delay: 4.5 },
            { x: 65, y: 75, color: 'primary', delay: 5 },
          ].map((point, i) => (
            <div
              key={`pulse-${i}`}
              className={`absolute rounded-full ${getColorClass(point.color)} dynamic-pulse-glow`}
              style={{
                width: '12px',
                height: '12px',
                left: `${point.x}%`,
                top: `${point.y}%`,
                animationDelay: `${point.delay}s`,
              }}
            />
          ))}
        </div>
        
        {/* Performance score indicator */}
        <div className="absolute top-20 right-20 opacity-60 hidden lg:block">
          <div className="bg-glass/30 backdrop-blur-sm border border-glass-border rounded-xl p-6">
            <div className="text-center">
              <div className="text-primary text-sm font-medium mb-2">Performance Score</div>
              <div className="text-4xl font-bold text-foreground mb-2 dynamic-number-change">92</div>
              <div className="w-16 h-16 mx-auto relative">
                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="hsl(var(--border))"
                    strokeWidth="4"
                    fill="none"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="url(#performanceGradient)"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray="176"
                    strokeDashoffset="35"
                    strokeLinecap="round"
                    className="dynamic-draw-circle"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Large floating orbs for depth */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute w-32 h-32 rounded-full opacity-10 animate-float"
            style={{
              background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)',
              top: '20%',
              left: '10%',
              animationDelay: '0s',
              animationDuration: '8s'
            }}
          />
          <div 
            className="absolute w-24 h-24 rounded-full opacity-10 animate-float"
            style={{
              background: 'radial-gradient(circle, hsl(var(--success)) 0%, transparent 70%)',
              top: '60%',
              right: '15%',
              animationDelay: '2s',
              animationDuration: '6s'
            }}
          />
          <div 
            className="absolute w-20 h-20 rounded-full opacity-10 animate-float"
            style={{
              background: 'radial-gradient(circle, hsl(var(--warning)) 0%, transparent 70%)',
              bottom: '30%',
              left: '20%',
              animationDelay: '4s',
              animationDuration: '7s'
            }}
          />
        </div>
      </div>
      
      {/* SVG Definitions for gradients */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="performanceGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--success))" />
            <stop offset="50%" stopColor="hsl(var(--warning))" />
            <stop offset="100%" stopColor="hsl(var(--danger))" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}; 