import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  const wallets = [
    'Farcaster',
    'Injected',
    'Coinbase Wallet',
    'Rabby Wallet',
    'Phantom',
    'MetaMask',
    'Backpack',
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: 1284,
          height: 2778,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: '#080810',
          color: 'white',
          paddingTop: 320,
          paddingBottom: 120,
          paddingLeft: 80,
          paddingRight: 80,
        }}
      >
        {/* Logo */}
        <div
          style={{
            width: 128,
            height: 128,
            borderRadius: 36,
            background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 48,
          }}
        >
          <div style={{ fontSize: 72, fontWeight: 800, color: 'white', display: 'flex' }}>A</div>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 800,
            color: 'white',
            display: 'flex',
            marginBottom: 24,
          }}
        >
          Aura Card
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 40,
            color: 'rgba(255,255,255,0.5)',
            display: 'flex',
            marginBottom: 80,
          }}
        >
          Your living onchain identity
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 38,
            color: 'rgba(255,255,255,0.6)',
            display: 'flex',
            textAlign: 'center',
            marginBottom: 96,
            paddingLeft: 40,
            paddingRight: 40,
          }}
        >
          Connect your wallet to view or create your Aura Card
        </div>

        {/* Wallet buttons */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            width: '100%',
          }}
        >
          {wallets.map((w) => (
            <div
              key={w}
              style={{
                width: '100%',
                paddingTop: 44,
                paddingBottom: 44,
                borderRadius: 28,
                background: '#1a1a2e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{ fontSize: 40, fontWeight: 600, color: 'white', display: 'flex' }}>{w}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    { width: 1284, height: 2778 }
  );
}
