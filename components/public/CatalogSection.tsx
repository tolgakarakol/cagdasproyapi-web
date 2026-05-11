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
          {content?.catalogs?.map((c: any, i: number) => (
            <a key={i} href={c.file} target="_blank" rel="noopener noreferrer" className={styles.card}>
              <div className={styles.icon}><i className="fas fa-file-pdf" /></div>
              <div className={styles.body}>
                <h4>{c.title}</h4>
                <p>{c.size}</p>
              </div>
              <i className="fas fa-download" style={{ marginLeft: 'auto', color: 'var(--accent)', flexShrink: 0 }} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
