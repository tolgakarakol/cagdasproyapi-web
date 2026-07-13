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
    const conn = await connectDB();
    if (!conn) {
      console.warn('DB connection failed/inactive, using initial data fallback');
      return INITIAL_SECTIONS;
    }

    // Auto-migrate old images in DB to the new giyotin-balkon-banner.png
    try {
      await Section.updateMany(
        { pageSlug: 'home', type: 'hero_slider', 'content.slides.image': '/images/slides/slider_bioklimatik.png' },
        { $set: { 'content.slides.$[elem].image': '/images/biyoklimatik-balkon.png' } },
        { arrayFilters: [{ 'elem.image': '/images/slides/slider_bioklimatik.png' }] }
      );
      await Section.updateMany(
        { pageSlug: 'home', type: 'hero_slider', 'content.slides.image': '/images/products/panoromik-yatay.png' },
        { $set: { 'content.slides.$[elem].image': '/images/giyotin-balkon-banner.png' } },
        { arrayFilters: [{ 'elem.image': '/images/products/panoromik-yatay.png' }] }
      );
      await Section.updateMany(
        { pageSlug: 'home', type: 'hero_slider', 'content.slides.image': '/images/slides/giyotin-balkon.jpg' },
        { $set: { 'content.slides.$[elem].image': '/images/giyotin-balkon-banner.png' } },
        { arrayFilters: [{ 'elem.image': '/images/slides/giyotin-balkon.jpg' }] }
      );
      await Section.updateMany(
        { pageSlug: 'home', type: 'hero_slider', 'content.slides.image': '/images/giyotin-cam-balkon.png' },
        { $set: { 'content.slides.$[elem].image': '/images/giyotin-balkon-banner.png' } },
        { arrayFilters: [{ 'elem.image': '/images/giyotin-cam-balkon.png' }] }
      );
    } catch (dbErr) {
      console.warn('Migration warning:', dbErr);
    }

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

import LivePreviewWrapper from '@/components/public/LivePreviewWrapper';

export default async function HomePage() {
  const sections = await getSections();

  return (
    <>
      <Navbar />
      <LivePreviewWrapper initialSections={sections} />
      <PartnersCarousel />
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
