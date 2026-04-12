import { NextResponse } from 'next/server';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://aura-card.vercel.app';

export async function GET() {
  return NextResponse.json({
    accountAssociation: {
      header: process.env.FARCASTER_MANIFEST_HEADER || 'REPLACE_WITH_WARPCAST_MANIFEST_TOOL',
      payload: process.env.FARCASTER_MANIFEST_PAYLOAD || 'REPLACE_WITH_WARPCAST_MANIFEST_TOOL',
      signature: process.env.FARCASTER_MANIFEST_SIGNATURE || 'REPLACE_WITH_WARPCAST_MANIFEST_TOOL',
    },
    miniapp: {
      version: '1',
      name: 'Aura Card',
      homeUrl: APP_URL,
      iconUrl: `${APP_URL}/icon.png`,
      splashImageUrl: `${APP_URL}/splash.png`,
      splashBackgroundColor: '#080810',
      subtitle: 'Living onchain identity on Base',
      description:
        'Create your Aura Card — a dynamic profile that shows your music taste, Base activity, and NFT style. Powered by Base chain.',
      screenshotUrls: [
        `${APP_URL}/screenshot1.png`,
        `${APP_URL}/screenshot2.png`,
        `${APP_URL}/screenshot3.png`,
      ],
      primaryCategory: 'social',
      tags: ['identity', 'base', 'onchain', 'music', 'profile'],
      heroImageUrl: `${APP_URL}/og-image.png`,
      tagline: 'Your living onchain identity',
      ogTitle: 'Aura Card',
      ogDescription: 'Dynamic onchain profile card on Base. Show your music, style & activity.',
      ogImageUrl: `${APP_URL}/og-image.png`,
      requiredChains: ['eip155:8453'],
      requiredCapabilities: [],
      noindex: false,
    },
  });
}
