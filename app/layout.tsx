import type { Metadata } from 'next';
import './globals.css';
import { connectDB } from '@/lib/mongodb';
import { Settings } from '@/models/Settings';
import { Appearance } from '@/models/Appearance';
import AnalyticsTracker from '@/components/public/AnalyticsTracker';

export async function generateMetadata(): Promise<Metadata> {
  try {
    await connectDB();
    const settings = await Settings.findOne() || {};
    const appearance = await Appearance.findOne() || {};

    const title = settings.metaTitle || 'Çağdaş Pro Yapı - Albert Genau Bayi';
    const description = settings.metaDescription || 'Silivri, Selimpaşa profesyonel cam balkon ve pergola sistemleri.';
    const faviconUrl = appearance.faviconUrl || '/images/favicon.png';

    return {
      title,
      description,
      icons: {
        icon: faviconUrl,
      },
      openGraph: {
        title,
        description,
        type: 'website',
        locale: 'tr_TR',
      },
      verification: settings.googleVerification ? {
        google: settings.googleVerification,
      } : undefined,
    };
  } catch (e) {
    return { title: 'Çağdaş Pro Yapı' };
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let customScripts = '';
  try {
    await connectDB();
    const settings = await Settings.findOne();
    if (settings && settings.customScripts) {
      customScripts = settings.customScripts;
    }
  } catch (e) {}

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
        {customScripts && <div dangerouslySetInnerHTML={{ __html: customScripts }} />}
      </head>
      <body>
        <AnalyticsTracker />
        {children}
      </body>
    </html>
  );
}
