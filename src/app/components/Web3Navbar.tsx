'use client';
import { SiteLinks } from '@/app/models/links';
import React, { useState } from 'react';
import SVGIcon from './SVGIcon';
import { SiteImage } from '@/app/models/images';
import ConnectWalletButton from './wallet/ConnectWalletButton';
import { Tooltip, TooltipProvider } from '@/components/ui/tooltip';
import { faBars, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
