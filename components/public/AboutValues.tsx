'use client';
import styles from '@/app/hakkimizda/hakkimizda.module.css';

export default function AboutValues({ content }: { content: any }) {
  if (!content) return null;
  return (
    <section className={styles.valuesSection}>
      <div className="container">
        <h2 className={styles.sectionTitle}>{content.title || "Temel Değerlerimiz"}</h2>
        <div className={styles.valuesGrid}>
          {(content.values || []).map((val: any, i: number) => (
            <div key={i} className={styles.valueCard}>
              <i className={`${val.icon || 'fas fa-award'} ${styles.valueIcon}`}></i>
              <h3>{val.title}</h3>
              <p>{val.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
