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
import type { Applicant } from '@/types/registration';
import type { AppSettings, EventInfo, AdminProfile } from '@/types/event';

export const defaultHero: HeroContent = {
  kicker: 'IEEE HIT SB presents',
  title: 'CircuitHack 2026',
  tagline: 'Build. Break. Ship. 24 hours to prove it.',
  format: '24-hour hackathon',
  mode: 'Offline',
  startDate: '2026-11-09',
  endDate: '2026-11-10',
  venue: 'HIT Auditorium',
  daysLeft: 6,
  applyLabel: 'Apply now',
  applyUrl: '#apply',
  learnMoreLabel: 'Learn more',
  learnMoreUrl: '#about',
};

export const defaultThumbnail: ThumbnailMedia = {
  imageUrl: '',
  altText: 'CircuitHack 2026 banner',
  caption: 'CircuitHack 2026 — 24-hour hardware hackathon',
  position: 'center',
  fileName: '',
  fileSize: 0,
};

export const defaultAbout: AboutContent = {
  heading: 'What is CircuitHack?',
  description:
    "CircuitHack is IEEE HIT Student Branch's flagship 24-hour hackathon. Over one weekend, 150 students form teams, pick a track, and build something real — from first commit to final demo.\n\nMentors from industry walk the floor the entire time. We provide the workspace, the food, the Wi-Fi, and the caffeine. You bring the ideas, the laptop, and the energy. No experience required — just curiosity.\n\nEvery team presents to a jury on Sunday morning. The best builds win prizes, mentorship credits, and a fast-track into IEEE HIT SB's technical teams for the year.",
  features: [
    {
      id: 'f1',
      icon: 'Clock',
      title: '24 hours, one shot',
      description:
        'A single uninterrupted build sprint from Saturday morning to Sunday.',
    },
    {
      id: 'f2',
      icon: 'Users',
      title: '150 builders',
      description: 'A curated cohort of students across years and branches.',
    },
    {
      id: 'f3',
      icon: 'Trophy',
      title: 'Prizes & mentorship',
      description:
        'Cash prizes, plus fast-track into IEEE HIT SB technical teams.',
    },
  ],
};

export const defaultRounds: RoundsContent = {
  heading: 'Three circuits. One bench. Build them all.',
  description:
    'Every team builds three different circuits, one after another. Components are provided at the venue.',
  rounds: [
    {
      id: 'r1',
      order: 1,
      title: 'LED Blinker',
      description:
        'Build an astable 555 timer circuit that blinks an LED at the given rate.',
      duration: '30 min',
      teamSize: 2,
      difficulty: 'Easy',
    },
    {
      id: 'r2',
      order: 2,
      title: 'Automatic Night Lamp',
      description:
        'Use an LDR and a transistor so the lamp switches on by itself when it gets dark.',
      duration: '45 min',
      teamSize: 2,
      difficulty: 'Medium',
    },
    {
      id: 'r3',
      order: 3,
      title: 'Mystery Circuit',
      description:
        'A schematic is handed over on the spot. Read it, build it, and make it work.',
      duration: '45 min',
      teamSize: 2,
      difficulty: 'Hard',
    },
  ],
  perks: [
    'Certificate for every participant.',
    'Winners and runners-up featured on our site.',
    'Hands-on time with real components.',
  ],
  judgedOn: ['Working circuit', 'Time taken', 'Clean wiring'],
};

export const defaultTimeline: TimelineContent = {
  heading: 'From application to demo.',
  description: 'Key dates for CircuitHack 2026. All times in IST.',
  items: [
    {
      id: 't1',
      order: 1,
      title: 'Applications close',
      date: '2026-11-06',
      time: '23:59',
      description: 'Submit your application before the deadline.',
    },
    {
      id: 't2',
      order: 2,
      title: 'Interview',
      date: '2026-11-07',
      time: '16:00',
      description: 'Shortlisted applicants meet the team — a short, friendly chat.',
    },
    {
      id: 't3',
      order: 3,
      title: 'Results announced',
      date: '2026-11-08',
      time: '10:00',
      description: 'Selected participants are notified by email.',
    },
    {
      id: 't4',
      order: 4,
      title: 'Hackathon begins',
      date: '2026-11-09',
      time: '09:00',
      description: 'Check-in opens at the venue. Bring your laptop and charger.',
    },
    {
      id: 't5',
      order: 5,
      title: 'Hackathon ends',
      date: '2026-11-10',
      time: '09:00',
      description: 'Final demos and jury presentations. Awards follow.',
    },
  ],
};

export const defaultEligibility: EligibilityContent = {
  heading: 'Who can apply',
  description: 'Read through these before you apply. They are firm.',
  requirements: [
    'You are a current student of HIT (any year, any branch).',
    'You can attend both days of the event in person.',
    'You are 18 years or older, or have parental consent.',
    'You agree to the IEEE code of conduct and hackathon rules.',
    'First-time hackers are welcome — no prior experience required.',
  ],
};

export const defaultFAQ: FAQContent = {
  heading: 'Frequently asked questions',
  description:
    'If something is not covered here, reach out — see the Contact section below.',
  items: [
    {
      id: 'q1',
      order: 1,
      question: 'Do I need a team before I apply?',
      answer:
        'No. You apply as an individual. Teams are formed on the morning of the event.',
    },
    {
      id: 'q2',
      order: 2,
      question: 'Is there a registration fee?',
      answer: 'No. CircuitHack is completely free for all selected participants.',
    },
    {
      id: 'q3',
      order: 3,
      question: 'What should I bring?',
      answer:
        'Your laptop, charger, and any hardware you want to use. Components and tools are provided at the venue.',
    },
    {
      id: 'q4',
      order: 4,
      question: 'Can first-time hackers participate?',
      answer:
        'Absolutely. No prior experience is required — only curiosity. Mentors will be on the floor.',
    },
    {
      id: 'q5',
      order: 5,
      question: 'How are selections made?',
      answer:
        'Applications are reviewed by the organising team, followed by a short, friendly interview.',
    },
    {
      id: 'q6',
      order: 6,
      question: 'What if I cannot attend both days?',
      answer:
        'Attendance on both days is mandatory. If you cannot commit, please apply next year.',
    },
  ],
};

export const defaultContact: ContactContent = {
  heading: 'Questions? Reach us.',
  description: 'We usually reply within 24 hours on weekdays.',
  links: [
    {
      id: 'l1',
      label: 'Email',
      value: 'ieee.sb@hit.edu.in',
      url: 'mailto:ieee.sb@hit.edu.in',
      icon: 'mail',
    },
    {
      id: 'l2',
      label: 'Instagram',
      value: '@ieeehitsb',
      url: 'https://instagram.com/ieeehitsb',
      icon: 'instagram',
    },
    {
      id: 'l3',
      label: 'LinkedIn',
      value: 'IEEE HIT SB',
      url: 'https://linkedin.com/company/ieee-hit-student-branch',
      icon: 'linkedin',
    },
  ],
  persons: [
    {
      id: 'p1',
      name: 'Arya Sharma',
      role: 'Event Lead',
      phone: '+91 98765 43210',
      email: 'arya@hit.edu.in',
      imageUrl: '',
      whatsapp: true,
      visible: true,
    },
    {
      id: 'p2',
      name: 'Rohit Das',
      role: 'Technical Lead',
      phone: '+91 98123 45678',
      email: 'rohit@hit.edu.in',
      imageUrl: '',
      whatsapp: false,
      visible: true,
    },
  ],
};

export const defaultForm: FormBuilderState = {
  title: 'CircuitHack 2026 — Application Form',
  sections: [
    {
      id: 's1',
      title: 'Personal',
      fields: [
        { id: 'f1', type: 'short', label: 'Full name', required: true, placeholder: 'Your full name' },
        { id: 'f2', type: 'email', label: 'College email', required: true, placeholder: 'you@hit.edu.in' },
        { id: 'f3', type: 'phone', label: 'Phone', required: true, placeholder: '+91 98765 43210' },
      ],
    },
    {
      id: 's2',
      title: 'Education',
      fields: [
        { id: 'f4', type: 'short', label: 'College', required: true, defaultValue: 'Haldia Institute of Technology' },
        {
          id: 'f5',
          type: 'dropdown',
          label: 'Branch',
          required: true,
          options: [
            { id: 'o1', label: 'Computer Science' },
            { id: 'o2', label: 'Information Technology' },
            { id: 'o3', label: 'Electrical Engineering' },
            { id: 'o4', label: 'Electronics and Communication' },
            { id: 'o5', label: 'Mechanical Engineering' },
            { id: 'o6', label: 'Civil Engineering' },
            { id: 'o7', label: 'Other' },
          ],
        },
        {
          id: 'f6',
          type: 'dropdown',
          label: 'Year',
          required: true,
          options: [
            { id: 'y1', label: '1st' },
            { id: 'y2', label: '2nd' },
            { id: 'y3', label: '3rd' },
            { id: 'y4', label: '4th' },
          ],
        },
        { id: 'f7', type: 'short', label: 'Roll number', required: true, placeholder: 'e.g. 20CS0123' },
      ],
    },
    {
      id: 's3',
      title: 'Questions',
      fields: [
        { id: 'f8', type: 'long', label: 'Why do you want to join CircuitHack?', required: true, placeholder: 'Tell us your motivation' },
        { id: 'f9', type: 'long', label: 'Relevant experience / projects', required: true, placeholder: 'Links or descriptions' },
        { id: 'f10', type: 'yesno', label: 'Can you attend both days of the event?', required: true },
      ],
    },
  ],
};

export const defaultSettings: AppSettings = {
  registrationOpen: true,
  openingDate: '2026-10-15',
  closingDate: '2026-11-06',
  registrationLimit: 150,
  maxTeamSize: 2,
  confirmationMessage:
    'Thanks for applying! We will review your application and reach out within 3 days.',
  successPageContent:
    "Your application has been submitted. Watch your inbox — we'll be in touch soon.",
  autosave: true,
  requiredFields: ['name', 'email', 'phone', 'college', 'branch', 'year', 'roll', 'whyJoin', 'experience', 'canAttend'],
};

export const defaultEvent: EventInfo = {
  name: 'CircuitHack',
  year: '2026',
  organization: 'IEEE HIT Student Branch',
  websiteUrl: 'https://circuithack.ieeehitsb.org',
};

export const defaultAdmin: AdminProfile = {
  name: 'Admin User',
  email: 'admin@ieeehitsb.org',
  role: 'Event Organizer',
  avatarUrl: '',
};

export const mockApplicants: Applicant[] = [
  { id: 'a1', name: 'Ananya Verma', email: 'ananya.v@hit.edu.in', phone: '+91 90000 11111', college: 'Haldia Institute of Technology', branch: 'Computer Science', year: '3rd', rollNumber: '20CS012', submittedAt: '2026-10-22 14:32', status: 'approved', whyJoin: 'I love building circuits and want hands-on hardware experience.', experience: 'Built an Arduino line follower, college robotics club member.', canAttendBoth: 'Yes' },
  { id: 'a2', name: 'Karthik Rao', email: 'karthik.r@hit.edu.in', phone: '+91 90000 22222', college: 'Haldia Institute of Technology', branch: 'Electronics and Communication', year: '2nd', rollNumber: '21EC087', submittedAt: '2026-10-22 16:10', status: 'pending', whyJoin: 'Want to learn hardware beyond textbooks.', experience: 'Minor project on 555 timer circuits.', canAttendBoth: 'Yes' },
  { id: 'a3', name: 'Sneha Iyer', email: 'sneha.i@hit.edu.in', phone: '+91 90000 33333', college: 'Haldia Institute of Technology', branch: 'Information Technology', year: '4th', rollNumber: '19IT054', submittedAt: '2026-10-23 09:15', status: 'approved', whyJoin: 'Final year — last chance to participate.', experience: 'IoT project with ESP32, two hackathons attended.', canAttendBoth: 'Yes' },
  { id: 'a4', name: 'Devansh Mehta', email: 'devansh.m@hit.edu.in', phone: '+91 90000 44444', college: 'Haldia Institute of Technology', branch: 'Electrical Engineering', year: '1st', rollNumber: '22EE031', submittedAt: '2026-10-23 11:40', status: 'pending', whyJoin: 'Excited to learn soldering and prototyping.', experience: 'None — first hackathon.', canAttendBoth: 'Yes' },
  { id: 'a5', name: 'Priya Nair', email: 'priya.n@hit.edu.in', phone: '+91 90000 55555', college: 'Haldia Institute of Technology', branch: 'Computer Science', year: '3rd', rollNumber: '20CS099', submittedAt: '2026-10-23 18:05', status: 'rejected', whyJoin: 'Curious about embedded systems.', experience: 'RPi-based weather station.', canAttendBoth: 'No' },
  { id: 'a6', name: 'Arjun Pillai', email: 'arjun.p@hit.edu.in', phone: '+91 90000 66666', college: 'Haldia Institute of Technology', branch: 'Electronics and Communication', year: '3rd', rollNumber: '20EC042', submittedAt: '2026-10-24 10:22', status: 'approved', whyJoin: 'Hardware is where the magic is.', experience: 'Built a Bluetooth speaker from scratch.', canAttendBoth: 'Yes' },
  { id: 'a7', name: 'Meera Joshi', email: 'meera.j@hit.edu.in', phone: '+91 90000 77777', college: 'Haldia Institute of Technology', branch: 'Electrical Engineering', year: '2nd', rollNumber: '21EE076', submittedAt: '2026-10-24 13:50', status: 'pending', whyJoin: 'Want to test myself under pressure.', experience: 'Lab work on op-amps and filters.', canAttendBoth: 'Yes' },
  { id: 'a8', name: 'Vivaan Gupta', email: 'vivaan.g@hit.edu.in', phone: '+91 90000 88888', college: 'Haldia Institute of Technology', branch: 'Computer Science', year: '1st', rollNumber: '22CS018', submittedAt: '2026-10-25 08:30', status: 'incomplete', whyJoin: '', experience: '', canAttendBoth: 'Yes' },
  { id: 'a9', name: 'Ishita Banerjee', email: 'ishita.b@hit.edu.in', phone: '+91 90000 99999', college: 'Haldia Institute of Technology', branch: 'Information Technology', year: '4th', rollNumber: '19IT101', submittedAt: '2026-10-25 15:45', status: 'approved', whyJoin: 'Hardware + software bridge is what I want.', experience: 'Three national hackathons, MQTT dashboard project.', canAttendBoth: 'Yes' },
  { id: 'a10', name: 'Rahul Sengupta', email: 'rahul.s@hit.edu.in', phone: '+91 91111 00000', college: 'Haldia Institute of Technology', branch: 'Mechanical Engineering', year: '2nd', rollNumber: '21ME064', submittedAt: '2026-10-25 19:12', status: 'pending', whyJoin: 'Cross-disciplinary interest in mechatronics.', experience: 'Arduino-controlled robotic arm.', canAttendBoth: 'Yes' },
  { id: 'a11', name: 'Tara Krishnan', email: 'tara.k@hit.edu.in', phone: '+91 91111 11111', college: 'Haldia Institute of Technology', branch: 'Electronics and Communication', year: '3rd', rollNumber: '20EC115', submittedAt: '2026-10-26 09:05', status: 'approved', whyJoin: 'CircuitHack is the best hardware event in the region.', experience: 'Internship at PCB fab, two robotics competitions.', canAttendBoth: 'Yes' },
  { id: 'a12', name: 'Neel Agarwal', email: 'neel.a@hit.edu.in', phone: '+91 91111 22222', college: 'Haldia Institute of Technology', branch: 'Computer Science', year: '2nd', rollNumber: '21CS049', submittedAt: '2026-10-26 11:30', status: 'pending', whyJoin: 'Want to build, not just simulate.', experience: 'Mentored a junior college electronics workshop.', canAttendBoth: 'Yes' },
];

export const applicationTrendData = [
  { date: 'Oct 15', applications: 8 },
  { date: 'Oct 17', applications: 15 },
  { date: 'Oct 19', applications: 22 },
  { date: 'Oct 21', applications: 41 },
  { date: 'Oct 23', applications: 63 },
  { date: 'Oct 25', applications: 89 },
  { date: 'Oct 27', applications: 112 },
  { date: 'Oct 29', applications: 134 },
  { date: 'Oct 31', applications: 152 },
];

export const statusDistributionData = [
  { name: 'Approved', value: 76, color: 'hsl(var(--success))' },
  { name: 'Pending', value: 48, color: 'hsl(var(--warning))' },
  { name: 'Rejected', value: 14, color: 'hsl(var(--destructive))' },
  { name: 'Incomplete', value: 14, color: 'hsl(var(--muted-foreground))' },
];

export const visitorsData = [
  { date: 'Oct 24', visitors: 420 },
  { date: 'Oct 25', visitors: 510 },
  { date: 'Oct 26', visitors: 680 },
  { date: 'Oct 27', visitors: 590 },
  { date: 'Oct 28', visitors: 720 },
  { date: 'Oct 29', visitors: 810 },
  { date: 'Oct 30', visitors: 950 },
];

export const sectionStatuses = [
  { section: 'Hero Section', status: 'Published', href: '/admin/hero' },
  { section: 'Thumbnail & Media', status: 'Draft', href: '/admin/thumbnail' },
  { section: 'About', status: 'Published', href: '/admin/about' },
  { section: 'Rounds', status: 'Published', href: '/admin/rounds' },
  { section: 'Timeline', status: 'Published', href: '/admin/timeline' },
  { section: 'Eligibility', status: 'Published', href: '/admin/eligibility' },
  { section: 'FAQ', status: 'Published', href: '/admin/faq' },
  { section: 'Contact', status: 'Published', href: '/admin/contact' },
];
