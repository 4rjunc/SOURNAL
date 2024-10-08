// @ts-nocheck

'use client';

import { PublicKey } from '@solana/web3.js';
import { useState } from 'react';
import { ellipsify } from '../ui/ui-layout';
import { ExplorerLink } from '../cluster/cluster-ui';
import {
  useJournalProgram,
  useJournalProgramAccount,
} from './journal-data-access';
import { useWallet } from '@solana/wallet-adapter-react';

export function JournalCreate() {
  const { createEntry } = useJournalProgram();
  const { publicKey } = useWallet();
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const isFormValid = title.trim() !== '' && message.trim() != '';

  const handleSubmit = () => {
    console.log('handleSubmit');
    if (publicKey && isFormValid) {
      createEntry.mutateAsync({ title, message, owner: publicKey });
    }
  };

  if (!publicKey) {
    return <p> Connect your wallet</p>;
  }

  return (
    <div>
      {/* The button to open modal */}
      <label htmlFor="my_modal_6" className="btn">Create A Note</label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <p className="py-4">Create a note and add it to your journal</p>
            <input
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            className="input rounded-lg mt-2 input-bordered w-full max-x-xs"
          />
          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="textarea rounded-lg mt-2  textarea-bordered w-full max-x-xs"
          />

          <button
            className="btn btn-xs lg:btn-md btn-primary"
            onClick={handleSubmit}
            disabled={createEntry.isPending || !isFormValid}
          >
            Create {createEntry.isPending && '...'}
          </button>

        <div className="modal-action">
          <label htmlFor="my_modal_6" className="btn">Close!</label>
        </div>
      </div>
    </div>
  </div>
  );
}

export function JournalList() {
  const { accounts, getProgramAccount } = useJournalProgram();

  if (getProgramAccount.isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }
  if (!getProgramAccount.data?.value) {
    return (
      <div className="alert alert-info flex justify-center">
        <span>
          Program account not found. Make sure you have deployed the program and
          are on the correct cluster.
        </span>
      </div>
    );
  }
  return (
    <div className={'space-y-6'}>
      {accounts.isLoading ? (
        <span className="loading loading-spinner loading-lg"></span>
      ) : accounts.data?.length ? (
        <div className="grid md:grid-cols-2 gap-4">
          {accounts.data?.map((account) => (
            <JournalCard
              key={account.publicKey.toString()}
              account={account.publicKey}
            />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <h2 className={'text-2xl'}>No Journals</h2>
          No notes found. Create one using `Create A Note` to get started.
        </div>
      )}
    </div>
  );
}

function JournalCard({ account }: { account: PublicKey }) {
  const { accountQuery, updateEntry, deleteEntry } = useJournalProgramAccount({
    account,
  });

  const { publicKey } = useWallet();
  const [message, setMessage] = useState('');
  const title = accountQuery.data?.title;

  const isFormValid = message.trim() != '';

  const handleSubmit = () => {
    if (publicKey && isFormValid && title) {
      updateEntry.mutateAsync({ title, message, owner: publicKey });
    }
  };

  if (!publicKey) {
    return <p> Connect your wallet</p>;
  }

  return accountQuery.isLoading ? (
    <span className="loading loading-spinner loading-lg"></span>
  ) : (
    <div className="card card-bordered border-base-300 border-4 text-neutral-content">
      <div className="card-body items-center text-center">
        <div className="space-y-6">
          <h2
            className="card-title justify-center text-3xl cursor-pointer"
            onClick={() => accountQuery.refetch()}
          >
            {accountQuery.data?.title}
          </h2>
          <p>{accountQuery.data?.message}</p>
          <div className="mt-5 card-actions justify-around">
            <textarea
              placeholder="New Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="textarea rounded-lg textarea-bordered w-full max-x-xs"
            />

            <button
              className="btn btn-xs lg:btn-md btn-primary"
              onClick={handleSubmit}
              disabled={updateEntry.isPending || !isFormValid}
            >
              Update Entry {updateEntry.isPending && '...'}
            </button>
          </div>
          <div className="text-center space-y-4">
            {/*<p>
              <ExplorerLink
                path={`account/${account}`}
                label={ellipsify(account.toString())}
              />
            </p>*/}
            <button
              className="btn btn-md text-xl btn-secondary btn-outline"
              onClick={() => {
                if (
                  !window.confirm(
                    'Are you sure you want to delete this note?'
                  )
                ) {
                  return;
                }
                const title = accountQuery.data?.title;
                if (title) {
                  return deleteEntry.mutateAsync(title);
                }
              }}
              disabled={deleteEntry.isPending}
            >
              Delete 🚮
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
