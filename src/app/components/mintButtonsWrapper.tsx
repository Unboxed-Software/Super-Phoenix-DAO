'use client';
import useUmi from './wallet/useUmi';
import useCandyMachine from './wallet/useCandyMachine';
import MintButtons from './mintButtons';

export default function MintButtonsWrapper() {
  const { wallet, umi } = useUmi();
  const { isLoaded, candyGuard } = useCandyMachine();

  return isLoaded ? (
    <MintButtons wallet={wallet} umi={umi} candyGuard={candyGuard!} />
  ) : (
    <div className="flex flex-col space-y-2"></div>
  );
}
