'use client';
import React from 'react';
import SVGIcon from './SVGIcon';
import { SiteImage } from '@/app/models/images';
import { TooltipProvider } from '@/components/ui/tooltip';
import dynamic from 'next/dynamic';

const ConnectWalletButton = dynamic(() => import('./wallet/ConnectWalletButton'), { ssr: false });

function Web3Navbar() {
  return (
    <TooltipProvider>
      <header className="fixed top-0 z-10 w-full">
        <nav className="container mx-auto px-5 py-3 md:px-16">
          <div className="flex items-center justify-between">
            <a href="/" className="text-2xl font-bold text-gray-800">
              <SVGIcon iconPath={SiteImage.icon} alt="logo" size="xl" />
            </a>
            <ConnectWalletButton />
          </div>
        </nav>
      </header>
    </TooltipProvider>
  );
}

export default Web3Navbar;
