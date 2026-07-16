'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './admin.module.css';

const NAV = [
  { href: '/admin/dashboard', icon: 'fa-gauge', label: 'Dashboard' },
  { href: '/admin/live-editor', icon: 'fa-eye', label: 'Canlı Görsel Editör' },
  { href: '/admin/sections', icon: 'fa-layer-group', label: 'Bölümler (JSON)' },
  { href: '/admin/menus', icon: 'fa-bars', label: 'Menüler' },
  { href: '/admin/pages', icon: 'fa-file-alt', label: 'Sayfalar' },
  { href: '/admin/appearance', icon: 'fa-palette', label: 'Görünüm' },
  { href: '/admin/settings', icon: 'fa-cog', label: 'Site Ayarları' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (pathname === '/admin/login') { setChecking(false); return; }
    fetch('/api/auth/me').then(r => {
      if (!r.ok) router.push('/admin/login');
      else setChecking(false);
    }).catch(() => router.push('/admin/login'));
  }, [pathname, router]);

  const logout = async () => {
    await fetch('/api/auth/me', { method: 'DELETE' });
    router.push('/admin/login');
  };

  if (pathname === '/admin/login') return <>{children}</>;
  if (checking) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f0f1a', color: '#c8960c' }}><i className="fas fa-spinner fa-spin fa-2x" /></div>;

  const isLiveEditor = pathname.startsWith('/admin/live-editor');

  return (
    <div className={styles.layout}>
      <aside className={`${styles.sidebar} ${isLiveEditor ? styles.sidebarCollapsed : ''}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.sidebarLogo}><i className="fas fa-building" /></div>
          <div><p className={styles.sidebarTitle}>Çağdaş Pro Yapı</p><p className={styles.sidebarSub}>Admin Paneli</p></div>
        </div>
        <nav className={styles.nav}>
          {NAV.map(item => (
            <Link key={item.href} href={item.href} className={`${styles.navItem} ${pathname.startsWith(item.href) ? styles.active : ''}`}>
              <i className={`fas ${item.icon}`} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className={styles.sidebarFooter}>
          <a href="/" target="_blank" className={styles.navItem}><i className="fas fa-external-link-alt" /><span>Siteyi Gör</span></a>
          <button className={`${styles.navItem} ${styles.logoutBtn}`} onClick={logout}><i className="fas fa-sign-out-alt" /><span>Çıkış</span></button>
        </div>
      </aside>
      <main className={`${styles.main} ${isLiveEditor ? styles.mainCollapsed : ''}`}>{children}</main>
    </div>
  );
}
