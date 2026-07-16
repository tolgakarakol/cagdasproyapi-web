'use client';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from './editor.module.css';

const PAGES = [
  { slug: 'home', label: 'Anasayfa', url: '/' },
  { slug: 'hakkimizda', label: 'Hakkımızda', url: '/hakkimizda' },
  { slug: 'e-katalog', label: 'E-Katalog', url: '/e-katalog' },
  { slug: 'galeri', label: 'Galeri', url: '/galeri' },
  { slug: 'iletisim', label: 'İletişim', url: '/iletisim' },
  // Ürünler Alt Menüsü
  { slug: 'giyotin-tam-balkon', label: 'Giyotin Cam Balkon', url: '/urunler/giyotin-tam-balkon' },
  { slug: 'bioklimatik-pergola', label: 'Bioklimatik Pergola', url: '/urunler/bioklimatik-pergola' },
  { slug: 'tiara-twinmax', label: 'Tiara TwinMax Isıcamlı', url: '/urunler/tiara-twinmax' },
  { slug: 'tiara-flat-slim-zero', label: 'Tiara Flat/Slim/Zero', url: '/urunler/tiara-flat-slim-zero' },
  { slug: 'isicamli-surme-cam-balkon', label: 'Isıcamlı Sürme Cam Balkon', url: '/urunler/isicamli-surme-cam-balkon' },
  { slug: 'tek-camli-surme-cam-balkon', label: 'Tek Camlı Sürme Cam Balkon', url: '/urunler/tek-camli-surme-cam-balkon' },
  { slug: 'ruzgar-kirici-sistem', label: 'Rüzgar Kırıcı Sistem', url: '/urunler/ruzgar-kirici-sistem' },
  { slug: 'katlanir-sistem-cam-balkon', label: 'Katlanır Sistem Cam Balkon', url: '/urunler/katlanir-sistem-cam-balkon' },
  { slug: 'kis-bahcesi', label: 'Kış Bahçesi', url: '/urunler/kis-bahcesi' },
  { slug: 'dusakabin', label: 'Duşakabin', url: '/urunler/dusakabin' },
  { slug: 'cam-kapi', label: 'Cam Kapı', url: '/urunler/cam-kapi' }
];

const getPageIcon = (slug: string): string => {
  switch (slug) {
    case 'home': return 'fas fa-home';
    case 'hakkimizda': return 'fas fa-users';
    case 'e-katalog': return 'fas fa-book-open';
    case 'galeri': return 'fas fa-images';
    case 'iletisim': return 'fas fa-map-marker-alt';
    default: return 'fas fa-cube';
  }
};

const SECTION_ICONS: Record<string, string> = {
  hero_slider: 'fas fa-images',
  products_grid: 'fas fa-th-large',
  guarantee_band: 'fas fa-shield-alt',
  about: 'fas fa-address-card',
  partners: 'fas fa-handshake',
  catalogs: 'fas fa-folder-open',
  hap_bilgiler: 'fas fa-info-circle',
  quote_form: 'fas fa-file-invoice-dollar',
  contact: 'fas fa-map-marked-alt',
  product_detail: 'fas fa-cube',
  page_header: 'fas fa-heading',
  about_story: 'fas fa-book-open',
  about_values: 'fas fa-star',
  about_mv: 'fas fa-bullseye',
  gallery_group: 'fas fa-images'
};

const LABELS: Record<string, string> = {
  hero_slider: 'Sürgülü Afiş (Slider)',
  products_grid: 'Ürünlerimiz Bölümü',
  guarantee_band: 'Garanti/Güven Bandı',
  about: 'Hakkımızda Tanıtımı',
  partners: 'Çözüm Ortakları',
  catalogs: 'E-Katalog Bölümü',
  hap_bilgiler: 'Pratik Bilgiler (Hap Bilgiler)',
  quote_form: 'Teklif Al Formu',
  contact: 'İletişim Bilgileri',
  product_detail: 'Ürün Sayfası Detayı',
  page_header: 'Sayfa Başlık Alanı (Header)',
  about_story: 'Hikayemiz (Detaylı Anlatım)',
  about_values: 'Temel Değerlerimiz',
  about_mv: 'Vizyon & Misyon',
  gallery_group: 'Galeri Albümü'
};

const formatLabel = (key: string): string => {
  if (!isNaN(Number(key))) return `Görsel ${Number(key) + 1}`;
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

// Rekürsif olarak nesne içinde eşleşen metin değerlerini güncelleyen yardımcı fonksiyon
const updateNestedStringValue = (obj: any, originalText: string, newText: string): any => {
  if (typeof obj === 'string') {
    if (obj.trim() === originalText) {
      return newText;
    }
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(item => updateNestedStringValue(item, originalText, newText));
  }
  if (typeof obj === 'object' && obj !== null) {
    const newObj: any = {};
    for (const key in obj) {
      newObj[key] = updateNestedStringValue(obj[key], originalText, newText);
    }
    return newObj;
  }
  return obj;
};

export default function LiveEditor() {
  const router = useRouter();
  const [selectedPageSlug, setSelectedPageSlug] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('page') || 'home';
    }
    return 'home';
  });

  const handlePageChange = (slug: string) => {
    setSelectedPageSlug(slug);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('page', slug);
      window.history.pushState({}, '', url.toString());
    }
  };
  const [sections, setSections] = useState<any[]>([]);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const [imageUploadStates, setImageUploadStates] = useState<Record<string, boolean>>({});
  const globalFileInputRef = useRef<HTMLInputElement>(null);
  const activeImagePathRef = useRef<string[] | null>(null);

  const handleGlobalFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const currentPath = activeImagePathRef.current;
    
    if (!file || !currentPath) {
      if (globalFileInputRef.current) globalFileInputRef.current.value = '';
      return;
    }

    const fieldKey = currentPath.join('.');
    setImageUploadStates(prev => ({ ...prev, [fieldKey]: true }));

    try {
      const reader = new FileReader();
      reader.onload = async (uploadEvent: any) => {
        try {
          const base64Src = uploadEvent.target?.result as string;
          if (base64Src) {
            if (file.type.startsWith('image/')) {
              const compressImage = (base64Str: string, maxWidth = 1200, quality = 0.85): Promise<string> => {
              return new Promise((resolve) => {
                const img = new window.Image();
                img.src = base64Str;
                img.onload = () => {
                  let width = img.width;
                  let height = img.height;
                  if (width > maxWidth) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                  }
                  const canvas = document.createElement('canvas');
                  canvas.width = width;
                  canvas.height = height;
                  const ctx = canvas.getContext('2d');
                  if (ctx) {
                    ctx.drawImage(img, 0, 0, width, height);
                    resolve(canvas.toDataURL('image/jpeg', quality));
                  } else {
                    resolve(base64Str);
                  }
                };
                img.onerror = () => resolve(base64Str);
              });
            };

            const compressed = await compressImage(base64Src);
            handleFieldChange(currentPath, compressed);
            } else {
              // PDF veya diğer dosyalar için sıkıştırma yapma
              handleFieldChange(currentPath, base64Src);
            }
          }
        } catch (err) {
          console.error(err);
          alert('Görsel işlenirken bir hata oluştu.');
        } finally {
          setImageUploadStates(prev => ({ ...prev, [fieldKey]: false }));
          if (globalFileInputRef.current) globalFileInputRef.current.value = '';
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setImageUploadStates(prev => ({ ...prev, [fieldKey]: false }));
      if (globalFileInputRef.current) globalFileInputRef.current.value = '';
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setIsSelectOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Verileri yükle
  const loadData = async (pageSlug: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/sections?pageSlug=${pageSlug}`);
      if (res.ok) {
        const data = await res.json();
        setSections(data);
        if (data.length > 0) {
          setSelectedSectionId(data[0]._id);
        } else {
          setSelectedSectionId(null);
        }
      }
    } catch (err) {
      console.error('Yükleme hatası:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(selectedPageSlug);
  }, [selectedPageSlug]);

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

  // Iframe'den gelen inline görsel düzenleme mesajlarını dinle
  useEffect(() => {
    const handleMessageFromIframe = (event: MessageEvent) => {
      if (event.data && event.data.type === 'INLINE_TEXT_UPDATE') {
        const { sectionId, originalText, newText } = event.data;
        setSections(prevSections => {
          const exists = prevSections.some(s => s._id === sectionId);
          if (!exists) {
            fetch('/api/sections', {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ sectionId, originalText, newText })
            }).then(res => {
              if (res.ok && iframeRef.current) {
                iframeRef.current.src = iframeRef.current.src;
              }
            });
            return prevSections;
          }
          return prevSections.map(s => {
            if (s._id === sectionId) {
              const updatedContent = updateNestedStringValue(s.content, originalText, newText);
              return { ...s, content: updatedContent };
            }
            return s;
          });
        });
      }
      if (event.data && event.data.type === 'INLINE_IMAGE_UPDATE') {
        const { sectionId, originalSrc, newSrc } = event.data;
        setSections(prevSections => {
          const exists = prevSections.some(s => s._id === sectionId);
          if (!exists) {
            fetch('/api/sections', {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ sectionId, originalSrc, newSrc })
            }).then(res => {
              if (res.ok && iframeRef.current) {
                iframeRef.current.src = iframeRef.current.src;
              }
            });
            return prevSections;
          }
          return prevSections.map(s => {
            if (s._id === sectionId) {
              const updatedContent = updateNestedStringValue(s.content, originalSrc, newSrc);
              return { ...s, content: updatedContent };
            }
            return s;
          });
        });
      }
    };

    window.addEventListener('message', handleMessageFromIframe);
    return () => window.removeEventListener('message', handleMessageFromIframe);
  }, []);

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
      if (typeof template === 'string') {
        newItem = '/placeholder.jpg';
      } else {
        newItem = cloneTemplate(template);
      }
    } else {
      // Varsayılan boş şablonlar
      const lastKey = path[path.length - 1];
      if (lastKey === 'slides') {
        newItem = { image: '/placeholder.jpg', title: 'Yeni Slayt Başlığı', subtitle: 'Alt Başlık', ctaText: 'Teklif Al', ctaLink: '#teklif' };
      } else if (lastKey === 'items') {
        newItem = { icon: 'fas fa-check', title: 'Yeni Öğe Başlığı', desc: 'Açıklama giriniz.' };
      } else if (lastKey === 'catalogs') {
        newItem = { title: 'Katalog İsmi', file: '#', cover: '/placeholder.jpg' };
      } else if (lastKey === 'images') {
        newItem = '/placeholder.jpg';
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
        if (k.toLowerCase().includes('image') || k.toLowerCase().includes('logo') || k.toLowerCase().includes('icon') || k.toLowerCase().includes('cover')) {
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
      const parentKey = path.length > 1 ? path[path.length - 2] : '';
      const isImage = 
        ['image', 'img', 'heroimg', 'bgimg', 'logo', 'bg', 'icon', 'src', 'cover'].includes(lastKey.toLowerCase()) ||
        ['images'].includes(parentKey.toLowerCase()) ||
        (value.startsWith('/images/') || value.startsWith('data:image/') || /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(value));

      const isFile = 
        ['file', 'pdf', 'document'].includes(lastKey.toLowerCase()) ||
        (value.startsWith('/pdf/') || value.startsWith('data:application/pdf') || /\.(pdf)$/i.test(value));

      if (isImage || isFile) {
        return (
          <div key={path.join('.')} className={styles.field}>
            <label>{formatLabel(lastKey)}</label>
            <div className={styles.imageFieldRow}>
              {value && isImage && (
                <div 
                  className={styles.imagePreview}
                  onClick={() => {
                    activeImagePathRef.current = path;
                    if (globalFileInputRef.current) {
                      globalFileInputRef.current.accept = 'image/*';
                      globalFileInputRef.current.click();
                    }
                  }}
                  title="Resmi değiştirmek için tıklayın"
                >
                  <img src={value} alt="Önizleme" />
                </div>
              )}
              {value && isFile && (
                <div className={styles.filePreview} style={{ padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
                  <i className="fas fa-file-pdf" style={{fontSize: '1.5rem', color: '#e11d48'}} />
                  <span style={{ fontSize: '0.85rem', color: '#f0f0f0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '200px' }}>
                    {value.length > 100 ? 'Yüklü PDF Dosyası (Base64)' : value}
                  </span>
                </div>
              )}
              <div className={styles.imageActions}>
                <button 
                  type="button" 
                  className={styles.uploadBtn}
                  disabled={imageUploadStates[path.join('.')]}
                  onClick={() => {
                    activeImagePathRef.current = path;
                    if (globalFileInputRef.current) {
                      globalFileInputRef.current.accept = isFile ? 'application/pdf' : 'image/*';
                      globalFileInputRef.current.click();
                    }
                  }}
                >
                  {imageUploadStates[path.join('.')] ? (
                    <><i className="fas fa-spinner fa-spin" /> Yükleniyor...</>
                  ) : (
                    <><i className={`fas fa-${isFile ? 'file-upload' : 'image'}`} /> {isFile ? 'PDF Yükle' : 'Görsel Seç'}</>
                  )}
                </button>
              </div>
            </div>
          </div>
        );
      }

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
                  <span>
                    {(() => {
                      let lbl = formatLabel(lastKey);
                      if (lbl.endsWith('ları')) return lbl.slice(0, -4) + 'sı';
                      if (lbl.endsWith('leri')) return lbl.slice(0, -4) + 'si';
                      if (lbl.endsWith('lar') || lbl.endsWith('ler')) return lbl.slice(0, -3);
                      return lbl;
                    })()} #{idx + 1}
                  </span>
                  <button
                    className={styles.delArrayBtn}
                    onClick={() => handleRemoveArrayItem(path, idx)}
                    title="Sil"
                  >
                    <i className="fas fa-trash-alt" /> Sil
                  </button>
                </div>
                {typeof item === 'string' ? (
                  <div style={{width: '100%'}}>
                    {renderFormFields([...path, idx.toString()], item)}
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

  const selectedPage = PAGES.find(p => p.slug === selectedPageSlug) || PAGES[0];
  const iframeSrc = `${selectedPage.url}?live=true`;

  return (
    <div className={styles.editorLayout}>
      <input 
        type="file" 
        style={{ display: 'none' }} 
        ref={globalFileInputRef}
        onChange={handleGlobalFileChange}
      />
      {/* Sol Panel: Düzenleyici */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>Canlı Düzenleyici</h2>
          <button className={styles.backBtn} onClick={() => router.push('/admin/dashboard')}>
            <i className="fas fa-arrow-left" /> Geri Dön
          </button>
        </div>

        <div className={styles.sidebarContent}>
          {/* Sayfa Seçici */}
          <div className={styles.sidebarSection}>
            <h3 className={styles.sectionTitle}>Düzenlenecek Sayfa</h3>
            <div className={styles.customSelectWrapper} ref={selectRef}>
              <div 
                className={styles.customSelectTrigger} 
                onClick={() => setIsSelectOpen(!isSelectOpen)}
              >
                <span>
                  <i className={getPageIcon(selectedPage.slug)} style={{ marginRight: '10px', color: '#c8960c' }} />
                  {selectedPage.label}
                </span>
                <i className={`fas fa-chevron-${isSelectOpen ? 'up' : 'down'}`} style={{ fontSize: '0.8rem', color: '#9aa0b0' }} />
              </div>
              {isSelectOpen && (
                <div className={styles.customSelectOptions}>
                  <div className={styles.optGroupLabel}>GENEL SAYFALAR</div>
                  {PAGES.filter(p => !['giyotin-tam-balkon', 'bioklimatik-pergola', 'tiara-twinmax', 'tiara-flat-slim-zero', 'isicamli-surme-cam-balkon', 'tek-camli-surme-cam-balkon', 'ruzgar-kirici-sistem', 'katlanir-sistem-cam-balkon', 'kis-bahcesi', 'dusakabin', 'cam-kapi'].includes(p.slug)).map(p => (
                    <div 
                      key={p.slug} 
                      className={`${styles.customOption} ${selectedPageSlug === p.slug ? styles.customOptionActive : ''}`}
                      onClick={() => {
                        handlePageChange(p.slug);
                        setIsSelectOpen(false);
                      }}
                    >
                      <i className={getPageIcon(p.slug)} style={{ marginRight: '10px', width: '16px', textAlign: 'center' }} />
                      {p.label}
                    </div>
                  ))}
                  
                  <div className={styles.optGroupLabel}>ÜRÜN DETAY SAYFALARI</div>
                  {PAGES.filter(p => ['giyotin-tam-balkon', 'bioklimatik-pergola', 'tiara-twinmax', 'tiara-flat-slim-zero', 'isicamli-surme-cam-balkon', 'tek-camli-surme-cam-balkon', 'ruzgar-kirici-sistem', 'katlanir-sistem-cam-balkon', 'kis-bahcesi', 'dusakabin', 'cam-kapi'].includes(p.slug)).map(p => (
                    <div 
                      key={p.slug} 
                      className={`${styles.customOption} ${selectedPageSlug === p.slug ? styles.customOptionActive : ''}`}
                      onClick={() => {
                        handlePageChange(p.slug);
                        setIsSelectOpen(false);
                      }}
                    >
                      <i className={getPageIcon(p.slug)} style={{ marginRight: '10px', width: '16px', textAlign: 'center' }} />
                      {p.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {loading ? (
            <div className={styles.loadingInner}>
              <i className="fas fa-spinner fa-spin" /> Yükleniyor...
            </div>
          ) : (
            <>
              {/* Bölüm Listesi */}
              <div className={styles.sidebarSection}>
                <h3 className={styles.sectionTitle}>Sayfa Bölümleri</h3>
                <div className={styles.sectionsList}>
                  {sections.length === 0 ? (
                    <div style={{ padding: '10px', color: '#9aa0b0', fontSize: '0.85rem' }}>
                      Bu sayfa için henüz bir dinamik bölüm eklenmemiş.
                    </div>
                  ) : (
                    sections.map(s => (
                      <div
                        key={s._id}
                        className={`${styles.sectionItem} ${selectedSectionId === s._id ? styles.sectionItemActive : ''}`}
                        onClick={() => {
                          setSelectedSectionId(s._id);
                          if (iframeRef.current && iframeRef.current.contentWindow) {
                            iframeRef.current.contentWindow.postMessage({ type: 'SCROLL_TO_SECTION', sectionId: s._id }, '*');
                          }
                        }}
                      >
                        <span className={styles.sectionName}>
                          <i className={SECTION_ICONS[s.type] || 'fas fa-cube'} style={{ marginRight: '10px', width: '16px', textAlign: 'center', color: '#c8960c' }} />
                          {(s.content && (s.content.title || s.content.name)) || LABELS[s.type] || s.title}
                        </span>
                        {!s.isVisible && <i className="fas fa-eye-slash text-gray" title="Yayında Gizli" />}
                      </div>
                    ))
                  )}
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
            </>
          )}
        </div>

        <div className={styles.sidebarFooter}>
          <button
            className={styles.saveBtn}
            onClick={saveCurrentSection}
            disabled={saving || sections.length === 0}
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
            <i className="fas fa-laptop" /> Canlı Önizleme (Sayfa içindeki yazılara ve resimlere tıklayarak doğrudan düzenleyebilirsiniz!)
          </span>
          <span style={{ fontSize: '0.8rem', color: '#9aa0b0' }}>
            cagdasproyapi.com{selectedPage.url}
          </span>
        </div>
        <div className={styles.iframeWrapper}>
          <iframe
            ref={iframeRef}
            src={iframeSrc}
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
