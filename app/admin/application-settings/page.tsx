'use client';

import { useMemo } from 'react';
import { toast } from 'sonner';
import { Mail, Instagram, Linkedin, Check, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { PageHeader } from '@/components/layout/shared';
import { useCMS } from '@/providers/dashboard-provider';

export default function ApplicationSettingsPage() {
  const { settings, updateSettings, form, timeline, contact } = useCMS();

  const set = (k: keyof typeof settings, v: string | number | boolean | string[]) =>
    updateSettings({ [k]: v });

  const completion = useMemo(() => {
    const fields = form.sections.flatMap((s) => s.fields);
    const required = fields.filter((f) => f.required && f.type !== 'heading' && f.type !== 'description');
    const total = required.length || 1;
    return Math.min(100, Math.round((total / 10) * 100));
  }, [form]);

  const fmtDate = (date: string, time?: string) => {
    const d = new Date(date + (time ? `T${time}` : ''));
    return d.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }) + (time ? ` · ${time}` : '');
  };

  const handleSave = () => {
    toast.success('Settings saved');
  };

  return (
    <div className="space-y-6 pb-16">
      <PageHeader
        title="Application Settings"
        description="Control registration, capacity and confirmation messages."
        actions={
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" /> Save
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Registration</CardTitle>
              <CardDescription>Open and close the application form.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <label className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <p className="text-sm font-medium">Registration open</p>
                  <p className="text-xs text-muted-foreground">Allow new applications</p>
                </div>
                <Switch
                  checked={settings.registrationOpen}
                  onCheckedChange={(v) => set('registrationOpen', v)}
                />
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Opening date</Label>
                  <Input
                    type="date"
                    value={settings.openingDate}
                    onChange={(e) => set('openingDate', e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Closing date</Label>
                  <Input
                    type="date"
                    value={settings.closingDate}
                    onChange={(e) => set('closingDate', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Capacity</CardTitle>
              <CardDescription>Limits for participants and teams.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Registration limit</Label>
                <Input
                  type="number"
                  value={settings.registrationLimit}
                  onChange={(e) => set('registrationLimit', parseInt(e.target.value) || 0)}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Max team size</Label>
                <Input
                  type="number"
                  value={settings.maxTeamSize}
                  onChange={(e) => set('maxTeamSize', parseInt(e.target.value) || 1)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Messages</CardTitle>
              <CardDescription>Auto-replies and success page content.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label>Automatic confirmation message</Label>
                <Textarea
                  rows={3}
                  value={settings.confirmationMessage}
                  onChange={(e) => set('confirmationMessage', e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Success page content</Label>
                <Textarea
                  rows={4}
                  value={settings.successPageContent}
                  onChange={(e) => set('successPageContent', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <label className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <p className="text-sm font-medium">Autosave</p>
                  <p className="text-xs text-muted-foreground">Save drafts automatically</p>
                </div>
                <Switch checked={settings.autosave} onCheckedChange={(v) => set('autosave', v)} />
              </label>
              <div className="space-y-2">
                <Label>Required fields</Label>
                <div className="flex flex-wrap gap-2">
                  {settings.requiredFields.map((f) => (
                    <span key={f} className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                      <Check className="h-3 w-3" /> {f}
                    </span>
                  ))}
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Required fields are derived from the form builder.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Status preview card */}
        <div className="lg:sticky lg:top-20 lg:self-start">
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#1e1b4b] px-6 py-8 text-center text-white">
              <p className="text-xs font-medium uppercase tracking-widest text-indigo-200">
                Application Status
              </p>
              <div className="mt-3 flex items-center justify-center gap-1 text-3xl font-bold">
                {completion}%
              </div>
              <p className="text-xs text-indigo-100">Filled</p>
              <div className="mx-auto mt-3 max-w-xs">
                <Progress value={completion} className="h-2 bg-white/20 [&>div]:bg-white" />
              </div>
              <p className="mt-2 text-[11px] text-indigo-100">
                {form.sections.flatMap((s) => s.fields).filter((f) => f.required).length} of 10 required fields
              </p>
            </div>
            <CardContent className="space-y-2.5 p-5">
              {timeline.items.slice(0, 4).map((t, i) => (
                <div key={t.id} className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-3 py-2">
                  <span className="text-xs font-medium">{['Apply by', 'Interview', 'Results', 'Event'][i] ?? t.title}</span>
                  <span className="text-[11px] text-muted-foreground">{fmtDate(t.date, t.time)}</span>
                </div>
              ))}
              <Button className="mt-2 w-full" disabled={!settings.registrationOpen}>
                Submit application
              </Button>
              <p className="text-center text-[11px] text-muted-foreground">
                Questions? Contact us
              </p>
              <div className="flex items-center justify-center gap-3">
                {contact.links.map((l) => {
                  const Icon =
                    l.icon === 'mail' ? Mail : l.icon === 'instagram' ? Instagram : l.icon === 'linkedin' ? Linkedin : Mail;
                  return (
                    <div key={l.id} className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-muted-foreground">
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}