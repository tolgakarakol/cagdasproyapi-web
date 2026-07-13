'use client';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from './editor.module.css';

const LABELS: Record<string, string> = {
  hero_slider: '🖼️ Sürgülü Afiş (Slider)',
  products_grid: '🏠 Ürünlerimiz Bölümü',
  guarantee_band: '🛡️ Garanti/Güven Bandı',
  about: '👥 Hakkımızda Tanıtımı',
  partners: '🤝 Çözüm Ortakları',
  catalogs: '📂 E-Katalog Bölümü',
  hap_bilgiler: '📄 Pratik Bilgiler (Hap Bilgiler)',
  quote_form: '💬 Teklif Al Formu',
  contact: '📍 İletişim Bilgileri',
};

const formatLabel = (key: string): string => {
  const dictionary: Record<string, string> = {
    title: 'Başlık',
    subtitle: 'Alt Başlık',
    desc: 'Açıklama / Detay',
    description: 'Açıklama / Detay',
    image: 'Görsel URL (Resim)',
    imageUrl: 'Görsel URL (Resim)',
    logoUrl: 'Logo URL',
    ctaText: 'Buton Yazısı',
    ctaLink: 'Buton Linki',
    link: 'Bağlantı Linki',
    linkText: 'Bağlantı Metni',
    badge: 'Rozet / Küçük Başlık',
    experienceYear: 'Deneyim Yılı',
    experienceText: 'Deneyim Açıklaması',
    features: 'Özellikler Listesi',
    slides: 'Slayt Görselleri',
    items: 'İçerik Öğeleri',
    catalogs: 'Katalog Dosyaları',
    name: 'Katalog Adı',
    pdfUrl: 'PDF İndirme Bağlantısı',
    content: 'Detaylı İçerik',
    icon: 'İkon Sınıfı (Örn: fas fa-shield-alt)',
  };
  return dictionary[key] || key.charAt(0).toUpperCase() + key.slice(1);
};

export default function LiveEditor() {
  const router = useRouter();
  const [sections, setSections] = useState<any[]>([]);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Verileri yükle
  const loadData = async () => {
    try {
      const res = await fetch('/api/sections?pageSlug=home');
      if (res.ok) {
        const data = await res.json();
        setSections(data);
        if (data.length > 0) {
          setSelectedSectionId(data[0]._id);
        }
      }
    } catch (err) {
      console.error('Yükleme hatası:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Değişiklikleri iframe'e anlık gönder
  const sendPreviewUpdate = (currentSections: any[]) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        { type: 'LIVE_PREVIEW_UPDATE', sections: currentSections },
        '*'
      );
    }
  };

  // State güncellendiğinde iframe'e haber ver
  useEffect(() => {
    if (sections.length > 0) {
      sendPreviewUpdate(sections);
    }
  }, [sections]);

  const selectedSection = sections.find(s => s._id === selectedSectionId);

  // Nested objeleri güncellemek için yardımcı
  const setNestedValue = (obj: any, path: string[], value: any): any => {
    const newObj = { ...obj };
    let current = newObj;
    for (let i = 0; i < path.length - 1; i++) {
      const key = path[i];
      if (Array.isArray(current[key])) {
        current[key] = [...current[key]];
      } else {
        current[key] = { ...current[key] };
      }
      current = current[key];
    }
    current[path[path.length - 1]] = value;
    return newObj;
  };

  const handleFieldChange = (path: string[], newValue: any) => {
    if (!selectedSectionId) return;
    const updated = sections.map(s => {
      if (s._id === selectedSectionId) {
        return setNestedValue(s, path, newValue);
      }
      return s;
    });
    setSections(updated);
  };

  // Liste elemanı ekleme
  const handleAddArrayItem = (path: string[], currentArray: any[]) => {
    let newItem: any = {};
    if (currentArray.length > 0) {
      // Şablonu ilk elemandan klonla ama içini temizle
      const template = currentArray[0];
      newItem = cloneTemplate(template);
    } else {
      // Varsayılan boş şablonlar
      const lastKey = path[path.length - 1];
      if (lastKey === 'slides') {
        newItem = { image: '/placeholder.jpg', title: 'Yeni Slayt Başlığı', subtitle: 'Alt Başlık', ctaText: 'Teklif Al', ctaLink: '#iletisim' };
      } else if (lastKey === 'items') {
        newItem = { icon: 'fas fa-check', title: 'Yeni Öğe Başlığı', desc: 'Açıklama giriniz.' };
      } else if (lastKey === 'catalogs') {
        newItem = { name: 'Katalog İsmi', pdfUrl: '#', imageUrl: '/placeholder.jpg' };
      } else {
        newItem = { title: '', desc: '' };
      }
    }
    const newArray = [...currentArray, newItem];
    handleFieldChange(path, newArray);
  };

  const cloneTemplate = (obj: any): any => {
    if (typeof obj !== 'object' || obj === null) return '';
    if (Array.isArray(obj)) return [];
    const res: any = {};
    for (const k in obj) {
      if (typeof obj[k] === 'string') {
        // İkonlar ve resimler hariç boşalt
        if (k.toLowerCase().includes('image') || k.toLowerCase().includes('logo') || k.toLowerCase().includes('icon')) {
          res[k] = obj[k];
        } else {
          res[k] = '';
        }
      }
      else if (typeof obj[k] === 'number') res[k] = 0;
      else if (typeof obj[k] === 'boolean') res[k] = true;
      else if (typeof obj[k] === 'object') res[k] = cloneTemplate(obj[k]);
    }
    return res;
  };

  const handleRemoveArrayItem = (path: string[], index: number) => {
    const updated = sections.map(s => {
      if (s._id === selectedSectionId) {
        const arr = [...getNestedRef(s, path)];
        arr.splice(index, 1);
        return setNestedValue(s, path, arr);
      }
      return s;
    });
    setSections(updated);
  };

  const getNestedRef = (obj: any, path: string[]) => {
    let current = obj;
    for (const key of path) {
      current = current[key];
    }
    return current;
  };

  // Bölümü veritabanına kaydet
  const saveCurrentSection = async () => {
    if (!selectedSection) return;
    setSaving(true);
    setSaveSuccess(false);
    try {
      const res = await fetch('/api/sections', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedSection),
      });
      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        alert('Kaydetme başarısız oldu.');
      }
    } catch (err) {
      console.error(err);
      alert('Sistemsel hata oluştu.');
    } finally {
      setSaving(false);
    }
  };

  // Dinamik Form Üretici (Rekürsif)
  const renderFormFields = (path: string[], value: any): React.ReactNode => {
    const lastKey = path[path.length - 1];

    if (typeof value === 'string') {
      const isLongText = value.length > 50 || lastKey === 'desc' || lastKey === 'description' || lastKey === 'content';
      return (
        <div key={path.join('.')} className={styles.field}>
          <label>{formatLabel(lastKey)}</label>
          {isLongText ? (
            <textarea
              value={value}
              onChange={e => handleFieldChange(path, e.target.value)}
              rows={4}
              placeholder={`${formatLabel(lastKey)} yazın`}
            />
          ) : (
            <input
              type="text"
              value={value}
              onChange={e => handleFieldChange(path, e.target.value)}
              placeholder={`${formatLabel(lastKey)} girin`}
            />
          )}
        </div>
      );
    }

    if (typeof value === 'number') {
      return (
        <div key={path.join('.')} className={styles.field}>
          <label>{formatLabel(lastKey)}</label>
          <input
            type="number"
            value={value}
            onChange={e => handleFieldChange(path, Number(e.target.value))}
          />
        </div>
      );
    }

    if (typeof value === 'boolean') {
      return (
        <div key={path.join('.')} className={styles.fieldCheckbox}>
          <input
            type="checkbox"
            checked={value}
            id={path.join('.')}
            onChange={e => handleFieldChange(path, e.target.checked)}
          />
          <label htmlFor={path.join('.')}>{formatLabel(lastKey)}</label>
        </div>
      );
    }

    if (Array.isArray(value)) {
      return (
        <div key={path.join('.')} className={styles.arrayContainer}>
          <div className={styles.arrayHeader}>
            <span className={styles.arrayLabel}>{formatLabel(lastKey)} ({value.length} Adet)</span>
            <button
              className={styles.addArrayBtn}
              onClick={() => handleAddArrayItem(path, value)}
            >
              <i className="fas fa-plus" /> Yeni Ekle
            </button>
          </div>
          <div className={styles.arrayItems}>
            {value.map((item, idx) => (
              <div key={idx} className={styles.arrayItemCard}>
                <div className={styles.arrayItemHeader}>
                  <span>{formatLabel(lastKey).slice(0, -3)} #{idx + 1}</span>
                  <button
                    className={styles.delArrayBtn}
                    onClick={() => handleRemoveArrayItem(path, idx)}
                    title="Sil"
                  >
                    <i className="fas fa-trash-alt" /> Sil
                  </button>
                </div>
                {typeof item === 'string' ? (
                  <div className={styles.field}>
                    <input
                      type="text"
                      value={item}
                      onChange={e => handleFieldChange([...path, idx.toString()], e.target.value)}
                    />
                  </div>
                ) : (
                  Object.keys(item).map(key =>
                    renderFormFields([...path, idx.toString(), key], item[key])
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (typeof value === 'object' && value !== null) {
      return (
        <div key={path.join('.')} className={styles.objectContainer}>
          {Object.keys(value).map(key =>
            renderFormFields([...path, key], value[key])
          )}
        </div>
      );
    }

    return null;
  };

  if (loading) {
    return (
      <div className={styles.loadingWrapper}>
        <i className="fas fa-spinner fa-spin fa-3x" />
        <p>Görsel Düzenleyici Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className={styles.editorLayout}>
      {/* Sol Panel: Düzenleyici */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>Canlı Düzenleyici</h2>
          <button className={styles.backBtn} onClick={() => router.push('/admin/dashboard')}>
            <i className="fas fa-arrow-left" /> Geri Dön
          </button>
        </div>

        <div className={styles.sidebarContent}>
          {/* Bölüm Listesi */}
          <div className={styles.sidebarSection}>
            <h3 className={styles.sectionTitle}>Sayfa Bölümleri</h3>
            <div className={styles.sectionsList}>
              {sections.map(s => (
                <div
                  key={s._id}
                  className={`${styles.sectionItem} ${selectedSectionId === s._id ? styles.sectionItemActive : ''}`}
                  onClick={() => setSelectedSectionId(s._id)}
                >
                  <span className={styles.sectionName}>{LABELS[s.type] || s.title}</span>
                  {!s.isVisible && <i className="fas fa-eye-slash text-gray" title="Yayında Gizli" />}
                </div>
              ))}
            </div>
          </div>

          {/* Form Alanı */}
          {selectedSection && (
            <div className={styles.formContainer}>
              <h3 className={styles.formTitle}>İçeriği Düzenle</h3>
              
              {/* Görünürlük Checkbox'ı (Bölüm bazlı) */}
              <div className={styles.fieldCheckbox} style={{ marginBottom: '20px', background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '6px' }}>
                <input
                  type="checkbox"
                  checked={selectedSection.isVisible}
                  id="section-visibility"
                  onChange={e => handleFieldChange(['isVisible'], e.target.checked)}
                />
                <label htmlFor="section-visibility" style={{ fontWeight: 'bold', color: '#c8960c' }}>
                  Bu Bölümü Sitede Göster (Aktif Et)
                </label>
              </div>

              {selectedSection.content && renderFormFields(['content'], selectedSection.content)}
            </div>
          )}
        </div>

        <div className={styles.sidebarFooter}>
          <button
            className={styles.saveBtn}
            onClick={saveCurrentSection}
            disabled={saving}
          >
            {saving ? (
              <><i className="fas fa-spinner fa-spin" /> Kaydediliyor...</>
            ) : saveSuccess ? (
              <><i className="fas fa-check" /> Başarıyla Kaydedildi!</>
            ) : (
              <><i className="fas fa-save" /> Değişiklikleri Kaydet</>
            )}
          </button>
        </div>
      </aside>

      {/* Sağ Panel: Canlı Önizleme */}
      <main className={styles.previewContainer}>
        <div className={styles.previewHeader}>
          <span className={styles.previewTitle}>
            <i className="fas fa-laptop" /> Canlı Önizleme (Değişikliklerinizi anında görün)
          </span>
          <span style={{ fontSize: '0.8rem', color: '#9aa0b0' }}>
            cagdasproyapi.com
          </span>
        </div>
        <div className={styles.iframeWrapper}>
          <iframe
            ref={iframeRef}
            src="/?live=true"
            className={styles.iframe}
            title="Süreç Önizleme"
            onLoad={() => {
              // Iframe yüklendiğinde mevcut state'i bir kere gönder
              sendPreviewUpdate(sections);
            }}
          />
        </div>
      </main>
    </div>
  );
}
