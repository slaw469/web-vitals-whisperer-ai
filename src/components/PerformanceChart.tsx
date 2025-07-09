import React from 'react';
import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

interface DataPoint {
  timestamp: string;
  lcp: number;
  fid: number;
  cls: number;
}

interface PerformanceChartProps {
  data: DataPoint[];
  metric: 'lcp' | 'fid' | 'cls';
  className?: string;
}

export const PerformanceChart: React.FC<PerformanceChartProps> = ({
  data,
  metric,
  className
}) => {
  const metricConfig = {
    lcp: {
      name: 'Largest Contentful Paint',
      unit: 's',
      color: 'hsl(212 100% 45%)',
      threshold: { good: 2.5, poor: 4.0 }
    },
    fid: {
      name: 'First Input Delay',
      unit: 'ms',
      color: 'hsl(142 71% 45%)',
      threshold: { good: 100, poor: 300 }
    },
    cls: {
      name: 'Cumulative Layout Shift',
      unit: '',
      color: 'hsl(38 92% 50%)',
      threshold: { good: 0.1, poor: 0.25 }
    }
  };

  const config = metricConfig[metric];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-card-border rounded-lg p-3 shadow-glass backdrop-blur-xl">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-sm font-medium text-foreground">
            {config.name}: {payload[0].value.toFixed(metric === 'cls' ? 3 : 0)}{config.unit}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={cn(
      'p-6 bg-glass border-glass-border backdrop-blur-xl shadow-glass',
      className
    )}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">{config.name}</h3>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: config.color }} />
            <span className="text-sm text-muted-foreground">Real-time</span>
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis 
                dataKey="timestamp" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey={metric}
                stroke={config.color}
                strokeWidth={2}
                dot={{ fill: config.color, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: config.color, strokeWidth: 2 }}
                className="drop-shadow-sm"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Good: ≤ {config.threshold.good}{config.unit}</span>
          <span>Poor: &gt; {config.threshold.poor}{config.unit}</span>
        </div>
      </div>
    </Card>
  );
};