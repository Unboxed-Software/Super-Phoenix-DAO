'use client';
import useUmi from '@/app/components/wallet/useUmi';
import { fetchCandyMachine } from '@metaplex-foundation/mpl-candy-machine';
import { publicKey } from '@metaplex-foundation/umi';
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
      const mintedCount: number = Number(candyMachine.itemsRedeemed);
      setMintedCount(mintedCount);
    });
  };

  return <>{mintedCount + 516}/10301 Minted</>;
}

export default MintCount;
