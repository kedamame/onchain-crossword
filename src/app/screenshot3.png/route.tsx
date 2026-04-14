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
          gap: 48,
          padding: 80,
        }}
      >
        <div style={{ fontSize: 48, fontWeight: 800, display: 'flex' }}>
          Share Your Identity
        </div>

        {/* Share card mockup */}
        <div
          style={{
            width: 520,
            background: 'rgba(15,15,25,0.95)',
            borderRadius: 40,
            border: '1px solid rgba(255,255,255,0.1)',
            padding: 48,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 32,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              background: '#06b6d4',
              display: 'flex',
            }}
          />
          <div style={{ fontSize: 36, fontWeight: 700, display: 'flex' }}>bob.eth</div>
          <div style={{ display: 'flex', gap: 12 }}>
            {['Aphex Twin', 'Burial'].map((a) => (
              <div
                key={a}
                style={{
                  paddingTop: 10,
                  paddingBottom: 10,
                  paddingLeft: 24,
                  paddingRight: 24,
                  borderRadius: 100,
                  background: 'linear-gradient(to right, #06b6d4, #3b82f6)',
                  fontSize: 20,
                  color: 'white',
                  display: 'flex',
                }}
              >
                {a}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 20, color: 'rgba(255,255,255,0.3)', display: 'flex' }}>
            Saved on Base - Forever yours
          </div>
        </div>

        <div style={{ display: 'flex', gap: 20 }}>
          {['Farcaster', 'Twitter', 'Discord'].map((platform) => (
            <div
              key={platform}
              style={{
                paddingTop: 14,
                paddingBottom: 14,
                paddingLeft: 32,
                paddingRight: 32,
                borderRadius: 100,
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
                fontSize: 24,
                color: 'rgba(255,255,255,0.7)',
                display: 'flex',
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
