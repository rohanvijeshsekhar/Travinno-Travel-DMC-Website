import type { Metadata } from 'next';
import { getCollectionsSSR } from './db-server';

export interface PageSEO {
  page: string;
  title: string;
  description: string;
  url?: string;
  canonical?: string;
  ogImage?: string;
  keywords?: string;
  indexable?: boolean;
}

const DEFAULT_SITE_URL = 'https://travinno.com';
const DEFAULT_OG_IMAGE = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80';

export async function buildPageMetadata(
  pageKey: string,
  fallbackTitle: string,
  fallbackDesc: string,
  pathname: string = ''
): Promise<Metadata> {
  const collections = await getCollectionsSSR();
  const seoList: PageSEO[] = collections['travinno_seo'] || [];
  const entry = seoList.find((item: any) => item.page === pageKey);

  const cleanPath = pathname ? (pathname.startsWith('/') ? pathname : `/${pathname}`) : '';
  const defaultPageUrl = `${DEFAULT_SITE_URL}${cleanPath}`;

  const title = entry?.title || fallbackTitle;
  const description = entry?.description || fallbackDesc;
  const canonicalUrl = entry?.canonical && entry.canonical.trim() !== ''
    ? entry.canonical.trim()
    : (entry?.url && entry.url.trim() !== '' ? entry.url.trim() : defaultPageUrl);
  const rawOgImage = entry?.ogImage && entry.ogImage.trim() !== '' ? entry.ogImage.trim() : DEFAULT_OG_IMAGE;
  let ogImageUrl = rawOgImage;
  if (rawOgImage.startsWith('data:')) {
    ogImageUrl = `${DEFAULT_SITE_URL}/api/image/?c=travinno_seo&i=${encodeURIComponent(pageKey)}&f=ogImage`;
  } else if (rawOgImage.startsWith('/')) {
    ogImageUrl = `${DEFAULT_SITE_URL}${rawOgImage}`;
  }
  const isIndexable = entry?.indexable !== false;
  const keywords = entry?.keywords && entry.keywords.trim() !== '' ? entry.keywords.trim() : undefined;

  return {
    title,
    description,
    verification: {
      google: '02mIuTQUDo7CHj_ypfubcPksmhuTfe7gVhfYCudV3zI',
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: '48x48' },
        { url: '/icon-48.png', sizes: '48x48', type: 'image/png' },
        { url: '/icon-96.png', sizes: '96x96', type: 'image/png' },
        { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
        { url: '/favicon.svg', type: 'image/svg+xml' },
      ],
      apple: [
        { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
      ],
      shortcut: ['/favicon.ico'],
    },
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: isIndexable,
      follow: isIndexable,
      googleBot: {
        index: isIndexable,
        follow: isIndexable,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Travinno',
      type: 'website',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  };
}
