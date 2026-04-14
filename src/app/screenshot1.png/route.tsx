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
          gap: 32,
          padding: 80,
        }}
      >
        {/* Card preview */}
        <div
          style={{
            width: 480,
            background: 'rgba(15,15,25,0.95)',
            borderRadius: 40,
            border: '1px solid rgba(255,255,255,0.1)',
            padding: 48,
            display: 'flex',
            flexDirection: 'column',
            gap: 32,
          }}
        >
          {/* Avatar row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <div
              style={{
                width: 96,
                height: 96,
                borderRadius: 48,
                background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{ fontSize: 48, fontWeight: 800, color: 'white', display: 'flex' }}>A</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ fontSize: 32, fontWeight: 700 }}>alice.eth</div>
              <div style={{ fontSize: 20, color: 'rgba(255,255,255,0.4)' }}>@alice</div>
              <div style={{ fontSize: 16, color: '#7c3aed', display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: 4, background: '#7c3aed', display: 'flex' }} />
                <div style={{ display: 'flex' }}>Glow aura</div>
              </div>
            </div>
          </div>

          {/* Artists */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', letterSpacing: 4, display: 'flex' }}>
              VIBING TO
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              {['Tame Impala', 'FKA Twigs', 'BROCKHAMPTON'].map((a) => (
                <div
                  key={a}
                  style={{
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingLeft: 20,
                    paddingRight: 20,
                    borderRadius: 100,
                    background: 'linear-gradient(to right, #7c3aed, #4f46e5)',
                    fontSize: 18,
                    color: 'white',
                    display: 'flex',
                  }}
                >
                  {a}
                </div>
              ))}
            </div>
          </div>

          {/* Base stats */}
          <div style={{ display: 'flex', gap: 16 }}>
            <div
              style={{
                flex: 1,
                background: 'rgba(255,255,255,0.05)',
                borderRadius: 20,
                paddingTop: 20,
                paddingBottom: 20,
                paddingLeft: 20,
                paddingRight: 20,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <div style={{ fontSize: 28, fontWeight: 700, display: 'flex' }}>0.0420</div>
              <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.4)', display: 'flex' }}>ETH</div>
            </div>
            <div
              style={{
                flex: 1,
                background: 'rgba(255,255,255,0.05)',
                borderRadius: 20,
                paddingTop: 20,
                paddingBottom: 20,
                paddingLeft: 20,
                paddingRight: 20,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <div style={{ fontSize: 28, fontWeight: 700, display: 'flex' }}>Base</div>
              <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.4)', display: 'flex' }}>Mainnet</div>
            </div>
          </div>
        </div>

        <div style={{ fontSize: 28, color: 'rgba(255,255,255,0.3)', display: 'flex' }}>
          Your Aura Card lives on Base chain
        </div>
      </div>
    ),
    { width: 1284, height: 2778 }
  );
}
