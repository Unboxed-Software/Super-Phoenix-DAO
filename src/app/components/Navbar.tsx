'use client';
import { SiteLinks } from '@/app/models/links';
import React, { useState } from 'react';
import SVGIcon from './SVGIcon';
import { SiteImage } from '@/app/models/images';
import ConnectWalletButton from './wallet/ConnectWalletButton';
import { Tooltip, TooltipProvider } from '@/components/ui/tooltip';
import { faBars, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Navbar({ isWithConnectWalletButton = false }: { isWithConnectWalletButton?: boolean }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    alert('Coming Soon');
  };

  const renderDesktopMenu = () => {
    return (
      <div className="hidden items-center space-x-4 text-lg md:flex">
        <a href={SiteLinks.whitepaperV2} target="_blank" className="cursor-pointer text-gray-300 hover:text-gray-100">
          Whitepaper
        </a>
        <a href={SiteLinks.nfts} target="_blank" className="cursor-pointer text-gray-300 hover:text-gray-100">
          NFTs
        </a>
        <Tooltip content="Coming Soon">
          <a href="#" className="tooltip cursor-default text-gray-400">
            Roadmap
          </a>
        </Tooltip>
        <a href="/team" className="cursor-pointer text-gray-300 hover:text-gray-100">
          Team
        </a>
        <Tooltip content="Coming Soon">
          <a href="#" className="tooltip cursor-default text-gray-400">
            DAO
          </a>
        </Tooltip>
        <div className="ml-5" />
        <a href={SiteLinks.twitter} className="mx-2 inline-block">
          <SVGIcon iconPath={SiteImage.twitterIcon} alt="Twitter" size="md" />
        </a>
        <a href={SiteLinks.discord} className="mx-2 inline-block text-white">
          <SVGIcon iconPath={SiteImage.discordIcon} alt="Discord" size="md" />
        </a>
        {isWithConnectWalletButton && <ConnectWalletButton />}
      </div>
    );
  };

  const renderMobileMenuIcon = () => {
    return (
      <div className="fixed right-5 top-5 z-20 md:hidden">
        <button className="focus:outline-none" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} size="lg" className="me-2" style={{ color: '#D1D1D1' }} />
        </button>
      </div>
    );
  };

  const renderMobileMenu = () => {
    if (!isMenuOpen) return null;

    return (
      <div className="fixed left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-gray-850 md:hidden">
        <div className="rounded-lg bg-gray-850 px-6 py-4">
          <div className="fixed right-5 top-5">
            <div className="mb-4 flex items-center justify-between">
              <a href="#" className="text-2xl font-bold text-gray-800"></a>
              <button className="focus:outline-none" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faX} size="lg" className="me-2" style={{ color: '#D1D1D1' }} />
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <a
              href={SiteLinks.whitepaperV2}
              target="_blank"
              className="cursor-pointer text-gray-300 active:text-gray-100"
            >
              Whitepaper
            </a>
            <a href={SiteLinks.nfts} target="_blank" className="cursor-pointer text-gray-300 active:text-gray-100">
              NFT
            </a>
            <a href="#" className="text-gray-500" onClick={handleLinkClick}>
              Roadmap
            </a>
            <a href="/team" className="cursor-pointer text-gray-300 active:text-gray-100">
              Team
            </a>
            <a href="#" className="text-gray-500" onClick={handleLinkClick}>
              DAO
            </a>
            <div className="mt-5" />
            <a href={SiteLinks.twitter} className="mx-2 inline-block">
              <SVGIcon iconPath={SiteImage.twitterIcon} alt="Twitter" size="md" />
            </a>
            <a href={SiteLinks.discord} className="mx-2 inline-block text-white">
              <SVGIcon iconPath={SiteImage.discordIcon} alt="Discord" size="md" />
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <TooltipProvider>
      <header className="fixed top-0 z-10 w-full">
        <nav className="container mx-auto px-5 py-3 md:px-16">
          <div className="flex items-center justify-between">
            <a href="/" className="text-2xl font-bold text-gray-800">
              <SVGIcon iconPath={SiteImage.icon} alt="logo" size="xl" />
            </a>
            {renderDesktopMenu()}
            {renderMobileMenuIcon()}
          </div>
          {renderMobileMenu()}
        </nav>
      </header>
    </TooltipProvider>
  );
}

export default Navbar;
