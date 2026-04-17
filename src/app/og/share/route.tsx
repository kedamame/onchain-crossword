import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { getPuzzleTitle, getPuzzleForDay, buildAnswerGrid } from '@/lib/puzzles';

export const runtime = 'nodejs';
export const maxDuration = 15;

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

const CELL = 24;
const GAP  = 2;

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const streak = Math.min(9999, Math.max(1, parseInt(searchParams.get('streak') ?? '1', 10) || 1));
  const day    = Math.min(9999, Math.max(0, parseInt(searchParams.get('day')    ?? '0', 10) || 0));

  const title = sanitize(getPuzzleTitle(day));
  const tier  = TIERS.find((t) => streak >= t.min) ?? TIERS[TIERS.length - 1];
  const streakFontSize = streak >= 1000 ? 110 : streak >= 100 ? 140 : 180;

  // Build the day's crossword grid pattern (null = black cell)
  const puzzle   = getPuzzleForDay(day);
  const grid     = buildAnswerGrid(puzzle);
  const rows     = grid.length;
  const cols     = grid[0]?.length ?? 0;

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
          paddingTop: 44,
          paddingBottom: 44,
          paddingLeft: 72,
          paddingRight: 72,
          borderTopWidth: 12,
          borderTopStyle: 'solid',
          borderTopColor: tier.color,
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#bbb', letterSpacing: '0.2em' }}>
            ONCHAIN CROSSWORD
          </div>
        </div>

        {/* Main: streak (left) + grid (right) */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 56 }}>

          {/* Streak + tier */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', fontSize: streakFontSize, fontWeight: 900, color: tier.color, lineHeight: 1, letterSpacing: '-4px', whiteSpace: 'nowrap' }}>
              {String(streak)}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div style={{ display: 'flex', background: tier.color, paddingTop: 6, paddingBottom: 6, paddingLeft: 20, paddingRight: 20 }}>
                <div style={{ display: 'flex', fontSize: 14, fontWeight: 700, color: '#fff', letterSpacing: '0.15em' }}>
                  {tier.name}
                </div>
              </div>
              <div style={{ display: 'flex' }}>
                <div style={{ display: 'flex', fontSize: 18, fontWeight: 700, color: '#555', letterSpacing: '0.12em' }}>
                  DAY STREAK
                </div>
              </div>
            </div>
          </div>

          {/* Crossword grid — blank cells showing today's puzzle shape */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: GAP, borderWidth: 2, borderStyle: 'solid', borderColor: '#000', padding: 6 }}>
            {grid.slice(0, rows).map((row, ri) => (
              <div key={ri} style={{ display: 'flex', gap: GAP }}>
                {row.slice(0, cols).map((cell, ci) => (
                  <div
                    key={ci}
                    style={{
                      width: CELL,
                      height: CELL,
                      background: cell !== null ? '#fff' : '#000',
                      border: cell !== null ? '1px solid #ccc' : 'none',
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <div style={{ display: 'flex' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#bbb', letterSpacing: '0.15em' }}>
              {`DAY #${day} COMPLETE`}
            </div>
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ fontSize: 17, fontWeight: 700, color: '#000' }}>
              {title}
            </div>
          </div>
        </div>
      </div>
    ),
    { width: W, height: H },
  );
}
