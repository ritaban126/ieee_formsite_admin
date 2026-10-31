'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { UploadCloud, Image as ImageIcon, X, RefreshCw, Trash2, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PageHeader, SaveBar } from '@/components/layout/shared';
import { useCMS } from '@/providers/dashboard-provider';
import { cn } from '@/lib/utils';

const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp'];

export default function ThumbnailPage() {
  const { thumbnail, updateThumbnail } = useCMS();
  const [draft, setDraft] = useState(thumbnail);
  const [dragOver, setDragOver] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => setDraft(thumbnail), [thumbnail]);

  const set = (k: keyof typeof draft, v: string | number) =>
    setDraft((p) => ({ ...p, [k]: v }));

  const handleFile = useCallback(
    (file: File) => {
      if (!ACCEPTED.includes(file.type)) {
        toast.error('Only JPG, PNG and WEBP files are supported.');
        return;
      }
      const url = URL.createObjectURL(file);
      setDraft((p) => ({
        ...p,
        imageUrl: url,
        fileName: file.name,
        fileSize: file.size,
      }));
      toast.success('Image added');
    },
    []
  );

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      updateThumbnail(draft);
      setSaving(false);
      setSaved(true);
      toast.success('Thumbnail saved');
      setTimeout(() => setSaved(false), 2500);
    }, 500);
  };

  const removeImage = () => {
    setDraft((p) => ({ ...p, imageUrl: '', fileName: '', fileSize: 0 }));
    toast('Image removed');
  };

  const formatBytes = (b: number) => {
    if (!b) return '—';
    return b > 1024 * 1024 ? (b / (1024 * 1024)).toFixed(2) + ' MB' : (b / 1024).toFixed(0) + ' KB';
  };

  return (
    <div className="space-y-6 pb-16">
      <PageHeader
        title="Thumbnail & Media"
        description="Upload the event banner and hero media shown across the website."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Upload</CardTitle>
              <CardDescription>Drag and drop or browse. JPG, PNG, WEBP.</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={onDrop}
                onClick={() => inputRef.current?.click()}
                className={cn(
                  'flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 text-center transition-colors',
                  dragOver
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-muted/30 hover:border-primary/40'
                )}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <UploadCloud className="h-5 w-5" />
                </div>
                <p className="mt-3 text-sm font-medium">
                  Drop image here, or <span className="text-primary">browse</span>
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  JPG, PNG, WEBP up to 5MB
                </p>
                <input
                  ref={inputRef}
                  type="file"
                  accept={ACCEPTED.join(',')}
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleFile(f);
                    e.target.value = '';
                  }}
                />
              </div>

              {draft.imageUrl && (
                <div className="mt-4 flex items-center justify-between rounded-lg border border-border bg-muted/30 px-3 py-2">
                  <div className="flex min-w-0 items-center gap-2">
                    <ImageIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <div className="min-w-0">
                      <p className="truncate text-xs font-medium">{draft.fileName}</p>
                      <p className="text-[11px] text-muted-foreground">{formatBytes(draft.fileSize)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" onClick={() => inputRef.current?.click()} title="Replace">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={removeImage} title="Remove">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Metadata</CardTitle>
              <CardDescription>Alt text, caption and positioning</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label>Alt text</Label>
                <Input value={draft.altText} onChange={(e) => set('altText', e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Caption</Label>
                <Textarea rows={2} value={draft.caption} onChange={(e) => set('caption', e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Image position</Label>
                <Select value={draft.position} onValueChange={(v) => set('position', v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {['center', 'left', 'right', 'top', 'bottom'].map((p) => (
                      <SelectItem key={p} value={p} className="capitalize">
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview */}
        <div className="lg:sticky lg:top-20 lg:self-start">
          <Card className="overflow-hidden">
            <div className="bg-muted/30 p-4">
              <div
                className={cn(
                  'relative flex aspect-video items-center justify-center overflow-hidden rounded-lg bg-muted',
                  `bg-[image:var(--img)] bg-${draft.position} bg-cover bg-no-repeat`
                )}
                style={
                  draft.imageUrl
                    ? { backgroundImage: `url(${draft.imageUrl})` }
                    : undefined
                }
              >
                {!draft.imageUrl && (
                  <div className="flex flex-col items-center text-muted-foreground">
                    <ImageIcon className="h-10 w-10" />
                    <p className="mt-2 text-xs">No image yet</p>
                  </div>
                )}
              </div>
              {draft.caption && (
                <p className="mt-2 text-center text-xs text-muted-foreground">
                  {draft.caption}
                </p>
              )}
            </div>
            <div className="border-t border-border px-4 py-3">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-muted-foreground">File</p>
                  <p className="truncate font-medium">{draft.fileName || '—'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Size</p>
                  <p className="font-medium">{formatBytes(draft.fileSize)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Position</p>
                  <p className="font-medium capitalize">{draft.position}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Status</p>
                  <p className="inline-flex items-center gap-1 font-medium text-success">
                    {draft.imageUrl ? (
                      <>
                        <Check className="h-3 w-3" /> Ready
                      </>
                    ) : (
                      'No image'
                    )}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <SaveBar onSave={handleSave} saving={saving} saved={saved} publishLabel="Publish media" />
    </div>
  );
}