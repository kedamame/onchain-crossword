import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#080810',
        }}
      >
        <div style={{ fontSize: 120, lineHeight: 1, color: '#7c3aed' }}>✦</div>
      </div>
    ),
    { width: 200, height: 200 }
  );
}
