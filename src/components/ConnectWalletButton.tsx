'use client';

import { useState } from 'react';
import { useConnect, useAccount, useDisconnect, useConnectors } from 'wagmi';

const FONT = 'var(--font-space)';

export function ConnectWalletButton() {
  const { address } = useAccount();
  const { connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const connectors = useConnectors();
  const [open, setOpen] = useState(false);

  const webConnectors = connectors.filter((c) => c.id !== 'farcasterMiniApp');

  if (address) {
    return (
      <button
        onClick={() => disconnect()}
        style={{
          fontFamily: FONT,
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.1em',
          color: '#666',
          background: 'none',
          border: '1px solid #ccc',
          padding: '4px 8px',
          cursor: 'pointer',
        }}
      >
        {address.slice(0, 6)}...{address.slice(-4)}
      </button>
    );
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        disabled={isPending}
        style={{
          fontFamily: FONT,
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.12em',
          color: '#fff',
          background: '#000',
          border: 'none',
          padding: '6px 12px',
          cursor: isPending ? 'not-allowed' : 'pointer',
          opacity: isPending ? 0.6 : 1,
        }}
      >
        {isPending ? 'CONNECTING...' : 'CONNECT WALLET'}
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 200,
            padding: '24px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#fff',
              width: '100%',
              maxWidth: '320px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ fontFamily: FONT, fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', color: '#999', marginBottom: '4px' }}>
              SELECT WALLET
            </div>
            {webConnectors.map((connector) => (
              <button
                key={connector.id}
                onClick={() => { connect({ connector }); setOpen(false); }}
                style={{
                  fontFamily: FONT,
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  color: '#fff',
                  background: '#000',
                  border: 'none',
                  padding: '14px',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                {connector.name}
              </button>
            ))}
            <button
              onClick={() => setOpen(false)}
              style={{
                fontFamily: FONT,
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: '#000',
                background: '#fff',
                border: '1px solid #000',
                padding: '12px',
                cursor: 'pointer',
              }}
            >
              CANCEL
            </button>
          </div>
        </div>
      )}
    </>
  );
}
