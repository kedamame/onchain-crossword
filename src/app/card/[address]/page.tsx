import type { Metadata } from 'next';
import ClientRedirect from './ClientRedirect';

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || 'https://aura-card-five.vercel.app';
const RPC =
  process.env.NEXT_PUBLIC_BASE_RPC_URL || 'https://mainnet.base.org';
const CONTRACT =
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0x2966a0eFA55F03F86Dd2736c25Ef76300B9c07D9';

interface Props {
  params: { address: string };
}

async function getUpdatedAt(address: string): Promise<number> {
  try {
    const selector = '0x0f53a470';
    const padded = address.replace('0x', '').toLowerCase().padStart(64, '0');
    const res = await fetch(RPC, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_call',
        params: [{ to: CONTRACT, data: selector + padded }, 'latest'],
        id: 1,
      }),
      cache: 'no-store',
    });
    const json = await res.json() as { result?: string };
    if (json.result && json.result.length > 200) {
      // updatedAt is slot 3 (bytes 96–127 = hex chars 192–255)
      const data = json.result.slice(2);
      return parseInt(data.slice(192, 256), 16);
    }
  } catch {
    // fall through
  }
  return 0;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { address } = params;
  const updatedAt = await getUpdatedAt(address);
  const ogImage = `${APP_URL}/og?addr=${address}${updatedAt ? `&t=${updatedAt}` : ''}`;

  const miniAppEmbed = {
    version: '1',
    imageUrl: ogImage,
    button: {
      title: 'View My Aura',
      action: {
        type: 'launch_miniapp',
        name: 'Aura Card',
        url: APP_URL,
        splashImageUrl: `${APP_URL}/splash.png`,
        splashBackgroundColor: '#080810',
      },
    },
  };

  return {
    title: `Aura Card — ${address.slice(0, 6)}...${address.slice(-4)}`,
    description: 'Living onchain identity on Base',
    openGraph: {
      title: 'Aura Card',
      description: 'Living onchain identity on Base',
      images: [{ url: ogImage, width: 900, height: 600 }],
    },
    other: {
      'fc:miniapp': JSON.stringify(miniAppEmbed),
    },
  };
}

export default function CardPage({ params }: Props) {
  // Client-side redirect so OG metadata HTML is served first
  return <ClientRedirect address={params.address} />;
}
