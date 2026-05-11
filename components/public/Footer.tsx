'use client';
import { useState } from 'react';
import styles from './Footer.module.css';
import Image from 'next/image';
import Link from 'next/link';
import LegalModal from './LegalModal';

const LEGAL_TEXTS = {
  kvkk: `
    <div style="font-family: 'Inter', sans-serif; line-height: 1.6; color: rgba(255,255,255,0.7);">
      <h3 style="color: #fff; margin-bottom: 20px; border-bottom: 2px solid #e31e24; display: inline-block;">6698 Sayılı KVKK Aydınlatma Metni</h3>
      <p><strong style="color: #fff;">Çağdaş Pro Yapı Alüminyum Sanayi Ticaret Limited Şirketi</strong> (Bundan sonra "Şirket" olarak anılacaktır) olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, veri sorumlusu sıfatıyla, kişisel verilerinizin aşağıda açıklanan amaçlar kapsamında işleneceğini ve korunacağını bildiririz.</p>
      
      <h4 style="color: #fff;">1. Kişisel Verilerin Hangi Amaçla İşleneceği</h4>
      <p>Kişisel verileriniz; Albert Genau yetkili bayisi olarak sunmuş olduğumuz cam balkon, pergola ve kış bahçesi sistemlerine ilişkin satış süreçlerinin yürütülmesi, satış sonrası teknik servis ve garanti hizmetlerinin sağlanması, müşteri memnuniyetine yönelik anket and analiz çalışmalarının yapılması, yasal yükümlülüklerin yerine getirilmesi amacıyla işlenmektedir.</p>

      <h4 style="color: #fff;">2. İşlenen Kişisel Verilerin Kimlere ve Hangi Amaçla Aktarılabileceği</h4>
      <p>Toplanan kişisel verileriniz; yukarıda belirtilen amaçların gerçekleştirilmesi doğrultusunda, Albert Genau (Şirket Merkezi), iş ortaklarımız, tedarikçilerimiz, kanunen yetkili kamu kurumları ve özel kişilerle KVKK’nın 8. ve 9. maddelerinde belirtilen kişisel veri işleme şartları ve amaçları çerçevesinde paylaşılabilecektir.</p>

      <h4 style="color: #fff;">3. Veri Sahibinin Hakları</h4>
      <p>KVKK’nın 11. maddesi uyarınca veri sahipleri; kişisel verilerinin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, verilerin amacına uygun kullanılıp kullanılmadığını öğrenme ve verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme haklarına sahiptir.</p>
    </div>
  `,
  privacy: `
    <div style="font-family: 'Inter', sans-serif; line-height: 1.6; color: rgba(255,255,255,0.7);">
      <h3 style="color: #fff; margin-bottom: 20px; border-bottom: 2px solid #e31e24; display: inline-block;">Gizlilik ve Veri Güvenliği Politikası</h3>
      <p>Bu Gizlilik Politikası, Çağdaş Pro Yapı web sitesini ziyaret eden kullanıcıların verilerinin nasıl toplandığını, kullanıldığını ve korunduğunu açıklamaktadır.</p>
      
      <h4 style="color: #fff;">Veri Toplama ve Kullanım</h4>
      <p>Web sitemiz üzerinden paylaştığınız ad, soyad, telefon numarası ve e-posta adresi gibi bilgiler; sadece tarafınızla iletişime geçmek, teklif sunmak ve hizmet taleplerinizi karşılamak amacıyla kullanılır. Bu bilgiler, yasal zorunluluklar haricinde asla üçüncü şahıslarla ticari amaçla paylaşılmaz.</p>

      <h4 style="color: #fff;">Güvenlik Önlemleri</h4>
      <p>Verilerinizin güvenliği için sitemiz endüstri standardı olan SSL (Secure Sockets Layer) sertifikası ile korunmaktadır. Sunucularımızda saklanan verilere erişim, sadece yetkili personel ile sınırlandırılmış ve periyodik olarak denetlenmektedir.</p>

      <h4 style="color: #fff;">Üçüncü Taraf Bağlantıları</h4>
      <p>Sitemiz içerisinde Albert Genau veya diğer iş ortaklarımıza ait bağlantılar bulunabilir. Bu sitelerin gizlilik politikalarından Çağdaş Pro Yapı sorumlu tutulamaz.</p>
    </div>
  `,
  cookies: `
    <div style="font-family: 'Inter', sans-serif; line-height: 1.6; color: rgba(255,255,255,0.7);">
      <h3 style="color: #fff; margin-bottom: 20px; border-bottom: 2px solid #e31e24; display: inline-block;">Çerez (Cookie) Politikası</h3>
      <p>Çağdaş Pro Yapı olarak, dijital mecralarımızı ziyaretiniz sırasında kullanıcı deneyiminizi geliştirmek amacıyla çerezler ve benzeri teknolojilerden faydalanmaktayız.</p>
      
      <h4 style="color: #fff;">Çerez Nedir?</h4>
      <p>Çerezler, ziyaret ettiğiniz internet siteleri tarafından tarayıcılar aracılığıyla cihazınıza veya ağ sunucusuna depolanan küçük metin dosyalarıdır.</p>

      <h4 style="color: #fff;">Hangi Tür Çerezleri Kullanıyoruz?</h4>
      <ul style="color: rgba(255,255,255,0.7);">
        <li><strong style="color: #fff;">Zorunlu Çerezler:</strong> Sitenin düzgün çalışması ve güvenlik özellikleri için gereklidir.</li>
        <li><strong style="color: #fff;">Performans Çerezleri:</strong> Sitenin nasıl kullanıldığını analiz ederek hizmet kalitemizi artırmamıza yardımcı olur.</li>
        <li><strong style="color: #fff;">Hedefleme Çerezleri:</strong> İlgi alanlarınıza yönelik içerikler sunmak amacıyla kullanılır.</li>
      </ul>

      <h4 style="color: #fff;">Çerezleri Nasıl Kontrol Edebilirsiniz?</h4>
      <p>Tarayıcınızın ayarlar kısmından çerezleri dilediğiniz zaman engelleyebilir veya silebilirsiniz. Ancak çerezlerin devre dışı bırakılması, sitemizdeki bazı özelliklerin tam performanslı çalışmasını engelleyebilir.</p>
    </div>
  `
};

export default function Footer() {
  const year = new Date().getFullYear();
  const [modal, setModal] = useState({ open: false, title: '', content: '' });

  const openLegal = (type: keyof typeof LEGAL_TEXTS, title: string) => {
    setModal({ open: true, title, content: LEGAL_TEXTS[type] });
  };

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <div className={styles.logoWrapper}>
              <Link href="/">
                <Image 
                  src="/images/cagdasproyapi_beyaz.png" 
                  alt="Çağdaş Pro Yapı" 
                  width={240} 
                  height={80} 
                  className={styles.footerLogo} 
                />
              </Link>
            </div>
            <p className={styles.brandText}>
              Albert Genau Yetkili Bayisi olarak cam balkon, bioklimatik pergola ve cam sistemlerinde premium çözümler sunuyoruz. 
              Mimari estetiği yüksek, konforlu ve uzun ömürlü yaşam alanları tasarlıyoruz.
            </p>
            <div className={styles.socials}>
              <a href="https://wa.me/905079165707" target="_blank" rel="noopener noreferrer" className={styles.socialLink}><i className="fab fa-whatsapp" /></a>
              <a href="https://instagram.com/albertgenau_cagdaspro" target="_blank" rel="noopener noreferrer" className={styles.socialLink}><i className="fab fa-instagram" /></a>
            </div>
          </div>
          <div className={styles.column}>
            <h5 className={styles.columnTitle}>Hızlı Linkler</h5>
            <ul className={styles.linkList}>
              {[
                { l: 'Anasayfa', h: '/' },
                { l: 'Hakkımızda', h: '/hakkimizda' },
                { l: 'Ürünlerimiz', h: '/urunler/giyotin-tam-balkon' },
                { l: 'E-Katalog', h: '/e-katalog' },
                { l: 'Hap Bilgiler', h: '/hap-bilgiler' },
                { l: 'İletişim', h: '/iletisim' }
              ].map((item) => (
                <li key={item.l}><Link href={item.h} className={styles.link}>{item.l}</Link></li>
              ))}
            </ul>
          </div>
          <div className={styles.column}>
            <h5 className={styles.columnTitle}>Ürünlerimiz</h5>
            <ul className={styles.linkList}>
              {[
                { name: 'Giyotin Tam Balkon', slug: 'giyotin-tam-balkon' },
                { name: 'Katlanır Cam Balkon', slug: 'katlanir-sistem-cam-balkon' },
                { name: 'Bioklimatik Pergola', slug: 'bioklimatik-pergola' },
                { name: 'Kış Bahçesi', slug: 'kis-bahcesi' },
                { name: 'Duşakabin', slug: 'dusakabin-sistemleri' }
              ].map(p => (
                <li key={p.slug}><Link href={`/urunler/${p.slug}`} className={styles.link}>{p.name}</Link></li>
              ))}
            </ul>
          </div>
          <div className={styles.column}>
            <h5 className={styles.columnTitle}>İletişim</h5>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}><i className="fa-regular fa-comment-dots" /><a href="tel:05079165707">0507 916 57 07</a></li>
              <li className={styles.contactItem}><i className="fa-regular fa-envelope" /><a href="mailto:info@cagdasproyapi.com">info@cagdasproyapi.com</a></li>
              <li className={styles.contactItem}><i className="fa-regular fa-map" /><span>Piri Mehmet Paşa Mah. Burhan Soyaslan Cad. No: 20/A Silivri / İstanbul</span></li>
              <li className={styles.contactItem}><i className="fa-regular fa-clock" /><span>Pzt–Cmt: 09:00–19:00</span></li>
            </ul>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.bottomInfo}>
            <p>© {year} Çağdaş Pro Yapı — Tüm Hakları Saklıdır.</p>
            <div className={styles.legalLinks}>
              <button onClick={() => openLegal('kvkk', 'KVKK Aydınlatma Metni')}>KVKK</button>
              <span>•</span>
              <button onClick={() => openLegal('privacy', 'Gizlilik Sözleşmesi')}>Gizlilik</button>
              <span>•</span>
              <button onClick={() => openLegal('cookies', 'Çerez Politikası')}>Çerezler</button>
              <span>•</span>
              <Link href="/sitemap.xml" target="_blank">Site Haritası</Link>
            </div>
          </div>
          <p><a href="/admin" style={{ color: 'rgba(255,255,255,0.1)', fontSize: '0.75rem' }}>Admin</a></p>
        </div>
      </div>

      <LegalModal 
        isOpen={modal.open} 
        onClose={() => setModal({ ...modal, open: false })} 
        title={modal.title} 
        content={modal.content} 
      />
    </footer>
  );
}
