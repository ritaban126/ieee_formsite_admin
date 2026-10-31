'use client';

import { toast } from 'sonner';
import { Save, RotateCcw, Bell, Palette, Globe, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PageHeader } from '@/components/layout/shared';
import { useCMS } from '@/providers/dashboard-provider';

export default function SettingsPage() {
  const { event, admin, updateEvent, updateAdmin, resetAll } = useCMS();

  const setEvent = (k: keyof typeof event, v: string) => updateEvent({ [k]: v });
  const setAdmin = (k: keyof typeof admin, v: string) => updateAdmin({ [k]: v });

  const handleSave = () => toast.success('Settings saved');
  const handleReset = () => {
    if (confirm('Reset all CMS content to defaults? This cannot be undone.')) {
      resetAll();
      toast.success('All content reset to defaults');
    }
  };

  return (
    <div className="space-y-6 pb-16">
      <PageHeader
        title="Settings"
        description="Manage event, organization, admin profile and publishing."
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="mr-2 h-4 w-4" /> Reset content
            </Button>
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" /> Save
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Globe className="h-4 w-4 text-primary" /> Event & Organization
            </CardTitle>
            <CardDescription>Basic event information shown across the site.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Event name</Label>
                <Input value={event.name} onChange={(e) => setEvent('name', e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Year</Label>
                <Input value={event.year} onChange={(e) => setEvent('year', e.target.value)} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Organization name</Label>
              <Input value={event.organization} onChange={(e) => setEvent('organization', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Website URL</Label>
              <Input value={event.websiteUrl} onChange={(e) => setEvent('websiteUrl', e.target.value)} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <User className="h-4 w-4 text-primary" /> Admin profile
            </CardTitle>
            <CardDescription>Your organizer profile.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-14 w-14">
                <AvatarFallback className="bg-primary/10 text-base font-semibold text-primary">
                  {admin.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{admin.name}</p>
                <p className="text-xs text-muted-foreground">{admin.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Name</Label>
                <Input value={admin.name} onChange={(e) => setAdmin('name', e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Role</Label>
                <Input value={admin.role} onChange={(e) => setAdmin('role', e.target.value)} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input value={admin.email} onChange={(e) => setAdmin('email', e.target.value)} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Palette className="h-4 w-4 text-primary" /> Theme
            </CardTitle>
            <CardDescription>Color accent and appearance.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label>Accent color</Label>
              <Select defaultValue="indigo">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="indigo">Indigo</SelectItem>
                  <SelectItem value="violet">Violet</SelectItem>
                  <SelectItem value="blue">Blue</SelectItem>
                  <SelectItem value="emerald">Emerald</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-[11px] text-muted-foreground">Indigo is the default and recommended accent.</p>
            </div>
            <label className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <p className="text-sm font-medium">Dark sidebar</p>
                <p className="text-xs text-muted-foreground">Use a dark navy sidebar theme</p>
              </div>
              <Switch defaultChecked />
            </label>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Bell className="h-4 w-4 text-primary" /> Notifications
            </CardTitle>
            <CardDescription>Choose what you're notified about.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <label className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <p className="text-sm font-medium">New applications</p>
                <p className="text-xs text-muted-foreground">Email me when someone applies</p>
              </div>
              <Switch defaultChecked />
            </label>
            <label className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <p className="text-sm font-medium">Section published</p>
                <p className="text-xs text-muted-foreground">Notify when content is published</p>
              </div>
              <Switch defaultChecked />
            </label>
            <label className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <p className="text-sm font-medium">Weekly summary</p>
                <p className="text-xs text-muted-foreground">A digest every Monday</p>
              </div>
              <Switch />
            </label>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Publishing</CardTitle>
            <CardDescription>Control how and when content goes live.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <label className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <p className="text-sm font-medium">Require review before publish</p>
                <p className="text-xs text-muted-foreground">Drafts must be reviewed before going live</p>
              </div>
              <Switch defaultChecked />
            </label>
            <label className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <p className="text-sm font-medium">Auto-publish on schedule</p>
                <p className="text-xs text-muted-foreground">Publish sections at their scheduled date</p>
              </div>
              <Switch />
            </label>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}