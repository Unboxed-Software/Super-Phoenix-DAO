'use client';
import { SiteLinks } from '@/app/models/links';
import { useState } from 'react';
import SVGIcon from '../SVGIcon';
import { SiteImage } from '@/app/models/images';
import ConnectWalletButton from '../wallet/ConnectWalletButton';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    alert('Coming Soon');
  };

  const renderSpacer = () => {
    return <a href="#" className="text-2xl font-bold text-gray-800"></a>;
  };

  const renderDesktopMenu = () => {
    return (
      <div className="hidden items-center space-x-4 text-lg md:flex">
        <a href={SiteLinks.whitepaperV2} className=" hover:text-gray-400">
          Whitepaper
        </a>

        <a href="#" className="tooltip cursor-default text-gray-400">
          NFT
          <span className="tooltiptext">Coming Soon</span>
        </a>
        <a href="#" className="tooltip cursor-default text-gray-400">
          Roadmap
          <span className="tooltiptext">Coming Soon</span>
        </a>
        <a href="#" className="tooltip cursor-default text-gray-400">
          Team
          <span className="tooltiptext">Coming Soon</span>
        </a>
        <a href="#" className="tooltip cursor-default text-gray-400">
          DAO
          <span className="tooltiptext">Coming Soon</span>
        </a>
        <div className="ml-5" />
        <a href={SiteLinks.twitter} className="mx-2 inline-block">
          <SVGIcon iconPath={SiteImage.twitterIcon} alt="Twitter" size="md" />
        </a>
        <a href={SiteLinks.discord} className="mx-2 inline-block text-white">
          <SVGIcon iconPath={SiteImage.discordIcon} alt="Discord" size="md" />
        </a>
        <ConnectWalletButton />
      </div>
    );
  };

  const renderCrossIcon = () => {
    return (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    );
  };

  const renderHamburgerMenuIcon = () => {
    return (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    );
  };

  const renderMobileMenuIcon = () => {
    return (
      <div className="fixed right-5 top-5 z-20 md:hidden">
        <button className="focus:outline-none" onClick={toggleMenu}>
          {renderHamburgerMenuIcon()}
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
                {renderCrossIcon()}
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <a href={SiteLinks.whitepaperV2} className="hover:text-gray-400">
              Whitepaper
            </a>
            <a href="#" className="text-gray-400" onClick={handleLinkClick}>
              NFT
            </a>
            <a href="#" className="text-gray-400" onClick={handleLinkClick}>
              Roadmap
            </a>
            <a href="#" className="text-gray-400" onClick={handleLinkClick}>
              Team
            </a>
            <a href="#" className="text-gray-400" onClick={handleLinkClick}>
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
    <>
      <header className="fixed top-0 z-10 w-full">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            {renderSpacer()}
            {renderDesktopMenu()}
            {renderMobileMenuIcon()}
          </div>
          {renderMobileMenu()}
        </nav>
      </header>
    </>
  );
}

export default Navbar;
