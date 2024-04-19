import type { Metadata } from 'next';
import { semplicita } from './models/fonts';
import './globals.css';
import Providers from './components/Providers';
import Navbar from './components/Navbar';

export const metadata: Metadata = {
  title: 'Super Phoenix DAO',
  description: 'PREPARE FOR ARRIVAL',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${semplicita.variable} scroll-smooth font-semplicita font-light`}>
      <body>{children}</body>
    </html>
  );
}
