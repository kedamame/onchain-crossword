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
          background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)',
        }}
      >
        <div
          style={{
            width: 600,
            height: 600,
            borderRadius: 300,
            background: 'rgba(255,255,255,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ fontSize: 320, fontWeight: 800, color: 'white', display: 'flex' }}>A</div>
        </div>
      </div>
    ),
    { width: 1024, height: 1024 }
  );
}
