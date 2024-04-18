import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';
import { mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata';
import { mplCandyMachine } from '@metaplex-foundation/mpl-candy-machine';
import { useWallet } from '@solana/wallet-adapter-react';

const SOLANA_RPC_URL = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.devnet.solana.com';

const useUmi = () => {
  const wallet = useWallet();

  const umi = createUmi(SOLANA_RPC_URL)
    .use(mplTokenMetadata())
    .use(mplCandyMachine())
    .use(walletAdapterIdentity(wallet));

  return { umi, wallet };
};

export default useUmi;
