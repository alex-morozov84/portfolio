import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { Process } from '@/components/Process';
import { ProjectsGrid } from '@/components/ProjectsGrid';
import { FAQ } from '@/components/FAQ';
import { ContactForm } from '@/components/ContactForm';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Services />
      <ProjectsGrid />
      <Process />
      <FAQ />
      <ContactForm />
    </>
  );
}
