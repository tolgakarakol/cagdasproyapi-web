'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './pages.module.css';

export default function PagesAdminPage() {
  const [pages, setPages] = useState<any[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newPage, setNewPage] = useState({ title: '', slug: '', metaTitle: '', metaDescription: '' });
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const load = () => fetch('/api/pages').then(r => r.json()).then(setPages);
  useEffect(() => { load(); }, []);

  const addPage = async () => {
    if (!newPage.title || !newPage.slug) return;
    setSaving(true);
    await fetch('/api/pages', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...newPage, isVisible: true, showInMenu: true, order: pages.length }) });
    setNewPage({ title: '', slug: '', metaTitle: '', metaDescription: '' });
    setShowAdd(false); setSaving(false); load();
  };

  const deletePage = async (id: string) => {
    if (!confirm('Bu sayfayı silmek istediğinizden emin misiniz?')) return;
    await fetch('/api/pages', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    load();
  };

  return (
    <div>
      <div className={styles.header}>
        <div><h1 className={styles.headerTitle}>Sayfa Yönetimi</h1><p className={styles.headerSub}>Sayfaları ekleyin, düzenleyin veya silin</p></div>
        <button className={styles.addBtn} onClick={() => setShowAdd(!showAdd)}><i className="fas fa-plus" /> Sayfa Ekle</button>
      </div>

      {showAdd && (
        <div className={styles.addForm}>
          <h4 className={styles.addFormTitle}>Yeni Sayfa</h4>
          <div className={styles.grid2}>
            <div className={styles.field}><label>Sayfa Adı *</label><input value={newPage.title} onChange={e => setNewPage({...newPage, title: e.target.value})} placeholder="örn: Galeri" /></div>
            <div className={styles.field}><label>Slug (URL) *</label><input value={newPage.slug} onChange={e => setNewPage({...newPage, slug: e.target.value.toLowerCase().replace(/\s+/g,'-')})} placeholder="örn: galeri" /></div>
            <div className={styles.field}><label>SEO Başlık</label><input value={newPage.metaTitle} onChange={e => setNewPage({...newPage, metaTitle: e.target.value})} placeholder="Meta title" /></div>
            <div className={styles.field}><label>SEO Açıklama</label><input value={newPage.metaDescription} onChange={e => setNewPage({...newPage, metaDescription: e.target.value})} placeholder="Meta description" /></div>
          </div>
          <div className={styles.formActions}>
            <button className={styles.saveBtn} onClick={addPage} disabled={saving}><i className="fas fa-plus" /> Oluştur</button>
            <button className={styles.cancelBtn} onClick={() => setShowAdd(false)}>İptal</button>
          </div>
        </div>
      )}

      <div className={styles.list}>
        {pages.map(p => (
          <div key={p._id} className={styles.item}>
            <div className={styles.info}>
              <span className={styles.title}>{p.title}</span>
              <span className={styles.slug}>/{p.slug}</span>
              {p.slug === 'home' && <span className={styles.badge}>Ana Sayfa</span>}
            </div>
            <div className={styles.actions}>
              <button className={`${styles.btn} ${styles.btnLive}`} onClick={() => router.push(`/admin/live-editor?page=${p.slug}`)} title="Canlı Editörde Düzenle"><i className="fas fa-eye" /> Canlı Düzenle</button>
              {p.slug !== 'home' && (
                <button className={`${styles.btn} ${styles.btnDel}`} onClick={() => deletePage(p._id)}><i className="fas fa-trash" /></button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
