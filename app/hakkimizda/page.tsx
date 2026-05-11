import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import PageHeader from '@/components/public/PageHeader';
import AboutSection from '@/components/public/AboutSection';
import Image from 'next/image';
import styles from './hakkimizda.module.css';

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <PageHeader title="Hakkımızda" subtitle="15 Yıllık Deneyim & Güven" />
      
      {/* ORIGINAL ABOUT SECTION (Restored as requested) */}
      <AboutSection content={{
        sectionTitle: 'Hikayemiz',
        heading: 'Sektörün Öncü\nÇözüm Ortağı',
        body: 'Çağdaş Pro Yapı olarak 15 yıldır Silivri merkezli tüm Türkiye\'ye Albert Genau kalitesini taşıyoruz. Profesyonel ekibimiz ve müşteri odaklı yaklaşımımızla yaşam alanlarınıza değer katıyoruz.',
        stats: [
          { value: '15', label: 'Yıl Deneyim' },
          { value: '500', label: 'Proje' },
          { value: '12', label: 'Uzman Ekip' },
          { value: '100', label: 'Memnuniyet' }
        ],
        hideButton: true // Hid the "Daha Fazlası" button here as requested
      }} />

      {/* NEW PREMIUM STORY SECTIONS */}
      <section className={styles.storySection} style={{ paddingTop: '2rem' }}>
        <div className="container">
          <div className={styles.storyGrid}>
            <div className={styles.storyContent}>
              <h2>Camın Alüminyumla Sanatsal Buluşması</h2>
              <p>
                Çağdaş Pro Yapı olarak 15 yılı aşkın süredir, yaşam alanlarınızı daha geniş, daha aydınlık ve daha konforlu hale getirmek için çalışıyoruz. Silivri merkezli kurulan şirketimiz, bugün tüm Türkiye'ye Albert Genau'nun premium kalitesini taşıyan lider uygulayıcı bayilerden biri konumundadır.
              </p>
              <p>
                Bir cam balkondan veya kış bahçesinden çok daha fazlasını inşa ediyoruz. Doğanın güzelliğini dört mevsim evinize taşıyan, zorlu hava koşullarına meydan okuyan ve mimari estetiği kusursuzlaştıran özel yaşam alanları tasarlıyoruz. Her bir projemizde mühendislik disiplinini ve zanaatkar hassasiyetini bir araya getiriyoruz.
              </p>
              <p>
                Güvenlik, yalıtım ve şıklık bizim için birer opsiyon değil, standarttır.
              </p>
            </div>
            <div className={styles.storyImageWrap}>
              <Image 
                src="/images/products/katlanir_balkon_hero_v4.jpg" 
                alt="Çağdaş Pro Yapı Hikayesi" 
                fill 
                quality={90}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className={styles.valuesSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Temel Değerlerimiz</h2>
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <i className={`fas fa-award ${styles.valueIcon}`}></i>
              <h3>Ödün Verilmeyen Kalite</h3>
              <p>Albert Genau kalitesini Avrupa standartlarındaki montaj işçiliğimizle birleştiriyor, sıfır hata prensibiyle projelerimizi teslim ediyoruz.</p>
            </div>
            <div className={styles.valueCard}>
              <i className={`fas fa-handshake ${styles.valueIcon}`}></i>
              <h3>Koşulsuz Güven</h3>
              <p>Satış öncesi ve sonrası sunduğumuz şeffaf süreç yönetimi, garanti belgeli ürünlerimizle müşterilerimizle ömürlük bir güven inşa ediyoruz.</p>
            </div>
            <div className={styles.valueCard}>
              <i className={`fas fa-leaf ${styles.valueIcon}`}></i>
              <h3>Estetik ve İnovasyon</h3>
              <p>Teknolojiyi yakından takip eden uzman ekibimizle, modern mimarinin gereksinimlerini karşılayan estetik tasarımlara imza atıyoruz.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className={styles.missionVision}>
        <div className="container">
          <div className={styles.mvGrid}>
            <div className={styles.mvBox}>
              <h3>Vizyonumuz</h3>
              <p>
                Türkiye'nin her köşesinde, mimari yapılara değer katan ve insanların yaşam konforunu artıran yenilikçi cam sistemleri uygulamalarında akla gelen ilk, en güvenilir marka olmak. Geleceğin mimarisini bugünden balkonlarınıza taşımak.
              </p>
            </div>
            <div className={styles.mvBox}>
              <h3>Misyonumuz</h3>
              <p>
                En ileri teknolojiyi ve en dayanıklı malzemeleri (Albert Genau) kullanarak, estetikten ödün vermeden, müşteri beklentilerinin de ötesinde, tam zamanında ve kusursuz işçilikle teslim edilen projeler üretmek. Mutlu yuvalar ve ferah çalışma alanları inşa etmek.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
