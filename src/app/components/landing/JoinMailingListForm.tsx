import { SiteImage } from "@/app/models/images";
import SVGIcon from "@/app/components/SVGIcon";

export default async function JoinMailingListForm() {
  return (
    <div className="md:w-2/4 lg:w-1/3 mx-6 bg-gray-750 border border-neutral-500 rounded-2xl p-10 flex flex-col mb-20">
      <h1 className="text-white mb-2 text-5xl text-center">PREPARE</h1>
      <h1 className="text-white mb-2 text-5xl text-center">FOR ARIVAL</h1>
      <p className="mb-6 text-neutral-400 text-sm">
        This is where we drop a bunch of copy to talk about whatever is in this
        content section.
      </p>

      <input
        placeholder="name@example.com"
        className="mb-2 bg-gray-850 appearance-none border border-neutral-500 rounded-xl w-full p-4 text-neutral-300 leading-tight"
        type="text"
      />
      <button className="mb-2 bg-gray-850 appearance-none border border-neutral-500 rounded-xl w-full p-4 text-neutral-300 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
        Join Mailing List
      </button>

      <div className="flex justify-center">
        <SVGIcon iconPath={SiteImage.icon} alt="Logo" size="xxxl" />
      </div>
    </div>
  );
}
