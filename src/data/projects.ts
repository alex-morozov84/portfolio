export interface Project {
  id: string;
  translationKey: string;
  stack: Array<{
    name: string;
    color: string;
  }>;
  demoUrl: string;
  liveUrl?: string;
  images: string[];
  gradient: string;
  accentColor: string;
}

export const projects: Project[] = [
  {
    id: 'crm1',
    translationKey: 'crm1',
    stack: [
      { name: 'Next.js', color: 'from-gray-900 to-gray-700' },
      { name: 'NestJS', color: 'from-red-600 to-red-500' },
      { name: 'PostgreSQL', color: 'from-blue-700 to-blue-500' },
      { name: 'Redis', color: 'from-red-700 to-red-500' },
    ],
    demoUrl: 'https://crm.alex-morozov.com',
    images: ['/images/crm1-1.png', '/images/crm1-2.png', '/images/crm1-3.png'],
    gradient: 'from-violet-600/20 via-purple-600/10 to-fuchsia-600/20',
    accentColor: 'violet',
  },
  {
    id: 'crm2',
    translationKey: 'crm2',
    stack: [
      { name: 'React', color: 'from-cyan-500 to-cyan-400' },
      { name: 'NestJS', color: 'from-red-600 to-red-500' },
      { name: 'PostgreSQL', color: 'from-blue-700 to-blue-500' },
      { name: 'Redis', color: 'from-red-700 to-red-500' },
    ],
    demoUrl: 'https://service.alex-morozov.com',
    images: ['/images/crm2-1.png', '/images/crm2-2.png', '/images/crm2-3.png'],
    gradient: 'from-blue-600/20 via-indigo-600/10 to-violet-600/20',
    accentColor: 'blue',
  },
  {
    id: 'theater',
    translationKey: 'theater',
    stack: [
      { name: 'Next.js', color: 'from-gray-900 to-gray-700' },
      { name: 'Tailwind', color: 'from-teal-500 to-cyan-500' },
      { name: 'PostgreSQL', color: 'from-blue-700 to-blue-500' },
    ],
    demoUrl: 'https://theater.alex-morozov.com',
    liveUrl: 'https://theater-example.ru',
    images: ['/images/theater-1.png', '/images/theater-2.png', '/images/theater-3.png'],
    gradient: 'from-amber-500/20 via-orange-500/10 to-rose-500/20',
    accentColor: 'amber',
  },
  {
    id: 'payment',
    translationKey: 'payment',
    stack: [
      { name: 'React', color: 'from-cyan-500 to-cyan-400' },
      { name: 'NestJS', color: 'from-red-600 to-red-500' },
      { name: 'PostgreSQL', color: 'from-blue-700 to-blue-500' },
      { name: 'Redis', color: 'from-red-700 to-red-500' },
    ],
    demoUrl: 'https://pay.alex-morozov.com',
    images: ['/images/pay-1.png', '/images/pay-2.png', '/images/pay-3.png'],
    gradient: 'from-emerald-500/20 via-teal-500/10 to-cyan-500/20',
    accentColor: 'emerald',
  },
];

export const contacts = {
  emails: ['mail@alex-morozov.com', 'mail@alex-morozov.ru'],
  telegram: 'https://t.me/NapishiMneNapishi',
  github: 'https://github.com/alex-morozov84',
};
