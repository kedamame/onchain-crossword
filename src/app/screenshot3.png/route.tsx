import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  const auraColors = [
    { label: 'Aurora', color: '#7c3aed' },
    { label: 'Sunset', color: '#f97316' },
    { label: 'Ocean', color: '#06b6d4', selected: true },
    { label: 'Forest', color: '#10b981' },
    { label: 'Ember', color: '#ef4444' },
    { label: 'Midnight', color: '#6366f1' },
  ];

  const frameStyles = ['Minimal', 'Glow', 'Neon', 'Crystal'];

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
          paddingTop: 180,
          paddingBottom: 120,
          paddingLeft: 72,
          paddingRight: 72,
        }}
      >
        {/* Modal */}
        <div
          style={{
            width: '100%',
            background: '#0f0f1e',
            borderRadius: 48,
            border: '1px solid rgba(255,255,255,0.08)',
            paddingTop: 64,
            paddingBottom: 64,
            paddingLeft: 64,
            paddingRight: 64,
            display: 'flex',
            flexDirection: 'column',
            gap: 0,
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 64 }}>
            <div style={{ fontSize: 56, fontWeight: 800, color: 'white', display: 'flex' }}>Edit Aura</div>
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                background: 'rgba(255,255,255,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{ fontSize: 36, color: 'rgba(255,255,255,0.5)', display: 'flex' }}>x</div>
            </div>
          </div>

          {/* AURA COLOR */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32, marginBottom: 64 }}>
            <div style={{ fontSize: 28, color: 'rgba(255,255,255,0.4)', letterSpacing: 4, display: 'flex' }}>AURA COLOR</div>
            {/* Row 1 */}
            <div style={{ display: 'flex', gap: 24 }}>
              {auraColors.slice(0, 4).map((c) => (
                <div
                  key={c.label}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 16,
                  }}
                >
                  <div
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: 24,
                      background: c.color + '33',
                      border: c.selected ? `3px solid ${c.color}` : '2px solid rgba(255,255,255,0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: 28,
                        background: c.color,
                        display: 'flex',
                      }}
                    />
                  </div>
                  <div style={{ fontSize: 26, color: 'rgba(255,255,255,0.7)', display: 'flex' }}>{c.label}</div>
                </div>
              ))}
            </div>
            {/* Row 2 */}
            <div style={{ display: 'flex', gap: 24 }}>
              {auraColors.slice(4).map((c) => (
                <div
                  key={c.label}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 16,
                  }}
                >
                  <div
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: 24,
                      background: c.color + '33',
                      border: '2px solid rgba(255,255,255,0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: 28,
                        background: c.color,
                        display: 'flex',
                      }}
                    />
                  </div>
                  <div style={{ fontSize: 26, color: 'rgba(255,255,255,0.7)', display: 'flex' }}>{c.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', display: 'flex', marginBottom: 56 }} />

          {/* FRAME STYLE */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32, marginBottom: 64 }}>
            <div style={{ fontSize: 28, color: 'rgba(255,255,255,0.4)', letterSpacing: 4, display: 'flex' }}>FRAME STYLE</div>
            {/* Row 1 */}
            <div style={{ display: 'flex', gap: 20 }}>
              {frameStyles.slice(0, 3).map((s, i) => (
                <div
                  key={s}
                  style={{
                    paddingTop: 28,
                    paddingBottom: 28,
                    paddingLeft: 44,
                    paddingRight: 44,
                    borderRadius: 20,
                    background: i === 1 ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)',
                    border: i === 1 ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(255,255,255,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div style={{ fontSize: 32, color: 'white', fontWeight: i === 1 ? 700 : 400, display: 'flex' }}>{s}</div>
                </div>
              ))}
            </div>
            {/* Row 2 */}
            <div style={{ display: 'flex', gap: 20 }}>
              {frameStyles.slice(3).map((s) => (
                <div
                  key={s}
                  style={{
                    paddingTop: 28,
                    paddingBottom: 28,
                    paddingLeft: 44,
                    paddingRight: 44,
                    borderRadius: 20,
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div style={{ fontSize: 32, color: 'white', display: 'flex' }}>{s}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', display: 'flex', marginBottom: 56 }} />

          {/* VIBING TO */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32, marginBottom: 64 }}>
            <div style={{ fontSize: 28, color: 'rgba(255,255,255,0.4)', letterSpacing: 4, display: 'flex' }}>VIBING TO (0/5)</div>
            {/* Input row */}
            <div style={{ display: 'flex', gap: 20 }}>
              <div
                style={{
                  flex: 1,
                  paddingTop: 36,
                  paddingBottom: 36,
                  paddingLeft: 40,
                  paddingRight: 40,
                  borderRadius: 20,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <div style={{ fontSize: 32, color: 'rgba(255,255,255,0.25)', display: 'flex' }}>Artist name...</div>
              </div>
              <div
                style={{
                  paddingTop: 36,
                  paddingBottom: 36,
                  paddingLeft: 48,
                  paddingRight: 48,
                  borderRadius: 20,
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div style={{ fontSize: 32, color: 'white', fontWeight: 600, display: 'flex' }}>Add</div>
              </div>
            </div>
          </div>

          {/* Save button */}
          <div
            style={{
              width: '100%',
              paddingTop: 52,
              paddingBottom: 52,
              borderRadius: 28,
              background: 'linear-gradient(to right, #06b6d4, #3b82f6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ fontSize: 44, fontWeight: 700, color: 'white', display: 'flex' }}>Save Aura</div>
          </div>
        </div>
      </div>
    ),
    { width: 1284, height: 2778 }
  );
}
