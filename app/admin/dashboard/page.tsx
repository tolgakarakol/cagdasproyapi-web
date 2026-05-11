'use client';
import { useEffect, useState } from 'react';
import styles from './dashboard.module.css';
import Link from 'next/link';

const CARDS = [
  { href: '/admin/sections', icon: 'fa-layer-group', label: 'Bölümler', color: '#6366f1', desc: 'Sayfa bölümlerini düzenle' },
  { href: '/admin/menus', icon: 'fa-bars', label: 'Menüler', color: '#c8960c', desc: 'Navigasyon menüsünü yönet' },
  { href: '/admin/pages', icon: 'fa-file-alt', label: 'Sayfalar', color: '#10b981', desc: 'Sayfa ekle, düzenle, sil' },
  { href: '/admin/appearance', icon: 'fa-palette', label: 'Görünüm', color: '#ec4899', desc: 'Font, renk, logo ayarları' },
  { href: '/admin/settings', icon: 'fa-cog', label: 'Site Ayarları', color: '#f59e0b', desc: 'İletişim, SEO, adres' },
];

export default function Dashboard() {
  const [settings, setSettings] = useState<any>(null);
  useEffect(() => {
    fetch('/api/settings').then(r => r.json()).then(setSettings).catch(() => {});
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
