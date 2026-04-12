import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#080810',
          color: 'white',
          fontFamily: 'sans-serif',
          gap: 48,
          padding: 80,
        }}
      >
        <div style={{ fontSize: 48, fontWeight: 800, textAlign: 'center' }}>
          Share Your Identity
        </div>

        {/* Share card mockup */}
        <div
          style={{
            width: 520,
            background: 'rgba(15,15,25,0.95)',
            borderRadius: 40,
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 0 80px rgba(6,182,212,0.4)',
            padding: 48,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 32,
          }}
        >
          <div style={{ fontSize: 48, lineHeight: 1, color: '#06b6d4' }}>✦</div>
          <div style={{ fontSize: 36, fontWeight: 700 }}>bob.eth</div>
          <div style={{ display: 'flex', gap: 12 }}>
            {['Aphex Twin', 'Burial'].map((a) => (
              <div
                key={a}
                style={{
                  padding: '10px 24px',
                  borderRadius: 100,
                  background: 'linear-gradient(to right, #06b6d4, #3b82f6)',
                  fontSize: 20,
                  color: 'white',
                }}
              >
                {a}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 20, color: 'rgba(255,255,255,0.3)' }}>
            Saved on Base · Forever yours
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 20,
            marginTop: 16,
          }}
        >
          {['Farcaster', 'Twitter', 'Discord'].map((platform) => (
            <div
              key={platform}
              style={{
                padding: '14px 32px',
                borderRadius: 100,
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
                fontSize: 24,
                color: 'rgba(255,255,255,0.7)',
              }}
            >
              {platform}
            </div>
          ))}
        </div>
      </div>
    ),
    { width: 1284, height: 2778 }
  );
}
