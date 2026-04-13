'use client';

import { useEffect, useState } from 'react';
import type { Address } from 'viem';

export interface LatestTx {
  hash: string;
  timeStamp: string;       // unix timestamp string
  from: string;
  to: string;
  value: string;           // wei string
  functionName: string;    // e.g. "transfer(address,uint256)" or ""
  isError: string;         // "0" or "1"
}

interface State {
  tx: LatestTx | null;
  isLoading: boolean;
}

export function useLatestTx(address: Address | undefined): State {
  const [state, setState] = useState<State>({ tx: null, isLoading: false });

  useEffect(() => {
    if (!address) return;

    const apiKey = process.env.NEXT_PUBLIC_BASESCAN_API_KEY ?? '';
    const url =
      `https://api.basescan.org/api` +
      `?module=account&action=txlist` +
      `&address=${address}` +
      `&page=1&offset=1&sort=desc` +
      (apiKey ? `&apikey=${apiKey}` : '');

    setState({ tx: null, isLoading: true });

    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        const tx = data?.result?.[0] ?? null;
        setState({ tx, isLoading: false });
      })
      .catch(() => setState({ tx: null, isLoading: false }));
  }, [address]);

  return state;
}

// ---- display helpers ----

export function formatTimeAgo(unixTimestamp: string): string {
  const diff = Math.floor(Date.now() / 1000) - parseInt(unixTimestamp, 10);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export function formatTxLabel(tx: LatestTx, myAddress: string): string {
  const isOutgoing = tx.from.toLowerCase() === myAddress.toLowerCase();
  const valueEth = Number(tx.value) / 1e18;

  // Contract interaction with known function name
  const funcShort = tx.functionName
    ? tx.functionName.split('(')[0]
    : null;

  if (funcShort) {
    return `${funcShort}()`;
  }

  if (!isOutgoing) {
    return `Received ${valueEth > 0 ? valueEth.toFixed(4) + ' ETH' : 'tx'}`;
  }

  if (valueEth > 0) {
    return `Sent ${valueEth.toFixed(4)} ETH`;
  }

  return 'Contract call';
}

export function formatAddress(addr: string): string {
  return addr.slice(0, 6) + '...' + addr.slice(-4);
}
