'use client';
import { useEffect, useState } from 'react';
import styles from './sections.module.css';

export default function SectionsPage() {
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const r = await fetch('/api/sections?pageSlug=home');
    setSections(await r.json());
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const toggleVisibility = async (s: any) => {
    await fetch('/api/sections', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...s, isVisible: !s.isVisible }),
    });
    load();
  };

  const startEdit = (s: any) => {
    setEditingId(s._id);
    setEditContent(JSON.stringify(s.content, null, 2));
  };

  const saveEdit = async (s: any) => {
    setSaving(true);
    try {
      const content = JSON.parse(editContent);
      await fetch('/api/sections', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...s, content }),
      });
      setEditingId(null);
      load();
    } catch { alert('Geçersiz JSON formatı!'); }
    finally { setSaving(false); }
  };

  const moveSection = async (index: number, dir: -1 | 1) => {
    const newSecs = [...sections];
    const target = index + dir;
    if (target < 0 || target >= newSecs.length) return;
    [newSecs[index], newSecs[target]] = [newSecs[target], newSecs[index]];
    const updates = newSecs.map((s, i) => ({ _id: s._id, order: i }));
    await fetch('/api/sections', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updates) });
    load();
  };

  const LABELS: Record<string, string> = {
    hero_slider: '🖼️ Ana Slider', products_grid: '🏠 Ürünlerimiz', guarantee_band: '🛡️ Garanti Bandı',
    about: '👥 Hakkımızda', partners: '🤝 Çözüm Ortakları', catalogs: '📂 E-Katalog',
    hap_bilgiler: '📄 Hap Bilgiler', quote_form: '💬 Teklif Formu', contact: '📍 İletişim',
  };

  return (
    <div>
      <div className={styles.header}>
        <div><h1 className={styles.headerTitle}>Bölüm Yönetimi</h1><p className={styles.headerSub}>Ana sayfanın tüm bölümlerini yönetin</p></div>
      </div>
      {loading ? <div className={styles.loading}><i className="fas fa-spinner fa-spin" /></div> : (
        <div className={styles.list}>
          {sections.map((s, i) => (
            <div key={s._id} className={`${styles.item} ${!s.isVisible ? styles.hidden : ''}`}>
              <div className={styles.itemLeft}>
                <div className={styles.order}>
                  <button onClick={() => moveSection(i, -1)} disabled={i === 0} title="Yukarı taşı">↑</button>
                  <button onClick={() => moveSection(i, 1)} disabled={i === sections.length - 1} title="Aşağı taşı">↓</button>
                </div>
                <div>
                  <h4>{LABELS[s.type] || s.type}</h4>
                  <p>{s.title}</p>
                </div>
              </div>
              <div className={styles.actions}>
                <button
                  className={`${styles.btn} ${s.isVisible ? styles.btnVisible : styles.btnHidden}`}
                  onClick={() => toggleVisibility(s)}
                  title={s.isVisible ? 'Gizle' : 'Göster'}
                >
                  <i className={`fas fa-eye${s.isVisible ? '' : '-slash'}`} />
                  {s.isVisible ? 'Görünür' : 'Gizli'}
                </button>
                <button className={`${styles.btn} ${styles.btnEdit}`} onClick={() => editingId === s._id ? setEditingId(null) : startEdit(s)}>
                  <i className="fas fa-edit" /> Düzenle
                </button>
              </div>
              {editingId === s._id && (
                <div className={styles.editor}>
                  <p className={styles.editorNote}><i className="fas fa-info-circle" /> JSON formatında içerik düzenleyin</p>
                  <textarea className={styles.jsonEditor} value={editContent} onChange={e => setEditContent(e.target.value)} rows={16} spellCheck={false} />
                  <div className={styles.editorActions}>
                    <button className={styles.saveBtn} onClick={() => saveEdit(s)} disabled={saving}>
                      {saving ? <><i className="fas fa-spinner fa-spin" /> Kaydediliyor</> : <><i className="fas fa-save" /> Kaydet</>}
                    </button>
                    <button className={styles.cancelBtn} onClick={() => setEditingId(null)}>İptal</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
