'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  useAccount,
  useSendTransaction,
  useWaitForTransactionReceipt,
  useReadContract,
} from 'wagmi';
import { base } from 'wagmi/chains';
import { encodeFunctionData } from 'viem';
import { CROSSWORD_ABI, CROSSWORD_ADDRESS } from './crosswordContract';

export type TxStatus = 'idle' | 'pending' | 'success' | 'error';

export interface StreakRecordState {
  /** true when a wallet is connected (button visible) */
  canRecord: boolean;
  /** true when both contract is deployed AND wallet is connected (button clickable) */
  contractReady: boolean;
  /** true when the player already recorded today on-chain */
  alreadyRecorded: boolean;
  txStatus: TxStatus;
  txHash: `0x${string}` | undefined;
  /** on-chain streak after TX success or if already recorded today; null otherwise */
  onChainStreak: number | null;
  errorMessage: string | null;
  onRecord: () => void;
}

// Builder code appended to calldata for Base attribution tracking.
// Pre-computed hex of 'bc_oijyzzqy' (UTF-8). CrosswordStreak.record() ignores extra calldata bytes.
const BUILDER_SUFFIX = '62635f6f696a797a7a7179';

export function useStreakRecord(dayNumber: number): StreakRecordState {
  const { address } = useAccount();

  // Read current streak / last recorded day from the contract
  const { data: streakInfo, refetch: refetchStreak } = useReadContract({
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

  const { isSuccess: isTxSuccess, isLoading: isTxLoading, isError: isTxReceiptError, error: receiptError } =
    useWaitForTransactionReceipt({ hash: txHash, query: { enabled: !!txHash } });

  // Track refetch-in-progress so we don't expose stale streakInfo as onChainStreak
  const [isRefetching, setIsRefetching] = useState(false);

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
      : writeError || isTxReceiptError
        ? 'error'
        : 'idle';

  useEffect(() => {
    if (!isTxSuccess) return;
    setIsRefetching(true);
    refetchStreak().finally(() => setIsRefetching(false));
  }, [isTxSuccess, refetchStreak]);

  // Only expose on-chain streak after refetch completes (avoids showing stale pre-TX value)
  const onChainStreak =
    !isRefetching && streakInfo && (isTxSuccess || alreadyRecordedOnChain)
      ? Number(streakInfo[0])
      : null;

  const onRecord = useCallback(() => {
    if (!CROSSWORD_ADDRESS || !address) return;
    reset();

    const calldata = encodeFunctionData({
      abi: CROSSWORD_ABI,
      functionName: 'record',
    });

    // chainId causes wagmi to prompt chain switch automatically before sending
    sendTransaction({
      to: CROSSWORD_ADDRESS,
      data: `${calldata}${BUILDER_SUFFIX}` as `0x${string}`,
      chainId: base.id,
    });
  }, [sendTransaction, reset, address]);

  const errorMessage = writeError?.message ?? receiptError?.message ?? null;

  return {
    canRecord: !!address,
    contractReady: !!CROSSWORD_ADDRESS && !!address,
    alreadyRecorded,
    txStatus,
    txHash,
    onChainStreak,
    errorMessage,
    onRecord,
  };
}
