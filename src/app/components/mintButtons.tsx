'use client';
import { Button, Tooltip, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import useUmi from './wallet/useUmi';
import { MINTING_PAYMENT_METHOD, mintWithSol, mintWithToken } from '../models/candyMachine';

export default function MintButtons() {
  const { wallet, umi } = useUmi();
  const toast = useToast();

  const [isMinting, setIsMinting] = useState(false);

  const handleMinting = async (paymentMethod: keyof typeof MINTING_PAYMENT_METHOD) => {
    setIsMinting(true);
    let promise: Promise<string>;
    try {
      if (paymentMethod === 'TOKEN') {
        promise = mintWithToken(umi);
      } else {
        promise = mintWithSol(umi);
      }
      toast.promise(promise, {
        loading: {
          position: 'top',
          title: 'Minting your NFT',
          description: 'Please confirm the transactino and then wait for your NFT to get created',
        },
        success: (sig) => ({
          position: 'top',
          title: 'Minted successfully',
          description: `Transaction signature: ${sig}`,
        }),
        error: (err) => ({
          position: 'top',
          title: 'Something went wrong while minting',
          description: err.message,
        }),
      });
      await promise;
    } catch (err: any) {
      console.error(err);
    }
    setIsMinting(false);
  };

  return (
    <>
      <Button
        isDisabled={!wallet.connected}
        isLoading={isMinting}
        onClick={() => handleMinting('SOL')}
        colorScheme="gold"
        className="mt-8 appearance-none rounded-md border border-neutral-500 bg-gold-500 px-7 py-2 font-medium leading-tight text-neutral-300 hover:bg-gold-800 active:bg-gold-800"
      >
        <Tooltip isDisabled={wallet.connected} label="Please connect your wallet" aria-label="A tooltip">
          Mint with SOL
        </Tooltip>
      </Button>
      <Button
        isDisabled={!wallet.connected}
        isLoading={isMinting}
        onClick={() => handleMinting('TOKEN')}
        colorScheme="gold"
        className="mt-8 appearance-none rounded-md border border-neutral-500 bg-gold-500 px-7 py-2 font-medium leading-tight text-neutral-300 hover:bg-gold-800 active:bg-gold-800"
      >
        <Tooltip isDisabled={wallet.connected} label="Please connect your wallet" aria-label="A tooltip">
          Mint with Start Atlas Tokens
        </Tooltip>
      </Button>
    </>
  );
}
