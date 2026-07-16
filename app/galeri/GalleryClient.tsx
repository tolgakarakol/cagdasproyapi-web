'use client';
import { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import LivePreviewWrapper from '@/components/public/LivePreviewWrapper';
import Image from 'next/image';
import styles from './galeri.module.css';

interface GallerySectionProps {
  title: string;
  images: { src: string; alt: string }[];
  onImageClick: (src: string, alt: string) => void;
  isLive?: boolean;
}

function GallerySection({ title, images, onImageClick, isLive }: GallerySectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.clientWidth;
      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={styles.gallerySection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{title}</h2>
      </div>
      <div className={styles.sliderWrapper}>
        <button
          className={`${styles.navBtn} ${styles.prevBtn}`}
          onClick={() => scroll('left')}
          aria-label="Önceki görseller"
        >
          <i className="fas fa-chevron-left" />
        </button>

        <div className={styles.sliderContainer} ref={containerRef}>
          {images.map((img, imgIdx) => (
            <div
              key={imgIdx}
              className={styles.slide}
              onClick={() => {
                if (!isLive) onImageClick(img.src, img.alt);
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                quality={85}
                style={{ objectFit: 'cover' }}
              />
              <div className={styles.imageOverlay} style={isLive ? { pointerEvents: 'none' } : undefined}>
                <i className={`fas fa-magnifying-glass-plus ${styles.zoomIcon}`} style={isLive ? { pointerEvents: 'none' } : undefined} />
              </div>
            </div>
          ))}
        </div>

        <button
          className={`${styles.navBtn} ${styles.nextBtn}`}
          onClick={() => scroll('right')}
          aria-label="Sonraki görseller"
        >
          <i className="fas fa-chevron-right" />
        </button>
      </div>
    </div>
  );
}

export default function GalleryClient({ galleryData, headerSection }: { galleryData: any[]; headerSection: any }) {
  const [localGalleryData, setLocalGalleryData] = useState(galleryData);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedAlt, setSelectedAlt] = useState<string>('');
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    setIsLive(typeof window !== 'undefined' && window.location.search.includes('live=true'));
    
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'LIVE_PREVIEW_UPDATE') {
        const updatedGallerySections = event.data.sections
          .filter((s: any) => s.type === 'gallery_group')
          .map((group: any) => {
            const content = group.content || {};
            const imagesList = content.images || [];
            return {
              sectionId: group._id,
              title: content.title || group.title,
              images: imagesList.filter(Boolean).map((src: string) => ({
                src,
                alt: `${content.title || group.title} Görseli`
              }))
            };
          });
          
        if (updatedGallerySections.length > 0) {
          setLocalGalleryData(updatedGallerySections);
        }
      }
      if (event.data && event.data.type === 'SCROLL_TO_SECTION') {
        const el = document.querySelector(`[data-section-id="${event.data.sectionId}"]`) as HTMLElement;
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          el.style.outline = '3px dashed #c8960c';
          el.style.outlineOffset = '-3px';
          setTimeout(() => {
            el.style.outline = '';
            el.style.outlineOffset = '';
          }, 2000);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const openLightbox = (src: string, alt: string) => {
    setSelectedImage(src);
    setSelectedAlt(alt);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setSelectedAlt('');
    document.body.style.overflow = 'unset';
  };

  return (
    <main>
      <Navbar />
      <LivePreviewWrapper initialSections={[headerSection].filter(Boolean)} />

      <section className={styles.galleryPage}>
        <div className={styles.container}>
          {localGalleryData.map((section, sectionIdx) => (
            <div key={section.sectionId || sectionIdx} data-section-id={section.sectionId}>
              <GallerySection
                title={section.title}
                images={section.images}
                onImageClick={openLightbox}
                isLive={isLive}
              />
            </div>
          ))}
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {selectedImage && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={closeLightbox} aria-label="Kapat">
              <i className="fas fa-times" />
            </button>
            <img
              src={selectedImage}
              alt={selectedAlt}
              className={styles.lightboxImage}
            />
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
