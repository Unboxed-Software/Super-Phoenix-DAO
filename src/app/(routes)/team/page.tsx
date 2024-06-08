import { SiteImage } from '@/app/models/images';
import ImageWithOverlay from '@/app/components/ImageWithOverlay';
import SVGIcon from '@/app/components/SVGIcon';
import CardWithImage from '@/app/components/CardWithImage';
import PartnersSection from '@/app/components/PartnersSection';

const TEAM_MEMBERS = [
  {
    name: 'Craig Mahoney',
    role: 'Founder',
    imgSrc: '/assets/team/craig.png',
    socialLinks: [{ icon: SiteImage.twitterIcon, link: 'https://x.com/Njord614', name: 'Twitter' }],
    description:
      'Craig (Njord) is an accomplished executive with over 15 yrs experience in commercial finance, managing teams responsible for portfolio assets in excess of 10 billion. He has been focused on the intersections between technologies such as AI, Blockchain, Data Science, IoT, and Crypto combined with traditional finance to help push the boundaries of what is possible.',
  },
  {
    name: 'Arktype',
    role: 'Lead Artist',
    imgSrc: '/assets/team/arktype.png',
    socialLinks: [{ icon: SiteImage.twitterIcon, link: 'https://x.com/Arktype_', name: 'Twitter' }],
    description:
      'Arktype is a versatile artist, illustrator, and graphic designer specializing in branding and identity. Proficient in animation, motion graphics, video editing, and 3D design, Arktype is driven by a passion for using creative skills to support those in need.',
  },
  {
    name: 'James Pacheco',
    role: 'Software Engineer',
    imgSrc: '/assets/team/james.png',
    socialLinks: [{ icon: SiteImage.twitterIcon, link: 'https://x.com/jamesrp13', name: 'Twitter' }],
    description:
      'James is an accomplished Software engineer who has overseen the creation of most formal educational content on Solana',
  },
  {
    name: 'Christian Krueger',
    role: 'Software Engineer',
    imgSrc: '/assets/team/chris.png',
    socialLinks: [{ icon: SiteImage.twitterIcon, link: 'https://x.com/CoachChuckFF', name: 'Twitter' }],
    description:
      'Christian is a seasoned Solana engineer, with 3 years of building Solana programs and applications. His passion is storytelling with code',
  },
  {
    name: 'Mohammed',
    role: 'Software Engineer',
    imgSrc: '/assets/team/mohammed.png',
    socialLinks: [{ icon: SiteImage.twitterIcon, link: 'https://x.com/Mohammed_allabd', name: 'Twitter' }],
    description:
      'Mohammed is a software engineer with over four years of experience, known for his keen attention to detail and dedication to excellence.',
  },
];

export default async function LandingPage() {
  // Removing big images
  // const teamMembersWithBigImages = TEAM_MEMBERS.slice(0, 2);
  // const teamMembersWithSmallImages = TEAM_MEMBERS.slice(2);
  const teamMembersWithSmallImages = TEAM_MEMBERS;

  return (
    <div className="container mt-10 flex h-full flex-col items-center bg-gray-850 pb-10">
      <div className="mx-3 md:mx-10">
        <p className="mb-3 mt-14 self-start font-normal tracking-widest text-neutral-400 md:mt-36">MISSION STATMENT</p>
        <div className="flex flex-col justify-center align-middle md:flex-row md:space-x-5">
          <div className="mb-3 flex flex-col justify-center align-middle">
            <h2 className="mb-3 text-4xl text-white">
              The Super Phoenix DAO aims to foster a vibrant community within the Star Atlas Metaverse.
            </h2>
            <p className="text-lg text-neutral-400">
              The Fimbul ECOS Superphoenix Titan ship will serve as the foundation for creating a thriving and immersive
              virtual entertainment experience, housing an array of luxurious amenities, entertainment venues, and
              recreational facilities to be owned by the Super Phoenix DAO community.
            </p>
          </div>
          <div className="flex flex-col justify-center align-middle">
            <p className="mb-3 text-lg text-neutral-400">
              The DAO will establish an unparalleled entertainment and leisure hub, catering to users seeking a rich and
              engaging experience in the virtual realm, while providing a structure for future revenue sources to the
              DAO and its owners.
            </p>
            <p className="text-lg text-neutral-400">
              The Super Phoenix DAO launch represents a unique opportunity to establish a thriving community that
              redefines virtual ownership and experiences within the Star Atlas Metaverse
            </p>
          </div>
        </div>
      </div>
      <p className="mb-14 mt-32 font-normal tracking-widest text-neutral-400 text-2xl">MEET THE TEAM</p>
      {/* <div className="flex flex-col justify-center align-middle md:flex-row md:space-x-16">
        {teamMembersWithBigImages.map((teamMember) => (
          <div key={teamMember.name} className="mb-8">
            <ImageWithOverlay src={teamMember.imgSrc} alt={teamMember.name} className="aspect-[3/4] w-72 rounded-xl">
              <div className="mx-3 flex h-full flex-col justify-between space-y-2 align-middle text-stone-200">
                <div>
                  <SVGIcon iconPath={SiteImage.icon} alt="logo" size="xl" />
                </div>
                <div className="flex flex-grow flex-col space-y-2">
                  <h1 className="text-3xl text-white">{teamMember.name}</h1>
                  <p className="text-xs">{teamMember.role}</p>
                  <p className="text-xs">{teamMember.description}</p>
                </div>
                <div>
                  {teamMember.socialLinks.map((socialLink) => (
                    <a key={socialLink.name} target="_blank" href={socialLink.link} className="mx-2 inline-block">
                      <SVGIcon iconPath={socialLink.icon} alt={socialLink.name} size="sm" />
                    </a>
                  ))}
                </div>
              </div>
            </ImageWithOverlay>
          </div>
        ))}
      </div> */}
      <div className="container grid w-full grid-cols-1 place-content-center gap-20 md:grid-cols-2 md:place-content-between">
        {teamMembersWithSmallImages.map((teamMember) => (
          <CardWithImage
            key={teamMember.name}
            imagePath={teamMember.imgSrc}
            imageLocation="left"
            imageAlt="THE SUPERPHOENIX"
          >
            <div className="mt-4 flex h-full flex-col justify-evenly space-y-2 align-middle text-stone-200 lg:mx-5 lg:mt-0">
              <div className="flex flex-col space-y-2">
                <h1 className="text-3xl text-white">{teamMember.name}</h1>
                <p className="text-xs">{teamMember.role}</p>
                {teamMember.description && <p className="text-xs">{teamMember.description}</p>}
                <div>
                  {teamMember.socialLinks.map((socialLink) => (
                    <a key={socialLink.name} target="_blank" href={socialLink.link} className="me-2 inline-block">
                      <SVGIcon iconPath={socialLink.icon} alt={socialLink.name} size="sm" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </CardWithImage>
        ))}
      </div>
      <div className="mt-10">
        <PartnersSection />
      </div>
    </div>
  );
}
