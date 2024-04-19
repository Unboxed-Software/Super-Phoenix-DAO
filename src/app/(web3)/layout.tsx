import Navbar from '../components/Navbar';
import Providers from '../components/Providers';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <Navbar isWithConnectWalletButton />
      <div>{children}</div>
    </Providers>
  );
}
