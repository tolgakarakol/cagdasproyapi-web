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

import { usePathname } from 'next/navigation';

export default function LivePreviewWrapper({ initialSections }: { initialSections: any[] }) {
  const [sections, setSections] = useState(initialSections);
  const pathname = usePathname();

  useEffect(() => {
    const isLive = typeof window !== 'undefined' && window.location.search.includes('live=true');
    if (!isLive) return;

    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'LIVE_PREVIEW_UPDATE') {
        setSections(event.data.sections);
      }
    };
    window.addEventListener('message', handleMessage);

    // CSS injection for hover border outline and inline edit indicators
    const style = document.createElement('style');
    style.innerHTML = `
      [data-section-id] h1, [data-section-id] h2, [data-section-id] h3, 
      [data-section-id] h4, [data-section-id] p, [data-section-id] span, 
      [data-section-id] button, [data-section-id] a:not([href^="#"]) {
        outline: 1px dashed transparent;
        transition: outline 0.15s ease, outline-color 0.15s ease;
      }
      [data-section-id] h1:hover, [data-section-id] h2:hover, [data-section-id] h3:hover, 
      [data-section-id] h4:hover, [data-section-id] p:hover, [data-section-id] span:hover, 
      [data-section-id] button:hover, [data-section-id] a:not([href^="#"]):hover {
        outline: 2px dashed #c8960c !important;
        outline-offset: 4px;
        cursor: pointer;
      }
      .inline-edit-active {
        outline: 2px solid #c8960c !important;
        background: rgba(200, 150, 12, 0.08) !important;
        cursor: text !important;
      }
    `;
    document.head.appendChild(style);

    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const sectionEl = target.closest('[data-section-id]');
      if (!sectionEl) return;

      // Handle text tags
      const editableTags = ['H1', 'H2', 'H3', 'H4', 'P', 'SPAN', 'A', 'BUTTON'];
      if (editableTags.includes(target.tagName)) {
        if (target.classList.contains('inline-edit-active')) return;

        e.preventDefault();
        e.stopPropagation();

        const originalText = target.innerText.trim();
        target.setAttribute('contenteditable', 'true');
        target.classList.add('inline-edit-active');
        target.focus();

        const handleBlur = () => {
          target.removeAttribute('contenteditable');
          target.classList.remove('inline-edit-active');
          const newText = target.innerText.trim();

          if (newText !== originalText) {
            const sectionId = sectionEl.getAttribute('data-section-id');
            window.parent.postMessage({
              type: 'INLINE_TEXT_UPDATE',
              sectionId,
              originalText,
              newText
            }, '*');
          }
          target.removeEventListener('blur', handleBlur);
        };
        target.addEventListener('blur', handleBlur);
      }

      // Handle Image tags
      if (target.tagName === 'IMG') {
        e.preventDefault();
        e.stopPropagation();

        const originalSrc = target.getAttribute('src') || '';
        const newSrc = prompt('Yeni görsel (resim) adresini giriniz:', originalSrc);
        if (newSrc !== null && newSrc.trim() !== '' && newSrc !== originalSrc) {
          const sectionId = sectionEl.getAttribute('data-section-id');
          window.parent.postMessage({
            type: 'INLINE_IMAGE_UPDATE',
            sectionId,
            originalSrc,
            newSrc: newSrc.trim()
          }, '*');
        }
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG') {
        const sectionEl = target.closest('[data-section-id]');
        if (sectionEl) {
          target.style.outline = '2px dashed #c8960c';
          target.style.outlineOffset = '2px';
          target.style.cursor = 'pointer';
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG') {
        target.style.outline = '';
      }
    };

    document.addEventListener('click', handleDocumentClick, true);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('message', handleMessage);
      document.removeEventListener('click', handleDocumentClick, true);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      style.remove();
    };
  }, []);

  const heroSection = sections.find((s: any) => s.type === 'hero_slider');
  const otherSections = sections.filter((s: any) => s.type !== 'hero_slider' && s.isVisible !== false);

  const isHome = pathname === '/';

  return (
    <>
      {heroSection && (
        <div data-section-id={heroSection._id}>
          <HeroSlider slides={heroSection.content?.slides || []} />
        </div>
      )}
      {otherSections.map((section: any) => {
        const Component = SECTION_MAP[section.type];
        if (!Component) return null;
        if (isHome && (section.type === 'contact' || section.type === 'quote_form')) return null;
        if (section.type === 'products_grid') {
          return (
            <div key={section._id || section.type} data-section-id={section._id}>
              <Component content={section.content} />
              <Testimonials />
            </div>
          );
        }
        return (
          <div key={section._id || section.type} data-section-id={section._id}>
            <Component content={section.content} />
          </div>
        );
      })}
    </>
  );
}
