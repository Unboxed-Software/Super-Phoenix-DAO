'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

const PARTNERS = [
  {
    imgSrc: '/assets/partnerships/BETH.jpg',
    name: 'bETH',
    website: 'https://x.com/bnBeth_solvax',
    type: 'Partner',
  },
  {
    name: '426FM Metaverse Radio',
    type: 'Partner',
    website: 'https://x.com/StarAtlasRadio',
    imgSrc: 'assets/partnerships/426FM-metaverse-radio.jpg',
  },
  {
    name: 'Heimdall Industries',
    type: 'Guild Partner',
    website: 'https://x.com/Heimdallatlas',
    imgSrc: '/assets/partnerships/heimdall-industries-guild.jpg',
  },
  { name: 'Aephia Industries', type: 'Guild Partner', website: '', imgSrc: '/assets/logo-placeholder.png' },
  {
    name: 'Rome',
    type: 'Guild Partner',
    website: 'https://x.com/romeguild',
    imgSrc: '/assets/partnerships/rome-guild.jpg',
  },
  {
    name: 'Tree',
    type: 'Guild Partner',
    website: 'https://x.com/Tree_guild',
    imgSrc: '/assets/partnerships/tree-guild.jpg',
  },
  {
    name: 'Bulk',
    type: 'Guild Partner',
    website: 'https://x.com/BULK_Guild',
    imgSrc: '/assets/partnerships/bulk-guild.jpg',
  },
  {
    name: 'Deep Profits',
    type: 'Guild Partner',
    website: 'https://x.com/Deep_Profits',
    imgSrc: '/assets/partnerships/deep-profits-guild.jpg',
  },
  { name: 'DARK', type: 'Guild Partner', website: '', imgSrc: '/assets/logo-placeholder.png' },
  {
    name: 'The Unseen',
    type: 'Guild Partner',
    website: 'https://x.com/TheUnseenGuild',
    imgSrc: '/assets/partnerships/the-unseen-guild.jpg',
  },
  { name: 'Shadow Loyal', type: 'Guild Partner', website: '', imgSrc: '/assets/logo-placeholder.png' },
  {
    name: 'COEXIST',
    type: 'Guild Partner',
    website: 'https://x.com/GuildCoexist',
    imgSrc: '/assets/partnerships/COEXIST-guild.jpg',
  },
  {
    name: 'Polaris Fuel',
    type: 'Guild Partner',
    website: 'https://x.com/Polaris_Fue',
    imgSrc: '/assets/partnerships/polaris-fuel-guild.jpg',
  },
  {
    name: 'Unboxed',
    type: 'Partner',
    website: 'https://x.com/unboxedsoftware',
    imgSrc: '/assets/partnerships/unboxed.png',
  },
  {
    name: 'The Bounty Bar',
    type: 'Partner',
    website: 'https://x.com/TheBountyBarSA',
    imgSrc: '/assets/partnerships/the-bounty-bar.jpg',
  },
  {
    name: 'Hologram News Network',
    type: 'Partner',
    website: 'https://x.com/Hologram_News',
    imgSrc: '/assets/partnerships/hologram-news-network.jpg',
  },
  {
    name: 'Dark Core Roasters',
    type: 'Partner',
    website: 'https://x.com/DarkCoreRoast',
    imgSrc: '/assets/partnerships/dark-core-roasters.jpg',
  },
  {
    name: 'PuriOnSolana',
    type: 'Partner',
    website: 'https://x.com/PuriOnSolana',
    imgSrc: '/assets/partnerships/puriOnSolana.jpg',
  },
  {
    name: 'Beyond The Horizon 2620',
    type: 'Partner',
    website: 'https://x.com/BTH2620',
    imgSrc: '/assets/partnerships/beyond-the-horizon-2620.jpg',
  },
  { name: 'Krigs', type: 'Partner', website: 'https://x.com/Krigsfonik', imgSrc: '/assets/logo-placeholder.png' },
];

export default function PartnersSection() {
  const [activePartner, setActivePartner] = useState(PARTNERS[0]);
  return (
    <div className="container mt-14 flex flex-col justify-center">
      <p className="mb-8 text-center font-normal text-stone-400">SUPER PHOENIX DAO PARTNERSHIPS</p>
      <div className="mb-5 flex flex-col justify-center p-3 align-middle md:mb-3 md:flex-row">
        <Avatar
          className="mb-3 h-[250px] w-[250px] self-center border-2 border-gold-500 md:mb-0"
          key={activePartner.name}
          rounded="lg"
        >
          <AvatarImage src={activePartner.imgSrc} />
          <AvatarFallback>
            {activePartner.name
              .split(' ')
              .map((s) => s[0])
              .join('')}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-center gap-4 p-4 align-middle font-normal text-stone-400">
          <p>{activePartner.type.toUpperCase()}</p>
          <h1 className="text-4xl text-white">{activePartner.name}</h1>
          <a
            href={activePartner.website}
            target="_blank"
            rel="noreferrer"
            className="flex w-fit justify-center rounded-3xl border border-stone-500 bg-gray-750 px-3 pb-1 pt-2 align-middle text-stone-200"
          >
            <FontAwesomeIcon icon={faUpRightFromSquare} size="lg" className="me-2" style={{ color: '#5E5E5E' }} />
            Visit Website
          </a>
        </div>
      </div>
      <div className="grid max-w-[90vw] auto-cols-max grid-flow-col grid-rows-1 gap-x-4 gap-y-6 overflow-x-scroll md:grid-rows-2">
        {PARTNERS.map((partner) => {
          const isActive = activePartner.name === partner.name;
          return (
            <Avatar
              onClick={() => setActivePartner(partner)}
              className={`h-[100px] w-[100px] ${isActive ? 'border-2 border-gold-500' : ''}`}
              key={partner.name}
              rounded="lg"
            >
              <AvatarImage src={partner.imgSrc} />
              <AvatarFallback>
                {partner.name
                  .split(' ')
                  .map((s) => s[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
          );
        })}
      </div>
    </div>
  );
}
