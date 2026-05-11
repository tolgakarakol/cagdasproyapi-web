'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

const PRODUCTS = [
  { name: 'Giyotin Tam Balkon', slug: 'giyotin-tam-balkon' },
  { name: 'Katlanır Sistem Cam Balkon', slug: 'katlanir-sistem-cam-balkon' },
  { name: 'Bioklimatik Pergola', slug: 'bioklimatik-pergola' },
  { name: 'Rüzgar Kırıcı Sistem', slug: 'ruzgar-kirici-sistem' },
  { name: 'Çelik Konstrüksiyon & Kış Bahçesi', slug: 'kis-bahcesi' },
  { name: 'Duşakabin Sistemleri', slug: 'dusakabin-sistemleri' },
  { name: 'Cam Kapı Sistemleri', slug: 'cam-kapi-sistemleri' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Anasayfada ve henüz kaydırılmamışsa 'beyaz' (invert) logo kullanacağız
  const useWhiteLogo = isHome && !scrolled;

  return (
    <nav className={`${styles.nav} ${scrolled || !isHome ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <a href="/" className={styles.logo} style={{ cursor: 'pointer', display: 'flex' }}>
          <img 
            src={useWhiteLogo ? "/images/cagdasproyapi_beyaz.png" : "/images/cagdas_pro_yapi_logo.png"} 
            alt="Anasayfa" 
            width={240} 
            height={65} 
            style={{ objectFit: 'contain' }}
          />
        </a>

        <ul className={styles.menu}>
          <li className={styles.menuItem}><Link href="/hakkimizda" className={styles.menuLink}>Hakkımızda</Link></li>
          <li className={styles.menuItem}>
            <span className={styles.menuLink}>Ürünlerimiz <i className="fas fa-chevron-down" /></span>
            <div className={styles.dropdown}>
              {PRODUCTS.map(p => (
                <Link key={p.slug} href={`/urunler/${p.slug}`} className={styles.dropdownItem}>{p.name}</Link>
              ))}
            </div>
          </li>
          <li className={styles.menuItem}><Link href="/e-katalog" className={styles.menuLink}>E-Katalog</Link></li>
          <li className={styles.menuItem}><Link href="/hap-bilgiler" className={styles.menuLink}>Hap Bilgiler</Link></li>
          <li className={styles.menuItem}><Link href="/iletisim" className={styles.menuLink}>İletişim</Link></li>
        </ul>

        <div className={styles.actions}>
          <Link href="/iletisim" className={styles.teklifBtn}>Teklif Al</Link>
          <button className={styles.hamburger} onClick={() => setMobileOpen(true)}>
            <i className="fas fa-bars" />
          </button>
        </div>
      </div>

      {/* MOBILE OVERLAY MENU */}
      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuOpen : ''}`}>
        <div className={styles.mobileHeader}>
          <img src="/images/cagdasproyapi_beyaz.png" alt="Logo" style={{ width: '210px', height: 'auto' }} />
          <button className={styles.closeBtn} onClick={() => setMobileOpen(false)}>
            <i className="fas fa-times" />
          </button>
        </div>
        <ul className={styles.mobileLinks}>
          <li><Link href="/" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Anasayfa</Link></li>
          <li><Link href="/hakkimizda" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Hakkımızda</Link></li>
          <li>
            <div className={styles.mobileLink} onClick={() => setMobileProductsOpen(!mobileProductsOpen)}>
              Ürünlerimiz <i className={`fas fa-chevron-${mobileProductsOpen ? 'up' : 'down'}`} style={{ fontSize: '0.9rem' }} />
            </div>
            {mobileProductsOpen && (
              <ul className={styles.mobileSubLinks}>
                {PRODUCTS.map(p => (
                  <li key={p.slug}>
                    <Link href={`/urunler/${p.slug}`} className={styles.mobileSubLink} onClick={() => setMobileOpen(false)}>
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li><Link href="/e-katalog" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>E-Katalog</Link></li>
          <li><Link href="/hap-bilgiler" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Hap Bilgiler</Link></li>
          <li><Link href="/iletisim" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>İletişim</Link></li>
        </ul>
      </div>
    </nav>
  );
}
