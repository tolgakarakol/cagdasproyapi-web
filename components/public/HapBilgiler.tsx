import styles from './HapBilgiler.module.css';

export default function HapBilgiler({ content }: { content: any }) {
  return (
    <section className={styles.section} id="hapbilgiler">
      <div className="container">
        <div className="section-header">
          <h2><span className="section-accent">Hap Bilgiler</span></h2>
          <p>{content?.sectionSubtitle}</p>
        </div>
        <div className={styles.grid}>
          {content?.items?.map((item: any, i: number) => (
            <a key={i} href={item.file} target="_blank" rel="noopener noreferrer" className={styles.card}>
              <div className={styles.num}>0{i + 1}</div>
              <div className={styles.content}>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
              <i className="fas fa-arrow-right" style={{ color: 'var(--accent)', flexShrink: 0, transition: 'transform 0.2s' }} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
