'use client';
import { useState, useRef } from 'react';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import PageHeader from '@/components/public/PageHeader';
import Image from 'next/image';
import styles from './galeri.module.css';

const GALLERY_DATA = [
  {
    title: 'Giyotin Tam Balkon',
    images: [
      { src: '/images/products/giyotin_final.jpg', alt: 'Giyotin Tam Balkon Uygulaması 1' },
      { src: '/images/products/giyotin_hero.png', alt: 'Giyotin Tam Balkon Uygulaması 2' },
      { src: '/images/products/giyotin_panoramic.png', alt: 'Giyotin Tam Balkon Uygulaması 3' }
    ]
  },
  {
    title: 'Katlanır - Sürme Cam Balkon',
    images: [
      { src: '/images/products/katlanir-sistem-balkon.png', alt: 'Katlanır - Sürme Cam Balkon Uygulaması 1' },
      { src: '/images/products/katlanir_isicamli.jpg', alt: 'Katlanır - Sürme Cam Balkon Uygulaması 2' },
      { src: '/images/products/katlanir_tek_camli.jpg', alt: 'Katlanır - Sürme Cam Balkon Uygulaması 3' }
    ]
  },
  {
    title: 'Bioklimatik Pergola',
    images: [
      { src: '/images/products/pergola_final.jpg', alt: 'Bioklimatik Pergola Uygulaması 1' },
      { src: '/images/slides/bioklimatik.jpg', alt: 'Bioklimatik Pergola Uygulaması 2' },
      { src: '/images/slides/slider_bioklimatik.png', alt: 'Bioklimatik Pergola Uygulaması 3' }
    ]
  },
  {
    title: 'Rüzgar Kırıcı Sistem',
    images: [
      { src: '/images/products/ruzgar-kirici.png', alt: 'Rüzgar Kırıcı Sistem Uygulaması 1' },
      { src: '/images/products/airflex_safety_priority.png', alt: 'Rüzgar Kırıcı Sistem Uygulaması 2' },
      { src: '/images/products/giyotin_safety.png', alt: 'Rüzgar Kırıcı Sistem Uygulaması 3' }
    ]
  },
  {
    title: 'Çelik Konstrüksiyon & Kış Bahçesi',
    images: [
      { src: '/images/products/panoromik-yatay.png', alt: 'Çelik Konstrüksiyon & Kış Bahçesi Uygulaması 1' },
      { src: '/images/products/kis_bahcesi_hero.jpg', alt: 'Çelik Konstrüksiyon & Kış Bahçesi Uygulaması 2' },
      { src: '/images/products/celik_tasiyici_govde.png', alt: 'Çelik Konstrüksiyon & Kış Bahçesi Uygulaması 3' }
    ]
  },
  {
    title: 'Duşakabin Sistemleri',
    images: [
      { src: '/images/products/dusakabin_hero_hq.jpg', alt: 'Duşakabin Sistemleri Uygulaması 1' },
      { src: '/images/products/dusakabin_clean.png', alt: 'Duşakabin Sistemleri Uygulaması 2' },
      { src: '/images/products/dusakabin_safe.png', alt: 'Duşakabin Sistemleri Uygulaması 3' }
    ]
  },
  {
    title: 'Cam Kapı Sistemleri',
    images: [
      { src: '/images/products/giyotin_panoramic.png', alt: 'Cam Kapı Sistemleri Uygulaması 1' },
      { src: '/images/products/giyotin_remote.png', alt: 'Cam Kapı Sistemleri Uygulaması 2' },
      { src: '/images/products/twinmax_clean.jpg', alt: 'Cam Kapı Sistemleri Uygulaması 3' }
    ]
  }
];

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
