// Set NEXT_PUBLIC_CONTRACT_ADDRESS in .env.local after deploying CrosswordStreak.sol to Base.
export const CROSSWORD_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as
  | `0x${string}`
  | undefined;

export const CROSSWORD_ABI = [
  {
    type: 'function',
    name: 'record',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'getStreak',
    inputs: [{ name: 'player', type: 'address' }],
    outputs: [
      { name: 'currentStreak', type: 'uint256' },
      { name: 'lastCompletedDay', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'event',
    name: 'Recorded',
    inputs: [
      { name: 'player', type: 'address', indexed: true },
      { name: 'day', type: 'uint256', indexed: false },
      { name: 'newStreak', type: 'uint256', indexed: false },
    ],
  },
  {
    type: 'error',
    name: 'AlreadyRecordedToday',
    inputs: [],
  },
  {
    type: 'error',
    name: 'TooEarly',
    inputs: [],
  },
] as const;
