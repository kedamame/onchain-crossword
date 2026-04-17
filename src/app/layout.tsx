import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/components/providers/AppProvider';

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || 'https://onchain-crossword.vercel.app';

const miniAppEmbed = {
  version: '1',
  imageUrl: `${APP_URL}/og-image.png`,
  button: {
    title: 'Solve Today',
    action: {
      type: 'launch_miniapp',
      name: 'Onchain Crossword',
      url: APP_URL,
      splashImageUrl: `${APP_URL}/splash.png`,
      splashBackgroundColor: '#ffffff',
    },
  },
};

export const metadata: Metadata = {
  title: 'Onchain Crossword',
  description: 'Daily crypto crossword puzzle on Base',
  metadataBase: new URL(APP_URL),
  openGraph: {
    title: 'Onchain Crossword',
    description: 'Daily crypto crossword puzzle on Base',
    type: 'website',
    images: ['/og-image.png'],
  },
  other: {
    'fc:miniapp': JSON.stringify(miniAppEmbed),
    'base:app_id': '69e0b701c4457beb3be44d73',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700;900&family=IBM+Plex+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
