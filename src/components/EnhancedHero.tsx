import React from 'react';
import { ArrowRight, Play, Sparkles, TrendingUp, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DynamicBackground } from './DynamicBackground';
import { cn } from '@/lib/utils';

interface EnhancedHeroProps {
  onAnalyze: (url: string) => void;
  isAnalyzing: boolean;
}

export const EnhancedHero: React.FC<EnhancedHeroProps> = ({ onAnalyze, isAnalyzing }) => {
  const [inputValue, setInputValue] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAnalyze(inputValue.trim());
    }
  };

  const features = [
    {
      icon: TrendingUp,
      label: "Largest Contentful Paint",
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      icon: Zap,
      label: "First Input Delay", 
      color: "text-warning",
      bgColor: "bg-warning/10"
    },
    {
      icon: Shield,
      label: "Cumulative Layout Shift",
      color: "text-primary",
      bgColor: "bg-primary/10"
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Dynamic Background */}
      <DynamicBackground />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/60 via-background/40 to-background/60 backdrop-blur-[1px]" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-2 h-2 bg-primary/30 rounded-full animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-40 right-32 w-1 h-1 bg-success/40 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-warning/35 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 right-20 w-1 h-1 bg-danger/30 rounded-full animate-float" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <div className="text-center space-y-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-glass backdrop-blur-xl border border-glass-border shadow-soft animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">
              Real-time Performance Monitoring
            </span>
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          </div>

          {/* Main Heading */}
          <div className="space-y-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h1 className="font-heading font-bold text-heading-xl text-foreground leading-none">
              Monitor Your{' '}
              <span className="relative">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Web Vitals
                </span>
                <div className="absolute -inset-1 bg-gradient-primary opacity-20 blur-lg animate-glow" />
              </span>
              <br />
              in Real-time
            </h1>
            <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Get instant insights into your Core Web Vitals performance with actionable 
              optimization suggestions. Transform your user experience with data-driven improvements.
            </p>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.label}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2 rounded-full",
                    "bg-glass backdrop-blur-xl border border-glass-border",
                    "hover:shadow-elevation transition-all duration-300",
                    "group cursor-default"
                  )}
                >
                  <div className={cn("p-1.5 rounded-full", feature.bgColor)}>
                    <Icon className={cn("w-3 h-3", feature.color)} />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {feature.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* URL Input Form */}
          <div className="max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative group">
                <input
                  type="url"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter your website URL (e.g., https://example.com)"
                  className={cn(
                    "w-full px-6 py-4 rounded-2xl text-lg",
                    "bg-glass backdrop-blur-xl border border-glass-border",
                    "text-foreground placeholder:text-muted-foreground",
                    "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50",
                    "transition-all duration-300",
                    "group-hover:shadow-elevation",
                    "pr-32"
                  )}
                  required
                />
                <Button
                  type="submit"
                  variant="glow"
                  disabled={isAnalyzing || !inputValue.trim()}
                  className="absolute right-2 top-2 h-12 px-6"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Analyze
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                    </>
                  )}
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground">
                Get instant performance insights and optimization recommendations
              </p>
            </form>
          </div>

          {/* Demo Button with proper spacing */}
          <div className="animate-fade-in mb-16" style={{ animationDelay: '0.8s' }}>
            <Button
              variant="ghost"
              onClick={() => onAnalyze('https://web.dev')}
              className="group"
              disabled={isAnalyzing}
            >
              <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
              Try with demo site
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - perfectly centered and clickable */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-fade-in z-20" 
           style={{ animationDelay: '1s' }}>
        <div 
          className="cursor-pointer"
          onClick={() => {
            const featuresSection = document.getElementById('features');
            if (featuresSection) {
              featuresSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          <div className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300 group">
            <span className="text-sm font-medium">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center group-hover:border-primary transition-colors duration-300">
              <div className="w-1 h-3 bg-current rounded-full animate-bounce mt-2 group-hover:bg-primary transition-colors duration-300" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 