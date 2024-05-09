import { SiteImage } from '@/app/models/images';
import { SiteLinks as SiteLinks } from '@/app/models/links';
import ImageWithOverlay from '@/app/components/ImageWithOverlay';
import SVGIcon from '@/app/components/SVGIcon';
import CardWithImage from '@/app/components/CardWithImage';
import PartnersSection from '@/app/components/PartnersSection';

const TEAM_MEMBERS = [
  {
    name: 'Craig Mahoney',
    role: 'Title/Role',
    imgSrc: '/assets/team/craig.png',
    socialLinks: [
      { icon: SiteImage.twitterIcon, link: SiteLinks.twitter, name: 'Twitter' },
      { icon: SiteImage.facebookIcon, link: SiteLinks.twitter, name: 'Fcaebook' },
      { icon: SiteImage.instagramIcon, link: SiteLinks.twitter, name: 'Instagram' },
    ],
    description:
      'Craig (Njord) is an accomplished executive with over 15 yrs experience in commercial finance, managing teams responsible for portfolio assets in excess of 10 billion. He has been focused on the intersections between technologies such as AI, Blockchain, Data Science, IoT, and Crypto combined with traditional finance to help push the boundaries of what is possible.',
  },
  {
    name: 'Arktype',
    role: 'Title/Role',
    imgSrc: '/assets/team/arktype.png',
    socialLinks: [
      { icon: SiteImage.twitterIcon, link: SiteLinks.twitter, name: 'Twitter' },
      { icon: SiteImage.facebookIcon, link: SiteLinks.twitter, name: 'Fcaebook' },
      { icon: SiteImage.instagramIcon, link: SiteLinks.twitter, name: 'Instagram' },
    ],
    description:
      'Arktype is a versatile artist, illustrator, and graphic designer specializing in branding and identity. Proficient in animation, motion graphics, video editing, and 3D design, Arktype is driven by a passion for using creative skills to support those in need.',
  },
  {
    name: 'James Pacheco',
    role: 'Title/Role',
    imgSrc: '/assets/team/arktype.png',
    socialLinks: [
      { icon: SiteImage.twitterIcon, link: SiteLinks.twitter, name: 'Twitter' },
      { icon: SiteImage.facebookIcon, link: SiteLinks.twitter, name: 'Fcaebook' },
      { icon: SiteImage.instagramIcon, link: SiteLinks.twitter, name: 'Instagram' },
    ],
    description:
      'This is a short bio about this team member, their experience, and how they are contributing to the product.',
  },
  {
    name: 'Christian Krueger',
    role: 'Title/Role',
    imgSrc: '/assets/team/arktype.png',
    socialLinks: [
      { icon: SiteImage.twitterIcon, link: SiteLinks.twitter, name: 'Twitter' },
      { icon: SiteImage.facebookIcon, link: SiteLinks.twitter, name: 'Fcaebook' },
      { icon: SiteImage.instagramIcon, link: SiteLinks.twitter, name: 'Instagram' },
    ],
    description:
      'This is a short bio about this team member, their experience, and how they are contributing to the product.',
  },
  {
    name: 'Cody Porter',
    role: 'Title/Role',
    imgSrc: '/assets/team/arktype.png',
    socialLinks: [
      { icon: SiteImage.twitterIcon, link: SiteLinks.twitter, name: 'Twitter' },
      { icon: SiteImage.facebookIcon, link: SiteLinks.twitter, name: 'Fcaebook' },
      { icon: SiteImage.instagramIcon, link: SiteLinks.twitter, name: 'Instagram' },
    ],
    description:
      'This is a short bio about this team member, their experience, and how they are contributing to the product.',
  },
  {
    name: 'Mohammed',
    role: 'Title/Role',
    imgSrc: '/assets/team/arktype.png',
    socialLinks: [
      { icon: SiteImage.twitterIcon, link: SiteLinks.twitter, name: 'Twitter' },
      { icon: SiteImage.facebookIcon, link: SiteLinks.twitter, name: 'Fcaebook' },
      { icon: SiteImage.instagramIcon, link: SiteLinks.twitter, name: 'Instagram' },
    ],
    description:
      'This is a short bio about this team member, their experience, and how they are contributing to the product.',
  },
];

export default async function LandingPage() {
  const teamMembersWithBigImages = TEAM_MEMBERS.slice(0, 2);
  const teamMembersWithSmallImages = TEAM_MEMBERS.slice(2);

  return (
    <div className="container flex h-full flex-col items-center bg-gray-850 pb-10">
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
      <p className="mb-14 mt-48 font-normal tracking-widest text-neutral-400">MEET THE TEAM</p>
      <div className="flex flex-col justify-center align-middle md:flex-row md:space-x-16">
        {teamMembersWithBigImages.map((teamMember) => (
          <div key={teamMember.name} className="mb-8">
            <ImageWithOverlay src={teamMember.imgSrc} alt={teamMember.name} className="h-96">
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
                    <a key={socialLink.name} href={socialLink.link} className="mx-2 inline-block">
                      <SVGIcon iconPath={socialLink.icon} alt={socialLink.name} size="sm" />
                    </a>
                  ))}
                </div>
              </div>
            </ImageWithOverlay>
          </div>
        ))}
      </div>
      <div className="container mt-10 grid w-full grid-cols-1 place-content-center gap-20 md:grid-cols-2 md:place-content-between">
        {teamMembersWithSmallImages.map((teamMember) => (
          <CardWithImage
            key={teamMember.name}
            imagePath="/assets/team/arktype.png"
            imageLocation="left"
            imageAlt="THE SUPERPHOENIX"
          >
            <div className="mt-4 flex h-full flex-col justify-evenly space-y-2 align-middle text-stone-200 lg:mx-5 lg:mt-0">
              <div className="flex flex-col space-y-2">
                <h1 className="text-3xl text-white">{teamMember.name}</h1>
                <p className="text-xs">{teamMember.role}</p>
                <p className="text-xs">{teamMember.description}</p>
              </div>
              <div>
                {teamMember.socialLinks.map((socialLink) => (
                  <a key={socialLink.name} href={socialLink.link} className="mx-2 inline-block">
                    <SVGIcon iconPath={socialLink.icon} alt={socialLink.name} size="sm" />
                  </a>
                ))}
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
