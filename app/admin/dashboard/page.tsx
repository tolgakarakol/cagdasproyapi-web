'use client';
import { useEffect, useState } from 'react';
import styles from './dashboard.module.css';
import Link from 'next/link';

const CARDS = [
  { href: '/admin/live-editor', icon: 'fa-eye', label: 'Canlı Editör', color: '#6366f1', desc: 'Siteyi görsel olarak düzenle' },
  { href: '/admin/menus', icon: 'fa-bars', label: 'Menüler', color: '#c8960c', desc: 'Navigasyon menüsünü yönet' },
  { href: '/admin/appearance', icon: 'fa-palette', label: 'Görünüm', color: '#ec4899', desc: 'Font, renk, logo ayarları' },
  { href: '/admin/settings', icon: 'fa-cog', label: 'Site Ayarları', color: '#10b981', desc: 'İletişim, SEO, adres' },
];

export default function Dashboard() {
  const [settings, setSettings] = useState<any>(null);
  const [analytics, setAnalytics] = useState<any>(null);
  
  useEffect(() => {
    fetch('/api/settings').then(r => r.json()).then(setSettings).catch(() => {});
    fetch('/api/analytics').then(r => r.json()).then(setAnalytics).catch(() => {});
  }, []);

  return (
    <div>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.sub}>Hoş geldiniz! Sitenizi buradan yönetebilirsiniz.</p>
        </div>
        <a href="/" target="_blank" className={styles.previewBtn}>
          <i className="fas fa-external-link-alt" /> Siteyi Önizle
        </a>
      </div>

      {settings && (
        <div className={styles.siteInfo}>
          <i className="fas fa-info-circle" />
          <span><strong>{settings.siteName}</strong> — {settings.phone} · {settings.workingHours}</span>
        </div>
      )}

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{color: '#6366f1', background: 'rgba(99, 102, 241, 0.1)'}}><i className="fas fa-users" /></div>
          <div className={styles.statInfo}>
            <h4>Bugünkü Ziyaretçi</h4>
            <p>{analytics ? analytics.todayViews : '...'}</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{color: '#10b981', background: 'rgba(16, 185, 129, 0.1)'}}><i className="fas fa-chart-line" /></div>
          <div className={styles.statInfo}>
            <h4>Aylık Görüntülenme</h4>
            <p>{analytics ? analytics.monthViews : '...'}</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{color: '#c8960c', background: 'rgba(200, 150, 12, 0.1)'}}><i className="fas fa-mouse-pointer" /></div>
          <div className={styles.statInfo}>
            <h4>Sayfa Etkileşimi</h4>
            <p>% {analytics ? analytics.interactionRate : '...'}</p>
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        {CARDS.map(card => (
          <Link key={card.href} href={card.href} className={styles.card}>
            <div className={styles.iconWrap} style={{ background: card.color + '20', color: card.color }}>
              <i className={`fas ${card.icon}`} />
            </div>
            <div>
              <h3>{card.label}</h3>
              <p>{card.desc}</p>
            </div>
            <i className="fas fa-arrow-right" style={{ marginLeft: 'auto', color: card.color, opacity: 0.6 }} />
          </Link>
        ))}
      </div>

      <div className={styles.notice}>
        <i className="fas fa-lightbulb" />
        <div>
          <strong>İpucu:</strong> Sitenin tüm içeriği dinamiktir. Sol menüden herhangi bir bölümü seçerek içerikleri, renkleri, fontları ve menü yapısını gerçek zamanlı olarak değiştirebilirsiniz.
        </div>
      </div>
    </div>
  );
}
