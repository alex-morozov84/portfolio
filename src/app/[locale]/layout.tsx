import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';
import { YandexMetrika } from '@/components/YandexMetrika';
import { routing } from '@/i18n/routing';
import '../globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin', 'cyrillic'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin', 'cyrillic'],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const messages = (await import(`../../../messages/${locale}.json`)).default;

  const isRussian = locale === 'ru';

  return {
    metadataBase: new URL('https://alex-morozov.com'),
    title: messages.meta.title,
    description: messages.meta.description,
    keywords: isRussian
      ? 'full-stack разработчик, веб-разработка, CRM системы, React, Next.js, NestJS, фриланс, портфолио'
      : 'full-stack developer, web development, CRM systems, React, Next.js, NestJS, freelance, portfolio',
    authors: [{ name: 'Alexander Morozov' }],
    creator: 'Alexander Morozov',
    openGraph: {
      title: messages.meta.title,
      description: messages.meta.description,
      url: 'https://alex-morozov.com',
      siteName: 'Alexander Morozov Portfolio',
      locale: locale === 'ru' ? 'ru_RU' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: messages.meta.title,
      description: messages.meta.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: 'https://alex-morozov.com',
      languages: {
        en: 'https://alex-morozov.com/en',
        ru: 'https://alex-morozov.com/ru',
      },
    },
  };
}

const themeScript = `
  (function() {
    const theme = localStorage.getItem('theme') || 'dark';
    document.documentElement.classList.add(theme);
  })();
`;

function getJsonLd(locale: string) {
  const isRussian = locale === 'ru';

  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Alexander Morozov',
    alternateName: isRussian ? 'Александр Морозов' : undefined,
    url: 'https://alex-morozov.com',
    jobTitle: isRussian ? 'Full-Stack разработчик' : 'Full-Stack Developer',
    description: isRussian
      ? 'Разработка CRM-систем, корпоративных сайтов и веб-приложений на заказ. React, Next.js, Node.js.'
      : 'Custom CRM systems, corporate websites, and web applications. React, Next.js, Node.js.',
    sameAs: ['https://github.com/alex-morozov84', 'https://t.me/NapishiMneNapishi'],
    email: isRussian ? 'mail@alex-morozov.ru' : 'mail@alex-morozov.com',
    knowsAbout: [
      'React',
      'Next.js',
      'TypeScript',
      'Node.js',
      'NestJS',
      'Express',
      'PostgreSQL',
      'Redis',
      'Docker',
      'Strapi',
      'CRM Development',
      'Web Development',
    ],
  };

  const faqItems = isRussian
    ? [
        {
          question: 'Какие технологии вы используете?',
          answer:
            'Фронтенд: React и Next.js. Бэкенд: Node.js с NestJS или Express, для контентных сайтов — Strapi CMS. База данных: PostgreSQL, кеширование через Redis, полнотекстовый поиск. Интеграции: Telegram-боты, SMS-рассылки, платёжные системы, AI-сервисы. Контейнеризация Docker, CI/CD. Весь код на TypeScript.',
        },
        {
          question: 'Сколько времени занимает разработка?',
          answer:
            'Лендинг или небольшой сайт — от 1-2 недель. CRM-система средней сложности — 2-3 месяца. Сроки зависят от объёма функционала и оперативности согласований.',
        },
        {
          question: 'Как формируется стоимость?',
          answer:
            'Оцениваю проект после изучения требований. Работаю по фиксированной цене за проект или по часовой ставке для долгосрочного сотрудничества. Предоплата 30-50%, остаток после сдачи.',
        },
        {
          question: 'Есть ли поддержка после запуска?',
          answer:
            'Да, предоставляю гарантийную поддержку 1-3 месяца после запуска. Исправление багов бесплатно. Также предлагаю долгосрочную поддержку: доработки, обновления, мониторинг.',
        },
        {
          question: 'Как происходит коммуникация?',
          answer:
            'Общаемся в Telegram или по email. Еженедельные созвоны для демонстрации прогресса. Для каждого проекта разворачиваю тестовую версию на отдельном домене.',
        },
      ]
    : [
        {
          question: 'What technologies do you use?',
          answer:
            'Frontend: React and Next.js. Backend: Node.js with NestJS or Express, Strapi CMS for content sites. Database: PostgreSQL, Redis caching, full-text search. Integrations: Telegram bots, SMS, payment systems, AI services. Docker containerization, CI/CD. All code in TypeScript.',
        },
        {
          question: 'How long does development take?',
          answer:
            'Landing page or small website — 1-2 weeks. Medium complexity CRM system — 2-3 months. Timeline depends on functionality scope and approval speed.',
        },
        {
          question: 'How is pricing determined?',
          answer:
            'I estimate after reviewing requirements. Work on fixed price per project or hourly rate for long-term collaboration. 30-50% upfront, remainder upon completion.',
        },
        {
          question: 'Is there support after launch?',
          answer:
            'Yes, I provide 1-3 months warranty support after launch. Bug fixes are free. Also offer long-term support: improvements, updates, monitoring.',
        },
        {
          question: 'How does communication work?',
          answer:
            'We communicate via Telegram or email. Weekly calls for progress demos. For each project I deploy a test version on a separate domain.',
        },
      ];

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return [person, faq];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getJsonLd(locale)) }}
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#8b5cf6" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <div className="min-h-screen flex flex-col relative overflow-hidden">
              {/* Background gradient */}
              <div className="fixed inset-0 -z-10">
                <div className="absolute top-0 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-[120px]" />
                <div className="absolute top-40 -right-40 w-96 h-96 bg-violet-600/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-fuchsia-500/10 rounded-full blur-[120px]" />
              </div>
              <Header />
              <main className="container mx-auto px-4 relative flex-1 pt-20 pb-16">{children}</main>
              <Footer />
              <ScrollToTop />
            </div>
          </NextIntlClientProvider>
        </ThemeProvider>
        <YandexMetrika />
      </body>
    </html>
  );
}
