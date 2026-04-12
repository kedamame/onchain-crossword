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
            boxShadow: '0 0 60px rgba(124,58,237,0.4)',
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
                fontSize: 40,
                color: 'white',
                fontWeight: 800,
              }}
            >
              A
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ fontSize: 32, fontWeight: 700 }}>alice.eth</span>
              <span style={{ fontSize: 20, color: 'rgba(255,255,255,0.4)' }}>@alice</span>
              <span style={{ fontSize: 16, color: '#7c3aed' }}>✦ Glow aura</span>
            </div>
          </div>

          {/* Artists */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <span style={{ fontSize: 16, color: 'rgba(255,255,255,0.4)', letterSpacing: 4 }}>
              ♪ VIBING TO
            </span>
            <div style={{ display: 'flex', gap: 12 }}>
              {['Tame Impala', 'FKA Twigs', 'BROCKHAMPTON'].map((a) => (
                <div
                  key={a}
                  style={{
                    padding: '10px 20px',
                    borderRadius: 100,
                    background: 'linear-gradient(to right, #7c3aed, #4f46e5)',
                    fontSize: 18,
                    color: 'white',
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
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span style={{ fontSize: 28, fontWeight: 700 }}>0.0420</span>
              <span style={{ fontSize: 16, color: 'rgba(255,255,255,0.4)' }}>ETH</span>
            </div>
            <div
              style={{
                flex: 1,
                background: 'rgba(255,255,255,0.05)',
                borderRadius: 20,
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span style={{ fontSize: 28, fontWeight: 700 }}>Base</span>
              <span style={{ fontSize: 16, color: 'rgba(255,255,255,0.4)' }}>Mainnet</span>
            </div>
          </div>
        </div>

        <div style={{ fontSize: 28, color: 'rgba(255,255,255,0.3)' }}>
          Your Aura Card lives on Base chain
        </div>
      </div>
    ),
    { width: 1284, height: 2778 }
  );
}
