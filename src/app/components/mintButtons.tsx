'use client';
import { useMemo, useState } from 'react';
import { MINTING_GROUP, mintWithEarly2, mintWithEarly4, mintWithSol, mintWithToken } from '../models/candyMachine';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipProvider } from '@/components/ui/tooltip';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import Link from 'next/link';
import { CandyGuard } from '@metaplex-foundation/mpl-candy-machine';
import { Umi, formatDateTime } from '@metaplex-foundation/umi';
import dayjs from 'dayjs';
import { WalletContextState } from '@solana/wallet-adapter-react';

const EXPLORER_LINK = process.env.NEXT_PUBLIC_SOLANA_EXPLORER_LINK;

type Props = {
  candyGuard: CandyGuard;
  umi: Umi;
  wallet: WalletContextState;
};

export default function MintButtons({ candyGuard, umi, wallet }: Props) {
  const [isMinting, setIsMinting] = useState(false);
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
      description: 'Please confirm the transactino and then wait for your NFT to get mintted',
      duration: 60000,
    });

    let promise: Promise<string>;
    switch (mintingGroup) {
      case MINTING_GROUP.SOL:
        promise = mintWithSol(umi);
        break;
      case MINTING_GROUP.TOKEN:
        promise = mintWithToken(umi);
        break;
      case MINTING_GROUP.EARLY2:
        promise = mintWithEarly2(umi);
        break;
      case MINTING_GROUP.EARLY4:
        promise = mintWithEarly4(umi);
        break;
      default:
        throw new Error('Invalid payment method');
    }

    try {
      const sig = await promise;
      toast({
        title: 'Minted successfully',
        className: 'bg-emerald-500',
        description: 'Your NFT has been mintted successfully',
        action: (
          <Link target="_blank" href={`${EXPLORER_LINK}/${sig}`}>
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
      console.log(err);
      toast({
        title: 'Something went wrong while minting',
        description: err.message,
        variant: 'destructive',
      });
    }

    setIsMinting(false);
  };

  const is4HoursToLive = timeUntilLaunch <= 240 && timeUntilLaunch > 0;
  const is2HoursToLive = timeUntilLaunch <= 120 && timeUntilLaunch > 0;
  const isLive = timeUntilLaunch <= 0;
  const tooltipText = !wallet.connected ? 'Please connect your wallet' : !isLive ? 'Minting is not live yet' : '';

  return (
    <TooltipProvider>
      <div className="flex space-x-2">
        <Tooltip isDisabled={!tooltipText} content={tooltipText}>
          <Button
            isLoading={isMinting}
            disabled={!wallet.connected || isMinting || !isLive}
            onClick={() => handleMinting(MINTING_GROUP.SOL)}
            variant="gold"
            className="appearance-none rounded-md border border-neutral-500 p-3 font-medium leading-tight text-neutral-300"
          >
            Mint with SOL
          </Button>
        </Tooltip>
        <Tooltip isDisabled={!tooltipText} content={tooltipText}>
          <Button
            isLoading={isMinting}
            disabled={!wallet.connected || isMinting || !isLive}
            onClick={() => handleMinting(MINTING_GROUP.TOKEN)}
            variant="gold"
            className="appearance-none rounded-md border border-neutral-500 p-3 font-medium leading-tight text-neutral-300"
          >
            Mint with Start Atlas Tokens
          </Button>
        </Tooltip>
        {is2HoursToLive && (
          <Button
            isLoading={isMinting}
            disabled={!wallet.connected || isMinting || !is2HoursToLive}
            onClick={() => handleMinting(MINTING_GROUP.EARLY2)}
            variant="gold"
            className="appearance-none rounded-md border border-neutral-500 p-3 font-medium leading-tight text-neutral-300"
          >
            Mint early 2
          </Button>
        )}
        {is4HoursToLive && (
          <Button
            isLoading={isMinting}
            disabled={!wallet.connected || isMinting || !is4HoursToLive}
            onClick={() => handleMinting(MINTING_GROUP.EARLY4)}
            variant="gold"
            className="appearance-none rounded-md border border-neutral-500 p-3 font-medium leading-tight text-neutral-300"
          >
            Mint early 4
          </Button>
        )}
      </div>
    </TooltipProvider>
  );
}
