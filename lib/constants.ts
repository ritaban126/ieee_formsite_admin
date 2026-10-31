export const NAV_SECTIONS: {
  label: string;
  items: { label: string; href: string; icon: string }[];
}[] = [
  {
    label: 'Overview',
    items: [{ label: 'Dashboard', href: '/admin', icon: 'LayoutDashboard' }],
  },
  {
    label: 'Website Management',
    items: [
      { label: 'Hero Section', href: '/admin/hero', icon: 'PanelsTopLeft' },
      { label: 'Thumbnail & Media', href: '/admin/thumbnail', icon: 'Image' },
      { label: 'About', href: '/admin/about', icon: 'Info' },
      { label: 'Rounds', href: '/admin/rounds', icon: 'Layers' },
      { label: 'Timeline', href: '/admin/timeline', icon: 'CalendarClock' },
      { label: 'Eligibility', href: '/admin/eligibility', icon: 'CheckCircle' },
      { label: 'FAQ', href: '/admin/faq', icon: 'HelpCircle' },
      { label: 'Contact', href: '/admin/contact', icon: 'Mail' },
    ],
  },
  {
    label: 'Application Management',
    items: [
      { label: 'Form Builder', href: '/admin/form-builder', icon: 'FormInput' },
      { label: 'Registrations', href: '/admin/registrations', icon: 'Users' },
      {
        label: 'Application Settings',
        href: '/admin/application-settings',
        icon: 'Settings2',
      },
    ],
  },
  {
    label: 'System',
    items: [
      { label: 'Website Preview', href: '/admin/preview', icon: 'Eye' },
      { label: 'Settings', href: '/admin/settings', icon: 'Settings' },
    ],
  },
];

export const FIELD_TYPE_META: Record<
  string,
  { label: string; icon: string; description: string }
> = {
  short: { label: 'Short Answer', icon: 'Type', description: 'Single-line text input' },
  long: { label: 'Long Answer', icon: 'AlignLeft', description: 'Multi-line text area' },
  email: { label: 'Email', icon: 'AtSign', description: 'Validated email address' },
  phone: { label: 'Phone', icon: 'Phone', description: 'Phone number input' },
  number: { label: 'Number', icon: 'Hash', description: 'Numeric input' },
  dropdown: { label: 'Dropdown', icon: 'ChevronDown', description: 'Single select list' },
  multiple: { label: 'Multiple Choice', icon: 'CircleDot', description: 'Radio button list' },
  checkboxes: { label: 'Checkboxes', icon: 'CheckSquare', description: 'Multi-select list' },
  date: { label: 'Date', icon: 'Calendar', description: 'Date picker' },
  file: { label: 'File Upload', icon: 'Upload', description: 'File attachment' },
  yesno: { label: 'Yes/No', icon: 'ToggleLeft', description: 'Binary choice' },
  heading: { label: 'Section Heading', icon: 'Heading', description: 'Visual divider' },
  description: { label: 'Description Block', icon: 'TextCursor', description: 'Static text block' },
};

export const BRANCH_OPTIONS = [
  'Computer Science',
  'Information Technology',
  'Electrical Engineering',
  'Electronics and Communication',
  'Mechanical Engineering',
  'Civil Engineering',
  'Other',
];

export const YEAR_OPTIONS = ['1st', '2nd', '3rd', '4th'];

export const ICON_OPTIONS: { value: string; label: string }[] = [
  { value: 'mail', label: 'Mail' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'twitter', label: 'Twitter' },
  { value: 'github', label: 'GitHub' },
  { value: 'globe', label: 'Globe' },
];

export const DIFFICULTY_OPTIONS = ['Easy', 'Medium', 'Hard'] as const;
