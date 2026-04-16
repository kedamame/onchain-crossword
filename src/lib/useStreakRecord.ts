'use client';

import { useCallback } from 'react';
import {
  useAccount,
  useSendTransaction,
  useWaitForTransactionReceipt,
  useReadContract,
} from 'wagmi';
import { encodeFunctionData } from 'viem';
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

// Builder code appended to calldata for Base attribution tracking.
// Pre-computed hex of 'bc_oijyzzqy' (UTF-8). CrosswordStreak.record() ignores extra calldata bytes.
const BUILDER_SUFFIX = '62635f6f696a797a7a7179';

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
    sendTransaction,
    data: txHash,
    isPending: isWritePending,
    error: writeError,
    reset,
  } = useSendTransaction();

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

    // Encode record() calldata and append builder code for Base attribution
    const calldata = encodeFunctionData({
      abi: CROSSWORD_ABI,
      functionName: 'record',
    });

    sendTransaction({
      to: CROSSWORD_ADDRESS,
      data: `${calldata}${BUILDER_SUFFIX}` as `0x${string}`,
    });
  }, [sendTransaction, reset, address]);

  return {
    canRecord: !!CROSSWORD_ADDRESS && !!address,
    alreadyRecorded,
    txStatus,
    txHash,
    onRecord,
  };
}
