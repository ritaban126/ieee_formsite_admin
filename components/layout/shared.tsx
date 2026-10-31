'use client';

import { Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

interface SaveBarProps {
  onSave: () => void;
  onPublish?: () => void;
  saving?: boolean;
  saved?: boolean;
  publishLabel?: string;
}

export function SaveBar({
  onSave,
  onPublish,
  saving,
  saved,
  publishLabel = 'Publish',
}: SaveBarProps) {
  return (
    <div className="sticky bottom-0 z-30 -mx-6 mt-6 border-t border-border bg-card/80 px-6 py-3 backdrop-blur">
      <div className="flex items-center justify-end gap-2">
        {saved && (
          <span className="mr-auto inline-flex items-center gap-1 text-xs text-success">
            <Check className="h-3.5 w-3.5" /> Saved
          </span>
        )}
        <Button variant="outline" onClick={onSave} disabled={saving}>
          {saving ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Check className="mr-2 h-4 w-4" />
          )}
          Save draft
        </Button>
        {onPublish && (
          <Button onClick={onPublish} disabled={saving}>
            {publishLabel}
          </Button>
        )}
      </div>
    </div>
  );
}

export function StatusBadge({
  status,
}: {
  status: 'Published' | 'Draft' | 'Scheduled';
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        status === 'Published' && 'bg-success/10 text-success',
        status === 'Draft' && 'bg-warning/10 text-warning',
        status === 'Scheduled' && 'bg-primary/10 text-primary'
      )}
    >
      {status}
    </span>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 px-6 py-12 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <Icon className="h-5 w-5" />
      </div>
      <p className="mt-4 text-sm font-medium text-foreground">{title}</p>
      {description && (
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}