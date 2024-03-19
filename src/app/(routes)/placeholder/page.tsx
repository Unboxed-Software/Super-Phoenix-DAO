import { spaceGrotesk, spaceMono } from "@/app/models/fonts";
import { SiteImage } from "@/app/models/images";

export default async function PlaceholderPage({ params }: any) {
  return (
    <>
      <div className="relative w-full h-screen overflow-auto flex justify-center items-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url("${SiteImage.background}")`,
          }}
        ></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-60"></div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col">
          {/* Top Half */}
          <div className="flex-1">
            <div className="w-full h-full flex-col flex justify-end items-center">
              {/* Logo */}           
              <a href="https://twitter.com/CoachChuckFF">
              <img
                src={SiteImage.logoFlat}
                alt="Logo"
                className="mb-3 h-52 md:h-72 aspect-auto hover:animate-pulse cursor-pointer"
              />
              </a> 

            </div>
          </div>

          {/* Bottom Half */}
          <div className="flex-1 flex-col flex justify-start items-center">
            <div className="mt-5" />
            <p className={`text-xs md:text-sm text-center text-stone-200 ${spaceMono.className}`}>
              PREPARE FOR ARRIVAL
            </p>            
            <p className={`mt-3 text-4xl md:text-5xl text-center text-stone-200 ${spaceGrotesk.className}`}>
              COMING APRIL 2024
            </p>
          </div>
        </div>
      </div>
    </>
  );
}