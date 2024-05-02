'use client';
import useUmi from './wallet/useUmi';
import useCandyMachine from './wallet/useCandyMachine';
import MintButtons from './mintButtons';
import { Skeleton } from '@/components/ui/skeleton';

export default function MintButtonsWrapper() {
  const { wallet, umi } = useUmi();
  const { isLoaded, candyGuard } = useCandyMachine();

  return isLoaded ? (
    <MintButtons wallet={wallet} umi={umi} candyGuard={candyGuard!} />
  ) : (
    <div className="flex space-x-2">
      <Skeleton className="h-[40px] w-[100px] rounded-xl" />
      <Skeleton className="h-[40px] w-[100px] rounded-xl" />
    </div>
  );
}
