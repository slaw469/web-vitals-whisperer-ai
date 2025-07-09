import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, XCircle, ExternalLink, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Suggestion {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  metric: 'lcp' | 'fid' | 'cls';
  category: string;
  actionSteps: string[];
  learnMoreUrl?: string;
}

interface OptimizationSuggestionsProps {
  suggestions: Suggestion[];
  className?: string;
}

export const OptimizationSuggestions: React.FC<OptimizationSuggestionsProps> = ({
  suggestions,
  className
}) => {
  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'high': return <XCircle className="w-4 h-4 text-danger" />;
      case 'medium': return <AlertTriangle className="w-4 h-4 text-warning" />;
      case 'low': return <CheckCircle className="w-4 h-4 text-success" />;
      default: return <AlertTriangle className="w-4 h-4 text-warning" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'border-danger/20 bg-danger/5 text-danger';
      case 'medium': return 'border-warning/20 bg-warning/5 text-warning';
      case 'low': return 'border-success/20 bg-success/5 text-success';
      default: return 'border-warning/20 bg-warning/5 text-warning';
    }
  };

  const getMetricColor = (metric: string) => {
    switch (metric) {
      case 'lcp': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'fid': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'cls': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const metricNames = {
    lcp: 'LCP',
    fid: 'FID',
    cls: 'CLS'
  };

  if (suggestions.length === 0) {
    return (
      <Card className={cn(
        'p-8 bg-glass border-glass-border backdrop-blur-xl shadow-glass text-center',
        className
      )}>
        <div className="space-y-4">
          <div className="mx-auto w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-success" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Great Performance!</h3>
            <p className="text-muted-foreground">
              No optimization suggestions at this time. Your site is performing well.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={cn(
      'p-6 bg-glass border-glass-border backdrop-blur-xl shadow-glass',
      className
    )}>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Lightbulb className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Optimization Suggestions</h3>
            <p className="text-sm text-muted-foreground">
              {suggestions.length} recommendation{suggestions.length !== 1 ? 's' : ''} to improve performance
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="p-4 border border-border rounded-lg bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all duration-200"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    {getImpactIcon(suggestion.impact)}
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-medium text-foreground">{suggestion.title}</h4>
                        <Badge className={cn('text-xs', getImpactColor(suggestion.impact))}>
                          {suggestion.impact} impact
                        </Badge>
                        <Badge className={cn('text-xs', getMetricColor(suggestion.metric))}>
                          {metricNames[suggestion.metric]}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                    </div>
                  </div>
                </div>

                <div className="pl-7">
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium text-foreground">Action Steps:</h5>
                    <ul className="space-y-1">
                      {suggestion.actionSteps.map((step, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary font-medium">{index + 1}.</span>
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {suggestion.learnMoreUrl && (
                    <div className="mt-3">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 text-primary hover:text-primary-glow"
                        onClick={() => window.open(suggestion.learnMoreUrl, '_blank')}
                      >
                        <ExternalLink className="w-3 h-3" />
                        Learn More
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};