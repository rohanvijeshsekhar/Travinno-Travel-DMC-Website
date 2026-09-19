import type { Metadata } from 'next';
import './globals.css';
import ChunkErrorRecovery from '../components/ChunkErrorRecovery';

export const metadata: Metadata = {
  title: 'Travinno - Crafting Journeys, Creating Memories',
  description: 'Premium B2B travel partner contract for luxury custom packages, destination management, and leisure travel.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
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
          color: '#F5F2EC',
          minHeight: '100vh',
        }}
      >
        <ChunkErrorRecovery />
        {children}
      </body>
    </html>
  );
}

