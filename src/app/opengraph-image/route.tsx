import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// 900x600px (3:2 ratio) — required for Farcaster embed
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
          background: 'linear-gradient(135deg, #080810 0%, #12101e 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -80,
            right: -80,
            width: 350,
            height: 350,
            borderRadius: 175,
            background: 'radial-gradient(circle, rgba(124,58,237,0.4) 0%, transparent 70%)',
          }}
        />

        <div style={{ fontSize: 60, color: '#7c3aed', marginBottom: 16, lineHeight: 1 }}>
          ✦
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            background: 'linear-gradient(to right, #a78bfa, #818cf8)',
            backgroundClip: 'text',
            color: 'transparent',
            marginBottom: 12,
          }}
        >
          Aura Card
        </div>
        <div style={{ fontSize: 22, color: 'rgba(255,255,255,0.45)' }}>
          Your living onchain identity on Base
        </div>

        <div
          style={{
            marginTop: 32,
            padding: '12px 32px',
            borderRadius: 100,
            background: 'linear-gradient(to right, #7c3aed, #4f46e5)',
            fontSize: 22,
            fontWeight: 600,
            color: 'white',
          }}
        >
          Open Aura Card →
        </div>
      </div>
    ),
    { width: 900, height: 600 }
  );
}
