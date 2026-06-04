import { setRequestLocale } from 'next-intl/server';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import BrandBar from '@/components/BrandBar';
import About from '@/components/About';
import Menu from '@/components/Menu';
import Story from '@/components/Story';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import Visit from '@/components/Visit';
import Access from '@/components/Access';
import Footer from '@/components/Footer';

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <BrandBar />
        <About />
        <Menu />
        <Story />
        <Gallery />
        <Reviews />
        <Visit />
        <Access />
      </main>
      <Footer />
    </>
  );
}
