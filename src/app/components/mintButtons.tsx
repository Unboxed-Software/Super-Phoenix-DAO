'use client';
import { useState } from 'react';
import useUmi from './wallet/useUmi';
import { MINTING_PAYMENT_METHOD, mintWithSol, mintWithToken } from '../models/candyMachine';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipProvider } from '@/components/ui/tooltip';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import Link from 'next/link';

const EXPLORER_LINK = process.env.NEXT_PUBLIC_SOLANA_EXPLORER_LINK;

export default function MintButton() {
  const { wallet, umi } = useUmi();
  const { toast } = useToast();

  const [isMinting, setIsMinting] = useState(false);

  const handleMinting = async (paymentMethod: keyof typeof MINTING_PAYMENT_METHOD) => {
    setIsMinting(true);
    toast({
      title: 'Minting your NFT...',
      description: 'Please confirm the transactino and then wait for your NFT to get mintted',
      duration: 60000,
    });

    let promise: Promise<string>;
    if (paymentMethod === 'TOKEN') {
      promise = mintWithToken(umi);
    } else {
      promise = mintWithSol(umi);
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
      toast({
        title: 'Something went wrong while minting',
        description: err.message,
        variant: 'destructive',
      });
    }

    setIsMinting(false);
  };

  return (
    <TooltipProvider>
      <div className="flex space-x-2">
        <Tooltip isDisabled={wallet.connected} content="Please connect your wallet">
          <Button
            isLoading={isMinting}
            disabled={!wallet.connected || isMinting}
            onClick={() => handleMinting('SOL')}
            variant="gold"
            className="appearance-none rounded-md border border-neutral-500 p-3 font-medium leading-tight text-neutral-300"
          >
            Mint with SOL
          </Button>
        </Tooltip>
        <Tooltip isDisabled={wallet.connected} content="Please connect your wallet">
          <Button
            isLoading={isMinting}
            disabled={!wallet.connected || isMinting}
            onClick={() => handleMinting('TOKEN')}
            variant="gold"
            className="appearance-none rounded-md border border-neutral-500 p-3 font-medium leading-tight text-neutral-300"
          >
            Mint with Start Atlas Tokens
          </Button>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
