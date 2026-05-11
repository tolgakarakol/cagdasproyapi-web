import styles from './GuaranteeBand.module.css';

export default function GuaranteeBand({ content }: { content: any }) {
  return (
    <section className={styles.band}>
      <div className="container">
        <div className={styles.grid}>
          {content?.guarantees?.map((g: any, i: number) => (
            <div key={i} className={styles.item}>
              <div className={styles.icon}><i className={g.icon} /></div>
              <div>
                <h4 className={styles.title}>{g.title}</h4>
                <p className={styles.sub}>{g.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
