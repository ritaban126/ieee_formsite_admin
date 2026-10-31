'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Bell, Search, Globe, Menu } from 'lucide-react';
import { Sidebar, MobileMenuButton } from '@/components/layout/sidebar';
import { CMSProvider, useCMS } from '@/providers/dashboard-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Link from 'next/link';
import { toast } from 'sonner';

function Topbar({ onMenu }: { onMenu: () => void }) {
  const pathname = usePathname();
  const { admin } = useCMS();
  const [crumb, setCrumb] = useState('Dashboard');

  useEffect(() => {
    const map: Record<string, string> = {
      '/admin': 'Dashboard',
      '/admin/hero': 'Hero Section',
      '/admin/thumbnail': 'Thumbnail & Media',
      '/admin/about': 'About',
      '/admin/rounds': 'Rounds',
      '/admin/timeline': 'Timeline',
      '/admin/eligibility': 'Eligibility',
      '/admin/faq': 'FAQ',
      '/admin/contact': 'Contact',
      '/admin/form-builder': 'Form Builder',
      '/admin/registrations': 'Registrations',
      '/admin/application-settings': 'Application Settings',
      '/admin/preview': 'Website Preview',
      '/admin/settings': 'Settings',
    };
    setCrumb(map[pathname] ?? 'Dashboard');
  }, [pathname]);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-card/80 px-4 backdrop-blur lg:px-6">
      <MobileMenuButton onClick={onMenu} />
      <div className="hidden items-center gap-2 text-sm sm:flex">
        <span className="text-muted-foreground">Admin</span>
        <span className="text-muted-foreground">/</span>
        <span className="font-medium text-foreground">{crumb}</span>
      </div>

      <div className="relative ml-auto hidden max-w-xs flex-1 sm:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search…"
          className="h-9 pl-9"
          onFocus={() => toast('Search is not wired to a backend yet.')}
        />
      </div>

      <div className="ml-auto flex items-center gap-1 sm:ml-0">
        <Button
          variant="ghost"
          size="icon"
          asChild
          className="hidden sm:inline-flex"
        >
          <Link href="/admin/preview" aria-label="Preview website">
            <Globe className="h-4.5 w-4.5" />
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => toast('You have 3 new notifications.')}
        >
          <Bell className="h-4.5 w-4.5" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary" />
        </Button>
        <Avatar className="ml-1 h-8 w-8">
          <AvatarFallback className="bg-primary text-xs font-semibold text-primary-foreground">
            {admin.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .slice(0, 2)
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <CMSProvider>
      <div className="min-h-screen bg-background">
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
        <div
          className={
            'transition-all duration-300 ' +
            (collapsed ? 'lg:pl-[72px]' : 'lg:pl-[256px]')
          }
        >
          <Topbar onMenu={() => setMobileOpen(true)} />
          <main className="mx-auto max-w-7xl px-4 py-6 lg:px-6 lg:py-8">
            {children}
          </main>
        </div>
      </div>
    </CMSProvider>
  );
}