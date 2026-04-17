import { ImageResponse } from 'next/og';

export const runtime = 'edge';

const W = 1200;
const H = 630;
const CELL = 36;
const GAP = 4;

// 7x8 crossword pattern (1=white, 0=black)
const R0 = [1,1,1,0,1,1,0,1];
const R1 = [1,0,1,0,1,0,0,1];
const R2 = [1,1,1,1,1,1,1,1];
const R3 = [0,0,1,0,1,0,0,0];
const R4 = [1,1,1,0,1,1,1,1];
const R5 = [1,0,0,0,0,0,0,1];
const R6 = [1,1,1,1,1,1,1,1];

const c = (v: number) => ({
  width: CELL, height: CELL,
  background: v ? '#fff' : '#000',
  border: v ? '2px solid #000' : 'none',
} as const);

const row = (cells: number[]) => (
  <div style={{ display: 'flex', gap: GAP }}>
    <div style={c(cells[0])} /><div style={c(cells[1])} /><div style={c(cells[2])} />
    <div style={c(cells[3])} /><div style={c(cells[4])} /><div style={c(cells[5])} />
    <div style={c(cells[6])} /><div style={c(cells[7])} />
  </div>
);

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
          paddingLeft: 150,
          paddingRight: 150,
        }}
      >
        {/* Left: text */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 68, fontWeight: 900, color: '#000', letterSpacing: '-2px', lineHeight: 1 }}>
            ONCHAIN
          </div>
          <div style={{ fontSize: 68, fontWeight: 900, color: '#000', letterSpacing: '-2px', lineHeight: 1 }}>
            CROSSWORD
          </div>
          <div style={{ display: 'flex', marginTop: 24 }}>
            <div style={{ fontSize: 20, fontWeight: 500, color: '#666', letterSpacing: '0.05em' }}>
              A new puzzle every day. On Base.
            </div>
          </div>
        </div>

        {/* Right: crossword grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: GAP, border: '3px solid #000', padding: 12 }}>
          {row(R0)}{row(R1)}{row(R2)}{row(R3)}{row(R4)}{row(R5)}{row(R6)}
        </div>
      </div>
    ),
    { width: W, height: H },
  );
}
