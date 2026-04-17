import { NextResponse } from 'next/server';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://onchain-crossword-drab.vercel.app';

export async function GET() {
  return NextResponse.json({
    accountAssociation: {
      header: 'eyJmaWQiOjIxMTE4OSwidHlwZSI6ImF1dGgiLCJrZXkiOiIweDMxOTk5REZCMzI1NkQzMjNDQTA1N0RkMjBhREI1NkI4RUQ0NTE3NzQifQ',
      payload: 'eyJkb21haW4iOiJvbmNoYWluLWNyb3Nzd29yZC1kcmFiLnZlcmNlbC5hcHAifQ',
      signature: 'h1GOh4CiHJbksvVU7PWPSyKNG5lh6w7YAUDe1msg/DUsYIPje6AgYvQx5E1HEiac3qioJofXDiN0kJSvw3+aChw=',
    },
    miniapp: {
      version: '1',
      name: 'Onchain Crossword',
      homeUrl: APP_URL,
      iconUrl: `${APP_URL}/icon.png`,
      splashImageUrl: `${APP_URL}/splash.png`,
      splashBackgroundColor: '#ffffff',
      subtitle: 'Daily Web3 crossword on Base',
      description:
        'A daily crypto crossword puzzle on Base. Test your Web3 knowledge, build your streak, and record completions on-chain. A new puzzle drops every day.',
      screenshotUrls: [
        `${APP_URL}/screenshot1.png`,
        `${APP_URL}/screenshot2.png`,
        `${APP_URL}/screenshot3.png`,
      ],
      primaryCategory: 'games',
      tags: ['crossword', 'puzzle', 'base', 'onchain', 'web3'],
      heroImageUrl: `${APP_URL}/og-image.png`,
      tagline: 'Daily Web3 crossword on Base.',
      ogTitle: 'Onchain Crossword',
      ogDescription: 'A daily crypto crossword puzzle on Base. Build your streak on-chain.',
      ogImageUrl: `${APP_URL}/og-image.png`,
      requiredChains: ['eip155:8453'],
      requiredCapabilities: [],
      noindex: false,
    },
  });
}
