'use client';
import { useEffect, useState } from 'react';
import styles from './settings.module.css';

const FIELDS = [
  { key: 'siteName', label: 'Site Adı', type: 'text' },
  { key: 'siteDescription', label: 'Site Açıklaması', type: 'text' },
  { key: 'phone', label: 'Telefon', type: 'text' },
  { key: 'whatsapp', label: 'WhatsApp (Ülke koduyla, örn: 905079165707)', type: 'text' },
  { key: 'instagram', label: 'Instagram Kullanıcı Adı', type: 'text' },
  { key: 'address', label: 'Adres', type: 'textarea' },
  { key: 'workingHours', label: 'Çalışma Saatleri', type: 'text' },
  { key: 'metaTitle', label: 'SEO Başlığı (Meta Title)', type: 'text' },
  { key: 'metaDescription', label: 'SEO Açıklaması (Meta Description)', type: 'textarea' },
  { key: 'googleVerification', label: 'Google Doğrulama Kodu', type: 'text' },
  { key: 'customScripts', label: 'Özel Scriptler (Google Ads, Analytics vb. - <script> etiketleriyle ekleyin)', type: 'textarea' },
];

export default function SettingsPage() {
  const [data, setData] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/settings').then(r => r.json()).then(setData);
  }, []);

  const save = async () => {
    setSaving(true);
    await fetch('/api/settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className={styles.header}>
        <div><h1 className={styles.headerTitle}>Site Ayarları</h1><p className={styles.headerSub}>İletişim bilgileri, SEO ve genel ayarlar</p></div>
        <button className={styles.saveBtn} onClick={save} disabled={saving}>
          {saving ? <><i className="fas fa-spinner fa-spin" /> Kaydediliyor</> : saved ? <><i className="fas fa-check" /> Kaydedildi!</> : <><i className="fas fa-save" /> Kaydet</>}
        </button>
      </div>
      <div className={styles.form}>
        {FIELDS.map(f => (
          <div key={f.key} className={styles.field}>
            <label>{f.label}</label>
            {f.type === 'textarea'
              ? <textarea value={data[f.key] || ''} onChange={e => setData({...data, [f.key]: e.target.value})} rows={3} />
              : <input type={f.type} value={data[f.key] || ''} onChange={e => setData({...data, [f.key]: e.target.value})} />
            }
          </div>
        ))}
      </div>
    </div>
  );
}
