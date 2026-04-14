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
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: 48,
            background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 24,
          }}
        >
          <div style={{ fontSize: 56, fontWeight: 800, color: 'white', display: 'flex' }}>A</div>
        </div>

        {/* Title */}
        <div style={{ fontSize: 72, fontWeight: 800, color: '#a78bfa', display: 'flex', marginBottom: 16 }}>
          Aura Card
        </div>

        {/* Tagline */}
        <div style={{ fontSize: 28, color: 'rgba(255,255,255,0.5)', display: 'flex', marginBottom: 40 }}>
          Your living onchain identity on Base
        </div>

        {/* Pills */}
        <div style={{ display: 'flex', gap: 16 }}>
          {['Music', 'Base Activity', 'Onchain Style'].map((label) => (
            <div
              key={label}
              style={{
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 24,
                paddingRight: 24,
                borderRadius: 100,
                background: 'rgba(124,58,237,0.2)',
                border: '1px solid rgba(124,58,237,0.4)',
                fontSize: 20,
                color: '#a78bfa',
                display: 'flex',
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
