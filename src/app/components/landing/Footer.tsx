import { SiteLinks } from "@/app/models/links";
import SVGIcon from "../SVGIcon";

export default function Footer() {
  return (
    <nav className="w-full flex items-center justify-between flex-wrap p-6">
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow flex flex-row align-middle lg:justify-start justify-evenly mb-6">
          <a
            href="#responsive-header"
            className="block mt-4 lg:inline-block lg:mt-0 text-neutral-400 hover:text-white mr-4"
          >
            Nav Item
          </a>
          <a
            href="#responsive-header"
            className="block mt-4 lg:inline-block lg:mt-0 text-neutral-400 hover:text-white mr-4"
          >
            Nav Item
          </a>
          <a
            href="#responsive-header"
            className="block mt-4 lg:inline-block lg:mt-0 text-neutral-400 hover:text-white"
          >
            Nav Item
          </a>
        </div>
        <div className="me-3 flex flex-row align-middle justify-center">
          <a href={SiteLinks.twitter} className="inline-block mx-2">
            <SVGIcon
              iconPath="/assets/icons/twitter.svg"
              alt="Twitter"
              size="sm"
            />
          </a>
          {/* TODO: fix the social media links */}
          <a href={SiteLinks.twitter} className="inline-block mx-2">
            <SVGIcon
              iconPath="/assets/icons/instagram.svg"
              alt="facebook"
              size="sm"
            />
          </a>
          <a href={SiteLinks.twitter} className="inline-block mx-2">
            <SVGIcon
              iconPath="/assets/icons/facebook.svg"
              alt="facebook"
              size="sm"
            />
          </a>
        </div>
      </div>
    </nav>
  );
}
