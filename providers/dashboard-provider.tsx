'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import type {
  HeroContent,
  ThumbnailMedia,
  AboutContent,
  RoundsContent,
  TimelineContent,
  EligibilityContent,
  FAQContent,
  ContactContent,
} from '@/types/content';
import type { FormBuilderState } from '@/types/form';
import type { AppSettings, EventInfo, AdminProfile } from '@/types/event';
import {
  defaultHero,
  defaultThumbnail,
  defaultAbout,
  defaultRounds,
  defaultTimeline,
  defaultEligibility,
  defaultFAQ,
  defaultContact,
  defaultForm,
  defaultSettings,
  defaultEvent,
  defaultAdmin,
} from '@/lib/mock-data';

interface CMSState {
  hero: HeroContent;
  thumbnail: ThumbnailMedia;
  about: AboutContent;
  rounds: RoundsContent;
  timeline: TimelineContent;
  eligibility: EligibilityContent;
  faq: FAQContent;
  contact: ContactContent;
  form: FormBuilderState;
  settings: AppSettings;
  event: EventInfo;
  admin: AdminProfile;
}

interface CMSContextValue extends CMSState {
  updateHero: (v: Partial<HeroContent>) => void;
  updateThumbnail: (v: Partial<ThumbnailMedia>) => void;
  updateAbout: (v: Partial<AboutContent>) => void;
  updateRounds: (v: Partial<RoundsContent>) => void;
  updateTimeline: (v: Partial<TimelineContent>) => void;
  updateEligibility: (v: Partial<EligibilityContent>) => void;
  updateFAQ: (v: Partial<FAQContent>) => void;
  updateContact: (v: Partial<ContactContent>) => void;
  updateForm: (v: Partial<FormBuilderState>) => void;
  updateSettings: (v: Partial<AppSettings>) => void;
  updateEvent: (v: Partial<EventInfo>) => void;
  updateAdmin: (v: Partial<AdminProfile>) => void;
  resetAll: () => void;
}

const STORAGE_KEY = 'circuithack-cms-v1';

const defaultState: CMSState = {
  hero: defaultHero,
  thumbnail: defaultThumbnail,
  about: defaultAbout,
  rounds: defaultRounds,
  timeline: defaultTimeline,
  eligibility: defaultEligibility,
  faq: defaultFAQ,
  contact: defaultContact,
  form: defaultForm,
  settings: defaultSettings,
  event: defaultEvent,
  admin: defaultAdmin,
};

const CMSContext = createContext<CMSContextValue | null>(null);

export function CMSProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CMSState>(defaultState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setState((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state, hydrated]);

  const patch = useCallback(<K extends keyof CMSState>(key: K, value: Partial<CMSState[K]>) => {
    setState((prev) => ({ ...prev, [key]: { ...prev[key], ...value } }));
  }, []);

  const value: CMSContextValue = {
    ...state,
    updateHero: (v) => patch('hero', v),
    updateThumbnail: (v) => patch('thumbnail', v),
    updateAbout: (v) => patch('about', v),
    updateRounds: (v) => patch('rounds', v),
    updateTimeline: (v) => patch('timeline', v),
    updateEligibility: (v) => patch('eligibility', v),
    updateFAQ: (v) => patch('faq', v),
    updateContact: (v) => patch('contact', v),
    updateForm: (v) => patch('form', v),
    updateSettings: (v) => patch('settings', v),
    updateEvent: (v) => patch('event', v),
    updateAdmin: (v) => patch('admin', v),
    resetAll: () => {
      localStorage.removeItem(STORAGE_KEY);
      setState(defaultState);
    },
  };

  return <CMSContext.Provider value={value}>{children}</CMSContext.Provider>;
}

export function useCMS() {
  const ctx = useContext(CMSContext);
  if (!ctx) throw new Error('useCMS must be used within CMSProvider');
  return ctx;
}