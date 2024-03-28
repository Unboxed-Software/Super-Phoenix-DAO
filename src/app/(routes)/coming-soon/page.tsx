import { mavenPro, spaceMono } from '@/app/models/fonts';
import { SiteImage } from '@/app/models/images';
import { SiteLinks } from '@/app/models/links';

export default async function ComingSoonPage({ params: _params }: any) {
  return (
    <>
      <div className="relative flex h-screen w-full items-center justify-center overflow-auto">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url("${SiteImage.backgroundV2}")`,
          }}
        ></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-60"></div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col">
          {/* Top Half */}
          <div className="flex-1">
            <div className="flex h-full w-full flex-col items-center justify-end">
              {/* Logo */}
              <a href={SiteLinks.twitter}>
                <img
                  src={SiteImage.logoFlatV3}
                  alt="Logo"
                  className="mb-3 aspect-auto h-52 cursor-pointer hover:animate-pulse md:h-72"
                />
              </a>
            </div>
          </div>

          {/* Bottom Half */}
          <div className="flex flex-1 flex-col items-center justify-start">
            <div className="mt-10" />
            <p className={`text-center text-xs text-stone-200 md:text-sm ${spaceMono.className}`}>
              PREPARE FOR ARRIVAL
            </p>
            <p className={`mt-3 text-center text-4xl text-stone-200 md:text-5xl ${mavenPro.className}`}>
              COMING APRIL 2024
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
