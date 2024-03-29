import { SiteImage } from '@/app/models/images';
import SVGIcon from '@/app/components/SVGIcon';

export default async function JoinMailingListForm() {
  return (
    <div className="mx-6 mb-20 flex flex-col rounded-2xl border border-neutral-500 bg-gray-750 p-10 md:w-2/4 lg:w-1/3">
      <h1 className="mb-2 text-center text-5xl text-white">PREPARE</h1>
      <h1 className="mb-2 text-center text-5xl text-white">FOR ARIVAL</h1>
      <p className="mb-6 text-sm text-neutral-400">
        This is where we drop a bunch of copy to talk about whatever is in this content section.
      </p>

      <input
        placeholder="name@example.com"
        className="mb-2 w-full appearance-none rounded-xl border border-neutral-500 bg-gray-850 p-4 leading-tight text-neutral-300"
        type="text"
      />
      <button className="mb-2 w-full appearance-none rounded-xl border border-neutral-500 bg-gray-850 p-4 leading-tight text-neutral-300 focus:border-purple-500 focus:bg-white focus:outline-none">
        Join Mailing List
      </button>

      <div className="flex justify-center">
        <SVGIcon iconPath={SiteImage.icon} alt="Logo" size="xxxl" />
      </div>
    </div>
  );
}
