import type { Metadata } from 'next';
import { RedirectHome } from './RedirectHome';

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || 'https://onchain-crossword.vercel.app';

// Next.js 14: searchParams is a synchronous plain object (not a Promise)
interface Props {
  searchParams: { streak?: string; day?: string };
}

export function generateMetadata({ searchParams }: Props): Metadata {
  const streak = Math.min(9999, Math.max(1, parseInt(searchParams.streak ?? '1', 10) || 1));
  const day    = Math.min(9999, Math.max(0, parseInt(searchParams.day    ?? '0', 10) || 0));

  const ogImage = `${APP_URL}/og/share?streak=${streak}&day=${day}&v=2`;
  const description = `${streak} day streak - Day #${day} complete!`;

  const miniAppEmbed = {
    version: '1',
    imageUrl: ogImage,
    button: {
      title: 'Play Today',
      action: {
        type: 'launch_miniapp',
        name: 'Onchain Crossword',
        url: APP_URL,
        splashImageUrl: `${APP_URL}/splash.png`,
        splashBackgroundColor: '#ffffff',
      },
    },
  };

  return {
    title: `Onchain Crossword - ${streak} Day Streak`,
    description,
    openGraph: {
      title: `Onchain Crossword - ${streak} Day Streak`,
      description,
      images: [{ url: ogImage, width: 900, height: 600 }],
    },
    other: {
      'fc:miniapp': JSON.stringify(miniAppEmbed),
      'base:app_id': '69e0b701c4457beb3be44d73',
    },
  };
}

// Server renders OG meta tags; client component handles redirect to /
// so OG scrapers read metadata before the redirect fires.
export default function SharePage() {
  return <RedirectHome />;
}
