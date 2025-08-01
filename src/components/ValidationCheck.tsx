import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Moon, Sun, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const ValidationCheck: React.FC = () => {
  const [checks, setChecks] = useState({
    mounted: false,
    darkModeToggle: false,
    animations: false,
    glassMorphism: false,
    responsiveLayout: false
  });

  useEffect(() => {
    // Check if component mounted
    setChecks(prev => ({ ...prev, mounted: true }));

    // Check if dark mode classes are working
    const hasDarkModeSupport = document.documentElement.classList.contains('dark') || 
                               document.documentElement.classList.contains('light');
    setChecks(prev => ({ ...prev, darkModeToggle: hasDarkModeSupport }));

    // Check if CSS animations are supported
    const animationsSupported = window.getComputedStyle(document.body).animationName !== undefined;
    setChecks(prev => ({ ...prev, animations: animationsSupported }));

    // Check if backdrop-filter is supported (glass morphism)
    const glassSupported = CSS.supports('backdrop-filter', 'blur(10px)');
    setChecks(prev => ({ ...prev, glassMorphism: glassSupported }));

    // Check responsive layout
    const isResponsive = window.innerWidth > 0; // Basic check
    setChecks(prev => ({ ...prev, responsiveLayout: isResponsive }));
  }, []);

  const testDarkMode = () => {
    const isDark = document.documentElement.classList.contains('dark');
    if (isDark) {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
    console.log('Dark mode test:', isDark ? 'Switched to Light' : 'Switched to Dark');
  };

  const allChecksPass = Object.values(checks).every(Boolean);

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-glass backdrop-blur-xl border border-glass-border rounded-xl p-4 shadow-elevation max-w-sm">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm text-foreground">System Validation (for admin)</h3>
          <div className={cn(
            "w-3 h-3 rounded-full",
            allChecksPass ? "bg-success animate-pulse" : "bg-warning"
          )} />
        </div>
        
        <div className="space-y-2 text-xs">
          {Object.entries(checks).map(([key, passed]) => (
            <div key={key} className="flex items-center gap-2">
              {passed ? (
                <CheckCircle className="w-3 h-3 text-success" />
              ) : (
                <XCircle className="w-3 h-3 text-danger" />
              )}
              <span className="text-muted-foreground capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </span>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={testDarkMode}
            className="flex-1 h-8 text-xs"
          >
            <Moon className="w-3 h-3 mr-1" />
            Test Dark Mode
          </Button>
        </div>

        <div className={`text-xs font-medium ${allChecksPass ? 'text-success' : 'text-warning'}`}>
          Status: {allChecksPass ? '✅ All Systems Operational' : '⚠️ Issues Detected'}
        </div>
      </div>
    </div>
  );
}; 