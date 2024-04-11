import { SiteLinks } from '@/app/models/links';

const Header = () => {
  return (
    <>
      <header className="fixed top-0 z-10 w-full">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <a href="#" className="text-2xl font-bold text-gray-800"></a>
            <div className="hidden items-center space-x-4 text-lg md:flex">
              <a href={SiteLinks.whitepaper} className=" hover:text-gray-400">
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
            </div>
            {/* TODO Mobile Menu */}
            <div className="flex items-center md:hidden">
              <button className="focus:outline-none">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
