import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
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
        'en': 'https://alex-morozov.com/en',
        'ru': 'https://alex-morozov.com/ru',
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
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Alexander Morozov',
    alternateName: isRussian ? 'Александр Морозов' : undefined,
    url: 'https://alex-morozov.com',
    jobTitle: isRussian ? 'Full-Stack разработчик' : 'Full-Stack Developer',
    description: isRussian
      ? 'Разработка CRM-систем, веб-приложений и платёжных интеграций'
      : 'Building CRM systems, web applications, and payment integrations',
    sameAs: [
      'https://github.com/alex-morozov84',
      'https://t.me/NapishiMneNapishi',
    ],
    email: ['mail@alex-morozov.com', 'mail@alex-morozov.ru'],
    knowsAbout: [
      'React',
      'Next.js',
      'TypeScript',
      'NestJS',
      'PostgreSQL',
      'Redis',
      'CRM Development',
      'Web Development',
    ],
  };
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
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getJsonLd(locale)) }}
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#0a0a0a" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
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
      </body>
    </html>
  );
}
