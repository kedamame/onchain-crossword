import type { Metadata } from 'next';
import { RedirectHome } from './RedirectHome';

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || 'https://onchain-crossword.vercel.app';

// Next.js 14: searchParams is a synchronous plain object (not a Promise)
interface Props {
  searchParams: { streak?: string; day?: string };
}

export function generateMetadata({ searchParams }: Props): Metadata {
  const streak = Math.max(1, parseInt(searchParams.streak ?? '1', 10) || 1);
  const day    = Math.max(0, parseInt(searchParams.day    ?? '0', 10) || 0);

  const ogImage = `${APP_URL}/og/share?streak=${streak}&day=${day}`;
  const description = `${streak} day streak - Day #${day} complete!`;

  return {
    title: `Onchain Crossword - ${streak} Day Streak`,
    description,
    openGraph: {
      title: `Onchain Crossword - ${streak} Day Streak`,
      description,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    other: {
      // Farcaster frame button to launch the mini app
      'fc:frame': 'vNext',
      'fc:frame:image': ogImage,
      'fc:frame:button:1': 'Play Today',
      'fc:frame:post_url': APP_URL,
    },
  };
}

// Server renders OG meta tags; client component handles redirect to /
// so OG scrapers read metadata before the redirect fires.
export default function SharePage() {
  return <RedirectHome />;
}
