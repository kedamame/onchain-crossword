'use client';

import type { TxStatus } from '@/lib/useStreakRecord';

interface Props {
  streak: number;
  dayNumber: number;
  puzzleTitle: string;
  onShare: () => void;
  onClose: () => void;
  // On-chain recording
  canRecord: boolean;
  contractReady: boolean;
  alreadyRecorded: boolean;
  txStatus: TxStatus;
  txHash: `0x${string}` | undefined;
  errorMessage: string | null;
  onRecord: () => void;
}

const TIERS = [
  { min: 30, name: 'LEGENDARY', color: '#B8860B', border: '4px double #B8860B', radius: '50%' },
  { min: 14, name: 'DIAMOND',   color: '#4FC3F7', border: '3px solid #4FC3F7', radius: '0%' },
  { min: 7,  name: 'GOLD',      color: '#FFD700', border: '3px solid #FFD700', radius: '0%' },
  { min: 3,  name: 'SILVER',    color: '#9E9E9E', border: '2px solid #9E9E9E', radius: '6px' },
  { min: 0,  name: 'BRONZE',    color: '#CD7F32', border: '2px solid #CD7F32', radius: '4px' },
] as const;

const FONT = 'var(--font-space)';
const BTN: React.CSSProperties = {
  width: '100%',
  padding: '14px',
  fontFamily: FONT,
  fontSize: '13px',
  fontWeight: 700,
  letterSpacing: '0.15em',
  border: 'none',
  cursor: 'pointer',
};

export function CompletionStamp({
  streak,
  dayNumber,
  puzzleTitle,
  onShare,
  onClose,
  canRecord,
  contractReady,
  alreadyRecorded,
  txStatus,
  txHash,
  errorMessage,
  onRecord,
}: Props) {
  const tier = TIERS.find((t) => streak >= t.min) ?? TIERS[TIERS.length - 1];

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
            border: tier.border,
            borderRadius: tier.radius,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            transform: 'rotate(-8deg)',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: '6px',
              border: `1px solid ${tier.color}`,
              borderRadius: tier.radius,
            }}
          />
          <span style={{ fontFamily: FONT, fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', color: tier.color, zIndex: 1 }}>
            ONCHAIN
          </span>
          <span style={{ fontFamily: FONT, fontSize: '32px', fontWeight: 900, color: tier.color, lineHeight: 1, zIndex: 1 }}>
            {streak}
          </span>
          <span style={{ fontFamily: FONT, fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', color: tier.color, zIndex: 1 }}>
            DAY STREAK
          </span>
          <span style={{ fontFamily: FONT, fontSize: '8px', fontWeight: 700, letterSpacing: '0.2em', color: '#000', marginTop: '4px', zIndex: 1 }}>
            {tier.name}
          </span>
        </div>

        {/* Info */}
        <div style={{ textAlign: 'center', width: '100%' }}>
          <div style={{ fontFamily: FONT, fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', color: '#666', marginBottom: '4px' }}>
            PUZZLE #{dayNumber} — {puzzleTitle}
          </div>
          <div style={{ fontFamily: FONT, fontSize: '22px', fontWeight: 900, color: '#000', letterSpacing: '-0.02em' }}>
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
          <div style={{ fontFamily: FONT, fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', color: '#666' }}>
            NEXT TIER
          </div>
          <div style={{ fontFamily: FONT, fontSize: '11px', fontWeight: 700, color: '#000' }}>
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

          {/* On-chain record button — visible when wallet connected */}
          {canRecord && (
            !contractReady ? (
              <button disabled style={{ ...BTN, background: '#f0f0f0', color: '#999', border: '1px solid #e0e0e0', cursor: 'default' }}>
                RECORD STREAK — COMING SOON
              </button>
            ) : txStatus === 'success' ? (
              <a
                href={txHash ? `https://basescan.org/tx/${txHash}` : '#'}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  ...BTN,
                  display: 'block',
                  background: '#00FF87',
                  color: '#000',
                  textAlign: 'center',
                  textDecoration: 'none',
                  boxSizing: 'border-box',
                }}
              >
                STREAK RECORDED — VIEW TX
              </a>
            ) : alreadyRecorded ? (
              <button disabled style={{ ...BTN, background: '#f0f0f0', color: '#999', border: '1px solid #e0e0e0', cursor: 'default' }}>
                ALREADY RECORDED TODAY
              </button>
            ) : (
              <>
                <button
                  onClick={onRecord}
                  disabled={txStatus === 'pending'}
                  style={{
                    ...BTN,
                    background: txStatus === 'error' ? '#fff' : '#000',
                    color: txStatus === 'error' ? '#cc0000' : '#fff',
                    border: txStatus === 'error' ? '2px solid #cc0000' : 'none',
                    opacity: txStatus === 'pending' ? 0.55 : 1,
                    cursor: txStatus === 'pending' ? 'not-allowed' : 'pointer',
                  }}
                >
                  {txStatus === 'pending'
                    ? 'RECORDING...'
                    : txStatus === 'error'
                      ? 'FAILED — RETRY'
                      : 'RECORD STREAK ON-CHAIN'}
                </button>
                {txStatus === 'error' && errorMessage && (
                  <div style={{ fontFamily: FONT, fontSize: '10px', color: '#cc0000', wordBreak: 'break-all' }}>
                    {errorMessage}
                  </div>
                )}
              </>
            )
          )}

          <button
            onClick={onShare}
            style={{ ...BTN, background: '#000', color: '#fff' }}
          >
            SHARE ON FARCASTER
          </button>
          <button
            onClick={onClose}
            style={{ ...BTN, background: '#fff', color: '#000', border: '1px solid #000' }}
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}
