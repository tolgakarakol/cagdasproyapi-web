'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './AboutSection.module.css';

export default function AboutSection({ content }: { content: any }) {
  const { heading, body, stats } = content;
  
  return (
    <section className={styles.section} id="hakkimizda">
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.imageCol}>
            <div className={styles.experienceBox}>
              <span className={styles.expYears}>15</span>
              <span className={styles.expText}>Yıllık<br/>Deneyim</span>
            </div>
            <Image src="/images/slides/kis-bahcesi.jpg" alt="Hakkımızda" width={600} height={700} className={styles.mainImg} />
          </div>
          <div className={styles.content}>
            <span className={styles.tag}>Kurumsal</span>
            <h2 className={`${styles.heading} serif`}>{heading}</h2>
            <p className={styles.bodyText}>{body}</p>
            <div className={styles.statsGrid}>
              {stats?.map((s: any) => (
                <div key={s.label} className={styles.statCard}>
                  <div className={styles.statValue}>{s.value}{s.suffix}</div>
                  <div className={styles.statLabel}>{s.label}</div>
                </div>
              ))}
            </div>
            {!content.hideButton && (
              <div className={styles.actions}>
                <Link href="/hakkimizda" className="btn btn-primary">Daha Fazlası</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
