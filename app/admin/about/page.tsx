// 'use client';

// import type React from 'react';
// import { useState, useEffect } from 'react';
// import { toast } from 'sonner';
// import * as Icons from 'lucide-react';
// import {
//   Plus,
//   Pencil,
//   Trash2,
//   GripVertical,
//   ArrowUp,
//   ArrowDown,
// } from 'lucide-react';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Label } from '@/components/ui/label';
// import { Button } from '@/components/ui/button';
// import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from '@/components/ui/dialog';
// import { PageHeader, SaveBar, EmptyState } from '@/components/layout/shared';
// import { useCMS } from '@/providers/dashboard-provider';
// import type { FeatureCard } from '@/types/content';
// import { getIcon } from '@/lib/icons';

// const ICON_CHOICES = ['Clock', 'Users', 'Trophy', 'Zap', 'Target', 'Rocket', 'Lightbulb', 'Cpu', 'Award'];

// export default function AboutPage() {
//   const { about, updateAbout } = useCMS();
//   const [draft, setDraft] = useState(about);
//   const [saving, setSaving] = useState(false);
//   const [saved, setSaved] = useState(false);
//   const [editing, setEditing] = useState<FeatureCard | null>(null);
//   const [open, setOpen] = useState(false);

//   useEffect(() => setDraft(about), [about]);

//   const set = (k: 'heading' | 'description', v: string) =>
//     setDraft((p) => ({ ...p, [k]: v }));

//   const handleSave = () => {
//     setSaving(true);
//     setTimeout(() => {
//       updateAbout(draft);
//       setSaving(false);
//       setSaved(true);
//       toast.success('About section saved');
//       setTimeout(() => setSaved(false), 2500);
//     }, 500);
//   };

//   const addFeature = () => {
//     setEditing({ id: '', icon: 'Lightbulb', title: '', description: '' });
//     setOpen(true);
//   };

//   const editFeature = (f: FeatureCard) => {
//     setEditing({ ...f });
//     setOpen(true);
//   };

//   const saveFeature = () => {
//     if (!editing) return;
//     if (!editing.title.trim()) {
//       toast.error('Title is required');
//       return;
//     }
//     if (editing.id) {
//       setDraft((p) => ({
//         ...p,
//         features: p.features.map((f) => (f.id === editing.id ? editing : f)),
//       }));
//     } else {
//       setDraft((p) => ({
//         ...p,
//         features: [...p.features, { ...editing, id: crypto.randomUUID() }],
//       }));
//     }
//     setOpen(false);
//     setEditing(null);
//   };

//   const deleteFeature = (id: string) => {
//     setDraft((p) => ({ ...p, features: p.features.filter((f) => f.id !== id) }));
//     toast('Feature card removed');
//   };

//   const moveFeature = (idx: number, dir: 'up' | 'down') => {
//     setDraft((p) => {
//       const arr = [...p.features];
//       const swap = dir === 'up' ? idx - 1 : idx + 1;
//       if (swap < 0 || swap >= arr.length) return p;
//       [arr[idx], arr[swap]] = [arr[swap], arr[idx]];
//       return { ...p, features: arr };
//     });
//   };

//   return (
//     <div className="space-y-6 pb-16">
//       <PageHeader
//         title="About"
//         description="Tell visitors what CircuitHack is and why they should join."
//         actions={
//           <Button variant="outline" onClick={addFeature}>
//             <Plus className="mr-2 h-4 w-4" /> Add feature
//           </Button>
//         }
//       />

//       <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
//         <div className="space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle className="text-base">Content</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="space-y-1.5">
//                 <Label>Heading</Label>
//                 <Input value={draft.heading} onChange={(e) => set('heading', e.target.value)} />
//               </div>
//               <div className="space-y-1.5">
//                 <Label>Description</Label>
//                 <Textarea rows={9} value={draft.description} onChange={(e) => set('description', e.target.value)} />
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle className="text-base">Feature cards</CardTitle>
//               <CardDescription>Highlight what makes the event special.</CardDescription>
//             </CardHeader>
//             <CardContent>
//               {draft.features.length === 0 ? (
//                 <EmptyState
//                   icon={Plus}
//                   title="No feature cards yet"
//                   action={
//                     <Button size="sm" onClick={addFeature}>
//                       <Plus className="mr-2 h-4 w-4" /> Add feature
//                     </Button>
//                   }
//                 />
//               ) : (
//                 <div className="space-y-3">
//                   {draft.features.map((f, idx) => {
//                     const Icon = (Icons as Record<string, React.ComponentType<{ className?: string }>>)[f.icon] ?? Icons.Lightbulb;
//                     return (
//                       <div
//                         key={f.id}
//                         className="group flex items-start gap-3 rounded-xl border border-border bg-card p-4"
//                       >
//                         <GripVertical className="mt-1 hidden h-4 w-4 text-muted-foreground sm:block" />
//                         <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
//                           <Icon className="h-4.5 w-4.5" />
//                         </div>
//                         <div className="min-w-0 flex-1">
//                           <p className="text-sm font-medium">{f.title}</p>
//                           <p className="text-xs text-muted-foreground">{f.description}</p>
//                         </div>
//                         <div className="flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
//                           <Button variant="ghost" size="icon" onClick={() => moveFeature(idx, 'up')} disabled={idx === 0}>
//                             <ArrowUp className="h-4 w-4" />
//                           </Button>
//                           <Button variant="ghost" size="icon" onClick={() => moveFeature(idx, 'down')} disabled={idx === draft.features.length - 1}>
//                             <ArrowDown className="h-4 w-4" />
//                           </Button>
//                           <Button variant="ghost" size="icon" onClick={() => editFeature(f)}>
//                             <Pencil className="h-4 w-4" />
//                           </Button>
//                           <Button variant="ghost" size="icon" onClick={() => deleteFeature(f.id)}>
//                             <Trash2 className="h-4 w-4 text-destructive" />
//                           </Button>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </div>

//         {/* Preview */}
//         <div className="lg:sticky lg:top-20 lg:self-start">
//           <Card className="overflow-hidden">
//             <div className="bg-gradient-to-b from-muted/40 to-card p-8">
//               <h2 className="text-2xl font-bold tracking-tight">{draft.heading}</h2>
//               <p className="mt-3 whitespace-pre-line text-sm text-muted-foreground">
//                 {draft.description}
//               </p>
//               <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
//                 {draft.features.map((f) => {
//                   const Icon = (Icons as Record<string, React.ComponentType<{ className?: string }>>)[f.icon] ?? Icons.Lightbulb;
//                   return (
//                     <div key={f.id} className="rounded-xl border border-border bg-card p-4">
//                       <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
//                         <Icon className="h-4.5 w-4.5" />
//                       </div>
//                       <p className="mt-3 text-sm font-medium">{f.title}</p>
//                       <p className="mt-1 text-xs text-muted-foreground">{f.description}</p>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//             <div className="bg-muted/40 px-4 py-2 text-center text-xs text-muted-foreground">
//               Live preview of the About section
//             </div>
//           </Card>
//         </div>
//       </div>

//       <SaveBar onSave={handleSave} saving={saving} saved={saved} />

//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>{editing?.id ? 'Edit feature' : 'Add feature'}</DialogTitle>
//             <DialogDescription>Highlight a key aspect of the event.</DialogDescription>
//           </DialogHeader>
//           {editing && (
//             <div className="space-y-4">
//               <div className="space-y-1.5">
//                 <Label>Icon</Label>
//                 <div className="flex flex-wrap gap-2">
//                   {ICON_CHOICES.map((name) => {
//                     const Ic = (Icons as Record<string, React.ComponentType<{ className?: string }>>)[name] ?? Icons.Lightbulb;
//                     return (
//                       <button
//                         key={name}
//                         type="button"
//                         onClick={() => setEditing((p) => ({ ...p!, icon: name }))}
//                         className={`flex h-10 w-10 items-center justify-center rounded-lg border ${
//                           editing.icon === name
//                             ? 'border-primary bg-primary/10 text-primary'
//                             : 'border-border text-muted-foreground hover:bg-muted'
//                         }`}
//                       >
//                         <Ic className="h-4.5 w-4.5" />
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>
//               <div className="space-y-1.5">
//                 <Label>Title</Label>
//                 <Input
//                   value={editing.title}
//                   onChange={(e) => setEditing((p) => ({ ...p!, title: e.target.value }))}
//                 />
//               </div>
//               <div className="space-y-1.5">
//                 <Label>Description</Label>
//                 <Textarea
//                   rows={3}
//                   value={editing.description}
//                   onChange={(e) => setEditing((p) => ({ ...p!, description: e.target.value }))}
//                 />
//               </div>
//             </div>
//           )}
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setOpen(false)}>
//               Cancel
//             </Button>
//             <Button onClick={saveFeature}>Save</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }








// full fixed code 

'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import * as Icons from 'lucide-react';
import {
  Plus,
  Pencil,
  Trash2,
  GripVertical,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  PageHeader,
  SaveBar,
  EmptyState,
} from '@/components/layout/shared';
import { useCMS } from '@/providers/dashboard-provider';
import type { FeatureCard } from '@/types/content';

const ICON_CHOICES = [
  'Clock',
  'Users',
  'Trophy',
  'Zap',
  'Target',
  'Rocket',
  'Lightbulb',
  'Cpu',
  'Award',
];

// Correct Lucide icon component type
type LucideIconComponent = React.ElementType;

// Safely retrieve an icon by its name
const getFeatureIcon = (iconName: string): LucideIconComponent => {
  const icon = (
    Icons as unknown as Record<string, LucideIconComponent>
  )[iconName];

  return icon ?? Icons.Lightbulb;
};

export default function AboutPage() {
  const { about, updateAbout } = useCMS();

  const [draft, setDraft] = useState(about);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [editing, setEditing] = useState<FeatureCard | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setDraft(about);
  }, [about]);

  const set = (k: 'heading' | 'description', v: string) => {
    setDraft((p) => ({ ...p, [k]: v }));
  };

  const handleSave = () => {
    setSaving(true);

    setTimeout(() => {
      updateAbout(draft);
      setSaving(false);
      setSaved(true);

      toast.success('About section saved');

      setTimeout(() => setSaved(false), 2500);
    }, 500);
  };

  const addFeature = () => {
    setEditing({
      id: '',
      icon: 'Lightbulb',
      title: '',
      description: '',
    });

    setOpen(true);
  };

  const editFeature = (f: FeatureCard) => {
    setEditing({ ...f });
    setOpen(true);
  };

  const saveFeature = () => {
    if (!editing) return;

    if (!editing.title.trim()) {
      toast.error('Title is required');
      return;
    }

    if (editing.id) {
      setDraft((p) => ({
        ...p,
        features: p.features.map((f) =>
          f.id === editing.id ? editing : f
        ),
      }));
    } else {
      setDraft((p) => ({
        ...p,
        features: [
          ...p.features,
          {
            ...editing,
            id: crypto.randomUUID(),
          },
        ],
      }));
    }

    setOpen(false);
    setEditing(null);
  };

  const deleteFeature = (id: string) => {
    setDraft((p) => ({
      ...p,
      features: p.features.filter((f) => f.id !== id),
    }));

    toast('Feature card removed');
  };

  const moveFeature = (idx: number, dir: 'up' | 'down') => {
    setDraft((p) => {
      const arr = [...p.features];

      const swap = dir === 'up' ? idx - 1 : idx + 1;

      if (swap < 0 || swap >= arr.length) return p;

      [arr[idx], arr[swap]] = [arr[swap], arr[idx]];

      return { ...p, features: arr };
    });
  };

  return (
    <div className="space-y-6 pb-16">
      <PageHeader
        title="About"
        description="Tell visitors what CircuitHack is and why they should join."
        actions={
          <Button variant="outline" onClick={addFeature}>
            <Plus className="mr-2 h-4 w-4" />
            Add feature
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          {/* Content */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Content
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label>Heading</Label>

                <Input
                  value={draft.heading}
                  onChange={(e) =>
                    set('heading', e.target.value)
                  }
                />
              </div>

              <div className="space-y-1.5">
                <Label>Description</Label>

                <Textarea
                  rows={9}
                  value={draft.description}
                  onChange={(e) =>
                    set('description', e.target.value)
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Feature Cards */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Feature cards
              </CardTitle>

              <CardDescription>
                Highlight what makes the event special.
              </CardDescription>
            </CardHeader>

            <CardContent>
              {draft.features.length === 0 ? (
                <EmptyState
                  icon={Plus}
                  title="No feature cards yet"
                  action={
                    <Button size="sm" onClick={addFeature}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add feature
                    </Button>
                  }
                />
              ) : (
                <div className="space-y-3">
                  {draft.features.map((f, idx) => {
                    const Icon = getFeatureIcon(f.icon);

                    return (
                      <div
                        key={f.id}
                        className="group flex items-start gap-3 rounded-xl border border-border bg-card p-4"
                      >
                        <GripVertical className="mt-1 hidden h-4 w-4 text-muted-foreground sm:block" />

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Icon className="h-4.5 w-4.5" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium">
                            {f.title}
                          </p>

                          <p className="text-xs text-muted-foreground">
                            {f.description}
                          </p>
                        </div>

                        <div className="flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => moveFeature(idx, 'up')}
                            disabled={idx === 0}
                          >
                            <ArrowUp className="h-4 w-4" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => moveFeature(idx, 'down')}
                            disabled={idx === draft.features.length - 1}
                          >
                            <ArrowDown className="h-4 w-4" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => editFeature(f)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteFeature(f.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Live Preview */}
        <div className="lg:sticky lg:top-20 lg:self-start">
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-b from-muted/40 to-card p-8">
              <h2 className="text-2xl font-bold tracking-tight">
                {draft.heading}
              </h2>

              <p className="mt-3 whitespace-pre-line text-sm text-muted-foreground">
                {draft.description}
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {draft.features.map((f) => {
                  const Icon = getFeatureIcon(f.icon);

                  return (
                    <div
                      key={f.id}
                      className="rounded-xl border border-border bg-card p-4"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-4.5 w-4.5" />
                      </div>

                      <p className="mt-3 text-sm font-medium">
                        {f.title}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {f.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-muted/40 px-4 py-2 text-center text-xs text-muted-foreground">
              Live preview of the About section
            </div>
          </Card>
        </div>
      </div>

      <SaveBar
        onSave={handleSave}
        saving={saving}
        saved={saved}
      />

      {/* Add/Edit Feature Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editing?.id ? 'Edit feature' : 'Add feature'}
            </DialogTitle>

            <DialogDescription>
              Highlight a key aspect of the event.
            </DialogDescription>
          </DialogHeader>

          {editing && (
            <div className="space-y-4">
              {/* Icon Selection */}
              <div className="space-y-1.5">
                <Label>Icon</Label>

                <div className="flex flex-wrap gap-2">
                  {ICON_CHOICES.map((name) => {
                    const Ic = getFeatureIcon(name);

                    return (
                      <button
                        key={name}
                        type="button"
                        onClick={() =>
                          setEditing((p) => ({
                            ...p!,
                            icon: name,
                          }))
                        }
                        className={`flex h-10 w-10 items-center justify-center rounded-lg border ${
                          editing.icon === name
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border text-muted-foreground hover:bg-muted'
                        }`}
                      >
                        <Ic className="h-4.5 w-4.5" />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Title */}
              <div className="space-y-1.5">
                <Label>Title</Label>

                <Input
                  value={editing.title}
                  onChange={(e) =>
                    setEditing((p) => ({
                      ...p!,
                      title: e.target.value,
                    }))
                  }
                />
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <Label>Description</Label>

                <Textarea
                  rows={3}
                  value={editing.description}
                  onChange={(e) =>
                    setEditing((p) => ({
                      ...p!,
                      description: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button onClick={saveFeature}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
