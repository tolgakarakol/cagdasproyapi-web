'use client';
import styles from '@/app/hakkimizda/hakkimizda.module.css';

export default function AboutMV({ content }: { content: any }) {
  if (!content) return null;
  return (
    <section className={styles.missionVision}>
      <div className="container">
        <div className={styles.mvGrid}>
          <div className={styles.mvBox}>
            <h3>{content.visionTitle}</h3>
            <p>{content.visionText}</p>
          </div>
          <div className={styles.mvBox}>
            <h3>{content.missionTitle}</h3>
            <p>{content.missionText}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
