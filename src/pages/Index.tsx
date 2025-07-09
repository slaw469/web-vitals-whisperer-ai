import React, { useState } from 'react';
import { URLInput } from '@/components/URLInput';
import { PerformanceDashboard } from '@/components/PerformanceDashboard';
import heroImage from '@/assets/hero-performance.jpg';

const Index = () => {
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async (url: string) => {
    setIsAnalyzing(true);
    
    // Simulate analysis startup time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setCurrentUrl(url);
    setIsAnalyzing(false);
  };

  const handleBack = () => {
    setCurrentUrl(null);
  };

  if (currentUrl) {
    return <PerformanceDashboard url={currentUrl} onBack={handleBack} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div 
        className="relative h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
        
        {/* Content */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 mb-12">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground">
                Real-time{' '}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Web Vitals
                </span>
                {' '}Monitor
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Monitor your website's Core Web Vitals performance in real-time. 
                Get actionable optimization suggestions to improve user experience.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-success rounded-full" />
                <span>Largest Contentful Paint</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-warning rounded-full" />
                <span>First Input Delay</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded-full" />
                <span>Cumulative Layout Shift</span>
              </div>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <URLInput onAnalyze={handleAnalyze} loading={isAnalyzing} />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Everything you need to optimize performance
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our monitoring dashboard provides comprehensive insights and actionable recommendations
              to help you achieve perfect performance scores.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-glass border-glass-border backdrop-blur-xl rounded-lg shadow-glass hover:shadow-elevation transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Real-time Monitoring</h3>
              <p className="text-muted-foreground">
                Monitor your Core Web Vitals continuously with live updates every few seconds. 
                See how your site performs as users interact with it.
              </p>
            </div>

            <div className="p-8 bg-glass border-glass-border backdrop-blur-xl rounded-lg shadow-glass hover:shadow-elevation transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Performance Analytics</h3>
              <p className="text-muted-foreground">
                Visualize performance trends with interactive charts and comprehensive metrics. 
                Track improvements over time and identify regressions quickly.
              </p>
            </div>

            <div className="p-8 bg-glass border-glass-border backdrop-blur-xl rounded-lg shadow-glass hover:shadow-elevation transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3l8 5v8l-8 5-8-5V8l8-5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Optimization Insights</h3>
              <p className="text-muted-foreground">
                Get specific, actionable recommendations to improve your Core Web Vitals scores. 
                Each suggestion includes step-by-step implementation guidance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
