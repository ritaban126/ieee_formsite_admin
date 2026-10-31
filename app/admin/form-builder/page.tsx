'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import * as Icons from 'lucide-react';
import {
  Plus,
  Trash2,
  Copy,
  GripVertical,
  ArrowUp,
  ArrowDown,
  Eye,
  Settings2,
  X,
  Check,
  Loader2,
  Save,
  Send,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PageHeader } from '@/components/layout/shared';
import { useCMS } from '@/providers/dashboard-provider';
import { FIELD_TYPE_META } from '@/lib/constants';
import type { FieldType, FormField, FormSection } from '@/types/form';
import { cn } from '@/lib/utils';

function makeField(type: FieldType): FormField {
  const base: FormField = {
    id: crypto.randomUUID(),
    type,
    label: '',
    placeholder: '',
    description: '',
    required: false,
  };
  if (type === 'dropdown' || type === 'multiple' || type === 'checkboxes') {
    base.options = [
      { id: crypto.randomUUID(), label: 'Option 1' },
      { id: crypto.randomUUID(), label: 'Option 2' },
    ];
  }
  return base;
}

export default function FormBuilderPage() {
  const { form, updateForm } = useCMS();
  const [draft, setDraft] = useState(form);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => setDraft(form), [form]);

  // Helpers
  const allFields = draft.sections.flatMap((s) => s.fields);
  const selectedField = allFields.find((f) => f.id === selectedFieldId) ?? null;
  const selectedSection = draft.sections.find((s) => s.id === selectedSectionId) ?? draft.sections[0] ?? null;

  const updateSection = (sectionId: string, patch: Partial<FormSection>) =>
    setDraft((p) => ({
      ...p,
      sections: p.sections.map((s) => (s.id === sectionId ? { ...s, ...patch } : s)),
    }));

  const addField = (sectionId: string, type: FieldType) => {
    const field = makeField(type);
    setDraft((p) => ({
      ...p,
      sections: p.sections.map((s) =>
        s.id === sectionId ? { ...s, fields: [...s.fields, field] } : s
      ),
    }));
    setSelectedFieldId(field.id);
    setSelectedSectionId(sectionId);
  };

  const updateField = (fieldId: string, patch: Partial<FormField>) =>
    setDraft((p) => ({
      ...p,
      sections: p.sections.map((s) => ({
        ...s,
        fields: s.fields.map((f) => (f.id === fieldId ? { ...f, ...patch } : f)),
      })),
    }));

  const duplicateField = (sectionId: string, fieldId: string) => {
    const orig = draft.sections.find((s) => s.id === sectionId)?.fields.find((f) => f.id === fieldId);
    if (!orig) return;
    const copy: FormField = {
      ...orig,
      id: crypto.randomUUID(),
      label: orig.label + ' (copy)',
      options: orig.options?.map((o) => ({ ...o, id: crypto.randomUUID() })),
    };
    setDraft((p) => ({
      ...p,
      sections: p.sections.map((s) =>
        s.id === sectionId ? { ...s, fields: [...s.fields, copy] } : s
      ),
    }));
  };

  const deleteField = (sectionId: string, fieldId: string) =>
    setDraft((p) => ({
      ...p,
      sections: p.sections.map((s) =>
        s.id === sectionId ? { ...s, fields: s.fields.filter((f) => f.id !== fieldId) } : s
      ),
    }));

  const moveField = (sectionId: string, idx: number, dir: 'up' | 'down') =>
    setDraft((p) => ({
      ...p,
      sections: p.sections.map((s) => {
        if (s.id !== sectionId) return s;
        const arr = [...s.fields];
        const swap = dir === 'up' ? idx - 1 : idx + 1;
        if (swap < 0 || swap >= arr.length) return s;
        [arr[idx], arr[swap]] = [arr[swap], arr[idx]];
        return { ...s, fields: arr };
      }),
    }));

  const addSection = () => {
    const sec: FormSection = { id: crypto.randomUUID(), title: 'New Section', fields: [] };
    setDraft((p) => ({ ...p, sections: [...p.sections, sec] }));
    setSelectedSectionId(sec.id);
  };

  const deleteSection = (sectionId: string) => {
    if (draft.sections.length <= 1) {
      toast.error('At least one section is required');
      return;
    }
    setDraft((p) => ({ ...p, sections: p.sections.filter((s) => s.id !== sectionId) }));
    if (selectedSectionId === sectionId) setSelectedSectionId(null);
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      updateForm(draft);
      setSaving(false);
      toast.success('Form saved as draft');
    }, 500);
  };

  const handlePublish = () => {
    updateForm(draft);
    toast.success('Application form published');
  };

  return (
    <div className="space-y-6 pb-16">
      <PageHeader
        title="Form Builder"
        description="Design the application form applicants fill out."
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setPreviewOpen(true)}>
              <Eye className="mr-2 h-4 w-4" /> Live preview
            </Button>
            <Button variant="outline" onClick={handleSave} disabled={saving}>
              {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              Save draft
            </Button>
            <Button onClick={handlePublish}>
              <Send className="mr-2 h-4 w-4" /> Publish
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[200px_1fr] xl:grid-cols-[200px_1fr_280px]">
        {/* Left: field types */}
        <Card className="h-fit lg:sticky lg:top-20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Field types</CardTitle>
            <CardDescription className="text-xs">Click to add to the active section</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-2 lg:grid-cols-1">
            {(Object.keys(FIELD_TYPE_META) as FieldType[]).map((type) => {
              const meta = FIELD_TYPE_META[type];
             const Icon = (Icons as unknown as Record<string, React.ElementType>)[meta.icon] ?? Icons.Type;
              return (
                <button
                  key={type}
                  onClick={() => selectedSection && addField(selectedSection.id, type)}
                  className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-left text-xs font-medium transition-colors hover:border-primary/40 hover:bg-primary/5"
                >
                  <Icon className="h-4 w-4 shrink-0 text-primary" />
                  <span className="truncate">{meta.label}</span>
                </button>
              );
            })}
          </CardContent>
        </Card>

        {/* Center: canvas */}
        <div className="space-y-4">
          <Card>
            <CardContent className="pt-4">
              <Input
                value={draft.title}
                onChange={(e) => setDraft((p) => ({ ...p, title: e.target.value }))}
                className="border-0 px-0 text-lg font-semibold shadow-none focus-visible:ring-0"
                placeholder="Form title"
              />
            </CardContent>
          </Card>

          {draft.sections.map((section) => (
            <Card key={section.id} className={cn(selectedSectionId === section.id && 'ring-1 ring-primary/40')}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <div className="flex-1">
                  <Input
                    value={section.title}
                    onChange={(e) => updateSection(section.id, { title: e.target.value })}
                    className="border-0 px-0 text-base font-semibold shadow-none focus-visible:ring-0"
                    onFocus={() => setSelectedSectionId(section.id)}
                  />
                  <p className="mt-0.5 text-xs text-muted-foreground">{section.fields.length} fields</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteSection(section.id)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-2">
                {section.fields.length === 0 && (
                  <div className="rounded-lg border border-dashed border-border py-6 text-center text-xs text-muted-foreground">
                    No fields yet. Click a field type on the left to add one.
                  </div>
                )}
                {section.fields.map((field, idx) => {
                  const meta = FIELD_TYPE_META[field.type];
                 const Icon = (Icons as unknown as Record<string, React.ElementType>)[meta.icon] ?? Icons.Type;
                  const active = selectedFieldId === field.id;
                  return (
                    <div
                      key={field.id}
                      onClick={() => {
                        setSelectedFieldId(field.id);
                        setSelectedSectionId(section.id);
                      }}
                      className={cn(
                        'group flex cursor-pointer items-center gap-2 rounded-lg border p-3 transition-colors',
                        active ? 'border-primary bg-primary/5' : 'border-border bg-card hover:border-primary/30'
                      )}
                    >
                      <GripVertical className="h-4 w-4 shrink-0 text-muted-foreground" />
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="truncate text-sm font-medium">
                            {field.label || <span className="text-muted-foreground">Untitled {meta.label}</span>}
                          </p>
                          {field.required && (
                            <Badge variant="secondary" className="h-4 px-1.5 text-[10px]">Required</Badge>
                          )}
                        </div>
                        <p className="text-[11px] text-muted-foreground">{meta.label}</p>
                      </div>
                      <div className="flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100" onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" onClick={() => moveField(section.id, idx, 'up')} disabled={idx === 0}>
                          <ArrowUp className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => moveField(section.id, idx, 'down')} disabled={idx === section.fields.length - 1}>
                          <ArrowDown className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => duplicateField(section.id, field.id)}>
                          <Copy className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteField(section.id, field.id)}>
                          <Trash2 className="h-3.5 w-3.5 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          ))}

          <Button variant="outline" className="w-full" onClick={addSection}>
            <Plus className="mr-2 h-4 w-4" /> Add section
          </Button>
        </div>

        {/* Right: properties */}
        <Card className="h-fit lg:sticky lg:top-20">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Settings2 className="h-4 w-4" /> Properties
            </CardTitle>
            <CardDescription className="text-xs">
              {selectedField ? 'Editing selected field' : 'Select a field to edit its properties'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!selectedField ? (
              <div className="rounded-lg border border-dashed border-border py-8 text-center text-xs text-muted-foreground">
                Click a field in the canvas to edit it.
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-xs">Label</Label>
                  <Input
                    value={selectedField.label}
                    onChange={(e) => updateField(selectedField.id, { label: e.target.value })}
                  />
                </div>
                {selectedField.type !== 'heading' && selectedField.type !== 'description' && (
                  <div className="space-y-1.5">
                    <Label className="text-xs">Placeholder</Label>
                    <Input
                      value={selectedField.placeholder ?? ''}
                      onChange={(e) => updateField(selectedField.id, { placeholder: e.target.value })}
                    />
                  </div>
                )}
                <div className="space-y-1.5">
                  <Label className="text-xs">Description / help text</Label>
                  <Textarea
                    rows={2}
                    value={selectedField.description ?? ''}
                    onChange={(e) => updateField(selectedField.id, { description: e.target.value })}
                  />
                </div>
                {selectedField.type !== 'heading' && selectedField.type !== 'description' && (
                  <div className="space-y-1.5">
                    <Label className="text-xs">Default value</Label>
                    <Input
                      value={selectedField.defaultValue ?? ''}
                      onChange={(e) => updateField(selectedField.id, { defaultValue: e.target.value })}
                    />
                  </div>
                )}
                {(selectedField.type === 'dropdown' ||
                  selectedField.type === 'multiple' ||
                  selectedField.type === 'checkboxes') && (
                  <div className="space-y-1.5">
                    <Label className="text-xs">Options</Label>
                    <div className="space-y-1.5">
                      {selectedField.options?.map((opt) => (
                        <div key={opt.id} className="flex items-center gap-1.5">
                          <Input
                            value={opt.label}
                            onChange={(e) =>
                              updateField(selectedField.id, {
                                options: selectedField.options?.map((o) =>
                                  o.id === opt.id ? { ...o, label: e.target.value } : o
                                ),
                              })
                            }
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              updateField(selectedField.id, {
                                options: selectedField.options?.filter((o) => o.id !== opt.id),
                              })
                            }
                          >
                            <X className="h-3.5 w-3.5 text-destructive" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          updateField(selectedField.id, {
                            options: [
                              ...(selectedField.options ?? []),
                              { id: crypto.randomUUID(), label: `Option ${(selectedField.options?.length ?? 0) + 1}` },
                            ],
                          })
                        }
                      >
                        <Plus className="mr-1 h-3.5 w-3.5" /> Add option
                      </Button>
                    </div>
                  </div>
                )}
                {selectedField.type !== 'heading' && selectedField.type !== 'description' && (
                  <label className="flex items-center justify-between rounded-lg border border-border p-3">
                    <span className="text-sm font-medium">Required</span>
                    <Switch
                      checked={selectedField.required}
                      onCheckedChange={(v) => updateField(selectedField.id, { required: v })}
                    />
                  </label>
                )}
                <div className="rounded-lg bg-muted/40 p-2.5 text-[11px] text-muted-foreground">
                  Type: <span className="font-medium text-foreground">{FIELD_TYPE_META[selectedField.type].label}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <LivePreviewDialog open={previewOpen} onOpenChange={setPreviewOpen} form={draft} />
    </div>
  );
}

function LivePreviewDialog({
  open,
  onOpenChange,
  form,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  form: import('@/types/form').FormBuilderState;
}) {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) setSubmitted(false);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Live form preview</DialogTitle>
        </DialogHeader>
        <div className="rounded-xl border border-border">
          <div className="bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#1e1b4b] px-6 py-8 text-center text-white">
            <p className="text-xs font-medium uppercase tracking-widest text-indigo-200">IEEE HIT SB presents</p>
            <h2 className="mt-2 text-2xl font-bold">{form.title}</h2>
            <p className="mt-1 text-sm text-indigo-100">Fill in your details to apply.</p>
          </div>
          <div className="p-6">
            {submitted ? (
              <div className="flex flex-col items-center py-10 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10 text-success">
                  <Check className="h-6 w-6" />
                </div>
                <p className="mt-3 text-sm font-medium">Application submitted!</p>
                <p className="mt-1 text-xs text-muted-foreground">Watch your inbox — we&apos;ll be in touch soon.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-6"
              >
                {form.sections.map((section) => (
                  <div key={section.id} className="space-y-3">
                    <h3 className="border-b border-border pb-1.5 text-sm font-semibold text-foreground">
                      {section.title}
                    </h3>
                    {section.fields.map((field) => (
                      <FieldPreview key={field.id} field={field} />
                    ))}
                  </div>
                ))}
                <Button type="submit" className="w-full">
                  Submit application
                </Button>
              </form>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function FieldPreview({ field }: { field: FormField }) {
  if (field.type === 'heading') {
    return <h4 className="text-base font-semibold text-foreground">{field.label || 'Section heading'}</h4>;
  }
  if (field.type === 'description') {
    return <p className="text-xs text-muted-foreground">{field.description || field.label}</p>;
  }

  const labelEl = (
    <Label className="text-sm font-medium">
      {field.label || FIELD_TYPE_META[field.type].label}
      {field.required && <span className="ml-0.5 text-destructive">*</span>}
    </Label>
  );
  const descEl = field.description ? (
    <p className="mt-0.5 text-[11px] text-muted-foreground">{field.description}</p>
  ) : null;

  let control: React.ReactNode;
  switch (field.type) {
    case 'long':
      control = <Textarea rows={3} placeholder={field.placeholder} />;
      break;
    case 'email':
      control = <Input type="email" placeholder={field.placeholder || 'you@hit.edu.in'} />;
      break;
    case 'phone':
      control = <Input type="tel" placeholder={field.placeholder || '+91 …'} />;
      break;
    case 'number':
      control = <Input type="number" placeholder={field.placeholder} />;
      break;
    case 'date':
      control = <Input type="date" />;
      break;
    case 'file':
      control = (
        <div className="rounded-lg border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
          <Icons.Upload className="mx-auto mb-1 h-5 w-5" /> Click to upload
        </div>
      );
      break;
    case 'dropdown':
      control = (
        <Select defaultValue={field.defaultValue}>
          <SelectTrigger>
            <SelectValue placeholder="Select…" />
          </SelectTrigger>
          <SelectContent>
            {field.options?.map((o) => (
              <SelectItem key={o.id} value={o.label}>{o.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
      break;
    case 'multiple':
      control = (
        <div className="space-y-1.5">
          {field.options?.map((o) => (
            <label key={o.id} className="flex items-center gap-2 text-sm">
              <input type="radio" name={field.id} className="h-4 w-4 accent-primary" />
              {o.label}
            </label>
          ))}
        </div>
      );
      break;
    case 'checkboxes':
      control = (
        <div className="space-y-1.5">
          {field.options?.map((o) => (
            <label key={o.id} className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="h-4 w-4 rounded accent-primary" />
              {o.label}
            </label>
          ))}
        </div>
      );
      break;
    case 'yesno':
      control = (
        <div className="flex gap-2">
          {['Yes', 'No'].map((v) => (
            <label key={v} className="flex flex-1 cursor-pointer items-center justify-center rounded-lg border border-border px-3 py-2 text-sm hover:bg-muted/40">
              <input type="radio" name={field.id} className="mr-2 h-4 w-4 accent-primary" />
              {v}
            </label>
          ))}
        </div>
      );
      break;
    default:
      control = <Input placeholder={field.placeholder} defaultValue={field.defaultValue} />;
  }

  return (
    <div className="space-y-1">
      {labelEl}
      {descEl}
      {control}
    </div>
  );
}