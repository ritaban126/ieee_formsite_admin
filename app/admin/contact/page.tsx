'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import {
  Plus,
  Pencil,
  Trash2,
  Mail,
  Instagram,
  Linkedin,
  Twitter,
  Github,
  Globe,
  User,
  Phone,
  MessageCircle,
  Eye,
  EyeOff,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { PageHeader, SaveBar } from '@/components/layout/shared';
import { useCMS } from '@/providers/dashboard-provider';
import { ICON_OPTIONS } from '@/lib/constants';
import type { ContactLink, ContactPerson } from '@/types/content';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  mail: Mail,
  instagram: Instagram,
  linkedin: Linkedin,
  twitter: Twitter,
  github: Github,
  globe: Globe,
};

export default function ContactPage() {
  const { contact, updateContact } = useCMS();
  const [draft, setDraft] = useState(contact);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [linkEditing, setLinkEditing] = useState<ContactLink | null>(null);
  const [linkOpen, setLinkOpen] = useState(false);
  const [personEditing, setPersonEditing] = useState<ContactPerson | null>(null);
  const [personOpen, setPersonOpen] = useState(false);

  useEffect(() => setDraft(contact), [contact]);

  const set = (k: 'heading' | 'description', v: string) =>
    setDraft((p) => ({ ...p, [k]: v }));

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      updateContact(draft);
      setSaving(false);
      setSaved(true);
      toast.success('Contact saved');
      setTimeout(() => setSaved(false), 2500);
    }, 500);
  };

  // Link CRUD
  const addLink = () => {
    setLinkEditing({ id: '', label: '', value: '', url: '', icon: 'mail' });
    setLinkOpen(true);
  };
  const editLink = (l: ContactLink) => {
    setLinkEditing({ ...l });
    setLinkOpen(true);
  };
  const saveLink = () => {
    if (!linkEditing) return;
    if (!linkEditing.label.trim()) {
      toast.error('Label is required');
      return;
    }
    if (linkEditing.id) {
      setDraft((p) => ({ ...p, links: p.links.map((l) => (l.id === linkEditing.id ? linkEditing : l)) }));
    } else {
      setDraft((p) => ({ ...p, links: [...p.links, { ...linkEditing, id: crypto.randomUUID() }] }));
    }
    setLinkOpen(false);
    setLinkEditing(null);
  };
  const removeLink = (id: string) =>
    setDraft((p) => ({ ...p, links: p.links.filter((l) => l.id !== id) }));

  // Person CRUD
  const addPerson = () => {
    setPersonEditing({ id: '', name: '', role: '', phone: '', email: '', imageUrl: '', whatsapp: true, visible: true });
    setPersonOpen(true);
  };
  const editPerson = (p: ContactPerson) => {
    setPersonEditing({ ...p });
    setPersonOpen(true);
  };
  const savePerson = () => {
    if (!personEditing) return;
    if (!personEditing.name.trim()) {
      toast.error('Name is required');
      return;
    }
    if (personEditing.id) {
      setDraft((p) => ({ ...p, persons: p.persons.map((x) => (x.id === personEditing.id ? personEditing : x)) }));
    } else {
      setDraft((p) => ({ ...p, persons: [...p.persons, { ...personEditing, id: crypto.randomUUID() }] }));
    }
    setPersonOpen(false);
    setPersonEditing(null);
  };
  const removePerson = (id: string) =>
    setDraft((p) => ({ ...p, persons: p.persons.filter((x) => x.id !== id) }));
  const togglePerson = (id: string, key: 'whatsapp' | 'visible') =>
    setDraft((p) => ({
      ...p,
      persons: p.persons.map((x) => (x.id === id ? { ...x, [key]: !x[key] } : x)),
    }));

  return (
    <div className="space-y-6 pb-16">
      <PageHeader title="Contact" description="Social links and people applicants can reach." />

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
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-base">Social links</CardTitle>
                <CardDescription>{draft.links.length} links</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={addLink}>
                <Plus className="mr-1 h-4 w-4" /> Add
              </Button>
            </CardHeader>
            <CardContent className="space-y-2">
              {draft.links.map((l) => {
                const Icon = ICON_MAP[l.icon] ?? Globe;
                return (
                  <div key={l.id} className="group flex items-center gap-3 rounded-lg border border-border bg-card p-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">{l.label}</p>
                      <p className="truncate text-xs text-muted-foreground">{l.value}</p>
                    </div>
                    <div className="flex gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                      <Button variant="ghost" size="icon" onClick={() => editLink(l)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => removeLink(l.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-base">Contact persons</CardTitle>
                <CardDescription>{draft.persons.length} people</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={addPerson}>
                <Plus className="mr-1 h-4 w-4" /> Add
              </Button>
            </CardHeader>
            <CardContent className="space-y-2">
              {draft.persons.map((p) => (
                <div key={p.id} className="group rounded-lg border border-border bg-card p-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                        {p.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.role}</p>
                    </div>
                    <div className="flex gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                      <Button variant="ghost" size="icon" onClick={() => editPerson(p)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => removePerson(p.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-3 pl-12 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Phone className="h-3 w-3" /> {p.phone || '—'}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Mail className="h-3 w-3" /> {p.email || '—'}
                    </span>
                    <label className="inline-flex items-center gap-1.5">
                      <MessageCircle className="h-3 w-3" />
                      <Switch checked={p.whatsapp} onCheckedChange={() => togglePerson(p.id, 'whatsapp')} className="scale-75" />
                    </label>
                    <label className="inline-flex items-center gap-1.5">
                      {p.visible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                      <Switch checked={p.visible} onCheckedChange={() => togglePerson(p.id, 'visible')} className="scale-75" />
                    </label>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Preview */}
        <div className="lg:sticky lg:top-20 lg:self-start">
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-b from-muted/40 to-card p-8">
              <h2 className="text-2xl font-bold tracking-tight">{draft.heading}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{draft.description}</p>

              <div className="mt-5 flex flex-wrap gap-3">
                {draft.links.map((l) => {
                  const Icon = ICON_MAP[l.icon] ?? Globe;
                  return (
                    <div key={l.id} className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs">
                      <Icon className="h-4 w-4 text-primary" />
                      <span className="font-medium">{l.value}</span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {draft.persons.filter((p) => p.visible).map((p) => (
                  <div key={p.id} className="rounded-xl border border-border bg-card p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
                          {p.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{p.name}</p>
                        <p className="text-xs text-muted-foreground">{p.role}</p>
                      </div>
                    </div>
                    <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                      <p className="inline-flex items-center gap-1"><Mail className="h-3 w-3" /> {p.email}</p>
                      <p className="inline-flex items-center gap-1"><Phone className="h-3 w-3" /> {p.phone}</p>
                      {p.whatsapp && (
                        <p className="inline-flex items-center gap-1 text-success"><MessageCircle className="h-3 w-3" /> WhatsApp available</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-muted/40 px-4 py-2 text-center text-xs text-muted-foreground">
              Live preview of the Contact section
            </div>
          </Card>
        </div>
      </div>

      <SaveBar onSave={handleSave} saving={saving} saved={saved} />

      {/* Link dialog */}
      <Dialog open={linkOpen} onOpenChange={setLinkOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{linkEditing?.id ? 'Edit link' : 'Add link'}</DialogTitle>
            <DialogDescription>A social or contact link.</DialogDescription>
          </DialogHeader>
          {linkEditing && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label>Label</Label>
                <Input value={linkEditing.label} onChange={(e) => setLinkEditing((p) => ({ ...p!, label: e.target.value }))} />
              </div>
              <div className="space-y-1.5">
                <Label>Display value</Label>
                <Input value={linkEditing.value} onChange={(e) => setLinkEditing((p) => ({ ...p!, value: e.target.value }))} />
              </div>
              <div className="space-y-1.5">
                <Label>URL</Label>
                <Input value={linkEditing.url} onChange={(e) => setLinkEditing((p) => ({ ...p!, url: e.target.value }))} />
              </div>
              <div className="space-y-1.5">
                <Label>Icon</Label>
                <Select value={linkEditing.icon} onValueChange={(v) => setLinkEditing((p) => ({ ...p!, icon: v as ContactLink['icon'] }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ICON_OPTIONS.map((o) => (
                      <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setLinkOpen(false)}>Cancel</Button>
            <Button onClick={saveLink}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Person dialog */}
      <Dialog open={personOpen} onOpenChange={setPersonOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{personEditing?.id ? 'Edit person' : 'Add person'}</DialogTitle>
            <DialogDescription>A contact person applicants can reach.</DialogDescription>
          </DialogHeader>
          {personEditing && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Name</Label>
                  <Input value={personEditing.name} onChange={(e) => setPersonEditing((p) => ({ ...p!, name: e.target.value }))} />
                </div>
                <div className="space-y-1.5">
                  <Label>Role / designation</Label>
                  <Input value={personEditing.role} onChange={(e) => setPersonEditing((p) => ({ ...p!, role: e.target.value }))} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Phone</Label>
                  <Input value={personEditing.phone} onChange={(e) => setPersonEditing((p) => ({ ...p!, phone: e.target.value }))} />
                </div>
                <div className="space-y-1.5">
                  <Label>Email</Label>
                  <Input value={personEditing.email} onChange={(e) => setPersonEditing((p) => ({ ...p!, email: e.target.value }))} />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Profile image URL</Label>
                <Input value={personEditing.imageUrl} onChange={(e) => setPersonEditing((p) => ({ ...p!, imageUrl: e.target.value }))} placeholder="https://…" />
              </div>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 text-sm">
                  <Switch checked={personEditing.whatsapp} onCheckedChange={(v) => setPersonEditing((p) => ({ ...p!, whatsapp: v }))} />
                  WhatsApp
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <Switch checked={personEditing.visible} onCheckedChange={(v) => setPersonEditing((p) => ({ ...p!, visible: v }))} />
                  Visible
                </label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setPersonOpen(false)}>Cancel</Button>
            <Button onClick={savePerson}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}