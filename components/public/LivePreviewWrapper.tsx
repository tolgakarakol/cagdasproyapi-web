'use client';
import { useState, useEffect } from 'react';
import HeroSlider from './HeroSlider';
import ProductsGrid from './ProductsGrid';
import GuaranteeBand from './GuaranteeBand';
import AboutSection from './AboutSection';
import PartnersCarousel from './PartnersCarousel';
import CatalogSection from './CatalogSection';
import HapBilgiler from './HapBilgiler';
import QuoteForm from './QuoteForm';
import ContactSection from './ContactSection';
import Testimonials from './Testimonials';

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

export default function LivePreviewWrapper({ initialSections }: { initialSections: any[] }) {
  const [sections, setSections] = useState(initialSections);

  useEffect(() => {
    const isLive = window.location.search.includes('live=true');
    if (!isLive) return;

    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'LIVE_PREVIEW_UPDATE') {
        setSections(event.data.sections);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const heroSection = sections.find((s: any) => s.type === 'hero_slider');
  const otherSections = sections.filter((s: any) => s.type !== 'hero_slider' && s.isVisible !== false);

  return (
    <>
      {heroSection && <HeroSlider slides={heroSection.content?.slides || []} />}
      {otherSections.map((section: any) => {
        const Component = SECTION_MAP[section.type];
        if (!Component || section.type === 'contact' || section.type === 'quote_form') return null;
        if (section.type === 'products_grid') {
          return (
            <div key={section._id || section.type}>
              <Component content={section.content} />
              <Testimonials />
            </div>
          );
        }
        return <Component key={section._id || section.type} content={section.content} />;
      })}
    </>
  );
}
