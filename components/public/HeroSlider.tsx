'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import styles from './HeroSlider.module.css';

interface Slide { image: string; title: string; subtitle: string; ctaText: string; ctaLink: string; }

export default function HeroSlider({ slides }: { slides: Slide[] }) {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = useCallback((index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent(index);
    setTimeout(() => setIsAnimating(false), 700);
  }, [isAnimating]);

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, slides.length, goTo]);
  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, slides.length, goTo]);

  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next]);

  if (!slides?.length) return null;

  return (
    <section className={styles.slider} id="anasayfa">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`${styles.slide} ${i === current ? styles.active : ''}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className={styles.overlay} />
          <div className={styles.content}>
            <div className={`${styles.text} ${i === current ? styles.textActive : ''}`}>
              <span className={styles.badge}>Albert Genau Üretici Bayisi</span>
              <h1 className={styles.title}>{slide.title}</h1>
              <p className={styles.subtitle}>{slide.subtitle}</p>
              <div className={styles.ctas}>
                <Link href={slide.ctaLink} className="btn btn-primary">
                  {slide.ctaText || 'Ücretsiz Teklif Al'}
                </Link>
                <Link href="/urunler" className="btn btn-outline" style={{ color: '#fff', borderColor: '#fff' }}>
                  TÜM ÜRÜNLERİ GÖR
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={prev} aria-label="Önceki">
        <i className="fas fa-chevron-left" />
      </button>
      <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={next} aria-label="Sonraki">
        <i className="fas fa-chevron-right" />
      </button>

      <div className={styles.dots}>
        {slides.map((_, i) => (
          <button key={i} className={`${styles.dot} ${i === current ? styles.dotActive : ''}`} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`} />
        ))}
      </div>

      <div className={styles.scrollHint}>
        <span>Aşağı Kaydır</span>
        <i className="fas fa-chevron-down" />
      </div>
    </section>
  );
}
