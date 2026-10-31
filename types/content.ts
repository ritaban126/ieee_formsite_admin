export interface HeroContent {
  kicker: string;
  title: string;
  tagline: string;
  format: string;
  mode: string;
  startDate: string;
  endDate: string;
  venue: string;
  daysLeft: number;
  applyLabel: string;
  applyUrl: string;
  learnMoreLabel: string;
  learnMoreUrl: string;
}

export interface ThumbnailMedia {
  imageUrl: string;
  altText: string;
  caption: string;
  position: 'center' | 'left' | 'right' | 'top' | 'bottom';
  fileName: string;
  fileSize: number;
}

export interface FeatureCard {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface AboutContent {
  heading: string;
  description: string;
  features: FeatureCard[];
}

export interface Round {
  id: string;
  order: number;
  title: string;
  description: string;
  duration: string;
  teamSize: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface RoundsContent {
  heading: string;
  description: string;
  rounds: Round[];
  perks: string[];
  judgedOn: string[];
}

export interface TimelineItem {
  id: string;
  order: number;
  title: string;
  date: string;
  time: string;
  description: string;
}

export interface TimelineContent {
  heading: string;
  description: string;
  items: TimelineItem[];
}

export interface EligibilityContent {
  heading: string;
  description: string;
  requirements: string[];
}

export interface FAQItem {
  id: string;
  order: number;
  question: string;
  answer: string;
}

export interface FAQContent {
  heading: string;
  description: string;
  items: FAQItem[];
}

export interface ContactLink {
  id: string;
  label: string;
  value: string;
  url: string;
  icon: 'mail' | 'instagram' | 'linkedin' | 'twitter' | 'github' | 'globe';
}

export interface ContactPerson {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  imageUrl: string;
  whatsapp: boolean;
  visible: boolean;
}

export interface ContactContent {
  heading: string;
  description: string;
  links: ContactLink[];
  persons: ContactPerson[];
}
