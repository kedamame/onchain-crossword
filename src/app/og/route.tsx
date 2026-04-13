import { ImageResponse } from 'next/og';
import { createPublicClient, http } from 'viem';
import { base } from 'viem/chains';
import { ABI, CONTRACT_ADDRESS, THEME_PRESETS } from '@/lib/contract';

export const runtime = 'nodejs';

const RPC = process.env.NEXT_PUBLIC_BASE_RPC_URL || 'https://mainnet.base.org';

function getColors(themeColor: string) {
  const preset = THEME_PRESETS.find((t) => t.color === themeColor);
  if (!preset) return { from: '#7c3aed', to: '#4f46e5', label: 'Aurora' };
  const parts = preset.gradient.split(' ');
  // map Tailwind gradient to hex approximations
  const colorMap: Record<string, string> = {
    'from-violet-600': '#7c3aed', 'to-indigo-500': '#6366f1',
    'from-orange-500': '#f97316', 'to-pink-500': '#ec4899',
    'from-cyan-500': '#06b6d4',  'to-blue-600': '#2563eb',
    'from-emerald-500': '#10b981','to-teal-600': '#0d9488',
    'from-red-500': '#ef4444',   'to-orange-400': '#fb923c',
    'from-indigo-600': '#4f46e5','to-purple-700': '#7e22ce',
  };
  return {
    from: colorMap[parts[0]] ?? themeColor,
    to: colorMap[parts[1]] ?? themeColor,
    label: preset.label,
  };
}

function shortAddr(addr: string) {
  return addr.slice(0, 6) + '...' + addr.slice(-4);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get('addr') ?? '';

  let artists: string[] = [];
  let themeColor = '#7c3aed';

  if (address) {
    try {
      const client = createPublicClient({ chain: base, transport: http(RPC) });
      const data = await client.readContract({
        address: CONTRACT_ADDRESS,
        abi: ABI,
        functionName: 'getProfile',
        args: [address as `0x${string}`],
      });
      artists = (data[0] as string[]).filter(Boolean);
      themeColor = (data[1] as string) || '#7c3aed';
    } catch {
      // fallback to defaults
    }
  }

  const { from, to, label } = getColors(themeColor);
  const displayAddr = address ? shortAddr(address) : 'Aura Card';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #080810 0%, #12101e 100%)',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: 'absolute',
            top: -120,
            right: -120,
            width: 480,
            height: 480,
            borderRadius: 240,
            background: `radial-gradient(circle, ${from}55 0%, transparent 70%)`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -80,
            left: -80,
            width: 320,
            height: 320,
            borderRadius: 160,
            background: `radial-gradient(circle, ${to}33 0%, transparent 70%)`,
          }}
        />

        {/* Card */}
        <div
          style={{
            margin: 'auto',
            width: 460,
            background: 'rgba(255,255,255,0.04)',
            border: `1px solid ${from}55`,
            borderRadius: 28,
            padding: '36px 40px',
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            boxShadow: `0 0 40px ${from}44`,
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 28,
                background: `linear-gradient(135deg, ${from}, ${to})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
                color: 'white',
                flexShrink: 0,
              }}
            >
              ✦
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ color: 'white', fontWeight: 700, fontSize: 22 }}>
                {displayAddr}
              </div>
              <div style={{ color: `${from}cc`, fontSize: 13 }}>
                {label} Aura
              </div>
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              height: 1,
              background: `linear-gradient(to right, ${from}66, ${to}66)`,
            }}
          />

          {/* Artists */}
          {artists.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, letterSpacing: 2 }}>
                ♪ VIBING TO
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {artists.map((a) => (
                  <div
                    key={a}
                    style={{
                      padding: '6px 16px',
                      borderRadius: 100,
                      background: `linear-gradient(to right, ${from}, ${to})`,
                      color: 'white',
                      fontSize: 14,
                      fontWeight: 600,
                    }}
                  >
                    {a}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ color: 'rgba(255,255,255,0.2)', fontSize: 12 }}>
              on Base
            </div>
            <div
              style={{
                color: from,
                fontSize: 18,
                fontWeight: 800,
                letterSpacing: -0.5,
              }}
            >
              Aura Card
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 900, height: 600 }
  );
}
