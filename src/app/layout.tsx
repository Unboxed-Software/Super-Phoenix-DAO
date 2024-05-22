import type { Metadata } from 'next';
import { semplicita } from './models/fonts';
import './globals.css';
import GoogleAnalytics from './components/GoogleAnalytics';

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
      <GoogleAnalytics />
      <body className="h-full bg-gray-850">{children}</body>
    </html>
  );
}
