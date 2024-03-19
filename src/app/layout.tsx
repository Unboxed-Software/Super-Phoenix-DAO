import type { Metadata } from "next";
import { spaceGrotesk } from "./models/fonts";
import "./globals.css";
 
export const metadata: Metadata = {
  title: "Super Phoenix DAO",
  description: "PREPARE FOR ARRIVAL",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={spaceGrotesk.className}>{children}</body>
    </html>
  );
}
