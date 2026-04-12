'use client';

import { useConnect } from 'wagmi';

interface ConnectWalletProps {
  isInMiniApp: boolean;
}

export function ConnectWallet({ isInMiniApp }: ConnectWalletProps) {
  const { connect, connectors, isPending } = useConnect();

  return (
    <div className="flex flex-col gap-3 w-full max-w-xs mx-auto">
      <p className="text-white/50 text-sm text-center mb-2">
        Connect your wallet to view or create your Aura Card
      </p>
      {connectors.map((connector) => {
        const label = isInMiniApp && connector.id === 'injected'
          ? 'Farcaster Wallet'
          : connector.name;
        return (
          <button
            key={connector.id}
            onClick={() => connect({ connector })}
            disabled={isPending}
            className="w-full py-3 px-6 rounded-2xl font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/10 transition-all disabled:opacity-50"
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
