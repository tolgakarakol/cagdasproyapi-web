import Link from 'next/link';
import Image from 'next/image';
import styles from './ProductsGrid.module.css';

export default function ProductsGrid({ content }: { content: any }) {
  const { products, sectionSubtitle } = content;
  return (
    <section className={styles.section} id="urunler">
      <div className="container">
        <div className="section-header">
          <h2 className={styles.mainTitle}>Ürün Gruplarımız</h2>
          <p>{sectionSubtitle}</p>
        </div>
        <div className={styles.grid}>
          {products?.map((p: any) => (
            <Link key={p.id} href={`/urunler/${p.id}`} className={styles.card}>
              <div className={styles.imageWrap}>
                <Image src={p.image || `/images/products/${p.id}.jpg`} alt={p.title} fill className={styles.productImg} />
              </div>
              <div className={styles.body}>
                <h3 className={styles.title}>{p.title}</h3>
                <p className={styles.desc}>{p.description}</p>
                <div className={styles.cta}>
                  <span>İncele <i className="fas fa-arrow-right" /></span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
