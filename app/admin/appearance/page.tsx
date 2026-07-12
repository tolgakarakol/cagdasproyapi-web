'use client';
import { useEffect, useState } from 'react';
import styles from './appearance.module.css';

const FONTS = ['Inter', 'Playfair Display', 'Roboto', 'Poppins', 'Montserrat', 'Lato', 'Raleway', 'Nunito', 'Open Sans', 'Source Sans 3'];

export default function AppearancePage() {
  const [data, setData] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/appearance').then(r => r.json()).then(setData);
  }, []);

  const save = async () => {
    setSaving(true);
    await fetch('/api/appearance', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!data) return <div className={styles.loading}><i className="fas fa-spinner fa-spin" /></div>;

  return (
    <div>
      <div className={styles.header}>
        <div><h1 className={styles.headerTitle}>Görünüm Ayarları</h1><p className={styles.headerSub}>Font, renk paleti ve logo yönetimi</p></div>
        <button className={styles.saveBtn} onClick={save} disabled={saving}>
          {saving ? <><i className="fas fa-spinner fa-spin" /> Kaydediliyor</> : saved ? <><i className="fas fa-check" /> Kaydedildi!</> : <><i className="fas fa-save" /> Kaydet</>}
        </button>
      </div>

      <div className={styles.grid}>
        <div className={styles.section}>
          <h3><i className="fas fa-font" /> Fontlar</h3>
          <div className={styles.field}>
            <label>Başlık Fontu</label>
            <select value={data.headingFont} onChange={e => setData({...data, headingFont: e.target.value})}>
              {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
            <p className={styles.preview} style={{ fontFamily: data.headingFont }}>Çağdaş Pro Yapı Örnek Başlık</p>
          </div>
          <div className={styles.field}>
            <label>Gövde Fontu</label>
            <select value={data.bodyFont} onChange={e => setData({...data, bodyFont: e.target.value})}>
              {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
            <p className={styles.preview} style={{ fontFamily: data.bodyFont, fontWeight: 400, fontSize: '0.9rem' }}>Bu bir örnek paragraf metnidir.</p>
          </div>
        </div>

        <div className={styles.section}>
          <h3><i className="fas fa-palette" /> Renkler</h3>
          {[
            { key: 'primaryColor', label: 'Ana Renk (Arka plan)' },
            { key: 'accentColor', label: 'Vurgu Rengi (Altın/CTA)' },
            { key: 'bgColor', label: 'Sayfa Arka Planı' },
            { key: 'textColor', label: 'Metin Rengi' },
          ].map(({ key, label }) => (
            <div key={key} className={styles.colorField}>
              <label>{label}</label>
              <div className={styles.colorRow}>
                <input type="color" value={data[key]} onChange={e => setData({...data, [key]: e.target.value})} />
                <span>{data[key]}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.section} style={{ gridColumn: '1/-1' }}>
          <h3><i className="fas fa-image" /> Görseller (Logo & Favicon)</h3>
          <div className={styles.field}>
            <label>Logo URL (veya yolu örn: /images/logo.png)</label>
            <input type="text" value={data.logoUrl || ''} onChange={e => setData({...data, logoUrl: e.target.value})} />
            {data.logoUrl && <img src={data.logoUrl} alt="Logo Önizleme" style={{ maxHeight: 60, marginTop: 10, background: '#333', padding: 5, borderRadius: 5 }} />}
          </div>
          <div className={styles.field}>
            <label>Favicon URL (veya yolu örn: /favicon.ico)</label>
            <input type="text" value={data.faviconUrl || ''} onChange={e => setData({...data, faviconUrl: e.target.value})} />
            {data.faviconUrl && <img src={data.faviconUrl} alt="Favicon Önizleme" style={{ maxHeight: 32, marginTop: 10 }} />}
          </div>
        </div>

        <div className={styles.section} style={{ gridColumn: '1/-1' }}>
          <h3><i className="fas fa-image" /> Önizleme</h3>
          <div className={styles.preview2} style={{ background: data.bgColor }}>
            <div style={{ background: data.primaryColor, padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 12, borderRadius: '8px 8px 0 0' }}>
              <span style={{ color: data.accentColor, fontFamily: data.headingFont, fontWeight: 700 }}>Çağdaş Pro Yapı</span>
              <span style={{ marginLeft: 'auto', background: data.accentColor, color: data.primaryColor, padding: '6px 16px', borderRadius: 6, fontSize: '0.85rem', fontWeight: 700 }}>Teklif Al</span>
            </div>
            <div style={{ padding: '24px', fontFamily: data.bodyFont }}>
              <p style={{ color: data.textColor, fontSize: '1.5rem', fontFamily: data.headingFont, fontWeight: 700, marginBottom: 8 }}>Albert Genau Yetkili Bayisi</p>
              <p style={{ color: data.textColor, opacity: 0.7, fontSize: '0.9rem' }}>Cam balkon, bioklimatik pergola ve kış bahçesi sistemlerinde 15 yıllık deneyim.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
