import Navbar from '../components/Navbar';
import Providers from '../components/Providers';
import { Toaster } from '@/components/ui/toaster';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <Navbar isWithConnectWalletButton />
      <div>{children}</div>
      <Toaster />
    </Providers>
  );
}
