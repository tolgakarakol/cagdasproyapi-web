import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Silivri Cam Balkon & Pergola | Çağdaş Pro Yapı - Albert Genau Bayi',
  description: 'Silivri, Selimpaşa, Gümüşyaka ve Ortaköy bölgelerinde profesyonel cam balkon, bioklimatik pergola ve kış bahçesi sistemleri. Albert Genau yetkili bayisinden 10 yıl garantili çözümler.',
  keywords: 'silivri cam balkon, selimpaşa cam balkon, gümüşyaka cam balkon, silivri pergola sistemleri, silivri kış bahçesi, albert genel silivri bayii, istanbul cam balkon fiyatları',
  icons: {
    icon: '/images/favicon.png',
  },
  openGraph: {
    title: 'Çağdaş Pro Yapı | Silivri Cam Balkon & Pergola',
    description: 'Albert Genau Yetkili Bayisi olarak Silivri ve tüm mahallelerinde premium cam sistemleri sunuyoruz.',
    type: 'website',
    locale: 'tr_TR',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
