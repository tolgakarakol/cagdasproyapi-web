'use client';
import styles from './QuoteForm.module.css';
import { useState } from 'react';

export default function QuoteForm({ content }: { content: any }) {
  const [form, setForm] = useState({ name: '', phone: '', service: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Merhaba! Teklif almak istiyorum.%0AAdım: ${form.name}%0ATelefon: ${form.phone}%0AHizmet: ${form.service}%0ANot: ${form.message}`;
    window.open(`https://wa.me/${content.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <section className={styles.section} id="teklif">
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.info}>
            <span className={styles.tag}>Hızlı İletişim</span>
            <h2 className={styles.heading}>Ücretsiz Teklif Alın</h2>
            <p className={styles.sub}>{content?.sectionSubtitle}</p>
            <div className={styles.features}>
              {['Hızlı yanıt garantisi', 'Ücretsiz keşif & ölçüm', '2 Yıl Sistem Garantisi', '5 Yıl Paslanmaz Garantisi'].map((f, i) => (
                <div key={i} className={styles.feature}>
                  <i className="fas fa-check-circle" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label>Ad Soyad *</label>
              <input type="text" required placeholder="Adınız Soyadınız" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
            </div>
            <div className={styles.field}>
              <label>Telefon *</label>
              <input type="tel" required placeholder="05XX XXX XX XX" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
            </div>
            <div className={styles.field}>
              <label>Hizmet Seçin *</label>
              <select required value={form.service} onChange={e => setForm({...form, service: e.target.value})}>
                <option value="">Hizmet seçiniz...</option>
                {content?.services?.map((s: string, i: number) => <option key={i} value={s}>{s}</option>)}
              </select>
            </div>
            <div className={styles.field}>
              <label>Notunuz</label>
              <textarea placeholder="Projeniz hakkında kısa bilgi veriniz..." rows={4} value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
            </div>
            <button type="submit" className={styles.submit}>
              GÖNDER
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
