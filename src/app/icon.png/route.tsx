import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// 1 = white (letter cell), 0 = black (blocked)
const GRID = [
  [1, 1, 1, 0, 1],
  [1, 0, 1, 0, 1],
  [1, 1, 1, 1, 1],
  [1, 0, 1, 0, 1],
  [1, 1, 1, 0, 1],
];

const SIZE = 1024;
const CELL = 148;
const GAP = 8;

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: SIZE,
          height: SIZE,
          background: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: `${GAP}px` }}>
          {GRID.map((row, r) => (
            <div key={r} style={{ display: 'flex', gap: `${GAP}px` }}>
              {row.map((cell, c) => (
                <div
                  key={c}
                  style={{
                    width: CELL,
                    height: CELL,
                    background: cell ? '#fff' : '#111',
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    ),
    { width: SIZE, height: SIZE },
  );
}
