import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { getPuzzleTitle } from '@/lib/puzzles';

export const runtime = 'edge';

const TIERS = [
  { min: 30, name: 'LEGENDARY', color: '#B8860B' },
  { min: 14, name: 'DIAMOND',   color: '#4FC3F7' },
  { min: 7,  name: 'GOLD',      color: '#FFD700' },
  { min: 3,  name: 'SILVER',    color: '#9E9E9E' },
  { min: 0,  name: 'BRONZE',    color: '#CD7F32' },
] as const;

const W = 900;
const H = 600;

// Sanitize text for Satori: remove em dash and non-ASCII characters that
// would cause Satori to attempt Google Fonts lookup and crash.
function sanitize(s: string): string {
  return s
    .replace(/\u2014/g, ' - ')   // em dash
    .replace(/[^\x20-\x7E]/g, '') // strip non-printable ASCII
    .trim();
}

// 4x4 crossword pattern for decoration
const ROW0 = [1, 1, 1, 0];
const ROW1 = [1, 0, 1, 1];
const ROW2 = [1, 1, 1, 0];
const ROW3 = [0, 1, 0, 1];

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const streak = Math.max(1, parseInt(searchParams.get('streak') ?? '1', 10) || 1);
  const day    = Math.max(0, parseInt(searchParams.get('day')    ?? '0', 10) || 0);

  // Derive title from dayNumber server-side — no need to pass it in URL
  const title = sanitize(getPuzzleTitle(day));
  const tier = TIERS.find((t) => streak >= t.min) ?? TIERS[TIERS.length - 1];

  const cell = (v: number) => ({ width: 20, height: 20, background: v ? '#333' : '#e0e0e0' } as const);

  return new ImageResponse(
    (
      <div
        style={{
          width: W,
          height: H,
          background: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          paddingTop: 48,
          paddingBottom: 48,
          paddingLeft: 60,
          paddingRight: 60,
          borderTopWidth: 10,
          borderTopStyle: 'solid',
          borderTopColor: tier.color,
        }}
      >
        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 26, fontWeight: 900, color: '#000', letterSpacing: '-0.5px', lineHeight: 1 }}>
              ONCHAIN
            </div>
            <div style={{ fontSize: 26, fontWeight: 900, color: '#000', letterSpacing: '-0.5px', lineHeight: 1 }}>
              CROSSWORD
            </div>
          </div>

          {/* Mini grid — explicit cells, no .map() to avoid Satori issues */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ display: 'flex', gap: 4 }}>
              <div style={cell(ROW0[0])} /><div style={cell(ROW0[1])} /><div style={cell(ROW0[2])} /><div style={cell(ROW0[3])} />
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              <div style={cell(ROW1[0])} /><div style={cell(ROW1[1])} /><div style={cell(ROW1[2])} /><div style={cell(ROW1[3])} />
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              <div style={cell(ROW2[0])} /><div style={cell(ROW2[1])} /><div style={cell(ROW2[2])} /><div style={cell(ROW2[3])} />
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              <div style={cell(ROW3[0])} /><div style={cell(ROW3[1])} /><div style={cell(ROW3[2])} /><div style={cell(ROW3[3])} />
            </div>
          </div>
        </div>

        {/* Streak number + tier badge */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24 }}>
          <div style={{ fontSize: 180, fontWeight: 900, color: tier.color, lineHeight: 1, letterSpacing: '-6px' }}>
            {String(streak)}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingBottom: 12 }}>
            <div style={{ display: 'flex', background: tier.color, paddingTop: 6, paddingBottom: 6, paddingLeft: 16, paddingRight: 16 }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', letterSpacing: '0.12em' }}>
                {tier.name}
              </div>
            </div>
            <div style={{ display: 'flex' }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#555', letterSpacing: '0.1em' }}>
                DAY STREAK
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ display: 'flex' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#999', letterSpacing: '0.15em' }}>
                {`DAY #${day} COMPLETE`}
              </div>
            </div>
            <div style={{ display: 'flex' }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#000' }}>
                {title}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: '#bbb', letterSpacing: '0.05em' }}>
              onchain-crossword.vercel.app
            </div>
          </div>
        </div>
      </div>
    ),
    { width: W, height: H },
  );
}
