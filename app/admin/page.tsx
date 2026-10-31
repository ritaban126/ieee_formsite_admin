'use client';

import Link from 'next/link';
import {
  Users,
  CheckCircle2,
  CircleDashed,
  Eye,
  FileCheck2,
  ArrowUpRight,
  Pencil,
  FormInput,
  Image as ImageIcon,
  Globe,
  TrendingUp,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip as ReTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  Legend,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageHeader, StatusBadge } from '@/components/layout/shared';
import { Badge } from '@/components/ui/badge';
import {
  applicationTrendData,
  statusDistributionData,
  visitorsData,
  sectionStatuses,
  defaultTimeline,
  mockApplicants,
} from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const stats = [
  { label: 'Total Applications', value: '152', delta: '+24%', icon: Users, tone: 'primary' },
  { label: 'Completed Applications', value: '124', delta: '+18%', icon: CheckCircle2, tone: 'success' },
  { label: 'Incomplete Applications', value: '28', delta: '+6%', icon: CircleDashed, tone: 'warning' },
  { label: 'Website Visitors', value: '4.7k', delta: '+12%', icon: Eye, tone: 'primary' },
  { label: 'Published Sections', value: '7/8', delta: '1 draft', icon: FileCheck2, tone: 'success' },
];

const toneClasses: Record<string, string> = {
  primary: 'bg-primary/10 text-primary',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Overview of CircuitHack 2026 applications and website status."
        actions={
          <Button asChild>
            <Link href="/admin/preview">
              <Globe className="mr-2 h-4 w-4" /> View website
            </Link>
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
        {stats.map((s) => (
          <Card key={s.label} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">
                {s.label}
              </CardTitle>
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-lg',
                  toneClasses[s.tone]
                )}
              >
                <s.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold tracking-tight">{s.value}</div>
              <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3" /> {s.delta}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Application analytics</CardTitle>
            <CardDescription>Daily applications over the past two weeks</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={applicationTrendData} margin={{ left: -20, right: 8, top: 4 }}>
                <defs>
                  <linearGradient id="appsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <ReTooltip
                  contentStyle={{
                    background: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="applications"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fill="url(#appsGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Application status</CardTitle>
            <CardDescription>Distribution of current applications</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={statusDistributionData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                >
                  {statusDistributionData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <ReTooltip
                  contentStyle={{
                    background: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                  wrapperStyle={{ fontSize: 12 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick actions + visitors */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Quick actions</CardTitle>
            <CardDescription>Jump straight into managing the website</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: 'Edit Website', icon: Pencil, href: '/admin/hero' },
                { label: 'Create Form', icon: FormInput, href: '/admin/form-builder' },
                { label: 'Upload Thumbnail', icon: ImageIcon, href: '/admin/thumbnail' },
                { label: 'Preview Website', icon: Globe, href: '/admin/preview' },
              ].map((a) => (
                <Link
                  key={a.href}
                  href={a.href}
                  className="group flex flex-col items-center gap-2 rounded-xl border border-border bg-muted/30 p-4 transition-all hover:border-primary/40 hover:bg-primary/5"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <a.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium">{a.label}</span>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Website visitors</CardTitle>
            <CardDescription>Last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={visitorsData} margin={{ left: -28, right: 4, top: 4 }}>
                <defs>
                  <linearGradient id="visGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <ReTooltip
                  contentStyle={{
                    background: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="visitors"
                  stroke="hsl(var(--success))"
                  strokeWidth={2}
                  fill="url(#visGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent + website status */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-base">Recent applications</CardTitle>
              <CardDescription>Latest submissions awaiting review</CardDescription>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link href="/admin/registrations">
                View all <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs text-muted-foreground">
                    <th className="pb-2 pr-3 font-medium">Applicant</th>
                    <th className="pb-2 pr-3 font-medium">Branch</th>
                    <th className="pb-2 pr-3 font-medium">Submitted</th>
                    <th className="pb-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockApplicants.slice(0, 6).map((a) => (
                    <tr key={a.id} className="border-b border-border last:border-0">
                      <td className="py-2.5 pr-3">
                        <div className="font-medium text-foreground">{a.name}</div>
                        <div className="text-xs text-muted-foreground">{a.email}</div>
                      </td>
                      <td className="py-2.5 pr-3 text-muted-foreground">{a.branch}</td>
                      <td className="py-2.5 pr-3 text-muted-foreground">{a.submittedAt}</td>
                      <td className="py-2.5">
                        <StatusPill status={a.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Website content status</CardTitle>
            <CardDescription>Sections published and pending</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {sectionStatuses.map((s) => (
              <Link
                key={s.section}
                href={s.href}
                className="flex items-center justify-between rounded-lg border border-border px-3 py-2 transition-colors hover:bg-muted/50"
              >
                <span className="text-sm font-medium">{s.section}</span>
                <StatusBadge status={s.status as 'Published' | 'Draft'} />
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Upcoming timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Upcoming event timeline</CardTitle>
          <CardDescription>Key dates for CircuitHack 2026</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative space-y-5 pl-6">
            <div className="absolute left-[7px] top-1 bottom-1 w-px bg-border" />
            {defaultTimeline.items.map((t) => (
              <div key={t.id} className="relative">
                <span className="absolute -left-6 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-background bg-primary" />
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-sm font-medium">{t.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(t.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}{' '}
                    · {t.time}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">{t.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    approved: 'bg-success/10 text-success',
    pending: 'bg-warning/10 text-warning',
    rejected: 'bg-destructive/10 text-destructive',
    incomplete: 'bg-muted text-muted-foreground',
  };
  return (
    <Badge className={cn('font-medium capitalize', map[status])} variant="secondary">
      {status}
    </Badge>
  );
}