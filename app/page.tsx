import { connectDB } from '@/lib/mongodb';
import { Section } from '@/models/Section';
import Navbar from '@/components/public/Navbar';
import HeroSlider from '@/components/public/HeroSlider';
import ProductsGrid from '@/components/public/ProductsGrid';
import GuaranteeBand from '@/components/public/GuaranteeBand';
import AboutSection from '@/components/public/AboutSection';
import PartnersCarousel from '@/components/public/PartnersCarousel';
import CatalogSection from '@/components/public/CatalogSection';
import HapBilgiler from '@/components/public/HapBilgiler';
import QuoteForm from '@/components/public/QuoteForm';
import ContactSection from '@/components/public/ContactSection';
import Footer from '@/components/public/Footer';
import WhatsAppFloat from '@/components/public/WhatsAppFloat';
import Testimonials from '@/components/public/Testimonials';

const SECTION_MAP: Record<string, React.ComponentType<{ content: any }>> = {
  products_grid: ProductsGrid,
  guarantee_band: GuaranteeBand,
  about: AboutSection,
  partners: PartnersCarousel,
  catalogs: CatalogSection,
  hap_bilgiler: HapBilgiler,
  quote_form: QuoteForm,
  contact: ContactSection,
};

export const revalidate = 60;

import { INITIAL_SECTIONS } from '@/lib/initialData';

async function getSections() {
  try {
    await connectDB();
    const sections = await Section.find({ pageSlug: 'home', isVisible: true }).sort({ order: 1 }).lean();
    if (sections && sections.length > 0) {
      return JSON.parse(JSON.stringify(sections));
    }
    return INITIAL_SECTIONS;
  } catch (error) {
    console.warn('DB error, using initial data fallback');
    return INITIAL_SECTIONS;
  }
}

export default async function HomePage() {
  const sections = await getSections();

  const heroSection = sections.find((s: any) => s.type === 'hero_slider');
  const otherSections = sections.filter((s: any) => s.type !== 'hero_slider');

  return (
    <>
      <Navbar />
      {heroSection && <HeroSlider slides={heroSection.content?.slides || []} />}
      {otherSections.map((section: any) => {
        const Component = SECTION_MAP[section.type];
        if (!Component || section.type === 'contact' || section.type === 'quote_form') return null;
        if (section.type === 'products_grid') {
          return (
            <div key={section._id}>
              <Component content={section.content} />
              <Testimonials />
            </div>
          );
        }
        return <Component key={section._id} content={section.content} />;
      })}
      <PartnersCarousel />
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
