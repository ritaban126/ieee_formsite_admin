'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { PageHeader, SaveBar } from '@/components/layout/shared';
import { useCMS } from '@/providers/dashboard-provider';

export default function HeroPage() {
  const { hero, updateHero } = useCMS();
  const [draft, setDraft] = useState(hero);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => setDraft(hero), [hero]);

  const set = (k: keyof typeof draft, v: string | number) =>
    setDraft((p) => ({ ...p, [k]: v }));

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      updateHero(draft);
      setSaving(false);
      setSaved(true);
      toast.success('Hero section saved as draft');
      setTimeout(() => setSaved(false), 2500);
    }, 500);
  };

  const handlePublish = () => {
    updateHero(draft);
    toast.success('Hero section published');
  };

  return (
    <div className="space-y-6 pb-16">
      <PageHeader
        title="Hero Section"
        description="The top banner visitors see first on the homepage."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Content</CardTitle>
              <CardDescription>Headlines and badges</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label>Kicker</Label>
                <Input value={draft.kicker} onChange={(e) => set('kicker', e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Title</Label>
                <Input value={draft.title} onChange={(e) => set('title', e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Tagline</Label>
                <Textarea rows={2} value={draft.tagline} onChange={(e) => set('tagline', e.target.value)} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Event details</CardTitle>
              <CardDescription>Dates, venue and format badges</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Format</Label>
                  <Input value={draft.format} onChange={(e) => set('format', e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Mode</Label>
                  <Input value={draft.mode} onChange={(e) => set('mode', e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Start date</Label>
                  <Input type="date" value={draft.startDate} onChange={(e) => set('startDate', e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>End date</Label>
                  <Input type="date" value={draft.endDate} onChange={(e) => set('endDate', e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Venue</Label>
                  <Input value={draft.venue} onChange={(e) => set('venue', e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Days left</Label>
                  <Input
                    type="number"
                    value={draft.daysLeft}
                    onChange={(e) => set('daysLeft', parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Buttons</CardTitle>
              <CardDescription>Primary calls-to-action</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Apply label</Label>
                  <Input value={draft.applyLabel} onChange={(e) => set('applyLabel', e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Apply URL</Label>
                  <Input value={draft.applyUrl} onChange={(e) => set('applyUrl', e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Learn more label</Label>
                  <Input value={draft.learnMoreLabel} onChange={(e) => set('learnMoreLabel', e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Learn more URL</Label>
                  <Input value={draft.learnMoreUrl} onChange={(e) => set('learnMoreUrl', e.target.value)} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live preview */}
        <div className="lg:sticky lg:top-20 lg:self-start">
          <Card className="overflow-hidden border-border">
            <div className="bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#1e1b4b] px-8 py-14 text-center text-white">
              <p className="text-xs font-medium uppercase tracking-widest text-indigo-200">
                {draft.kicker}
              </p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight">{draft.title}</h1>
              <p className="mx-auto mt-3 max-w-md text-sm text-indigo-100">
                {draft.tagline}
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs">
                <span className="rounded-full bg-white/10 px-3 py-1">{draft.format}</span>
                <span className="rounded-full bg-white/10 px-3 py-1">{draft.mode}</span>
                <span className="rounded-full bg-white/10 px-3 py-1">
                  {new Date(draft.startDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })} –{' '}
                  {new Date(draft.endDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1">{draft.venue}</span>
              </div>
              <div className="mt-6 inline-flex items-center gap-1 rounded-full bg-amber-400/20 px-3 py-1 text-xs font-medium text-amber-100">
                {draft.daysLeft} days left to apply
              </div>
              <div className="mt-6 flex items-center justify-center gap-3">
                <Button className="bg-white text-indigo-700 hover:bg-indigo-50">
                  {draft.applyLabel}
                </Button>
                <Button variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10">
                  {draft.learnMoreLabel}
                </Button>
              </div>
            </div>
            <div className="bg-muted/40 px-4 py-2 text-center text-xs text-muted-foreground">
              Live preview of the hero section
            </div>
          </Card>
        </div>
      </div>

      <SaveBar onSave={handleSave} onPublish={handlePublish} saving={saving} saved={saved} />
    </div>
  );
}