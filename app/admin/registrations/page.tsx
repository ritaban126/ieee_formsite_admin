'use client';

import { useState, useMemo } from 'react';
import { toast } from 'sonner';
import {
  Search,
  Download,
  Eye,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  Calendar,
  Filter,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PageHeader } from '@/components/layout/shared';
import { mockApplicants } from '@/lib/mock-data';
import type { Applicant, ApplicationStatus } from '@/types/registration';
import { cn } from '@/lib/utils';

const statusColor: Record<ApplicationStatus, string> = {
  approved: 'bg-success/10 text-success',
  pending: 'bg-warning/10 text-warning',
  rejected: 'bg-destructive/10 text-destructive',
  incomplete: 'bg-muted text-muted-foreground',
};

const PAGE_SIZE = 8;

export default function RegistrationsPage() {
  const [applicants, setApplicants] = useState<Applicant[]>(mockApplicants);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<Applicant | null>(null);

  const filtered = useMemo(() => {
    return applicants.filter((a) => {
      const q = search.toLowerCase();
      const matches =
        !q ||
        a.name.toLowerCase().includes(q) ||
        a.email.toLowerCase().includes(q) ||
        a.phone.includes(q) ||
        a.branch.toLowerCase().includes(q) ||
        a.college.toLowerCase().includes(q);
      const status = statusFilter === 'all' || a.status === statusFilter;
      return matches && status;
    });
  }, [applicants, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageData = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const setStatus = (id: string, status: ApplicationStatus) => {
    setApplicants((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    setSelected((prev) => (prev && prev.id === id ? { ...prev, status } : prev));
    toast.success(`Application ${status}`);
  };

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'College', 'Branch', 'Year', 'Roll', 'Submitted', 'Status'];
    const rows = filtered.map((a) => [
      a.name, a.email, a.phone, a.college, a.branch, a.year, a.rollNumber, a.submittedAt, a.status,
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'circuitHack-applications.csv';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('CSV exported');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Registrations"
        description={`${applicants.length} applications received`}
        actions={
          <Button variant="outline" onClick={exportCSV}>
            <Download className="mr-2 h-4 w-4" /> Export CSV
          </Button>
        }
      />

      <Card>
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between space-y-0">
          <div>
            <CardTitle className="text-base">Applications</CardTitle>
            <CardDescription>{filtered.length} matching applications</CardDescription>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search…"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(0);
                }}
                className="h-9 w-48 pl-9 sm:w-56"
              />
            </div>
            <Select
              value={statusFilter}
              onValueChange={(v) => {
                setStatusFilter(v);
                setPage(0);
              }}
            >
              <SelectTrigger className="h-9 w-[140px]">
                <Filter className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="incomplete">Incomplete</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Applicant</TableHead>
                  <TableHead className="hidden md:table-cell">Branch</TableHead>
                  <TableHead className="hidden lg:table-cell">Year</TableHead>
                  <TableHead className="hidden sm:table-cell">Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pageData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="py-10 text-center text-sm text-muted-foreground">
                      No applications match your filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  pageData.map((a) => (
                    <TableRow key={a.id} className="cursor-pointer" onClick={() => setSelected(a)}>
                      <TableCell>
                        <div className="font-medium">{a.name}</div>
                        <div className="text-xs text-muted-foreground">{a.email}</div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground">{a.branch}</TableCell>
                      <TableCell className="hidden lg:table-cell text-muted-foreground">{a.year}</TableCell>
                      <TableCell className="hidden sm:table-cell text-muted-foreground">{a.submittedAt}</TableCell>
                      <TableCell>
                        <Badge className={cn('font-medium capitalize', statusColor[a.status])} variant="secondary">
                          {a.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-0.5">
                          <Button variant="ghost" size="icon" onClick={() => setSelected(a)} title="View">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {a.status !== 'approved' && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setStatus(a.id, 'approved')}
                              title="Approve"
                              className="text-success"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                          {a.status !== 'rejected' && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setStatus(a.id, 'rejected')}
                              title="Reject"
                              className="text-destructive"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {filtered.length > PAGE_SIZE && (
            <div className="flex items-center justify-between pt-4">
              <p className="text-xs text-muted-foreground">
                Page {page + 1} of {totalPages}
              </p>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                  disabled={page >= totalPages - 1}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Sheet open={!!selected} onOpenChange={(v) => !v && setSelected(null)}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-md">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle className="text-lg">{selected.name}</SheetTitle>
                <SheetDescription>
                  Submitted {selected.submittedAt}
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-5">
                <Badge
                  className={cn('font-medium capitalize', statusColor[selected.status])}
                  variant="secondary"
                >
                  {selected.status}
                </Badge>

                <div className="space-y-3">
                  <InfoRow icon={Mail} label="Email" value={selected.email} />
                  <InfoRow icon={Phone} label="Phone" value={selected.phone} />
                  <InfoRow icon={Calendar} label="College" value={selected.college} />
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg border border-border bg-muted/30 p-3">
                      <p className="text-[11px] text-muted-foreground">Branch</p>
                      <p className="text-sm font-medium">{selected.branch}</p>
                    </div>
                    <div className="rounded-lg border border-border bg-muted/30 p-3">
                      <p className="text-[11px] text-muted-foreground">Year</p>
                      <p className="text-sm font-medium">{selected.year}</p>
                    </div>
                  </div>
                  <div className="rounded-lg border border-border bg-muted/30 p-3">
                    <p className="text-[11px] text-muted-foreground">Roll number</p>
                    <p className="text-sm font-medium">{selected.rollNumber}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <DetailBlock label="Why do you want to join?" value={selected.whyJoin || '—'} />
                  <DetailBlock label="Relevant experience / projects" value={selected.experience || '—'} />
                  <div className="rounded-lg border border-border bg-muted/30 p-3">
                    <p className="text-[11px] text-muted-foreground">Can attend both days?</p>
                    <p className="text-sm font-medium">{selected.canAttendBoth}</p>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  {selected.status !== 'approved' && (
                    <Button className="flex-1" onClick={() => setStatus(selected.id, 'approved')}>
                      <Check className="mr-2 h-4 w-4" /> Approve
                    </Button>
                  )}
                  {selected.status !== 'rejected' && (
                    <Button
                      variant="outline"
                      className="flex-1 border-destructive text-destructive hover:bg-destructive/10"
                      onClick={() => setStatus(selected.id, 'rejected')}
                    >
                      <X className="mr-2 h-4 w-4" /> Reject
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}

function DetailBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-muted/30 p-3">
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm">{value}</p>
    </div>
  );
}