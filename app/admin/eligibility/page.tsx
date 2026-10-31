'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Plus, Trash2, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { PageHeader, SaveBar, EmptyState } from '@/components/layout/shared';
import { useCMS } from '@/providers/dashboard-provider';

export default function EligibilityPage() {
  const { eligibility, updateEligibility } = useCMS();
  const [draft, setDraft] = useState(eligibility);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => setDraft(eligibility), [eligibility]);

  const set = (k: 'heading' | 'description', v: string) =>
    setDraft((p) => ({ ...p, [k]: v }));

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      updateEligibility(draft);
      setSaving(false);
      setSaved(true);
      toast.success('Eligibility saved');
      setTimeout(() => setSaved(false), 2500);
    }, 500);
  };

  const addReq = () => setDraft((p) => ({ ...p, requirements: [...p.requirements, ''] }));
  const updateReq = (i: number, v: string) =>
    setDraft((p) => ({ ...p, requirements: p.requirements.map((x, idx) => (idx === i ? v : x)) }));
  const removeReq = (i: number) =>
    setDraft((p) => ({ ...p, requirements: p.requirements.filter((_, idx) => idx !== i) }));

  return (
    <div className="space-y-6 pb-16">
      <PageHeader title="Eligibility" description="Set the rules for who can apply." />

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
              <CardTitle className="text-base">Requirements</CardTitle>
              <CardDescription>{draft.requirements.length} requirements</CardDescription>
            </CardHeader>
            <CardContent>
              {draft.requirements.length === 0 ? (
                <EmptyState icon={CheckCircle} title="No requirements yet" action={<Button size="sm" onClick={addReq}>Add requirement</Button>} />
              ) : (
                <div className="space-y-2">
                  {draft.requirements.map((r, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success/10 text-success">
                        <CheckCircle className="h-3.5 w-3.5" />
                      </div>
                      <Input className="flex-1" value={r} onChange={(e) => updateReq(i, e.target.value)} />
                      <Button variant="ghost" size="icon" onClick={() => removeReq(i)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              <Button variant="outline" size="sm" className="mt-3" onClick={addReq}>
                <Plus className="mr-1 h-4 w-4" /> Add requirement
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
              <ul className="mt-6 space-y-3">
                {draft.requirements.map((r, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    <span className="text-sm text-foreground">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-muted/40 px-4 py-2 text-center text-xs text-muted-foreground">
              Live preview of the Eligibility section
            </div>
          </Card>
        </div>
      </div>

      <SaveBar onSave={handleSave} saving={saving} saved={saved} />
    </div>
  );
}