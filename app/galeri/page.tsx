'use client';
import { useState, useRef } from 'react';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import PageHeader from '@/components/public/PageHeader';
import Image from 'next/image';
import styles from './galeri.module.css';

import { PRODUCT_DATA } from '@/app/urunler/[slug]/ProductClient';

const MENU_CATEGORIES = [
  { id: 'giyotin-tam-balkon', title: 'Giyotin Tam Balkon' },
  { id: 'tiara-08-10', title: 'Katlanır - Sürme Cam Balkon' },
  { id: 'bioklimatik-pergola', title: 'Bioklimatik Pergola' },
  { id: 'ruzgar-kirici-sistem', title: 'Rüzgar Kırıcı Sistem' },
  { id: 'kis-bahcesi', title: 'Çelik Konstrüksiyon & Kış Bahçesi' },
  { id: 'dusakabin', title: 'Duşakabin Sistemleri' },
  { id: 'cam-kapi', title: 'Cam Kapı Sistemleri' },
  { id: 'kompozit-cephe-sistemleri', title: 'Kompozit Cephe Sistemleri' },
  { id: 'pvc-cam-sistemleri', title: 'PVC Cam Sistemleri' },
  { id: 'kupeste-modelleri', title: 'Küpeşte Modelleri' },
];

const GALLERY_DATA = MENU_CATEGORIES.map(category => {
  const product = PRODUCT_DATA[category.id];
  const imageSet = new Set<string>();

  if (product) {
    if (product.heroImg) imageSet.add(product.heroImg);
    if (product.safetyImg) imageSet.add(product.safetyImg);
    if (product.cleaningImg) imageSet.add(product.cleaningImg);
    if (product.features) {
      product.features.forEach((f: any) => {
        if (f.img) imageSet.add(f.img);
      });
    }
    if (product.sections) {
      product.sections.forEach((s: any) => {
        if (s.image) imageSet.add(s.image);
      });
    }
  }

  // Tiara Twinmax görsellerini de katlanır balkona ekleyelim
  if (category.id === 'tiara-08-10') {
    const twinmax = PRODUCT_DATA['tiara-twinmax'];
    if (twinmax) {
      if (twinmax.heroImg) imageSet.add(twinmax.heroImg);
      if (twinmax.safetyImg) imageSet.add(twinmax.safetyImg);
      if (twinmax.cleaningImg) imageSet.add(twinmax.cleaningImg);
      if (twinmax.features) {
        twinmax.features.forEach((f: any) => {
          if (f.img) imageSet.add(f.img);
        });
      }
    }
  }

  return {
    title: category.title,
    images: Array.from(imageSet).filter(Boolean).map(src => ({
      src: src as string,
      alt: `${category.title} Uygulaması`
    }))
  };
}).filter(section => section.images.length > 0);

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

export default function GalleryPage() {
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
      <PageHeader
        title="Galeri"
        subtitle="Çağdaş Pro Yapı kalitesiyle hayata geçirilen premium projelerimiz"
      />

      <section className={styles.galleryPage}>
        <div className={styles.container}>
          {GALLERY_DATA.map((section, sectionIdx) => (
            <GallerySection
              key={sectionIdx}
              title={section.title}
              images={section.images}
              onImageClick={openLightbox}
            />
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
