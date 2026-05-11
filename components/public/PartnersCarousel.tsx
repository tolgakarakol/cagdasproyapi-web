'use client';
import styles from './PartnersCarousel.module.css';

const PARTNERS = [
  { name: 'Albert Genau', url: 'https://www.albertgenau.com', color: '#8B0000' },
  { name: 'Kömmerling', url: 'https://www.kommerling.com.tr', color: '#FFD700' },
  { name: 'Ege Pen', url: 'https://www.egepen.com', color: '#003087' },
  { name: 'Deceuninck', url: 'https://www.deceuninck.com.tr', color: '#0066CC' },
  { name: 'Pimapen', url: 'https://www.pimapen.com.tr', color: '#CC0000' },
  { name: 'Winsa', url: 'https://www.winsa.com.tr', color: '#006400' },
  { name: 'Schüco', url: 'https://www.schueco.com/tr', color: '#003366' },
  { name: 'Asaş', url: 'https://www.asas.com.tr', color: '#CC0000' },
];

// Sonsuz akış için üç kat çoğalt
const TRIPLED = [...PARTNERS, ...PARTNERS, ...PARTNERS];

export default function PartnersCarousel({ content }: { content?: any }) {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <p className={styles.label}>ÇÖZÜM ORTAKLARIMIZ</p>
        <h2 className={styles.title}>Güvenilir Markalar</h2>
      </div>

      <div className={styles.track}>
        <div className={styles.inner}>
          {TRIPLED.map((p, i) => (
            <a
              key={i}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.brand}
            >
              <span className={styles.brandName} style={{ color: p.color }}>
                {p.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
