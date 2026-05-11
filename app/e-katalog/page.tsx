import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import PageHeader from '@/components/public/PageHeader';
import styles from './catalogs.module.css';
import Image from 'next/image';

const CATALOGS = [
  { title: 'Genel Ürün Kataloğu', file: 'albert-genau-2023.pdf', cover: '/images/catalogs/urun-katalogu.png' },
  { title: 'Bioklimatik Pergola', file: 'bioklimatik-pergola.pdf', cover: '/images/catalogs/bioklimatik-pergola.png' },
  { title: 'Hareketli Cephe Sistemleri', file: 'hareketli-cephe.pdf', cover: '/images/catalogs/hareketli-cephe.png' },
  { title: 'Giyotin Cam Sistemleri', file: 'giyotin-cam-sistemleri.pdf', cover: '/images/catalogs/giyotin-sistem.png' },
  { title: 'SlideMaster Sürme Sistem', file: 'slidemaster-surme.pdf', cover: '/images/catalogs/isicamli-surme.png' },
  { title: 'Yeni Nesil Cam Balkon', file: 'yeni-nesil-cam-balkon.pdf', cover: '/images/catalogs/yeni-nesil-cam-balkon.png' },
  { title: 'Isıcamlı Cam Balkon', file: 'tiara-twinmax.pdf', cover: '/images/catalogs/isicamli-balkon.png' },
];

export default function CatalogsPage() {
  return (
    <main>
      <Navbar />
      <PageHeader title="E-Katalog" subtitle="Ürünlerimizi Detaylı İnceleyin" />
      
      <section className={styles.section}>
        <div className="container">
          <div className={styles.grid}>
            {CATALOGS.map((cat, i) => (
              <a 
                key={i} 
                href={`/catalogs/${cat.file}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.card}
              >
                <div className={styles.coverWrapper}>
                  <Image src={cat.cover} alt={cat.title} fill className={styles.cover} />
                  <div className={styles.overlay}>
                    <span className={styles.btn}>ŞİMDİ OKU</span>
                  </div>
                </div>
                <div className={styles.info}>
                  <h3 className={styles.cardTitle}>{cat.title}</h3>
                  <p className={styles.cardSubtitle}>PDF Kataloğu</p>
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
