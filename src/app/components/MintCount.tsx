'use client';
import MintButtonsWrapper from '@/app/components/mintButtonsWrapper';
import useUmi from '@/app/components/wallet/useUmi';
import { SiteImage } from '@/app/models/images';
import { SiteLinks as SiteLinks } from '@/app/models/links';
import { fetchCandyMachine } from '@metaplex-foundation/mpl-candy-machine';
import { publicKey } from '@metaplex-foundation/umi';
import Image from 'next/image';
import { useEffect, useState } from 'react';

function MintCount() {
    const [mintedCount, setMintedCount] = useState(0);
    const umi = useUmi();
  
    useEffect(() => {
      updateMintedCount();
    }, []);
  
    const updateMintedCount = () => {
      const candyMachinePublicKey = publicKey(process.env.NEXT_PUBLIC_CM_ID as string);
      fetchCandyMachine(umi.umi, candyMachinePublicKey).then((candyMachine) => {
        let mintedCount: number = Number(candyMachine.itemsRedeemed);
        setMintedCount(mintedCount);
      });
    }
  

  return (
    <>
    {mintedCount + 516}/10301 Minted
    </>
  );
}

export default MintCount;
