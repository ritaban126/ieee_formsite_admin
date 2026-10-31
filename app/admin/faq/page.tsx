'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown, GripVertical, HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { PageHeader, SaveBar, EmptyState } from '@/components/layout/shared';
import { useCMS } from '@/providers/dashboard-provider';
import type { FAQItem } from '@/types/content';

export default function FAQPage() {
  const { faq, updateFAQ } = useCMS();
  const [draft, setDraft] = useState(faq);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [editing, setEditing] = useState<FAQItem | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => setDraft(faq), [faq]);

  const set = (k: 'heading' | 'description', v: string) =>
    setDraft((p) => ({ ...p, [k]: v }));

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      updateFAQ(draft);
      setSaving(false);
      setSaved(true);
      toast.success('FAQ saved');
      setTimeout(() => setSaved(false), 2500);
    }, 500);
  };

  const add = () => {
    setEditing({ id: '', order: 0, question: '', answer: '' });
    setOpen(true);
  };

  const edit = (q: FAQItem) => {
    setEditing({ ...q });
    setOpen(true);
  };

  const save = () => {
    if (!editing) return;
    if (!editing.question.trim()) {
      toast.error('Question is required');
      return;
    }
    if (editing.id) {
      setDraft((p) => ({ ...p, items: p.items.map((q) => (q.id === editing.id ? editing : q)) }));
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
      items: p.items.filter((q) => q.id !== id).map((q, i) => ({ ...q, order: i + 1 })),
    }));

  const move = (idx: number, dir: 'up' | 'down') => {
    setDraft((p) => {
      const arr = [...p.items];
      const swap = dir === 'up' ? idx - 1 : idx + 1;
      if (swap < 0 || swap >= arr.length) return p;
      [arr[idx], arr[swap]] = [arr[swap], arr[idx]];
      return { ...p, items: arr.map((q, i) => ({ ...q, order: i + 1 })) };
    });
  };

  return (
    <div className="space-y-6 pb-16">
      <PageHeader
        title="FAQ"
        description="Answer the questions applicants ask most."
        actions={
          <Button variant="outline" onClick={add}>
            <Plus className="mr-2 h-4 w-4" /> Add question
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
              <CardTitle className="text-base">Questions</CardTitle>
              <CardDescription>{draft.items.length} questions</CardDescription>
            </CardHeader>
            <CardContent>
              {draft.items.length === 0 ? (
                <EmptyState icon={HelpCircle} title="No questions yet" action={<Button size="sm" onClick={add}>Add question</Button>} />
              ) : (
                <div className="space-y-2">
                  {draft.items.map((q, idx) => (
                    <div key={q.id} className="group flex items-start gap-2 rounded-lg border border-border bg-card p-3">
                      <GripVertical className="mt-1 hidden h-4 w-4 text-muted-foreground sm:block" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium">{q.question}</p>
                        <p className="text-xs text-muted-foreground line-clamp-2">{q.answer}</p>
                      </div>
                      <div className="flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                        <Button variant="ghost" size="icon" onClick={() => move(idx, 'up')} disabled={idx === 0}>
                          <ArrowUp className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => move(idx, 'down')} disabled={idx === draft.items.length - 1}>
                          <ArrowDown className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => edit(q)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => remove(q.id)}>
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
              <div className="mt-6">
                {draft.items.length > 0 ? (
                  <Accordion type="single" collapsible className="w-full">
                    {draft.items.map((q, i) => (
                      <AccordionItem key={q.id} value={`item-${i}`} className="border-border">
                        <AccordionTrigger className="text-left text-sm font-medium hover:no-underline">
                          {q.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          {q.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <p className="text-sm text-muted-foreground">No questions yet.</p>
                )}
              </div>
            </div>
            <div className="bg-muted/40 px-4 py-2 text-center text-xs text-muted-foreground">
              Live preview of the FAQ section
            </div>
          </Card>
        </div>
      </div>

      <SaveBar onSave={handleSave} saving={saving} saved={saved} />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing?.id ? 'Edit question' : 'Add question'}</DialogTitle>
            <DialogDescription>Question and answer for the FAQ.</DialogDescription>
          </DialogHeader>
          {editing && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label>Question</Label>
                <Input value={editing.question} onChange={(e) => setEditing((p) => ({ ...p!, question: e.target.value }))} />
              </div>
              <div className="space-y-1.5">
                <Label>Answer</Label>
                <Textarea rows={4} value={editing.answer} onChange={(e) => setEditing((p) => ({ ...p!, answer: e.target.value }))} />
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