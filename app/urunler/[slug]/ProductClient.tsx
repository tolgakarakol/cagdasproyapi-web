'use client';
import styles from './product.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { PRODUCT_DATA } from '@/lib/productData';

export default function ProductClient({ slug, initialData, sectionId }: { slug: string; initialData?: any; sectionId?: string }) {
  const [product, setProduct] = useState(initialData || PRODUCT_DATA[slug] || {});

  useEffect(() => {
    const isLive = typeof window !== 'undefined' && window.location.search.includes('live=true');
    if (!isLive) return;

    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'LIVE_PREVIEW_UPDATE') {
        const section = event.data.sections.find((s: any) => s.type === 'product_detail');
        if (section) {
          setProduct(section.content);
        }
      }
    };
    window.addEventListener('message', handleMessage);

    const style = document.createElement('style');
    style.innerHTML = `
      [data-section-id] h1, [data-section-id] h2, [data-section-id] h3, 
      [data-section-id] h4, [data-section-id] p, [data-section-id] span, 
      [data-section-id] button, [data-section-id] a:not([href^="#"]) {
        outline: 1px dashed transparent;
        transition: outline 0.15s ease, outline-color 0.15s ease;
      }
      [data-section-id] h1:hover, [data-section-id] h2:hover, [data-section-id] h3:hover, 
      [data-section-id] h4:hover, [data-section-id] p:hover, [data-section-id] span:hover, 
      [data-section-id] button:hover, [data-section-id] a:not([href^="#"]):hover {
        outline: 2px dashed #c8960c !important;
        outline-offset: 4px;
        cursor: pointer;
      }
      .inline-edit-active {
        outline: 2px solid #c8960c !important;
        background: rgba(200, 150, 12, 0.08) !important;
        cursor: text !important;
      }
    `;
    document.head.appendChild(style);

    const findBgElement = (targetEl: HTMLElement): { el: HTMLElement; url: string } | null => {
      let currentEl: HTMLElement | null = targetEl;
      while (currentEl && !currentEl.hasAttribute('data-section-id')) {
        const bg = window.getComputedStyle(currentEl).backgroundImage;
        if (bg && bg !== 'none' && bg.startsWith('url(')) {
          const cleanUrl = bg.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '');
          return { el: currentEl, url: cleanUrl };
        }
        currentEl = currentEl.parentElement;
      }
      return null;
    };

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

    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const sectionEl = target.closest('[data-section-id]');
      if (!sectionEl) return;

      const editableTags = ['H1', 'H2', 'H3', 'H4', 'P', 'SPAN', 'A', 'BUTTON'];
      if (editableTags.includes(target.tagName)) {
        if (target.classList.contains('inline-edit-active')) return;

        e.preventDefault();
        e.stopPropagation();

        const originalText = target.innerText.trim();
        target.setAttribute('contenteditable', 'true');
        target.classList.add('inline-edit-active');
        target.focus();

        const handleBlur = () => {
          target.removeAttribute('contenteditable');
          target.classList.remove('inline-edit-active');
          const newText = target.innerText.trim();

          if (newText !== originalText) {
            const sid = sectionEl.getAttribute('data-section-id');
            window.parent.postMessage({
              type: 'INLINE_TEXT_UPDATE',
              sectionId: sid,
              originalText,
              newText
            }, '*');
          }
          target.removeEventListener('blur', handleBlur);
        };
        target.addEventListener('blur', handleBlur);
        return;
      }

      if (target.tagName === 'IMG') {
        e.preventDefault();
        e.stopPropagation();

        let originalSrc = target.getAttribute('src') || '';
        if (originalSrc.includes('/_next/image') || originalSrc.includes('?url=')) {
          try {
            const urlObj = new URL(originalSrc, window.location.origin);
            const rawUrl = urlObj.searchParams.get('url');
            if (rawUrl) originalSrc = rawUrl;
          } catch (e) {
            const match = originalSrc.match(/[?&]url=([^&]+)/);
            if (match) originalSrc = decodeURIComponent(match[1]);
          }
        }
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        
        fileInput.onchange = (fileEvent: any) => {
          const file = fileEvent.target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = async (uploadEvent: any) => {
              const base64Src = uploadEvent.target?.result as string;
              if (base64Src) {
                const compressed = await compressImage(base64Src);
                const sid = sectionEl.getAttribute('data-section-id');
                window.parent.postMessage({
                  type: 'INLINE_IMAGE_UPDATE',
                  sectionId: sid,
                  originalSrc,
                  newSrc: compressed
                }, '*');
              }
            };
            reader.readAsDataURL(file);
          }
        };
        fileInput.click();
      } else {
        const bgData = findBgElement(target);
        if (bgData) {
          e.preventDefault();
          e.stopPropagation();

          const fileInput = document.createElement('input');
          fileInput.type = 'file';
          fileInput.accept = 'image/*';
          
          fileInput.onchange = (fileEvent: any) => {
            const file = fileEvent.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = async (uploadEvent: any) => {
                const base64Src = uploadEvent.target?.result as string;
                if (base64Src) {
                  const compressed = await compressImage(base64Src);
                  const sid = sectionEl.getAttribute('data-section-id');
                  window.parent.postMessage({
                    type: 'INLINE_IMAGE_UPDATE',
                    sectionId: sid,
                    originalSrc: bgData.url,
                    newSrc: compressed
                  }, '*');
                }
              };
              reader.readAsDataURL(file);
            }
          };
          fileInput.click();
        }
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG') {
        const sectionEl = target.closest('[data-section-id]');
        if (sectionEl) {
          target.style.outline = '2px dashed #c8960c';
          target.style.outlineOffset = '2px';
          target.style.cursor = 'pointer';
        }
      } else {
        const bgData = findBgElement(target);
        if (bgData) {
          bgData.el.style.outline = '3px dashed #c8960c';
          bgData.el.style.outlineOffset = '-3px';
          bgData.el.style.cursor = 'pointer';
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG') {
        target.style.outline = '';
      } else {
        const bgData = findBgElement(target);
        if (bgData) {
          bgData.el.style.outline = '';
          bgData.el.style.outlineOffset = '';
        }
      }
    };

    document.addEventListener('click', handleDocumentClick, true);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('message', handleMessage);
      document.removeEventListener('click', handleDocumentClick, true);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      style.remove();
    };
  }, [initialData]);

  return (
    <div data-section-id={sectionId}>
      <div className={styles.hero}>
        <Image src={product.heroImg} alt={product.heroTitle} fill className={styles.heroImg} priority />
        <div className={styles.heroOverlay}>
          <div>
            <div className={styles.heroBadge}>{product.badge}</div>
            <h1 className={styles.heroTitle}>
              {product.heroTitle}
              {product.heroTitleExtra && <span className={styles.heroTitleExtra}>{product.heroTitleExtra}</span>}
            </h1>
            {product.heroSub && <p className={styles.heroSub}>{product.heroSub}</p>}
          </div>
        </div>
      </div>

      {product.isCategory ? (
        <section className={styles.categorySection}>
          <h2 className={styles.categorySectionTitle}>Katlanır Sistem</h2>
          <div className={styles.categoryGrid}>
            {product.subProducts.slice(0, 2).map((sub: any, i: number) => (
              <div key={i} className={`${styles.categoryCard} ${sub.featured ? styles.categoryCardFeatured : ''}`}>
                <div className={styles.categoryCardImg}>
                  <Image src={sub.image} alt={sub.title} fill />
                  <div className={styles.categoryCardBadge}>{sub.badge}</div>
                </div>
                <div className={styles.categoryCardBody}>
                  <h3 className={styles.categoryCardTitle}>{sub.title}</h3>
                  <p className={sub.featured ? styles.categoryCardDescFeatured : styles.categoryCardDesc}>{sub.desc}</p>
                  <Link href={`/urunler/${sub.slug}`} className={styles.categoryCardBtn}>
                    DETAYLI İNCELE <i className="fas fa-arrow-right" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <h2 className={`${styles.categorySectionTitle} ${styles.sectionGap}`}>Sürme Sistem</h2>
          <div className={styles.categoryGrid}>
            {product.subProducts.slice(2, 4).map((sub: any, i: number) => (
              <div key={i} className={`${styles.categoryCard} ${sub.featured ? styles.categoryCardFeatured : ''}`}>
                <div className={styles.categoryCardImg}>
                  <Image src={sub.image} alt={sub.title} fill />
                  <div className={styles.categoryCardBadge}>{sub.badge}</div>
                </div>
                <div className={styles.categoryCardBody}>
                  <h3 className={styles.categoryCardTitle}>{sub.title}</h3>
                  <p className={sub.featured ? styles.categoryCardDescFeatured : styles.categoryCardDesc}>{sub.desc}</p>
                  <Link href={`/urunler/${sub.slug}`} className={styles.categoryCardBtn}>
                    DETAYLI İNCELE <i className="fas fa-arrow-right" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <>
          {product.tagline && (
            <section>
              <div className={styles.tagline}>
                <p className={styles.taglineText}>
                  {product.tagline.split('\n').map((line: string, i: number) => (
                    line === ''
                      ? <br key={i} />
                      : <span key={i}>{line}<br /></span>
                  ))}
                </p>
              </div>
            </section>
          )}

          {product.textFeatures && (
            <section className={styles.textFeatures}>
              <div className={styles.textFeaturesGrid}>
                <div className={styles.textFeaturesLeft}>
                  <div className={styles.textFeaturesLeftContent}>
                    <h2 className={styles.textFeaturesMainTitle}>{product.textFeatures.title}</h2>
                    <p className={styles.textFeaturesMainDesc}>{product.textFeatures.desc}</p>
                  </div>
                  {product.textFeatures.img && (
                    <div className={styles.textFeaturesImgWrap}>
                      <img src={product.textFeatures.img} alt={product.textFeatures.title} />
                    </div>
                  )}
                </div>
                <div className={styles.textFeaturesRight}>
                  {product.textFeatures.items.map((item: any, i: number) => (
                    <div key={i} className={styles.textFeatureItem}>
                      <h3 className={styles.textFeatureTitle}>{item.title}</h3>
                      <p className={styles.textFeatureDesc}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {product.sections?.map((section: any, idx: number) => {
            if (section.type === 'text_list_with_image') {
              return (
                <section key={idx} className={styles.textFeatures}>
                  <div className={styles.textFeaturesGrid}>
                    <div className={styles.textListLeft}>
                      <h2 className={styles.sectionTitle}>{section.title}</h2>
                      <p className={styles.sectionText}>{section.content}</p>
                      <div className={styles.textListImgWrap}>
                        <img src={section.image} alt={section.title} />
                      </div>
                    </div>
                    <div className={styles.textFeaturesRight}>
                      {section.features?.map((feat: any, i: number) => (
                        <div key={i} className={styles.textFeatureItem}>
                          <h3 className={styles.textFeatureTitle}>{feat.title}</h3>
                          <p className={styles.textFeatureDesc}>{feat.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              );
            }
            if (section.type === 'text_image') {
              return (
                <section key={idx} className={`${styles.textImageSection} ${section.reverse ? styles.reverse : ''}`}>
                  <div className={styles.textImageGrid} style={{ backgroundColor: section.bg || '#fff' }}>
                    <div className={styles.textImageContent}>
                      {section.badge && <span className={styles.sectionBadge}>{section.badge}</span>}
                      <h2 className={styles.sectionTitle}>{section.title}</h2>
                      <p className={styles.sectionText}>{section.content}</p>
                    </div>
                    <div className={styles.textImageImg}>
                      <img src={section.image} alt={section.title} style={{ objectFit: section.imageFit || 'contain' }} />
                    </div>
                  </div>
                </section>
              );
            }
            if (section.type === 'image_full') {
              return (
                <div key={idx} style={{ width: '100%', margin: '0 0 8px 0', lineHeight: 0 }}>
                  <img
                    src={section.image}
                    alt={section.title || ''}
                    style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
                  />
                </div>
              );
            }
            if (section.type === 'highlight') {
              return (
                <section key={idx} className={styles.highlightSection}>
                  <div className={styles.highlightCard}>
                    {section.badge && <span className={styles.highlightBadge}>{section.badge}</span>}
                    <h2 className={styles.highlightTitle}>{section.title}</h2>
                    <p className={styles.highlightContent}>{section.content}</p>
                  </div>
                </section>
              );
            }
            if (section.type === 'grid') {
              return (
                <section key={idx} className={styles.customGridSection}>
                  <h2 className={styles.gridTitle}>{section.title}</h2>
                  <div className={styles.customGrid}>
                    {section.items.map((item: any, i: number) => (
                      <div key={i} className={styles.gridItem}>
                        <div className={styles.gridItemIcon}><i className={item.icon} /></div>
                        <h3 className={styles.gridItemTitle}>{item.title}</h3>
                        <p className={styles.gridItemDesc}>{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>
              );
            }
            if (section.type === 'text_gallery') {
              return (
                <section key={idx} className={styles.textGallerySection}>
                  <div className={styles.textGalleryContainer}>
                    <h2 className={styles.textGalleryTitle}>{section.title}</h2>
                    <p className={styles.textGalleryContent}>{section.content}</p>
                    <div className={styles.textGalleryImages}>
                      {section.images?.map((img: string, i: number) => (
                        <div key={i} className={styles.textGalleryImgWrap}>
                          <img src={img} alt={`${section.title} ${i}`} />
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              );
            }
            if (section.type === 'text_features') {
              return (
                <section key={idx} className={styles.textFeatures}>
                  <div className={styles.textFeaturesGrid}>
                    <div className={styles.textFeaturesLeft}>
                      {section.features?.map((feat: any, i: number) => (
                        <div key={i} className={styles.textFeatureItem}>
                          <h3 className={styles.textFeatureTitle}>{feat.title}</h3>
                          <p className={styles.textFeatureDesc}>{feat.desc}</p>
                        </div>
                      ))}
                    </div>
                    <div className={styles.textFeaturesImgWrap}>
                      <img src={section.image} alt="Özellikler" />
                    </div>
                  </div>
                </section>
              );
            }
            return null;
          })}




          
          {product.features && product.features.length > 0 && (
            <section className={styles.features}>
              <div className={styles.featuresGrid}>
                {product.features.map((f: any, i: number) => (
                  <div key={i} className={f.isWide ? styles.featureCardWide : styles.featureCard}>
                    <div className={f.isWide ? styles.featureCardWideImg : styles.featureCardImg}>
                      <Image src={f.img} alt={f.title} fill />
                    </div>
                    <div className={f.isWide ? styles.featureCardWideBody : styles.featureCardBody}>
                      <h3 className={styles.featureCardTitle}>{f.title}</h3>
                      <p className={styles.featureCardDesc}>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {product.safetyImg && (
            <div className={styles.fullBanner}>
              <Image src={product.safetyImg} alt="Güvenlik" fill className={styles.fullBannerImg} />
              <div className={styles.fullBannerOverlay}>
                <h2 className={styles.fullBannerTitle}>{product.safetyTitle || 'Güvenlik Önceliğimiz!'}</h2>
                <p className={styles.fullBannerDesc}>
                  {product.safetyDesc || 'Paneller istenilen yükseklikte konumlanarak hem çocuklar hem de evcil hayvanlar için güvenli bir ortam oluşturur.'}
                </p>
              </div>
            </div>
          )}

          {product.cleaningSteps && product.cleaningSteps.length > 0 && (
            <section className={styles.cleaning}>
              <div className={styles.cleaningGrid}>
                <div className={styles.cleaningImgWrap}>
                  {product.cleaningImg?.endsWith('.mp4') ? (
                    <video src={product.cleaningImg} autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <img src={product.cleaningImg} alt="Temizlik" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  )}
                </div>
                <div className={styles.cleaningContent}>
                  <h2>{product.cleaningTitle || 'Nasıl Temizlenir?'}</h2>
                  <p>{product.cleaningDesc || '%100 silinebilir cam panelleriyle temizliği zahmetsiz hale getirir.'}</p>
                  <ul className={styles.steps}>
                    {product.cleaningSteps.map((step: string, i: number) => (
                      <li key={i} className={styles.step}>
                        <span className={styles.stepNum}>{i + 1}</span>
                        <span className={styles.stepText}>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          )}

          {product.tests && (
            <section className={styles.testSection}>
              <div className={styles.testHeader}>
                <h2 className={styles.testTitle}>Testleri Geçtik!</h2>
              </div>
              <div className={styles.testGrid}>
                {product.tests.map((test: any, i: number) => (
                  <div key={i} className={styles.testCard}>
                    <div className={styles.testIcon}><i className={test.icon} /></div>
                    <h3 className={styles.testCardTitle}>{test.title}</h3>
                    <p className={styles.testCardDesc}>{test.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className={`${styles.darkFeatures} ${(!product.darkFeatures || product.darkFeatures.length === 0) ? styles.darkFeaturesEmpty : ''}`}>
            <h2 className={`${styles.darkFeaturesTitle} ${(!product.darkFeatures || product.darkFeatures.length === 0) ? styles.darkFeaturesTitleEmpty : ''}`}>Teknik Üstünlükler</h2>
            {product.darkFeatures && product.darkFeatures.length > 0 && (
              <div className={styles.darkFeaturesGrid}>
                {product.darkFeatures.map((f: any, i: number) => (
                  <div key={i} className={styles.darkCard}>
                    <div className={styles.darkIcon}><i className={f.icon} /></div>
                    <h3 className={styles.darkCardTitle}>{f.title}</h3>
                    <p className={styles.darkCardDesc}>{f.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {product.bottomFeatures && product.bottomFeatures.length > 0 && (
            <section className={`${styles.features} ${product.finalFeatures && product.finalFeatures.length > 0 ? styles.featuresWithNext : ''}`}>
              <div className={styles.featuresGrid}>
                {product.bottomFeatures.map((f: any, i: number) => (
                  <div key={i} className={styles.featureCard}>
                    <div className={styles.featureCardImg}>
                      <Image src={f.img} alt={f.title} fill />
                    </div>
                    <div className={styles.featureCardBody}>
                      <h3 className={styles.featureCardTitle}>{f.title}</h3>
                      <p className={styles.featureCardDesc}>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Extra Sections (text_image_full, text_image_dark) */}
          {product.extraSections?.map((es: any, idx: number) => {
            if (es.type === 'text_image_full') {
              return (
                <section key={`extra-${idx}`} className={styles.extraFullSection}>
                  <div className={styles.extraFullGrid}>
                    <div className={styles.extraFullImg}>
                      <img src={es.image} alt={es.title} />
                    </div>
                    <div className={styles.extraFullContent}>
                      <h2 className={styles.extraFullTitle}>{es.title}</h2>
                      <p className={styles.extraFullText}>{es.content}</p>
                    </div>
                  </div>
                </section>
              );
            }
            if (es.type === 'text_image_dark') {
              return (
                <div key={`extra-${idx}`}>
                  {es.topImage && (
                    <div className={styles.extraTopImageWrap}>
                      <img src={es.topImage} alt={es.title} />
                    </div>
                  )}
                  <section className={styles.extraDarkSection}>
                    <div className={styles.extraDarkGrid}>
                      <div className={styles.extraDarkContent}>
                        <h2 className={styles.extraDarkTitle}>{es.title}</h2>
                        <p className={styles.extraDarkText}>{es.content}</p>
                      </div>
                      <div className={styles.extraDarkImg}>
                        <img src={es.image} alt={es.title} />
                      </div>
                    </div>
                  </section>
                </div>
              );
            }
            return null;
          })}

          {/* Final Features Grid */}
          {product.finalFeatures && product.finalFeatures.length > 0 && (
            <section className={styles.finalFeaturesSection}>
              <div className={styles.finalFeaturesGrid}>
                {product.finalFeatures.map((f: any, i: number) => (
                  <div key={i} className={styles.finalFeatureCard}>
                    <div className={styles.finalFeatureImg}>
                      <Image src={f.img} alt={f.title} fill />
                    </div>
                    <div className={styles.finalFeatureBody}>
                      <h3 className={styles.finalFeatureTitle}>{f.title}</h3>
                      <p className={styles.finalFeatureDesc}>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className={styles.ctaBanner}>
            <h2 className={styles.ctaBannerTitle}>Ücretsiz Keşif ve Fiyat Teklifi</h2>
            <p className={styles.ctaBannerSub}>Albert Genau yetkili bayi olarak uzman ekibimiz adresinize geliyor.</p>
            <Link href="/iletisim" className={styles.ctaBtn}>HEMEN İLETİŞİME GEÇ</Link>
          </div>


        </>
      )}
    </div>
  );
}
