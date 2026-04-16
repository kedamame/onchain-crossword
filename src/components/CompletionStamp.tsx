'use client';

interface Props {
  streak: number;
  dayNumber: number;
  puzzleTitle: string;
  onShare: () => void;
  onClose: () => void;
}

const TIERS = [
  { min: 30, name: 'LEGENDARY', color: '#B8860B', border: '4px double #B8860B', radius: '50%' },
  { min: 14, name: 'DIAMOND',   color: '#4FC3F7', border: '3px solid #4FC3F7', radius: '0%' },
  { min: 7,  name: 'GOLD',      color: '#FFD700', border: '3px solid #FFD700', radius: '0%' },
  { min: 3,  name: 'SILVER',    color: '#9E9E9E', border: '2px solid #9E9E9E', radius: '6px' },
  { min: 0,  name: 'BRONZE',    color: '#CD7F32', border: '2px solid #CD7F32', radius: '4px' },
] as const;

export function CompletionStamp({ streak, dayNumber, puzzleTitle, onShare, onClose }: Props) {
  const tier = TIERS.find((t) => streak >= t.min) ?? TIERS[TIERS.length - 1];
  const stampTier = tier.name;
  const stampColor = tier.color;
  const stampBorder = tier.border;
  const stampRadius = tier.radius;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: '24px',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#fff',
          width: '100%',
          maxWidth: '360px',
          padding: '40px 32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
        }}
      >
        {/* Stamp graphic */}
        <div
          style={{
            width: '160px',
            height: '160px',
            border: stampBorder,
            borderRadius: stampRadius,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            transform: 'rotate(-8deg)',
            position: 'relative',
          }}
        >
          {/* Inner border */}
          <div
            style={{
              position: 'absolute',
              inset: '6px',
              border: `1px solid ${stampColor}`,
              borderRadius: stampRadius,
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-space)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              color: stampColor,
              zIndex: 1,
            }}
          >
            ONCHAIN
          </span>
          <span
            style={{
              fontFamily: 'var(--font-space)',
              fontSize: '32px',
              fontWeight: 900,
              color: stampColor,
              lineHeight: 1,
              zIndex: 1,
            }}
          >
            {streak}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-space)',
              fontSize: '9px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: stampColor,
              zIndex: 1,
            }}
          >
            DAY STREAK
          </span>
          <span
            style={{
              fontFamily: 'var(--font-space)',
              fontSize: '8px',
              fontWeight: 700,
              letterSpacing: '0.2em',
              color: '#000',
              marginTop: '4px',
              zIndex: 1,
            }}
          >
            {stampTier}
          </span>
        </div>

        {/* Info */}
        <div style={{ textAlign: 'center', width: '100%' }}>
          <div
            style={{
              fontFamily: 'var(--font-space)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.2em',
              color: '#666',
              marginBottom: '4px',
            }}
          >
            PUZZLE #{dayNumber} — {puzzleTitle}
          </div>
          <div
            style={{
              fontFamily: 'var(--font-space)',
              fontSize: '22px',
              fontWeight: 900,
              color: '#000',
              letterSpacing: '-0.02em',
            }}
          >
            COMPLETE
          </div>
        </div>

        {/* Streak tier info */}
        <div
          style={{
            width: '100%',
            borderTop: '1px solid #000',
            borderBottom: '1px solid #000',
            padding: '12px 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ fontFamily: 'var(--font-space)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', color: '#666' }}>
            NEXT TIER
          </div>
          <div style={{ fontFamily: 'var(--font-space)', fontSize: '11px', fontWeight: 700, color: '#000' }}>
            {streak < 3
              ? `${3 - streak} days to SILVER`
              : streak < 7
                ? `${7 - streak} days to GOLD`
                : streak < 14
                  ? `${14 - streak} days to DIAMOND`
                  : streak < 30
                    ? `${30 - streak} days to LEGENDARY`
                    : 'MAX TIER REACHED'}
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
          <button
            onClick={onShare}
            style={{
              width: '100%',
              padding: '14px',
              background: '#000',
              color: '#fff',
              fontFamily: 'var(--font-space)',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            SHARE ON FARCASTER
          </button>
          <button
            onClick={onClose}
            style={{
              width: '100%',
              padding: '14px',
              background: '#fff',
              color: '#000',
              fontFamily: 'var(--font-space)',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              border: '1px solid #000',
              cursor: 'pointer',
            }}
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}
