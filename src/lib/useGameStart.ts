'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useAccount, useSendTransaction } from 'wagmi';
import { encodeFunctionData } from 'viem';
import { CROSSWORD_ABI, CROSSWORD_ADDRESS } from './crosswordContract';

// Pre-computed hex of 'bc_oijyzzqy' (UTF-8) for Base builder attribution.
// CrosswordStreak.start() ignores extra calldata bytes.
const BUILDER_SUFFIX = '62635f6f696a797a7a7179';

const storageKey = (day: number) => `crossword-started-${day}`;

export function useGameStart(dayNumber: number) {
  const { address } = useAccount();
  const { sendTransaction } = useSendTransaction();

  // useRef instead of useState: avoids re-render chain when sent flips true,
  // preventing selectCell / CrosswordGrid from needlessly re-creating.
  const sentRef = useRef(false);

  // Sync from localStorage after mount (client-only). Reset ref first so
  // a new dayNumber doesn't inherit the previous day's sent state.
  useEffect(() => {
    sentRef.current = false;
    try {
      if (localStorage.getItem(storageKey(dayNumber))) sentRef.current = true;
    } catch {
      // ignore
    }
  }, [dayNumber]);

  const onStart = useCallback(() => {
    if (!CROSSWORD_ADDRESS || !address || sentRef.current) return;

    // Mark immediately to prevent double-fire
    sentRef.current = true;
    try {
      localStorage.setItem(storageKey(dayNumber), '1');
    } catch {
      // ignore
    }

    const calldata = encodeFunctionData({
      abi: CROSSWORD_ABI,
      functionName: 'start',
    });

    sendTransaction({
      to: CROSSWORD_ADDRESS,
      data: `${calldata}${BUILDER_SUFFIX}` as `0x${string}`,
    });
  }, [sendTransaction, address, dayNumber]);

  return {
    /** Call once on first player interaction with the puzzle */
    onStart,
    /** false when wallet not connected or contract not set */
    canStart: !!CROSSWORD_ADDRESS && !!address,
  };
}
