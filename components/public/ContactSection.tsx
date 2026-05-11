import styles from './ContactSection.module.css';

export default function ContactSection({ content }: { content: any }) {
  return (
    <section className={styles.section} id="iletisim">
      <div className="container">
        <div className="section-header">
          <h2><span className="section-accent">İletişim</span></h2>
          <p>Sorularınız için bize ulaşın, ücretsiz keşif için randevu alın</p>
        </div>
        <div className={styles.grid}>
          <div className={styles.info}>
            <div className={styles.card}>
              <i className="fas fa-map-marker-alt" />
              <div><h4>Adres</h4><p>{content?.address}</p></div>
            </div>
            <div className={styles.card}>
              <i className="fas fa-phone" />
              <div><h4>Telefon</h4><a href={`tel:${content?.phone}`}>{content?.phone}</a></div>
            </div>
            <div className={styles.card}>
              <i className="fab fa-whatsapp" />
              <div><h4>WhatsApp</h4><a href={`https://wa.me/${content?.whatsapp}`} target="_blank" rel="noopener noreferrer">{content?.phone}</a></div>
            </div>
            <div className={styles.card}>
              <i className="fab fa-instagram" />
              <div><h4>Instagram</h4><a href={`https://instagram.com/${content?.instagram}`} target="_blank" rel="noopener noreferrer">@{content?.instagram}</a></div>
            </div>
            <div className={styles.card}>
              <i className="fas fa-envelope" />
              <div><h4>E-posta</h4><a href="mailto:info@cagdasproyapi.com">info@cagdasproyapi.com</a></div>
            </div>
            <div className={styles.card}>
              <i className="fas fa-clock" />
              <div><h4>Çalışma Saatleri</h4><p>{content?.workingHours}</p></div>
            </div>
          </div>
          <div className={styles.mapWrap}>
            <iframe
              src={content?.mapEmbedUrl}
              width="100%" height="100%"
              style={{ border: 0, borderRadius: '12px' }}
              allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Çağdaş Pro Yapı Konum"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
