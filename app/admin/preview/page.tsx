'use client';

import { useState } from 'react';
import { Monitor, Tablet, Smartphone, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PageHeader } from '@/components/layout/shared';
import { PublicSite } from '@/components/preview/public-site';
import { cn } from '@/lib/utils';

type Mode = 'desktop' | 'tablet' | 'mobile';

const MODES: { value: Mode; label: string; icon: React.ComponentType<{ className?: string }>; width: string }[] = [
  { value: 'desktop', label: 'Desktop', icon: Monitor, width: '100%' },
  { value: 'tablet', label: 'Tablet', icon: Tablet, width: '768px' },
  { value: 'mobile', label: 'Mobile', icon: Smartphone, width: '390px' },
];

export default function PreviewPage() {
  const [mode, setMode] = useState<Mode>('desktop');
  const current = MODES.find((m) => m.value === mode)!;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Website Preview"
        description="See how the public site looks to visitors. Changes from the CMS are reflected here."
        actions={
          <Button variant="outline" onClick={() => window.open('#', '_blank')}>
            <ExternalLink className="mr-2 h-4 w-4" /> Open in new tab
          </Button>
        }
      />

      <div className="flex items-center justify-center gap-2">
        {MODES.map((m) => (
          <button
            key={m.value}
            onClick={() => setMode(m.value)}
            className={cn(
              'inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors',
              mode === m.value
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border bg-card text-muted-foreground hover:bg-muted/40'
            )}
          >
            <m.icon className="h-4 w-4" />
            <span className="hidden sm:inline">{m.label}</span>
          </button>
        ))}
      </div>

      <Card className="overflow-hidden p-0">
        <div className="flex items-center gap-1.5 border-b border-border bg-muted/40 px-4 py-2.5">
          <span className="h-3 w-3 rounded-full bg-destructive/60" />
          <span className="h-3 w-3 rounded-full bg-warning/60" />
          <span className="h-3 w-3 rounded-full bg-success/60" />
          <span className="ml-3 truncate rounded-md bg-card px-3 py-0.5 text-[11px] text-muted-foreground">
            circuithack.ieeehitsb.org
          </span>
        </div>
        <div className="max-h-[70vh] overflow-y-auto bg-muted/20 p-4">
          <div
            className="mx-auto overflow-hidden rounded-lg border border-border bg-background shadow-sm transition-all duration-300"
            style={{ width: current.width, maxWidth: '100%' }}
          >
            <PublicSite />
          </div>
        </div>
      </Card>
    </div>
  );
}