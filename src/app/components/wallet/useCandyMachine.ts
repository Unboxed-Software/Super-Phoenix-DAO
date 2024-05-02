import { useEffect, useState } from 'react';
import useUmi from './useUmi';
import { CandyGuard, CandyMachine, fetchCandyGuard, fetchCandyMachine } from '@metaplex-foundation/mpl-candy-machine';
import { publicKey } from '@metaplex-foundation/umi';

const CM_ID = process.env.NEXT_PUBLIC_CM_ID!;

const useCandyMachine = () => {
  const { umi } = useUmi();

  const [candyMachine, setCandyMachine] = useState<CandyMachine>();
  const [candyGuard, setCandyGuard] = useState<CandyGuard>();

  useEffect(() => {
    (async () => {
      const CM = await fetchCandyMachine(umi, publicKey(CM_ID));
      const CMG = await fetchCandyGuard(umi, CM.mintAuthority);
      setCandyMachine(CM);
      setCandyGuard(CMG);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { candyMachine, candyGuard, isLoaded: !!candyMachine && !!candyGuard };
};

export default useCandyMachine;
