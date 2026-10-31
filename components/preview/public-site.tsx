'use client';

import {
  Zap,
  Clock,
  Users,
  Trophy,
  CheckCircle,
  Mail,
  Instagram,
  Linkedin,
  Twitter,
  Github,
  Globe,
  MessageCircle,
  Lightbulb,
  Calendar,
  MapPin,
  ArrowRight,
} from 'lucide-react';
import { useCMS } from '@/providers/dashboard-provider';
import { cn } from '@/lib/utils';
import * as Icons from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const LINK_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  mail: Mail,
  instagram: Instagram,
  linkedin: Linkedin,
  twitter: Twitter,
  github: Github,
  globe: Globe,
};

export function PublicSite() {
  const cms = useCMS();
  const { hero, about, rounds, timeline, eligibility, faq, contact } = cms;

  return (
    <div className="bg-background text-foreground antialiased">
      {/* Hero */}
      <section id="hero" className="relative overflow-hidden bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#1e1b4b] px-6 py-20 text-center text-white">
        <p className="text-xs font-medium uppercase tracking-widest text-indigo-200">{hero.kicker}</p>
        <h1 className="mx-auto mt-4 max-w-3xl text-5xl font-bold tracking-tight">{hero.title}</h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-indigo-100">{hero.tagline}</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="rounded-full bg-white/10 px-3 py-1">{hero.format}</span>
          <span className="rounded-full bg-white/10 px-3 py-1">{hero.mode}</span>
          <span className="rounded-full bg-white/10 px-3 py-1 inline-flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {new Date(hero.startDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })} – {new Date(hero.endDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
          </span>
          <span className="rounded-full bg-white/10 px-3 py-1 inline-flex items-center gap-1">
            <MapPin className="h-3 w-3" /> {hero.venue}
          </span>
        </div>
        <div className="mt-6 inline-flex items-center gap-1 rounded-full bg-amber-400/20 px-3 py-1 text-xs font-medium text-amber-100">
          {hero.daysLeft} days left to apply
        </div>
        <div className="mt-8 flex items-center justify-center gap-3">
          <button className="rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-indigo-700 hover:bg-indigo-50">
            {hero.applyLabel}
          </button>
          <button className="rounded-lg border border-white/30 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10">
            {hero.learnMoreLabel}
          </button>
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="text-center text-3xl font-bold tracking-tight">{about.heading}</h2>
        <p className="mx-auto mt-4 max-w-2xl whitespace-pre-line text-center text-sm text-muted-foreground">
          {about.description}
        </p>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {about.features.map((f) => {
        const Icon = (Icons as unknown as Record<string, React.ElementType>)[f.icon] ?? Lightbulb;
            return (
              <div key={f.id} className="rounded-xl border border-border bg-card p-6 text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-3 text-sm font-semibold">{f.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{f.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Rounds */}
      <section id="rounds" className="bg-muted/40 px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-3xl font-bold tracking-tight">{rounds.heading}</h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm text-muted-foreground">{rounds.description}</p>
          <div className="mt-10 space-y-4">
            {rounds.rounds.map((r) => (
              <div key={r.id} className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">
                    {r.order}
                  </div>
                  <p className="text-lg font-semibold">{r.title}</p>
                  <span
                    className={cn(
                      'ml-auto rounded-full px-2.5 py-0.5 text-xs font-medium',
                      r.difficulty === 'Easy' && 'bg-success/10 text-success',
                      r.difficulty === 'Medium' && 'bg-warning/10 text-warning',
                      r.difficulty === 'Hard' && 'bg-destructive/10 text-destructive'
                    )}
                  >
                    {r.difficulty}
                  </span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{r.description}</p>
                <p className="mt-2 text-xs text-muted-foreground">{r.duration} · Team of {r.teamSize}</p>
              </div>
            ))}
          </div>
          {rounds.perks.length > 0 && (
            <div className="mt-8 rounded-xl border border-border bg-card p-6">
              <p className="text-sm font-semibold">Every participant gets</p>
              <ul className="mt-3 space-y-2">
                {rounds.perks.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-success" /> {p}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {rounds.judgedOn.length > 0 && (
            <div className="mt-4 rounded-xl border border-border bg-card p-6">
              <p className="text-sm font-semibold">Judged on</p>
              <ul className="mt-3 space-y-2">
                {rounds.judgedOn.map((j, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-success" /> {j}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Timeline */}
      <section id="timeline" className="mx-auto max-w-2xl px-6 py-16">
        <h2 className="text-center text-3xl font-bold tracking-tight">{timeline.heading}</h2>
        <p className="mt-3 text-center text-sm text-muted-foreground">{timeline.description}</p>
        <div className="relative mt-10 space-y-6 pl-6">
          <div className="absolute left-[7px] top-1 bottom-1 w-px bg-border" />
          {timeline.items.map((t) => (
            <div key={t.id} className="relative">
              <span className="absolute -left-6 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-background bg-primary" />
              <p className="text-sm font-semibold">{t.title}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(t.date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })} · {t.time}
              </p>
              <p className="text-xs text-muted-foreground">{t.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Eligibility */}
      <section id="eligibility" className="bg-muted/40 px-6 py-16">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center text-3xl font-bold tracking-tight">{eligibility.heading}</h2>
          <p className="mt-3 text-center text-sm text-muted-foreground">{eligibility.description}</p>
          <ul className="mt-8 space-y-3">
            {eligibility.requirements.map((r, i) => (
              <li key={i} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 text-sm">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-success" /> {r}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-2xl px-6 py-16">
        <h2 className="text-center text-3xl font-bold tracking-tight">{faq.heading}</h2>
        <p className="mt-3 text-center text-sm text-muted-foreground">{faq.description}</p>
        <div className="mt-8">
          {faq.items.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {faq.items.map((q, i) => (
                <AccordionItem key={q.id} value={`item-${i}`} className="border-border">
                  <AccordionTrigger className="text-left text-sm font-medium hover:no-underline">
                    {q.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">{q.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <p className="text-center text-sm text-muted-foreground">No questions yet.</p>
          )}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-muted/40 px-6 py-16">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center text-3xl font-bold tracking-tight">{contact.heading}</h2>
          <p className="mt-3 text-center text-sm text-muted-foreground">{contact.description}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {contact.links.map((l) => {
              const Icon = LINK_ICONS[l.icon] ?? Globe;
              return (
                <div key={l.id} className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm">
                  <Icon className="h-4 w-4 text-primary" />
                  <span className="font-medium">{l.value}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {contact.persons.filter((p) => p.visible).map((p) => (
              <div key={p.id} className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {p.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.role}</p>
                  </div>
                </div>
                <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                  <p className="inline-flex items-center gap-1"><Mail className="h-3 w-3" /> {p.email}</p>
                  <p className="inline-flex items-center gap-1"><MessageCircle className="h-3 w-3" /> {p.phone}</p>
                  {p.whatsapp && (
                    <p className="inline-flex items-center gap-1 text-success"><MessageCircle className="h-3 w-3" /> WhatsApp</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application CTA */}
      <section id="apply" className="bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#1e1b4b] px-6 py-16 text-center text-white">
        <Zap className="mx-auto h-8 w-8 text-indigo-300" />
        <h2 className="mt-4 text-3xl font-bold">Ready to build?</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-indigo-100">
          Apply now and join 150 builders at CircuitHack {cms.event.year}.
        </p>
        <button className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-medium text-indigo-700 hover:bg-indigo-50">
          Apply now <ArrowRight className="h-4 w-4" />
        </button>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-8 text-center text-xs text-muted-foreground">
        <p>{cms.event.organization} · {cms.event.name} {cms.event.year}</p>
        <p className="mt-1">{cms.event.websiteUrl}</p>
      </footer>
    </div>
  );
}