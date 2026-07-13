import styles from './CatalogSection.module.css';

export default function CatalogSection({ content }: { content: any }) {
  return (
    <section className={styles.section} id="katalog">
      <div className="container">
        <div className="section-header">
          <h2><span className="section-accent">E-Katalog</span></h2>
          <p>{content?.sectionSubtitle}</p>
        </div>
        <div className={styles.grid}>
          {content?.catalogs?.map((c: any, i: number) => {
            const hasCover = c.cover || c.imageUrl;
            return (
              <a 
                key={i} 
                href={c.file || c.pdfUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={hasCover ? styles.coverCard : styles.card}
              >
                {hasCover ? (
                  <>
                    <div className={styles.coverWrapper}>
                      <img src={c.cover || c.imageUrl} alt={c.title} className={styles.cover} />
                      <div className={styles.overlay}>
                        <span className={styles.btn}>ŞİMDİ OKU</span>
                      </div>
                    </div>
                    <div className={styles.info}>
                      <h3 className={styles.cardTitle}>{c.title}</h3>
                      <p className={styles.cardSubtitle}>PDF Kataloğu</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.icon}><i className="fas fa-file-pdf" /></div>
                    <div className={styles.body}>
                      <h4>{c.title}</h4>
                      <p>{c.size || 'PDF Kataloğu'}</p>
                    </div>
                    <i className="fas fa-download" style={{ marginLeft: 'auto', color: 'var(--accent)', flexShrink: 0 }} />
                  </>
                )}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
