import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface PerformanceCardProps {
  title: string;
  value: number;
  unit: string;
  threshold: {
    good: number;
    poor: number;
  };
  description: string;
  className?: string;
}

export const PerformanceCard: React.FC<PerformanceCardProps> = ({
  title,
  value,
  unit,
  threshold,
  description,
  className
}) => {
  const getStatus = () => {
    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  };

  const status = getStatus();

  const statusColors = {
    good: 'text-success border-success/20 bg-success/5',
    'needs-improvement': 'text-warning border-warning/20 bg-warning/5',
    poor: 'text-danger border-danger/20 bg-danger/5'
  };

  const statusLabels = {
    good: 'Good',
    'needs-improvement': 'Needs Improvement',
    poor: 'Poor'
  };

  return (
    <Card className={cn(
      'p-6 bg-glass border-glass-border backdrop-blur-xl shadow-glass hover:shadow-elevation transition-all duration-300 hover:scale-105',
      className
    )}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <div className={cn(
            'px-2 py-1 rounded-full text-xs font-medium border',
            statusColors[status]
          )}>
            {statusLabels[status]}
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-foreground">
              {value.toFixed(value < 1 ? 3 : 0)}
            </span>
            <span className="text-sm text-muted-foreground">{unit}</span>
          </div>
          
          <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
            <div 
              className={cn(
                'h-full transition-all duration-1000 ease-out',
                status === 'good' && 'bg-gradient-to-r from-success to-success-glow',
                status === 'needs-improvement' && 'bg-gradient-to-r from-warning to-warning-glow',
                status === 'poor' && 'bg-gradient-to-r from-danger to-danger-glow'
              )}
              style={{
                width: `${Math.min((value / (threshold.poor * 1.5)) * 100, 100)}%`
              }}
            />
          </div>
        </div>
        
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </Card>
  );
};