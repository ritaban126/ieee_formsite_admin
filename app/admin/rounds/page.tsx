'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown, GripVertical, Layers } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PageHeader, SaveBar, EmptyState } from '@/components/layout/shared';
import { useCMS } from '@/providers/dashboard-provider';
import type { Round } from '@/types/content';
import { cn } from '@/lib/utils';

const difficultyColor: Record<string, string> = {
  Easy: 'bg-success/10 text-success',
  Medium: 'bg-warning/10 text-warning',
  Hard: 'bg-destructive/10 text-destructive',
};

export default function RoundsPage() {
  const { rounds, updateRounds } = useCMS();
  const [draft, setDraft] = useState(rounds);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [editing, setEditing] = useState<Round | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => setDraft(rounds), [rounds]);

  const set = (k: 'heading' | 'description', v: string) =>
    setDraft((p) => ({ ...p, [k]: v }));

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      updateRounds(draft);
      setSaving(false);
      setSaved(true);
      toast.success('Rounds saved');
      setTimeout(() => setSaved(false), 2500);
    }, 500);
  };

  const addRound = () => {
    setEditing({ id: '', order: 0, title: '', description: '', duration: '30 min', teamSize: 2, difficulty: 'Easy' });
    setOpen(true);
  };

  const editRound = (r: Round) => {
    setEditing({ ...r });
    setOpen(true);
  };

  const saveRound = () => {
    if (!editing) return;
    if (!editing.title.trim()) {
      toast.error('Title is required');
      return;
    }
    if (editing.id) {
      setDraft((p) => ({
        ...p,
        rounds: p.rounds.map((r) => (r.id === editing.id ? editing : r)),
      }));
    } else {
      setDraft((p) => ({
        ...p,
        rounds: [...p.rounds, { ...editing, id: crypto.randomUUID(), order: p.rounds.length + 1 }],
      }));
    }
    setOpen(false);
    setEditing(null);
  };

  const deleteRound = (id: string) => {
    setDraft((p) => ({
      ...p,
      rounds: p.rounds.filter((r) => r.id !== id).map((r, i) => ({ ...r, order: i + 1 })),
    }));
    toast('Round removed');
  };

  const moveRound = (idx: number, dir: 'up' | 'down') => {
    setDraft((p) => {
      const arr = [...p.rounds];
      const swap = dir === 'up' ? idx - 1 : idx + 1;
      if (swap < 0 || swap >= arr.length) return p;
      [arr[idx], arr[swap]] = [arr[swap], arr[idx]];
      return { ...p, rounds: arr.map((r, i) => ({ ...r, order: i + 1 })) };
    });
  };

  const addPerk = () => setDraft((p) => ({ ...p, perks: [...p.perks, ''] }));
  const updatePerk = (i: number, v: string) =>
    setDraft((p) => ({ ...p, perks: p.perks.map((x, idx) => (idx === i ? v : x)) }));
  const removePerk = (i: number) =>
    setDraft((p) => ({ ...p, perks: p.perks.filter((_, idx) => idx !== i) }));

  const addJudge = () => setDraft((p) => ({ ...p, judgedOn: [...p.judgedOn, ''] }));
  const updateJudge = (i: number, v: string) =>
    setDraft((p) => ({ ...p, judgedOn: p.judgedOn.map((x, idx) => (idx === i ? v : x)) }));
  const removeJudge = (i: number) =>
    setDraft((p) => ({ ...p, judgedOn: p.judgedOn.filter((_, idx) => idx !== i) }));

  return (
    <div className="space-y-6 pb-16">
      <PageHeader
        title="Rounds"
        description="Configure the three build rounds and judging criteria."
        actions={
          <Button variant="outline" onClick={addRound}>
            <Plus className="mr-2 h-4 w-4" /> Add round
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
              <CardTitle className="text-base">Rounds</CardTitle>
              <CardDescription>{draft.rounds.length} rounds configured</CardDescription>
            </CardHeader>
            <CardContent>
              {draft.rounds.length === 0 ? (
                <EmptyState icon={Layers} title="No rounds yet" action={<Button size="sm" onClick={addRound}>Add round</Button>} />
              ) : (
                <div className="space-y-3">
                  {draft.rounds.map((r, idx) => (
                    <div key={r.id} className="group flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                      <GripVertical className="mt-1 hidden h-4 w-4 text-muted-foreground sm:block" />
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">
                        {r.order}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-medium">{r.title}</p>
                          <Badge className={cn('font-medium', difficultyColor[r.difficulty])} variant="secondary">
                            {r.difficulty}
                          </Badge>
                        </div>
                        <p className="mt-0.5 text-xs text-muted-foreground">{r.description}</p>
                        <p className="mt-1 text-[11px] text-muted-foreground">
                          {r.duration} · Team of {r.teamSize}
                        </p>
                      </div>
                      <div className="flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                        <Button variant="ghost" size="icon" onClick={() => moveRound(idx, 'up')} disabled={idx === 0}>
                          <ArrowUp className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => moveRound(idx, 'down')} disabled={idx === draft.rounds.length - 1}>
                          <ArrowDown className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => editRound(r)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteRound(r.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Every participant gets</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {draft.perks.map((perk, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Input value={perk} onChange={(e) => updatePerk(i, e.target.value)} />
                  <Button variant="ghost" size="icon" onClick={() => removePerk(i)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addPerk}>
                <Plus className="mr-1 h-4 w-4" /> Add perk
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Judged on</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {draft.judgedOn.map((j, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Input value={j} onChange={(e) => updateJudge(i, e.target.value)} />
                  <Button variant="ghost" size="icon" onClick={() => removeJudge(i)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addJudge}>
                <Plus className="mr-1 h-4 w-4" /> Add criterion
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Preview */}
        <div className="lg:sticky lg:top-20 lg:self-start">
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-b from-muted/40 to-card p-8">
              <h2 className="text-2xl font-bold tracking-tight">{draft.heading}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{draft.description}</p>

              <div className="mt-6 space-y-4">
                {draft.rounds.map((r) => (
                  <div key={r.id} className="rounded-xl border border-border bg-card p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">
                        {r.order}
                      </div>
                      <p className="text-sm font-semibold">{r.title}</p>
                      <Badge className={cn('ml-auto font-medium', difficultyColor[r.difficulty])} variant="secondary">
                        {r.difficulty}
                      </Badge>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">{r.description}</p>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      {r.duration} · Team of {r.teamSize}
                    </p>
                  </div>
                ))}
              </div>

              {draft.perks.length > 0 && (
                <div className="mt-6">
                  <p className="text-sm font-semibold">Every participant gets</p>
                  <ul className="mt-2 space-y-1">
                    {draft.perks.map((p, i) => (
                      <li key={i} className="text-xs text-muted-foreground">· {p}</li>
                    ))}
                  </ul>
                </div>
              )}

              {draft.judgedOn.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-semibold">Judged on</p>
                  <ul className="mt-2 space-y-1">
                    {draft.judgedOn.map((j, i) => (
                      <li key={i} className="text-xs text-muted-foreground">· {j}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="bg-muted/40 px-4 py-2 text-center text-xs text-muted-foreground">
              Live preview of the Rounds section
            </div>
          </Card>
        </div>
      </div>

      <SaveBar onSave={handleSave} saving={saving} saved={saved} />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing?.id ? 'Edit round' : 'Add round'}</DialogTitle>
            <DialogDescription>Configure a build round.</DialogDescription>
          </DialogHeader>
          {editing && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label>Title</Label>
                <Input value={editing.title} onChange={(e) => setEditing((p) => ({ ...p!, title: e.target.value }))} />
              </div>
              <div className="space-y-1.5">
                <Label>Description</Label>
                <Textarea rows={2} value={editing.description} onChange={(e) => setEditing((p) => ({ ...p!, description: e.target.value }))} />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <Label>Duration</Label>
                  <Input value={editing.duration} onChange={(e) => setEditing((p) => ({ ...p!, duration: e.target.value }))} />
                </div>
                <div className="space-y-1.5">
                  <Label>Team size</Label>
                  <Input
                    type="number"
                    value={editing.teamSize}
                    onChange={(e) => setEditing((p) => ({ ...p!, teamSize: parseInt(e.target.value) || 1 }))}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Difficulty</Label>
                  <Select value={editing.difficulty} onValueChange={(v) => setEditing((p) => ({ ...p!, difficulty: v as Round['difficulty'] }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {['Easy', 'Medium', 'Hard'].map((d) => (
                        <SelectItem key={d} value={d}>
                          {d}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={saveRound}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}