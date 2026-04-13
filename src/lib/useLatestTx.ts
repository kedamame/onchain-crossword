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

function buildUrl(action: string, address: string, apiKey: string): string {
  return (
    `https://api.basescan.org/api` +
    `?module=account&action=${action}` +
    `&address=${address}` +
    `&page=1&offset=5&sort=desc` +
    (apiKey ? `&apikey=${apiKey}` : '')
  );
}

function extractTx(data: unknown): LatestTx | null {
  const d = data as { status?: string; result?: unknown };
  if (d?.status === '1' && Array.isArray(d?.result) && d.result.length > 0) {
    return d.result[0] as LatestTx;
  }
  return null;
}

export function useLatestTx(address: Address | undefined): State {
  const [state, setState] = useState<State>({ tx: null, isLoading: false });

  useEffect(() => {
    if (!address) return;

    const apiKey = process.env.NEXT_PUBLIC_BASESCAN_API_KEY ?? '';
    setState({ tx: null, isLoading: true });

    // txlist (通常tx) と txlistinternal (Bridge/内部tx) を並行取得
    Promise.all([
      fetch(buildUrl('txlist', address, apiKey)).then((r) => r.json()).catch(() => null),
      fetch(buildUrl('txlistinternal', address, apiKey)).then((r) => r.json()).catch(() => null),
    ]).then(([normal, internal]) => {
      const txNormal = extractTx(normal);
      const txInternal = extractTx(internal);

      // タイムスタンプが新しい方を採用
      let tx: LatestTx | null = null;
      if (txNormal && txInternal) {
        tx = parseInt(txNormal.timeStamp) >= parseInt(txInternal.timeStamp)
          ? txNormal
          : txInternal;
      } else {
        tx = txNormal ?? txInternal;
      }

      setState({ tx, isLoading: false });
    });
  }, [address]);

  return state;
}

// ---- display helpers ----

export function formatTimeAgo(unixTimestamp: string): string {
  const parsed = parseInt(unixTimestamp, 10);
  if (isNaN(parsed)) return '';
  const diff = Math.floor(Date.now() / 1000) - parsed;
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
  if (!addr || addr.length < 10) return addr ?? '';
  return addr.slice(0, 6) + '...' + addr.slice(-4);
}
