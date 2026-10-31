'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown, GripVertical, CalendarClock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { PageHeader, SaveBar, EmptyState } from '@/components/layout/shared';
import { useCMS } from '@/providers/dashboard-provider';
import type { TimelineItem } from '@/types/content';

export default function TimelinePage() {
  const { timeline, updateTimeline } = useCMS();
  const [draft, setDraft] = useState(timeline);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [editing, setEditing] = useState<TimelineItem | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => setDraft(timeline), [timeline]);

  const set = (k: 'heading' | 'description', v: string) =>
    setDraft((p) => ({ ...p, [k]: v }));

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      updateTimeline(draft);
      setSaving(false);
      setSaved(true);
      toast.success('Timeline saved');
      setTimeout(() => setSaved(false), 2500);
    }, 500);
  };

  const add = () => {
    setEditing({ id: '', order: 0, title: '', date: '2026-11-09', time: '09:00', description: '' });
    setOpen(true);
  };

  const edit = (t: TimelineItem) => {
    setEditing({ ...t });
    setOpen(true);
  };

  const save = () => {
    if (!editing) return;
    if (!editing.title.trim()) {
      toast.error('Title is required');
      return;
    }
    if (editing.id) {
      setDraft((p) => ({ ...p, items: p.items.map((t) => (t.id === editing.id ? editing : t)) }));
    } else {
      setDraft((p) => ({
        ...p,
        items: [...p.items, { ...editing, id: crypto.randomUUID(), order: p.items.length + 1 }],
      }));
    }
    setOpen(false);
    setEditing(null);
  };

  const remove = (id: string) =>
    setDraft((p) => ({
      ...p,
      items: p.items.filter((t) => t.id !== id).map((t, i) => ({ ...t, order: i + 1 })),
    }));

  const move = (idx: number, dir: 'up' | 'down') => {
    setDraft((p) => {
      const arr = [...p.items];
      const swap = dir === 'up' ? idx - 1 : idx + 1;
      if (swap < 0 || swap >= arr.length) return p;
      [arr[idx], arr[swap]] = [arr[swap], arr[idx]];
      return { ...p, items: arr.map((t, i) => ({ ...t, order: i + 1 })) };
    });
  };

  return (
    <div className="space-y-6 pb-16">
      <PageHeader
        title="Timeline"
        description="Key dates from application to demo."
        actions={
          <Button variant="outline" onClick={add}>
            <Plus className="mr-2 h-4 w-4" /> Add milestone
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Intro</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label>Heading</Label>
                <Input value={draft.heading} onChange={(e) => set('heading', e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Description</Label>
                <Textarea rows={2} value={draft.description} onChange={(e) => set('description', e.target.value)} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Milestones</CardTitle>
              <CardDescription>{draft.items.length} milestones</CardDescription>
            </CardHeader>
            <CardContent>
              {draft.items.length === 0 ? (
                <EmptyState icon={CalendarClock} title="No milestones yet" action={<Button size="sm" onClick={add}>Add milestone</Button>} />
              ) : (
                <div className="space-y-3">
                  {draft.items.map((t, idx) => (
                    <div key={t.id} className="group flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                      <GripVertical className="mt-1 hidden h-4 w-4 text-muted-foreground sm:block" />
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">
                        {t.order}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium">{t.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(t.date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })} · {t.time}
                        </p>
                        <p className="mt-0.5 text-[11px] text-muted-foreground">{t.description}</p>
                      </div>
                      <div className="flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                        <Button variant="ghost" size="icon" onClick={() => move(idx, 'up')} disabled={idx === 0}>
                          <ArrowUp className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => move(idx, 'down')} disabled={idx === draft.items.length - 1}>
                          <ArrowDown className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => edit(t)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => remove(t.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Preview */}
        <div className="lg:sticky lg:top-20 lg:self-start">
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-b from-muted/40 to-card p-8">
              <h2 className="text-2xl font-bold tracking-tight">{draft.heading}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{draft.description}</p>
              <div className="relative mt-6 space-y-5 pl-6">
                <div className="absolute left-[7px] top-1 bottom-1 w-px bg-border" />
                {draft.items.map((t) => (
                  <div key={t.id} className="relative">
                    <span className="absolute -left-6 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-card bg-primary" />
                    <p className="text-sm font-medium">{t.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(t.date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })} · {t.time}
                    </p>
                    <p className="text-xs text-muted-foreground">{t.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-muted/40 px-4 py-2 text-center text-xs text-muted-foreground">
              Live preview of the Timeline section
            </div>
          </Card>
        </div>
      </div>

      <SaveBar onSave={handleSave} saving={saving} saved={saved} />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing?.id ? 'Edit milestone' : 'Add milestone'}</DialogTitle>
            <DialogDescription>A key date in the event journey.</DialogDescription>
          </DialogHeader>
          {editing && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label>Title</Label>
                <Input value={editing.title} onChange={(e) => setEditing((p) => ({ ...p!, title: e.target.value }))} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Date</Label>
                  <Input type="date" value={editing.date} onChange={(e) => setEditing((p) => ({ ...p!, date: e.target.value }))} />
                </div>
                <div className="space-y-1.5">
                  <Label>Time</Label>
                  <Input type="time" value={editing.time} onChange={(e) => setEditing((p) => ({ ...p!, time: e.target.value }))} />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Description</Label>
                <Textarea rows={2} value={editing.description} onChange={(e) => setEditing((p) => ({ ...p!, description: e.target.value }))} />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={save}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}