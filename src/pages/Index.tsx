import React, { useState } from 'react';
import { PerformanceDashboard } from '@/components/PerformanceDashboard';
import { ModernNavigation } from '@/components/ModernNavigation';
import { EnhancedHero } from '@/components/EnhancedHero';
import { ValidationCheck } from '@/components/ValidationCheck';
import { ArrowRight, BarChart3, Zap, Shield, Globe, TrendingUp, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Index = () => {
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async (url: string) => {
    setIsAnalyzing(true);
    
    // Simulate analysis startup time with modern loading experience
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setCurrentUrl(url);
    setIsAnalyzing(false);
  };

  const handleBack = () => {
    setCurrentUrl(null);
  };

  const handleQuickAnalyze = () => {
    // Trigger analyze from navigation
    const demoUrl = 'https://web.dev';
    handleAnalyze(demoUrl);
  };

  if (currentUrl) {
    return <PerformanceDashboard url={currentUrl} onBack={handleBack} />;
  }

  const features = [
    {
      icon: TrendingUp,
      title: "Real-time Monitoring",
      description: "Monitor Core Web Vitals continuously with live updates. Track LCP, FID, and CLS in real-time as users interact with your site.",
      color: "text-success",
      bgColor: "bg-success/5",
      borderColor: "border-success/20"
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description: "Visualize performance trends with interactive charts and comprehensive metrics. Identify patterns and track improvements over time.",
      color: "text-primary",
      bgColor: "bg-primary/5",
      borderColor: "border-primary/20"
    },
    {
      icon: Shield,
      title: "Optimization Insights",
      description: "Get specific, actionable recommendations to improve your performance scores. Each suggestion includes implementation guidance.",
      color: "text-warning",
      bgColor: "bg-warning/5",
      borderColor: "border-warning/20"
    },
    {
      icon: Globe,
      title: "Global Performance",
      description: "Monitor your site's performance from multiple geographic locations to ensure optimal experience for all users worldwide.",
      color: "text-danger",
      bgColor: "bg-danger/5",
      borderColor: "border-danger/20"
    },
    {
      icon: Zap,
      title: "Instant Analysis",
      description: "Get comprehensive performance analysis in seconds. Our advanced algorithms provide instant insights and optimization suggestions.",
      color: "text-purple-500",
      bgColor: "bg-purple-500/5",
      borderColor: "border-purple-500/20"
    },
    {
      icon: CheckCircle,
      title: "Continuous Monitoring",
      description: "Set up automated monitoring to track your site's performance 24/7. Get alerts when performance metrics exceed thresholds.",
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/5",
      borderColor: "border-emerald-500/20"
    }
  ];

  const benefits = [
    "Improve user experience and engagement",
    "Boost search engine rankings",
    "Increase conversion rates",
    "Reduce bounce rates",
    "Enhance mobile performance",
    "Meet Core Web Vitals standards"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Modern Navigation */}
      <ModernNavigation onAnalyze={handleQuickAnalyze} />

      {/* Enhanced Hero Section */}
      <EnhancedHero onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />

      {/* Features Section with Modern Design */}
      <section id="features" className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-border to-transparent opacity-30" />
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-border to-transparent opacity-30" />
        </div>

        <div className="max-w-7xl mx-auto relative">
          {/* Section Header */}
          <div className="text-center space-y-6 mb-20 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-glass backdrop-blur-xl border border-glass-border shadow-soft">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Complete Performance Solution</span>
            </div>
            
            <h2 className="font-heading font-bold text-heading-lg text-foreground">
              Everything you need to{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                optimize performance
              </span>
            </h2>
            
            <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto">
              Our comprehensive monitoring dashboard provides deep insights and actionable recommendations 
              to help you achieve perfect performance scores and deliver exceptional user experiences.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className={cn(
                    "group p-8 rounded-2xl border transition-all duration-500",
                    "bg-glass backdrop-blur-xl hover:shadow-elevation",
                    "hover:scale-105 hover:-translate-y-2",
                    feature.bgColor,
                    feature.borderColor,
                    "animate-fade-in"
                  )}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="space-y-4">
                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", feature.bgColor)}>
                      <Icon className={cn("w-6 h-6 group-hover:scale-110 transition-transform duration-300", feature.color)} />
                    </div>
                    
                    <h3 className="font-heading font-semibold text-xl text-foreground group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Benefits Section */}
          <div id="about" className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h3 className="font-heading font-bold text-heading-md text-foreground">
                  Why Performance Matters
                </h3>
                <p className="text-body-lg text-muted-foreground leading-relaxed">
                  Core Web Vitals are essential ranking factors for search engines and directly impact 
                  user experience. Optimize your performance to stay ahead of the competition.
                </p>
              </div>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-3 animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-success" />
                    </div>
                    <span className="text-foreground font-medium">{benefit}</span>
                  </div>
                ))}
              </div>

              <Button
                variant="glow"
                size="lg"
                onClick={() => handleAnalyze('https://web.dev')}
                className="group"
                disabled={isAnalyzing}
              >
                Start Optimizing Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </div>

            <div className="relative animate-fade-in" style={{ animationDelay: '0.5s' }}>
              {/* Performance Chart Mockup */}
              <div className="relative bg-glass backdrop-blur-xl border border-glass-border rounded-2xl p-8 shadow-elevation">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="font-heading font-semibold text-lg text-foreground">Performance Overview</h4>
                    <div className="px-3 py-1 rounded-full bg-success/10 text-success text-sm font-medium">
                      Good
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Largest Contentful Paint</span>
                        <span className="text-sm font-medium text-success">1.2s</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-success h-2 rounded-full w-4/5 transition-all duration-1000 ease-out" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">First Input Delay</span>
                        <span className="text-sm font-medium text-warning">95ms</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-warning h-2 rounded-full w-3/5 transition-all duration-1000 ease-out" style={{ animationDelay: '0.3s' }} />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Cumulative Layout Shift</span>
                        <span className="text-sm font-medium text-success">0.05</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-success h-2 rounded-full w-5/6 transition-all duration-1000 ease-out" style={{ animationDelay: '0.6s' }} />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating metrics */}
                <div className="absolute -top-4 -right-4 bg-primary/10 backdrop-blur-xl border border-primary/20 rounded-xl px-3 py-2">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">92</div>
                    <div className="text-xs text-muted-foreground">Performance Score</div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -z-10 top-8 left-8 w-16 h-16 bg-primary/10 rounded-full blur-xl animate-float" />
              <div className="absolute -z-10 bottom-8 right-8 w-12 h-12 bg-success/10 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section id="get-started" className="py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-success/5" />
        
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="space-y-8 animate-fade-in">
            <h2 className="font-heading font-bold text-heading-lg text-foreground">
              Ready to optimize your{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                web performance?
              </span>
            </h2>
            
            <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of developers who trust our platform to monitor and optimize 
              their web performance. Start your journey to perfect Core Web Vitals today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                variant="glow"
                size="xl"
                onClick={() => handleAnalyze('https://web.dev')}
                className="group"
                disabled={isAnalyzing}
              >
                <Zap className="w-5 h-5 mr-2" />
                Analyze Your Site Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
              
              <Button
                variant="outline"
                size="xl"
                onClick={() => window.open('https://web.dev/vitals/', '_blank')}
                className="group"
              >
                Learn About Web Vitals
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Validation Check Component - Temporary for testing */}
      <ValidationCheck />
    </div>
  );
};

export default Index;
