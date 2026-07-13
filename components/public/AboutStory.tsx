'use client';
import Image from 'next/image';
import styles from '@/app/hakkimizda/hakkimizda.module.css';

export default function AboutStory({ content }: { content: any }) {
  if (!content) return null;
  return (
    <section className={styles.storySection} style={{ paddingTop: '2rem' }}>
      <div className="container">
        <div className={styles.storyGrid}>
          <div className={styles.storyContent}>
            <h2>{content.title}</h2>
            <p>{content.p1}</p>
            <p>{content.p2}</p>
            <p>{content.p3}</p>
          </div>
          <div className={styles.storyImageWrap}>
            <Image 
              src={content.image || "/images/products/katlanir_balkon_hero_v4.jpg"} 
              alt={content.title || "Hikayemiz"} 
              fill 
              quality={90}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
