import { mavenPro, spaceMono } from '@/app/models/fonts';
import { SiteImage } from '@/app/models/images';
import { SiteLinks as SiteLinks } from '@/app/models/links';
import Image from 'next/image';
import FAQList from '@/app/components/landing/FAQList';
import HeroSection from '@/app/components/landing/HeroSection';
import Footer from '@/app/components/landing/Footer';
import JoinMailingListForm from '@/app/components/landing/JoinMailingListForm';
import ReleaseCountDown from '@/app/components/landing/ReleaseCountDown';

export default async function LandingPage() {
  return (
    <div className="flex flex-col items-center bg-gray-850">
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
            <p className="text-md text-center font-semibold text-stone-200 md:text-sm ">PREPARE FOR ARRIVAL</p>
            <p className="mb-16 mt-3 text-center font-semplicita text-4xl font-light text-stone-200 md:text-5xl lg:w-3/4 ">
              BUILDING A COMMUNITY AROUND THE LARGEST WEB3 ASSET IN THE WORLD
            </p>
            <ReleaseCountDown />
          </div>
        </div>
      </div>
      <div className="container mb-20">
        <HeroSection
          header="FIMBUL ECOS SUPERPHOENIX TITAN STARSHIP"
          description="The Superphoenix Titan ship is a groundbreaking digital asset within the Star Atlas Metaverse, offering a vast expanse of interior space to be transformed into a virtual paradise. This ship will feature an assortment of meticulously designed amenities that will provide a virtual social experience unlike any other. The Super Phoenix DAO will establish an unparalleled entertainment and leisure hub, catering to users seeking a rich and engaging experience in the virtual world."
          imagePath="/assets/img1.jpg"
          imageLocation="left"
          imageAlt="FIMBUL ECOS SUPERPHOENIX TITAN STARSHIP"
          size="lg"
        />
      </div>
      <div className="container mb-10">
        <HeroSection
          header="THE SUPERPHOENIX"
          description="is an interstellar oasis that will push the bounds of space exploration within the Star Atlas Metaverse. Join the Super Phoenix DAO to ensure your place onboard as we build unique member experiences and explore Galia together as a community."
          imagePath="/assets/img2.jpg"
          imageLocation="right"
          imageAlt="THE SUPERPHOENIX"
        />
      </div>
      <div className="container mb-20">
        <HeroSection
          header="OUR MISSION"
          description="is to unify players across factions to create a community that brings guilds together to benefit from all the DAO has to offer. The Super Phoenix DAO will provide token holders with the ability to participate in the decision making and governance of the Superphoenix Titan Ship in a truly distributed and democratized way."
          imagePath="/assets/img3.jpg"
          imageLocation="left"
          imageAlt="OUR MISSION"
        />
      </div>

      <div className="container mb-72 flex justify-center align-middle">
        <Image src="https://fakeimg.pl/600x400" width={580} height={330} alt="Avatar of Jonathan Reinink" />
      </div>

      <FAQList />

      <JoinMailingListForm />

      <Footer />
    </div>
  );
}
