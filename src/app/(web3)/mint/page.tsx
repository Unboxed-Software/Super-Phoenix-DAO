import MintButtonsWrapper from '@/app/components/mintButtonsWrapper';
import MintCount from '@/app/components/MintCount';
import useUmi from '@/app/components/wallet/useUmi';
import { SiteImage } from '@/app/models/images';
import { SiteLinks as SiteLinks } from '@/app/models/links';
import { fetchCandyMachine } from '@metaplex-foundation/mpl-candy-machine';
import { publicKey } from '@metaplex-foundation/umi';
import Image from 'next/image';
import { useEffect, useState } from 'react';


export default async function MintPage() {
  return (
    <div className="flex flex-col items-center bg-gray-850">
      <div className="relative flex h-screen w-full items-center justify-center overflow-auto">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url("${SiteImage.mintPageBackground}")`,
          }}
        ></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-30"></div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col">
          {/* Top Half */}
          <div className=" mt-20 flex justify-center">
            <div className="relative flex h-44 w-80 flex-col items-center justify-end">
              <a href={SiteLinks.twitter}>
                <Image
                  src={SiteImage.logoFlatV3}
                  alt="Logo"
                  className="mb-3 aspect-auto h-52 cursor-pointer hover:animate-pulse md:h-72"
                  fill
                />
              </a>
            </div>
          </div>

          {/* Bottom Half */}
          <div className="flex flex-1 flex-col items-center justify-start">
            <div className="mt-10" />
            {/* <p className="text-md text-center font-semibold text-stone-200 md:text-sm ">PREPARE FOR ARRIVAL</p> */}
            <p className="mx-3 mb-5 mt-16 text-center font-semplicita text-4xl font-light text-stone-200 md:text-5xl lg:w-3/4 ">
              Mint CORE Data Cubes
            </p>
            <p className="mx-3 mb-16 text-center font-semplicita text-xl font-light text-stone-200 md:text-2xl lg:w-3/4 ">
              <MintCount />
            </p>
            <MintButtonsWrapper />
          </div>
        </div>
      </div>
    </div>
  );
}
