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
          background: 'linear-gradient(135deg, #080810 0%, #12101e 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: 250,
            background: 'radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -100,
            left: -100,
            width: 400,
            height: 400,
            borderRadius: 200,
            background: 'radial-gradient(circle, rgba(79,70,229,0.2) 0%, transparent 70%)',
          }}
        />

        {/* Icon */}
        <div
          style={{
            fontSize: 80,
            color: '#7c3aed',
            marginBottom: 24,
            lineHeight: 1,
          }}
        >
          ✦
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            background: 'linear-gradient(to right, #a78bfa, #818cf8)',
            backgroundClip: 'text',
            color: 'transparent',
            marginBottom: 16,
          }}
        >
          Aura Card
        </div>

        {/* Tagline */}
        <div style={{ fontSize: 28, color: 'rgba(255,255,255,0.5)', fontWeight: 400 }}>
          Your living onchain identity on Base
        </div>

        {/* Pills */}
        <div style={{ display: 'flex', gap: 16, marginTop: 40 }}>
          {['Music', 'NFTs', 'Base Activity'].map((label) => (
            <div
              key={label}
              style={{
                padding: '10px 24px',
                borderRadius: 100,
                background: 'rgba(124,58,237,0.2)',
                border: '1px solid rgba(124,58,237,0.4)',
                fontSize: 20,
                color: '#a78bfa',
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
