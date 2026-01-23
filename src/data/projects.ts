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
  featureStyle: string;
  titleStyle: string;
  accentColor: string;
}

export const projects: Project[] = [
  {
    id: 'cavextable',
    translationKey: 'cavextable',
    stack: [
      { name: 'Next.js', color: 'from-gray-900 to-gray-700' },
      { name: 'TypeScript', color: 'from-blue-600 to-blue-500' },
      { name: 'NestJS', color: 'from-red-600 to-red-500' },
      { name: 'PostgreSQL', color: 'from-blue-700 to-blue-500' },
      { name: 'Redis', color: 'from-red-700 to-red-500' },
      { name: 'Prisma', color: 'from-emerald-600 to-teal-500' },
      { name: 'Zustand', color: 'from-amber-600 to-yellow-500' },
      { name: 'Docker', color: 'from-sky-600 to-sky-500' },
    ],
    demoUrl: 'https://cavextable.alex-morozov.com',
    images: [
      '/images/cavextable/cavextable1.webp',
      '/images/cavextable/cavextable2.webp',
      '/images/cavextable/cavextable3.webp',
      '/images/cavextable/cavextable4.webp',
      '/images/cavextable/cavextable5.webp',
      '/images/cavextable/cavextable6.webp',
      '/images/cavextable/cavextable7.webp',
      '/images/cavextable/cavextable8.webp',
    ],
    gradient: 'from-violet-600/20 via-purple-600/10 to-fuchsia-600/20',
    featureStyle: 'bg-violet-500/20 text-foreground',
    titleStyle: 'from-violet-500 via-purple-400 to-fuchsia-500',
    accentColor: 'violet',
  },
  {
    id: 'theater',
    translationKey: 'theater',
    stack: [
      { name: 'Next.js', color: 'from-gray-900 to-gray-700' },
      { name: 'TypeScript', color: 'from-blue-600 to-blue-500' },
      { name: 'Strapi', color: 'from-indigo-600 to-indigo-500' },
      { name: 'PostgreSQL', color: 'from-blue-700 to-blue-500' },
      { name: 'TanStack Query', color: 'from-orange-500 to-amber-500' },
      { name: 'Zustand', color: 'from-amber-600 to-yellow-500' },
      { name: 'Tailwind', color: 'from-teal-500 to-cyan-500' },
      { name: 'Docker', color: 'from-sky-600 to-sky-500' },
    ],
    demoUrl: 'https://udmteatr.alex-morozov.com',
    liveUrl: 'https://udmteatr.ru',
    images: [
      '/images/udmteatr/udmteatr1.webp',
      '/images/udmteatr/udmteatr2.webp',
      '/images/udmteatr/udmteatr3.webp',
      '/images/udmteatr/udmteatr4.webp',
      '/images/udmteatr/udmteatr5.webp',
    ],
    gradient: 'from-amber-500/20 via-orange-500/10 to-rose-500/20',
    featureStyle: 'bg-amber-500/20 text-foreground',
    titleStyle: 'from-amber-500 via-orange-400 to-rose-500',
    accentColor: 'amber',
  },
  {
    id: 'manipeni',
    translationKey: 'manipeni',
    stack: [
      { name: 'React', color: 'from-cyan-500 to-cyan-400' },
      { name: 'TypeScript', color: 'from-blue-600 to-blue-500' },
      { name: 'Express', color: 'from-gray-700 to-gray-600' },
      { name: 'PostgreSQL', color: 'from-blue-700 to-blue-500' },
      { name: 'Prisma', color: 'from-emerald-600 to-teal-500' },
      { name: 'TanStack Query', color: 'from-orange-500 to-amber-500' },
      { name: 'Zustand', color: 'from-amber-600 to-yellow-500' },
      { name: 'Zod', color: 'from-blue-500 to-indigo-500' },
      { name: 'Turborepo', color: 'from-rose-600 to-pink-500' },
      { name: 'AWS S3', color: 'from-orange-600 to-orange-500' },
    ],
    demoUrl: 'https://mani-peni.alex-morozov.com',
    images: [
      '/images/mani-peni/mani-peni1.webp',
      '/images/mani-peni/mani-peni2.webp',
      '/images/mani-peni/mani-peni3.webp',
      '/images/mani-peni/mani-peni4.webp',
      '/images/mani-peni/mani-peni5.webp',
      '/images/mani-peni/mani-peni6.webp',
      '/images/mani-peni/mani-peni7.webp',
      '/images/mani-peni/mani-peni8.webp',
      '/images/mani-peni/mani-peni9.webp',
    ],
    gradient: 'from-rose-500/20 via-pink-500/10 to-fuchsia-500/20',
    featureStyle: 'bg-rose-500/20 text-foreground',
    titleStyle: 'from-rose-500 via-pink-400 to-fuchsia-500',
    accentColor: 'rose',
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
    featureStyle: 'bg-blue-500/20 text-foreground',
    titleStyle: 'from-blue-500 via-indigo-400 to-violet-500',
    accentColor: 'blue',
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
    featureStyle: 'bg-emerald-500/20 text-foreground',
    titleStyle: 'from-emerald-500 via-teal-400 to-cyan-500',
    accentColor: 'emerald',
  },
];

export const contacts = {
  emails: ['mail@alex-morozov.com', 'mail@alex-morozov.ru'],
  telegram: 'https://t.me/NapishiMneNapishi',
  github: 'https://github.com/alex-morozov84',
};
