'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletButton } from '../solana/solana-provider';
import { AppHero, ellipsify } from '../ui/ui-layout';
import { ExplorerLink } from '../cluster/cluster-ui';
import { useJournalProgram } from './journal-data-access';
import { JournalCreate, JournalList } from './journal-ui';

export default function JournalFeature() {
  const { publicKey } = useWallet();
  const { programId } = useJournalProgram();

  return publicKey ? (
    <div className="flex-col text-center mx-auto px-4">
      <h2 className='text-center text-2xl font-semibold py-5'>Your Journals</h2>
      <div className="mt-6">
        <JournalCreate />
      </div>
      <div className="mt-6">
        <JournalList />
      </div>
    </div>
  ) : (
    <div className="max-w-4xl mx-auto">
      <div className="hero py-[64px]">
        <div className="hero-content text-center">
          <WalletButton />
        </div>
      </div>
    </div>
  );
}
