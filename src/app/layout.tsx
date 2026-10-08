import type { Metadata, Viewport } from 'next';
import './globals.css';
import ChunkErrorRecovery from '../components/ChunkErrorRecovery';

export const metadata: Metadata = {
  title: 'Travinno - Crafting Journeys, Creating Memories',
  description: 'Premium B2B travel partner contract for luxury custom packages, destination management, and leisure travel.',
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
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Travinno',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  themeColor: '#050505',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      style={{
        backgroundColor: '#050505',
        colorScheme: 'dark',
        margin: 0,
        padding: 0,
        width: '100%',
        minHeight: '100%',
      }}
    >
      <head>
        {/* Google Site Verification */}
        <meta name="google-site-verification" content="02mIuTQUDo7CHj_ypfubcPksmhuTfe7gVhfYCudV3zI" />

        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-H4HKW1GWTV" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-H4HKW1GWTV');
            `,
          }}
        />

        <meta name="color-scheme" content="dark" />
        <meta name="theme-color" content="#050505" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#050505" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#050505" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-touch-fullscreen" content="yes" />

        {/* Favicon & Touch Icons */}
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" href="/icon-48.png" type="image/png" sizes="48x48" />
        <link rel="icon" href="/icon-96.png" type="image/png" sizes="96x96" />
        <link rel="icon" href="/icon-192.png" type="image/png" sizes="192x192" />
        <link rel="icon" href="/icon-512.png" type="image/png" sizes="512x512" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="any" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-icon.png" sizes="180x180" />
        {/* Preconnect to font origins for faster DNS+TLS handshake */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.fontshare.com" />
        {/* Load Google Fonts non-render-blocking via link instead of CSS @import */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Caveat:wght@400;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Allura&family=Alex+Brush&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap"
        />
      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: '#050505',
          colorScheme: 'dark',
          color: '#F5F2EC',
          minHeight: '100dvh',
          overscrollBehavior: 'none',
        }}
      >
        <ChunkErrorRecovery />
        {children}
      </body>
    </html>
  );
}

