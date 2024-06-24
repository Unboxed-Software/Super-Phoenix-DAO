'use client';
import { useMemo, useState } from 'react';
import {
  MINTING_GROUP,
  mintWithFreelist,
  mintWithPublicSOL,
  mintWithPublicToken,
  mintWithWhitelistSOL,
  mintWithWhitelistToken,
} from '../models/candyMachine';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import Link from 'next/link';
import { CandyGuard } from '@metaplex-foundation/mpl-candy-machine';
import { Umi, formatDateTime } from '@metaplex-foundation/umi';
import dayjs from 'dayjs';
import { WalletContextState } from '@solana/wallet-adapter-react';
import { fetchDigitalAsset } from '@metaplex-foundation/mpl-token-metadata';
import RevealModal, { TIER_INFO } from './revealModal';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const EXPLORER_LINK = process.env.NEXT_PUBLIC_SOLANA_EXPLORER_LINK;

type Props = {
  candyGuard: CandyGuard;
  umi: Umi;
  wallet: WalletContextState;
};

export default function MintButtons({ candyGuard, umi, wallet }: Props) {
  const [isMinting, setIsMinting] = useState(false);

  const [open, setOpen] = useState(false);
  const [tier, setTier] = useState<keyof typeof TIER_INFO>();

  const { toast } = useToast();
  const timeUntilLaunch = useMemo(() => {
    // @ts-expect-error - candyGuard type is not correct
    const startDate = dayjs(formatDateTime(candyGuard.guards.startDate.value.date));
    return startDate.diff(dayjs(), 'minute');
  }, [candyGuard]);

  const handleMinting = async (mintingGroup: keyof typeof MINTING_GROUP) => {
    setIsMinting(true);
    toast({
      title: 'Minting your NFT...',
      description: 'Please confirm the transaction and then wait for your NFT to get mintted',
      duration: 60000,
    });

    let promise: ReturnType<typeof mintWithFreelist>;
    switch (mintingGroup) {
      case MINTING_GROUP.FL:
        promise = mintWithFreelist(umi);
        break;
      case MINTING_GROUP.WLSOL:
        promise = mintWithWhitelistSOL(umi);
        break;
      case MINTING_GROUP.WLSA:
        promise = mintWithWhitelistToken(umi);
        break;
      case MINTING_GROUP.PSOL:
        promise = mintWithPublicSOL(umi);
        break;
      case MINTING_GROUP.PSA:
        promise = mintWithPublicToken(umi);
        break;
      default:
        throw new Error('Invalid payment method');
    }

    try {
      const { tx, mint } = await promise;
      const mintMetadata = await fetchDigitalAsset(umi, mint);
      const tier = mintMetadata.metadata.name.toLowerCase() as keyof typeof TIER_INFO;

      if (TIER_INFO[tier]) {
        setTier(tier);
        setOpen(true);
      }

      toast({
        title: 'Minted successfully',
        className: 'bg-emerald-500',
        description: 'Your NFT has been mintted successfully',
        action: (
          <Link target="_blank" href={`${EXPLORER_LINK}/${tx}`}>
            <ToastAction
              className="appearance-none rounded-md border border-neutral-500 bg-emerald-800 p-3 font-medium leading-tight text-neutral-300 hover:bg-emerald-900 active:bg-green-900"
              altText="View on Explorer"
            >
              View on Explorer
            </ToastAction>
          </Link>
        ),
      });
    } catch (err: any) {
      console.log(`ERROR\n\n\n${err}\n\n`);
      toast({
        title: 'Something went wrong while minting',
        description: err.message,
        variant: 'destructive',
      });
    } finally {
      setIsMinting(false);
    }
  };

  const isFreeMintLive = timeUntilLaunch <= 240 && timeUntilLaunch > 0;
  const isWhitelistMintLive = timeUntilLaunch <= 120 && timeUntilLaunch > 0;
  const isPublicMintLive = timeUntilLaunch <= 0;

  return (
    <>
      {!wallet.connected && (
        <div className="container mb-6 max-w-[500px]">
          <Alert variant="attention">
            <AlertTitle>Attention!</AlertTitle>
            <AlertDescription>Please Connect your wallet</AlertDescription>
          </Alert>
        </div>
      )}

      <div className="container flex flex-col space-y-2 md:w-1/2">
        <div className="flex justify-between align-middle">
          <div>
            <p className="text-2xl text-neutral-300"> Freelist: </p>
          </div>
          <div className="flex w-52 space-x-2">
            <Button
              isLoading={isMinting}
              disabled={!wallet.connected || isMinting || !isFreeMintLive}
              onClick={() => handleMinting(MINTING_GROUP.FL)}
              variant="gold"
              className="w-20 appearance-none rounded-md border border-neutral-500 p-3 font-medium leading-tight text-neutral-300"
            >
              Free
            </Button>
          </div>
        </div>
        <div className="flex justify-between align-middle">
          <div>
            <p className="text-2xl text-neutral-300"> Whitelist: </p>
          </div>
          <div className="flex w-52 space-x-2">
            <Button
              isLoading={isMinting}
              disabled={!wallet.connected || isMinting || !isWhitelistMintLive}
              onClick={() => handleMinting(MINTING_GROUP.WLSOL)}
              variant="gold"
              className="w-20 appearance-none rounded-md border border-neutral-500 p-3 font-medium leading-tight text-neutral-300"
            >
              1.25 SOL
            </Button>
            <Button
              isLoading={isMinting}
              disabled={!wallet.connected || isMinting || !isWhitelistMintLive}
              onClick={() => handleMinting(MINTING_GROUP.WLSA)}
              variant="gold"
              className="w-20 appearance-none rounded-md border border-neutral-500 p-3 font-medium leading-tight text-neutral-300"
            >
              60K Atlas
            </Button>
          </div>
        </div>
        <div className="flex justify-between align-middle">
          <div>
            <p className="text-2xl text-neutral-300"> Public: </p>
          </div>
          <div className="flex w-52 space-x-2">
            <Button
              isLoading={isMinting}
              disabled={!wallet.connected || isMinting || !isPublicMintLive}
              onClick={() => handleMinting(MINTING_GROUP.PSOL)}
              variant="gold"
              className="w-20 appearance-none rounded-md border border-neutral-500 p-3 font-medium leading-tight text-neutral-300"
            >
              1.5 SOL
            </Button>
            <Button
              isLoading={isMinting}
              disabled={!wallet.connected || isMinting || !isPublicMintLive}
              onClick={() => handleMinting(MINTING_GROUP.PSA)}
              variant="gold"
              className="w-20 appearance-none rounded-md border border-neutral-500 p-3 font-medium leading-tight text-neutral-300"
            >
              73k Atlas
            </Button>
          </div>
        </div>
        {tier && open && <RevealModal open={open} tier={tier} onClose={() => setOpen(false)} />}
      </div>
    </>
  );
}
