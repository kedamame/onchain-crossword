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

function sanitize(s: string): string {
  return s
    .replace(/\u2014/g, ' - ')
    .replace(/[^\x20-\x7E]/g, '')
    .trim();
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const streak = Math.max(1, parseInt(searchParams.get('streak') ?? '1', 10) || 1);
  const day    = Math.max(0, parseInt(searchParams.get('day')    ?? '0', 10) || 0);

  const title = sanitize(getPuzzleTitle(day));
  const tier = TIERS.find((t) => streak >= t.min) ?? TIERS[TIERS.length - 1];
  const streakFontSize = streak >= 1000 ? 110 : streak >= 100 ? 140 : 180;

  return new ImageResponse(
    (
      <div
        style={{
          width: W,
          height: H,
          background: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 48,
          paddingBottom: 48,
          paddingLeft: 80,
          paddingRight: 80,
          borderTopWidth: 12,
          borderTopStyle: 'solid',
          borderTopColor: tier.color,
        }}
      >
        {/* Header — centered */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <div style={{ display: 'flex', fontSize: 14, fontWeight: 700, color: '#bbb', letterSpacing: '0.2em' }}>
            ONCHAIN CROSSWORD
          </div>
        </div>

        {/* Streak number — centered and dominant */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
          <div style={{ display: 'flex', fontSize: streakFontSize, fontWeight: 900, color: tier.color, lineHeight: 1, letterSpacing: '-6px', whiteSpace: 'nowrap' }}>
            {String(streak)}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <div style={{ display: 'flex', background: tier.color, paddingTop: 8, paddingBottom: 8, paddingLeft: 24, paddingRight: 24 }}>
              <div style={{ display: 'flex', fontSize: 16, fontWeight: 700, color: '#fff', letterSpacing: '0.15em' }}>
                {tier.name}
              </div>
            </div>
            <div style={{ display: 'flex' }}>
              <div style={{ display: 'flex', fontSize: 20, fontWeight: 700, color: '#555', letterSpacing: '0.12em' }}>
                DAY STREAK
              </div>
            </div>
          </div>
        </div>

        {/* Footer — centered */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <div style={{ display: 'flex' }}>
            <div style={{ display: 'flex', fontSize: 11, fontWeight: 700, color: '#bbb', letterSpacing: '0.15em' }}>
              {`DAY #${day} COMPLETE`}
            </div>
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ display: 'flex', fontSize: 18, fontWeight: 700, color: '#000' }}>
              {title}
            </div>
          </div>
        </div>
      </div>
    ),
    { width: W, height: H },
  );
}
