import type { Metadata, Viewport } from 'next';
import './globals.css';
import ChunkErrorRecovery from '../components/ChunkErrorRecovery';

export const metadata: Metadata = {
  title: 'Travinno - Crafting Journeys, Creating Memories',
  description: 'Premium B2B travel partner contract for luxury custom packages, destination management, and leisure travel.',
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
        <meta name="color-scheme" content="dark" />
        <meta name="theme-color" content="#050505" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#050505" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#050505" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-touch-fullscreen" content="yes" />
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

