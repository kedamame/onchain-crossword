import { ImageResponse } from 'next/og';

export const runtime = 'edge';

const GRID = [
  [1, 1, 1, 0, 1, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 1, 0, 1, 0, 0, 0],
  [1, 1, 1, 0, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
];

const W = 1200;
const H = 630;
const CELL = 44;
const GAP = 4;

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: W,
          height: H,
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: 80,
          paddingRight: 80,
        }}
      >
        {/* Left: text */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: '#000',
              letterSpacing: '-2px',
              lineHeight: 1,
            }}
          >
            ONCHAIN
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: '#000',
              letterSpacing: '-2px',
              lineHeight: 1,
            }}
          >
            CROSSWORD
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 22,
              fontWeight: 500,
              color: '#666',
              letterSpacing: '0.05em',
            }}
          >
            A new puzzle every day. On Base.
          </div>
        </div>

        {/* Right: crossword grid */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: `${GAP}px`,
            border: '3px solid #000',
            padding: '12px',
          }}
        >
          {GRID.map((row, r) => (
            <div key={r} style={{ display: 'flex', gap: `${GAP}px` }}>
              {row.map((cell, c) => (
                <div
                  key={c}
                  style={{
                    width: CELL,
                    height: CELL,
                    background: cell ? '#fff' : '#000',
                    border: cell ? '2px solid #000' : 'none',
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    ),
    { width: W, height: H },
  );
}
