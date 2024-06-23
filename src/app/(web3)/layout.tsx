import Navbar from '../components/Navbar';
import Providers from '../components/Providers';
import { Toaster } from '@/components/ui/toaster';
import Web3Navbar from '../components/Web3Navbar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <Web3Navbar />
      <div>{children}</div>
      <Web3Navbar />
    </Providers>
  );
}
