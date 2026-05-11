import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import PageHeader from '@/components/public/PageHeader';
import styles from '../e-katalog/catalogs.module.css';
import Image from 'next/image';

const HAP_BILGILER = [
  { 
    title: 'SlideMaster Sürme Cambalkon', 
    file: 'slidemaster-surme.pdf', 
    cover: '/hap-bilgiler/covers/slidemaster-surme.png',
    subtitle: 'Albert Genau - SlideMaster'
  },
  { 
    title: 'Tambalkon Giyotin Cam', 
    file: 'tambalkon-giyotin.pdf', 
    cover: '/hap-bilgiler/covers/tambalkon-giyotin.png',
    subtitle: 'Albert Genau - Tambalkon'
  },
  { 
    title: 'Tiara Katlanır Cambalkon', 
    file: 'tiara-katlanir.pdf', 
    cover: '/hap-bilgiler/covers/tiara-katlanir.png',
    subtitle: 'Albert Genau - Tiara'
  },
  { 
    title: 'Cambalkon Seçim Rehberi', 
    file: 'cambalkon-rehberi.pdf', 
    cover: '/hap-bilgiler/covers/cambalkon-rehberi.png',
    subtitle: 'Dikkat Edilmesi Gerekenler'
  },
];

export default function HapBilgilerPage() {
  return (
    <main>
      <Navbar />
      <PageHeader title="Hap Bilgiler" subtitle="Pratik ve Teknik Bilgilendirmeler" />
      
      <section className={styles.section}>
        <div className="container">
          <div className={`${styles.grid} ${styles.twoByTwo}`}>
            {HAP_BILGILER.map((item, i) => (
              <a 
                key={i} 
                href={`/hap-bilgiler/${item.file}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.card}
              >
                <div className={styles.coverWrapper}>
                  <Image src={item.cover} alt={item.title} fill className={styles.cover} />
                  <div className={styles.overlay}>
                    <span className={styles.btn}>OKUMAYA BAŞLA</span>
                  </div>
                </div>
                <div className={styles.info}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardSubtitle}>{item.subtitle}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
