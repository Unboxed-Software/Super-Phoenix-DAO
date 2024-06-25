'use client';
import { useEffect, useState } from 'react';
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
import { CandyGuard, fetchCandyMachine } from '@metaplex-foundation/mpl-candy-machine';
import { Umi, formatDateTime, publicKey } from '@metaplex-foundation/umi';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { WalletContextState } from '@solana/wallet-adapter-react';
import { fetchDigitalAsset } from '@metaplex-foundation/mpl-token-metadata';
import RevealModal, { TIER_INFO } from './revealModal';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import MintCount from './MintCount';
import CountDown from './landing/CountDown';

dayjs.extend(relativeTime);

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
  const [mintedCount, setMintedCount] = useState(0);

  const { toast } = useToast();

  // @ts-expect-error - candyGuard type is not correct
  const launchDate = dayjs(formatDateTime(candyGuard.guards.startDate.value.date));

  const updateMintedCount = () => {
    const candyMachinePublicKey = publicKey(process.env.NEXT_PUBLIC_CM_ID as string);
    fetchCandyMachine(umi, candyMachinePublicKey).then((candyMachine) => {
      const mintedCount: number = Number(candyMachine.itemsRedeemed);
      setMintedCount(mintedCount);
    });
  };

  useEffect(() => {
    updateMintedCount();
  }, []);

  const handleMinting = async (mintingGroup: keyof typeof MINTING_GROUP) => {
    setIsMinting(true);
    toast({
      title: 'Minting your NFT...',
      description: 'Please confirm the transaction and then wait for your NFT to get minted',
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

      try {
        const mintMetadata = await fetchDigitalAsset(umi, mint, {
          commitment: 'processed',
        });
        const tier = mintMetadata.metadata.name as keyof typeof TIER_INFO;

        if (TIER_INFO[tier]) {
          setTier(tier);
          setOpen(true);
        }
      } catch (err) {
        console.log('Error fetching metadata', err);
      }

      updateMintedCount();

      toast({
        title: 'Minted successfully',
        className: 'bg-emerald-500',
        description: 'Your NFT has been minted successfully',
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
      console.log('ERROR', err);
      if (err.message?.includes('maximum number of allowed mints was reached')) {
        toast({
          title: 'Maximum number of allowed mints was reached',
          description: 'Please try again with the public mint',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Something went wrong while minting',
          description: err.message,
          variant: 'destructive',
        });
      }
    } finally {
      setIsMinting(false);
    }
  };

  const isFreeMintLive = launchDate.subtract(4, 'hours').diff(dayjs(), 'minute') <= 0;
  const isWhitelistMintLive = launchDate.subtract(2, 'hours').diff(dayjs(), 'minute') <= 0;
  const isPublicMintLive = launchDate.diff(dayjs(), 'minute') <= 0;

  return (
    <>
      <div className="flex w-full justify-center">
        <MintCount mintedCount={mintedCount} />
      </div>
      {!wallet.connected && (
        <div className="container mb-6 max-w-[500px]">
          <Alert variant="attention">
            <AlertTitle>Attention!</AlertTitle>
            <AlertDescription>Please Connect your wallet</AlertDescription>
          </Alert>
        </div>
      )}

      <div className="container flex flex-col space-y-5 md:w-1/2">
        <div className="flex justify-between align-middle">
          <div className="flex w-52 flex-col align-middle md:w-80">
            <p className="text-2xl text-neutral-300"> Freelist: </p>
            <p className="text-m text-neutral-300">1 per wallet on freelist</p>
          </div>
          <div className="flex w-52 space-x-2 align-middle">
            {isFreeMintLive ? (
              <>
                <Button
                  isLoading={isMinting}
                  disabled={!wallet.connected || isMinting || !isFreeMintLive}
                  onClick={() => handleMinting(MINTING_GROUP.FL)}
                  variant="gold"
                  className="w-20 appearance-none rounded-md border border-neutral-500 p-3 font-medium leading-tight text-neutral-300"
                >
                  Free
                </Button>
              </>
            ) : (
              <CountDown targetDate={launchDate.subtract(4, 'hours')} />
            )}
          </div>
        </div>
        <div className="flex justify-between align-middle">
          <div className="flex w-52 flex-col align-middle md:w-80">
            <p className="text-2xl text-neutral-300"> Whitelist:</p>
            <p className="text-m text-neutral-300"> 4 per wallet ( 2 signatures required )</p>
          </div>
          <div className="flex w-52 space-x-2">
            {isWhitelistMintLive ? (
              <>
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
              </>
            ) : (
              <CountDown targetDate={launchDate.subtract(2, 'hours')} />
            )}
          </div>
        </div>
        <div className="flex justify-between align-middle">
          <div className="flex w-52 flex-col align-middle md:w-80">
            <p className="text-2xl text-neutral-300"> Public: </p>
            <p className="text-m text-neutral-300">Unlimited per wallet</p>
          </div>
          <div className="flex w-52 space-x-2">
            {isPublicMintLive ? (
              <>
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
              </>
            ) : (
              <CountDown targetDate={launchDate} />
            )}
          </div>
        </div>
        {tier && open && <RevealModal open={open} tier={tier} onClose={() => setOpen(false)} />}
      </div>
    </>
  );
}
