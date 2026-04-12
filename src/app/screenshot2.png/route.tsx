import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  const themes = [
    { label: 'Aurora', color: '#7c3aed' },
    { label: 'Sunset', color: '#f97316' },
    { label: 'Ocean', color: '#06b6d4' },
    { label: 'Forest', color: '#10b981' },
    { label: 'Ember', color: '#ef4444' },
    { label: 'Midnight', color: '#6366f1' },
  ];

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
        <div style={{ fontSize: 48, fontWeight: 800 }}>Choose Your Aura</div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 24,
            justifyContent: 'center',
            width: 600,
          }}
        >
          {themes.map((t) => (
            <div
              key={t.label}
              style={{
                width: 160,
                height: 160,
                borderRadius: 24,
                background: `radial-gradient(circle at 30% 30%, ${t.color}88, ${t.color}22)`,
                border: `2px solid ${t.color}66`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 32,
                  background: t.color,
                }}
              />
              <span style={{ fontSize: 22, color: 'rgba(255,255,255,0.8)' }}>{t.label}</span>
            </div>
          ))}
        </div>

        <div style={{ fontSize: 28, color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>
          6 aura colors · 4 frame styles
        </div>
      </div>
    ),
    { width: 1284, height: 2778 }
  );
}
