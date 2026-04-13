'use client';

import { useState } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { useFarcasterMiniApp } from '@/lib/farcaster';
import { AuraCard } from '@/components/AuraCard';
import { EditProfile } from '@/components/EditProfile';
import { ConnectWallet } from '@/components/ConnectWallet';

export default function Home() {
  const { isInMiniApp, isLoading, user } = useFarcasterMiniApp();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [editing, setEditing] = useState(false);

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://aura-card.vercel.app';

  const handleShare = () => {
    const shareUrl = `${appUrl}/card/${address}`;
    const text = `Check out my Aura Card on Base! `;
    const composeUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(text)}&embeds[]=${encodeURIComponent(shareUrl)}`;
    if (isInMiniApp) {
      import('@farcaster/miniapp-sdk').then(({ sdk }) => {
        sdk.actions.openUrl(composeUrl);
      });
    } else {
      window.open(composeUrl, '_blank');
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
          <p className="text-white/40 text-sm">Loading Aura...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-start px-4 pt-10 pb-20">
      {/* Header */}
      <div className="w-full max-w-sm mb-8 text-center">
        <h1 className="text-white font-bold text-2xl tracking-tight">
          <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            Aura Card
          </span>
        </h1>
        <p className="text-white/40 text-sm mt-1">Your living onchain identity</p>
      </div>

      {!isConnected ? (
        <ConnectWallet isInMiniApp={isInMiniApp} />
      ) : (
        <>
          <AuraCard
            address={address!}
            user={user}
            onEdit={() => setEditing(true)}
          />

          {/* Action buttons */}
          <div className="flex gap-3 mt-6 w-full max-w-sm">
            <button
              onClick={handleShare}
              className="flex-1 py-3 rounded-2xl font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/10 transition-all"
            >
              Share Card
            </button>
            <button
              onClick={() => disconnect()}
              className="py-3 px-5 rounded-2xl text-white/40 hover:text-white/70 bg-white/5 border border-white/10 transition-all"
            >
              Disconnect
            </button>
          </div>

          {/* View others */}
          <p className="text-white/30 text-xs mt-6 text-center">
            Share your card URL to let others view your Aura
          </p>
          <p className="text-white/20 text-xs font-mono mt-1">
            {appUrl}?addr={address?.slice(0, 10)}...
          </p>
        </>
      )}

      {/* Edit modal */}
      {editing && address && (
        <EditProfile
          address={address}
          onClose={() => setEditing(false)}
          onSaved={() => setEditing(false)}
        />
      )}
    </main>
  );
}
