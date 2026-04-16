'use client';

import { useCallback } from 'react';
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
  useReadContract,
} from 'wagmi';
import { CROSSWORD_ABI, CROSSWORD_ADDRESS } from './crosswordContract';

export type TxStatus = 'idle' | 'pending' | 'success' | 'error';

export interface StreakRecordState {
  /** true when the contract address is set AND a wallet is connected */
  canRecord: boolean;
  /** true when the player already recorded today on-chain */
  alreadyRecorded: boolean;
  txStatus: TxStatus;
  txHash: `0x${string}` | undefined;
  onRecord: () => void;
}

export function useStreakRecord(dayNumber: number): StreakRecordState {
  const { address } = useAccount();

  // Read current streak / last recorded day from the contract
  const { data: streakInfo } = useReadContract({
    address: CROSSWORD_ADDRESS,
    abi: CROSSWORD_ABI,
    functionName: 'getStreak',
    args: [address ?? '0x0000000000000000000000000000000000000000'],
    query: { enabled: !!address && !!CROSSWORD_ADDRESS },
  });

  const {
    writeContract,
    data: txHash,
    isPending: isWritePending,
    error: writeError,
    reset,
  } = useWriteContract();

  const { isSuccess: isTxSuccess, isLoading: isTxLoading } =
    useWaitForTransactionReceipt({ hash: txHash, query: { enabled: !!txHash } });

  // Already recorded if on-chain lastDay matches today's dayNumber (and streak > 0)
  const alreadyRecordedOnChain =
    streakInfo != null &&
    Number(streakInfo[0]) > 0 &&
    Number(streakInfo[1]) === dayNumber;

  const alreadyRecorded = isTxSuccess || alreadyRecordedOnChain;

  const txStatus: TxStatus = isTxSuccess
    ? 'success'
    : isTxLoading || isWritePending
      ? 'pending'
      : writeError
        ? 'error'
        : 'idle';

  const onRecord = useCallback(() => {
    if (!CROSSWORD_ADDRESS || !address) return;
    reset(); // clear any stale error so RETRY transitions correctly to pending
    writeContract({
      address: CROSSWORD_ADDRESS,
      abi: CROSSWORD_ABI,
      functionName: 'record',
    });
  }, [writeContract, reset, address]);

  return {
    canRecord: !!CROSSWORD_ADDRESS && !!address,
    alreadyRecorded,
    txStatus,
    txHash,
    onRecord,
  };
}
