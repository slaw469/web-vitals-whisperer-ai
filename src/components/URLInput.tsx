import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Globe, Play, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface URLInputProps {
  onAnalyze: (url: string) => void;
  loading: boolean;
  className?: string;
}

export const URLInput: React.FC<URLInputProps> = ({ onAnalyze, loading, className }) => {
  const [url, setUrl] = useState('');
  const [isValidUrl, setIsValidUrl] = useState(false);

  const validateUrl = (input: string) => {
    try {
      const urlObj = new URL(input.startsWith('http') ? input : `https://${input}`);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUrl(value);
    setIsValidUrl(validateUrl(value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidUrl && !loading) {
      const finalUrl = url.startsWith('http') ? url : `https://${url}`;
      onAnalyze(finalUrl);
    }
  };

  return (
    <Card className={cn(
      'p-8 bg-glass border-glass-border backdrop-blur-xl shadow-glass',
      className
    )}>
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Web Vitals Monitor</h2>
          <p className="text-muted-foreground">
            Enter a website URL to start monitoring its Core Web Vitals performance in real-time
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Enter website URL (e.g., example.com)"
              value={url}
              onChange={handleInputChange}
              className={cn(
                'pl-4 pr-4 h-12 text-base bg-background/50 border-border/50 backdrop-blur-sm transition-all duration-200',
                isValidUrl && 'border-success/50 focus:border-success',
                url && !isValidUrl && 'border-danger/50 focus:border-danger'
              )}
              disabled={loading}
            />
            {url && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {isValidUrl ? (
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                ) : (
                  <div className="w-2 h-2 bg-danger rounded-full animate-pulse" />
                )}
              </div>
            )}
          </div>

          <Button
            type="submit"
            variant="gradient"
            size="lg"
            className="w-full"
            disabled={!isValidUrl || loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Analyzing Performance...
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Start Monitoring
              </>
            )}
          </Button>
        </form>

        {url && !isValidUrl && (
          <div className="text-center">
            <p className="text-sm text-danger">
              Please enter a valid URL (e.g., example.com or https://example.com)
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};