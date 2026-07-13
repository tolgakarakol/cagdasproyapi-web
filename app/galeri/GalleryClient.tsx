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
}

function GallerySection({ title, images, onImageClick }: GallerySectionProps) {
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
              onClick={() => onImageClick(img.src, img.alt)}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                quality={85}
                style={{ objectFit: 'cover' }}
              />
              <div className={styles.imageOverlay}>
                <i className={`fas fa-magnifying-glass-plus ${styles.zoomIcon}`} />
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedAlt, setSelectedAlt] = useState<string>('');

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
      <LivePreviewWrapper initialSections={[headerSection]} />

      <section className={styles.galleryPage}>
        <div className={styles.container}>
          {galleryData.map((section, sectionIdx) => (
            <div key={section.sectionId || sectionIdx} data-section-id={section.sectionId}>
              <GallerySection
                title={section.title}
                images={section.images}
                onImageClick={openLightbox}
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
