import React, { useState, useEffect } from 'react';
import { PerformanceCard } from './PerformanceCard';
import { PerformanceChart } from './PerformanceChart';
import { OptimizationSuggestions } from './OptimizationSuggestions';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCw, Monitor, Smartphone, Download, Share2, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PerformanceData {
  lcp: number;
  fid: number;
  cls: number;
  timestamp: string;
}

interface PerformanceDashboardProps {
  url: string;
  onBack: () => void;
  className?: string;
}

export const PerformanceDashboard: React.FC<PerformanceDashboardProps> = ({
  url,
  onBack,
  className
}) => {
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);
  const [currentData, setCurrentData] = useState<PerformanceData | null>(null);
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  // Mock data generation for demonstration
  useEffect(() => {
    const generateMockData = (): PerformanceData => ({
      lcp: 1.2 + Math.random() * 2.8,
      fid: 50 + Math.random() * 200,
      cls: 0.05 + Math.random() * 0.3,
      timestamp: new Date().toLocaleTimeString()
    });

    const interval = setInterval(() => {
      if (isMonitoring) {
        const newData = generateMockData();
        setCurrentData(newData);
        setPerformanceData(prev => [...prev.slice(-19), newData]);
      }
    }, 2000);

    // Initial data
    const initialData = generateMockData();
    setCurrentData(initialData);
    setPerformanceData([initialData]);

    return () => clearInterval(interval);
  }, [isMonitoring]);

  const mockSuggestions = [
    {
      id: '1',
      title: 'Optimize Images',
      description: 'Large images are affecting your LCP score. Consider using modern formats like WebP.',
      impact: 'high' as const,
      metric: 'lcp' as const,
      category: 'Images',
      actionSteps: [
        'Convert images to WebP or AVIF format',
        'Implement responsive images with srcset',
        'Add proper width and height attributes',
        'Consider lazy loading for below-the-fold images'
      ],
      learnMoreUrl: 'https://web.dev/optimize-lcp/'
    },
    {
      id: '2',
      title: 'Reduce JavaScript Bundle Size',
      description: 'Large JavaScript bundles are causing layout shifts during page load.',
      impact: 'medium' as const,
      metric: 'cls' as const,
      category: 'JavaScript',
      actionSteps: [
        'Implement code splitting',
        'Remove unused JavaScript',
        'Use dynamic imports for non-critical code',
        'Optimize third-party scripts'
      ],
      learnMoreUrl: 'https://web.dev/reduce-javascript-payloads-with-code-splitting/'
    }
  ];

  const getOverallScore = () => {
    if (!currentData) return 0;
    let score = 0;
    
    // LCP scoring (0-100)
    if (currentData.lcp <= 2.5) score += 33;
    else if (currentData.lcp <= 4.0) score += 20;
    else score += 10;
    
    // FID scoring (0-100)
    if (currentData.fid <= 100) score += 33;
    else if (currentData.fid <= 300) score += 20;
    else score += 10;
    
    // CLS scoring (0-100)
    if (currentData.cls <= 0.1) score += 34;
    else if (currentData.cls <= 0.25) score += 20;
    else score += 10;
    
    return Math.round(score);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-success';
    if (score >= 50) return 'text-warning';
    return 'text-danger';
  };

  const overallScore = getOverallScore();

  return (
    <div className={cn('min-h-screen bg-background', className)}>
      {/* Header */}
      <div className="border-b border-border bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={onBack}>
                ← Back
              </Button>
              <div>
                <h1 className="text-lg font-semibold text-foreground">Performance Monitor</h1>
                <p className="text-sm text-muted-foreground truncate max-w-md">{url}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge variant="outline" className={cn('font-medium', getScoreColor(overallScore))}>
                Score: {overallScore}/100
              </Badge>
              
              <div className="flex items-center gap-1">
                <Button
                  variant={viewMode === 'desktop' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('desktop')}
                >
                  <Monitor className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'mobile' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('mobile')}
                >
                  <Smartphone className="w-4 h-4" />
                </Button>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsMonitoring(!isMonitoring)}
              >
                {isMonitoring ? (
                  <>
                    <Clock className="w-4 h-4 text-success animate-pulse" />
                    Live
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    Paused
                  </>
                )}
              </Button>

              <Button variant="ghost" size="sm">
                <Download className="w-4 h-4" />
              </Button>
              
              <Button variant="ghost" size="sm">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Core Web Vitals Cards */}
          {currentData && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <PerformanceCard
                title="Largest Contentful Paint"
                value={currentData.lcp}
                unit="s"
                threshold={{ good: 2.5, poor: 4.0 }}
                description="Measures loading performance. Good LCP scores are 2.5s or faster."
              />
              <PerformanceCard
                title="First Input Delay"
                value={currentData.fid}
                unit="ms"
                threshold={{ good: 100, poor: 300 }}
                description="Measures interactivity. Good FID scores are 100ms or less."
              />
              <PerformanceCard
                title="Cumulative Layout Shift"
                value={currentData.cls}
                unit=""
                threshold={{ good: 0.1, poor: 0.25 }}
                description="Measures visual stability. Good CLS scores are 0.1 or less."
              />
            </div>
          )}

          {/* Charts and Suggestions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Tabs defaultValue="lcp" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="lcp">LCP</TabsTrigger>
                  <TabsTrigger value="fid">FID</TabsTrigger>
                  <TabsTrigger value="cls">CLS</TabsTrigger>
                </TabsList>
                <TabsContent value="lcp">
                  <PerformanceChart data={performanceData} metric="lcp" />
                </TabsContent>
                <TabsContent value="fid">
                  <PerformanceChart data={performanceData} metric="fid" />
                </TabsContent>
                <TabsContent value="cls">
                  <PerformanceChart data={performanceData} metric="cls" />
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <OptimizationSuggestions suggestions={mockSuggestions} />
            </div>
          </div>

          {/* Additional Metrics */}
          <Card className="p-6 bg-glass border-glass-border backdrop-blur-xl shadow-glass">
            <h3 className="text-lg font-semibold text-foreground mb-4">Additional Metrics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="space-y-1">
                <p className="text-2xl font-bold text-foreground">1.2s</p>
                <p className="text-sm text-muted-foreground">First Contentful Paint</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-foreground">2.1s</p>
                <p className="text-sm text-muted-foreground">Time to Interactive</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-foreground">180ms</p>
                <p className="text-sm text-muted-foreground">Total Blocking Time</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-foreground">1.8s</p>
                <p className="text-sm text-muted-foreground">Speed Index</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};