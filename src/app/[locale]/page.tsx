import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { ProjectsGrid } from '@/components/ProjectsGrid';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Services />
      <ProjectsGrid />
    </>
  );
}
