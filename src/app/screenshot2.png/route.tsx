import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Different persona for screenshot
const DISPLAY_NAME = 'alex.base.eth';
const HANDLE = '@alexonbase';
const AURA_LABEL = 'Ocean Aura';
const AURA_COLOR = '#06b6d4';
const ETH_BALANCE = '0.1337';
const LATEST_TX = 'transfer()';
const TX_AGE = '2d ago';
const TX_HASH = '0xa4f2...9c3e';
const ARTISTS = ['Aphex Twin', 'Burial', 'Arca'];
const ADDRESS = '0xA4F2...9C3E88';

export async function GET() {
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
        {/* Card */}
        <div
          style={{
            width: '100%',
            background: '#0f0f1e',
            borderRadius: 48,
            border: `1px solid ${AURA_COLOR}55`,
            paddingTop: 56,
            paddingBottom: 56,
            paddingLeft: 56,
            paddingRight: 56,
            display: 'flex',
            flexDirection: 'column',
            gap: 0,
          }}
        >
          {/* Avatar + identity */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 40, marginBottom: 48 }}>
            {/* Avatar circle with ocean gradient */}
            <div
              style={{
                width: 140,
                height: 140,
                borderRadius: 70,
                background: `linear-gradient(135deg, ${AURA_COLOR}, #3b82f6)`,
                border: `3px solid ${AURA_COLOR}`,
                display: 'flex',
                flexShrink: 0,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{ fontSize: 60, fontWeight: 800, color: 'white', display: 'flex' }}>A</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ fontSize: 44, fontWeight: 700, color: 'white', display: 'flex' }}>{DISPLAY_NAME}</div>
              <div style={{ fontSize: 34, color: 'rgba(255,255,255,0.45)', display: 'flex' }}>{HANDLE}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 14, height: 14, borderRadius: 7, background: AURA_COLOR, display: 'flex' }} />
                <div style={{ fontSize: 30, color: AURA_COLOR, display: 'flex' }}>{AURA_LABEL}</div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', display: 'flex', marginBottom: 48 }} />

          {/* BASE ACTIVITY */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 20, height: 20, borderRadius: 10, background: 'rgba(255,255,255,0.25)', display: 'flex' }} />
              <div style={{ fontSize: 26, color: 'rgba(255,255,255,0.4)', letterSpacing: 4, display: 'flex' }}>BASE ACTIVITY</div>
            </div>
            <div style={{ display: 'flex', gap: 20 }}>
              <div
                style={{
                  width: 270,
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: 24,
                  paddingTop: 30,
                  paddingBottom: 30,
                  paddingLeft: 30,
                  paddingRight: 30,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <div style={{ fontSize: 42, fontWeight: 700, color: 'white', display: 'flex' }}>{ETH_BALANCE}</div>
                <div style={{ fontSize: 26, color: 'rgba(255,255,255,0.35)', display: 'flex' }}>ETH</div>
              </div>
              <div
                style={{
                  width: 270,
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: 24,
                  paddingTop: 30,
                  paddingBottom: 30,
                  paddingLeft: 30,
                  paddingRight: 30,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <div style={{ fontSize: 42, fontWeight: 700, color: 'white', display: 'flex' }}>Base</div>
                <div style={{ fontSize: 26, color: 'rgba(255,255,255,0.35)', display: 'flex' }}>Mainnet</div>
              </div>
            </div>
          </div>

          {/* LATEST TX */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 20, height: 20, borderRadius: 10, background: 'rgba(255,255,255,0.25)', display: 'flex' }} />
              <div style={{ fontSize: 26, color: 'rgba(255,255,255,0.4)', letterSpacing: 4, display: 'flex' }}>LATEST TX</div>
            </div>
            <div
              style={{
                background: 'rgba(255,255,255,0.04)',
                borderRadius: 20,
                paddingTop: 28,
                paddingBottom: 28,
                paddingLeft: 32,
                paddingRight: 32,
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: 34, fontWeight: 600, color: 'white', display: 'flex' }}>{LATEST_TX}</div>
                <div style={{ fontSize: 28, color: 'rgba(255,255,255,0.35)', display: 'flex' }}>{TX_AGE}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', display: 'flex' }}>-&gt;</div>
                <div style={{ fontSize: 28, color: 'rgba(255,255,255,0.4)', display: 'flex' }}>{TX_HASH}</div>
              </div>
            </div>
          </div>

          {/* VIBING TO */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ fontSize: 26, color: 'rgba(255,255,255,0.4)', letterSpacing: 4, display: 'flex' }}>VIBING TO</div>
            </div>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {ARTISTS.map((a) => (
                <div
                  key={a}
                  style={{
                    paddingTop: 18,
                    paddingBottom: 18,
                    paddingLeft: 36,
                    paddingRight: 36,
                    borderRadius: 100,
                    background: AURA_COLOR + '33',
                    border: `1px solid ${AURA_COLOR}66`,
                    fontSize: 30,
                    color: 'white',
                    fontWeight: 600,
                    display: 'flex',
                  }}
                >
                  {a}
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', display: 'flex', marginBottom: 40 }} />

          {/* Address */}
          <div style={{ fontSize: 28, color: 'rgba(255,255,255,0.25)', display: 'flex', marginBottom: 40 }}>{ADDRESS}</div>

          {/* Edit button */}
          <div
            style={{
              width: '100%',
              paddingTop: 44,
              paddingBottom: 44,
              borderRadius: 28,
              background: 'linear-gradient(to right, #06b6d4, #3b82f6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ fontSize: 40, fontWeight: 700, color: 'white', display: 'flex' }}>Edit My Aura</div>
          </div>
        </div>
      </div>
    ),
    { width: 1284, height: 2778 }
  );
}
