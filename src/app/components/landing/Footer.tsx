import { SiteLinks } from '@/app/models/links';
import SVGIcon from '../SVGIcon';

export default function Footer() {
  return (
    <nav className="flex w-full flex-wrap items-center justify-between p-6">
      <div className="block w-full flex-grow lg:flex lg:w-auto lg:items-center">
        <div className="mb-6 flex flex-row justify-evenly align-middle text-sm lg:flex-grow lg:justify-start">
          <a
            href="#responsive-header"
            className="mr-4 mt-4 block text-neutral-400 hover:text-white lg:mt-0 lg:inline-block"
          >
            Nav Item
          </a>
          <a
            href="#responsive-header"
            className="mr-4 mt-4 block text-neutral-400 hover:text-white lg:mt-0 lg:inline-block"
          >
            Nav Item
          </a>
          <a href="#responsive-header" className="mt-4 block text-neutral-400 hover:text-white lg:mt-0 lg:inline-block">
            Nav Item
          </a>
        </div>
        <div className="me-3 flex flex-row justify-center align-middle">
          <a href={SiteLinks.twitter} className="mx-2 inline-block">
            <SVGIcon iconPath="/assets/icons/twitter.svg" alt="Twitter" size="sm" />
          </a>
          {/* TODO: fix the social media links */}
          <a href={SiteLinks.twitter} className="mx-2 inline-block">
            <SVGIcon iconPath="/assets/icons/instagram.svg" alt="facebook" size="sm" />
          </a>
          <a href={SiteLinks.twitter} className="mx-2 inline-block">
            <SVGIcon iconPath="/assets/icons/facebook.svg" alt="facebook" size="sm" />
          </a>
        </div>
      </div>
    </nav>
  );
}
