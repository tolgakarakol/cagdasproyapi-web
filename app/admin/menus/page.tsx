'use client';
import { useEffect, useState } from 'react';
import styles from './menus.module.css';

export default function MenusPage() {
  const [menus, setMenus] = useState<any[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newMenu, setNewMenu] = useState({ label: '', href: '', isExternal: false });
  const [saving, setSaving] = useState(false);

  const load = () => fetch('/api/menus').then(r => r.json()).then(setMenus);
  useEffect(() => { load(); }, []);

  const addMenu = async () => {
    if (!newMenu.label || !newMenu.href) return;
    setSaving(true);
    await fetch('/api/menus', { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({ ...newMenu, order: menus.length, isVisible: true, children: [] }) 
    });
    setNewMenu({ label: '', href: '', isExternal: false });
    setShowAdd(false); 
    setSaving(false); 
    load();
  };

  const deleteMenu = async (id: string) => {
    if (!confirm('Bu menü öğesini silmek istediğinizden emin misiniz?')) return;
    await fetch('/api/menus', { 
      method: 'DELETE', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({ id }) 
    });
    load();
  };

  const toggleVisible = async (m: any) => {
    const all = menus.map(item => item._id === m._id ? { ...item, isVisible: !item.isVisible } : item);
    await fetch('/api/menus', { 
      method: 'PUT', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(all) 
    });
    load();
  };

  const handleEditMenu = (id: string, field: string, value: string) => {
    setMenus(prev => prev.map(m => m._id === id ? { ...m, [field]: value } : m));
  };

  const saveMenuEdits = async () => {
    await fetch('/api/menus', { 
      method: 'PUT', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(menus) 
    });
  };

  return (
    <div>
      <div className={styles.header}>
        <div>
          <h1 className={styles.headerTitle}>Menü Yönetimi</h1>
          <p className={styles.headerSub}>Navigasyon menüsünü düzenleyin (Yazı ve linklerin üzerine tıklayarak değiştirebilirsiniz)</p>
        </div>
        <button className={styles.addBtn} onClick={() => setShowAdd(!showAdd)}>
          <i className="fas fa-plus" /> Menü Ekle
        </button>
      </div>

      {showAdd && (
        <div className={styles.addForm}>
          <h4 className={styles.addFormTitle}>Yeni Menü Öğesi</h4>
          <div className={styles.row}>
            <div className={styles.field}>
              <label>Etiket</label>
              <input type="text" placeholder="örn: Galeri" value={newMenu.label} onChange={e => setNewMenu({...newMenu, label: e.target.value})} />
            </div>
            <div className={styles.field}>
              <label>Link (href)</label>
              <input type="text" placeholder="örn: #galeri veya /galeri" value={newMenu.href} onChange={e => setNewMenu({...newMenu, href: e.target.value})} />
            </div>
            <div className={styles.fieldCheck}>
              <label><input type="checkbox" checked={newMenu.isExternal} onChange={e => setNewMenu({...newMenu, isExternal: e.target.checked})} /> Dış link</label>
            </div>
          </div>
          <div className={styles.formActions}>
            <button className={styles.saveBtn} onClick={addMenu} disabled={saving}><i className="fas fa-plus" /> Ekle</button>
            <button className={styles.cancelBtn} onClick={() => setShowAdd(false)}>İptal</button>
          </div>
        </div>
      )}

      <div className={styles.list}>
        {menus.map((m) => (
          <div key={m._id} className={`${styles.item} ${!m.isVisible ? styles.hidden : ''}`}>
            <div className={styles.drag}><i className="fas fa-grip-vertical" /></div>
            <div className={styles.info}>
              <input
                type="text"
                value={m.label}
                onChange={e => handleEditMenu(m._id, 'label', e.target.value)}
                onBlur={saveMenuEdits}
                className={styles.editInput}
                placeholder="Menü Yazısı"
              />
              <input
                type="text"
                value={m.href}
                onChange={e => handleEditMenu(m._id, 'href', e.target.value)}
                onBlur={saveMenuEdits}
                className={styles.editHrefInput}
                placeholder="Bağlantı Linki (örn: /hakkimizda)"
              />
              {m.children?.length > 0 && <span className={styles.badge}>{m.children.length} alt menü</span>}
            </div>
            <div className={styles.actions}>
              <button 
                className={`${styles.btn} ${m.isVisible ? styles.btnOn : styles.btnOff}`} 
                onClick={() => toggleVisible(m)}
                title={m.isVisible ? "Menüyü Gizle" : "Menüyü Göster"}
              >
                <i className={`fas fa-eye${m.isVisible ? '' : '-slash'}`} />
              </button>
              <button className={`${styles.btn} ${styles.btnDel}`} onClick={() => deleteMenu(m._id)} title="Menüyü Sil">
                <i className="fas fa-trash" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
