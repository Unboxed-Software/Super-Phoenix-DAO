'use client';

import { SiteImage } from '@/app/models/images';
import SVGIcon from '../SVGIcon';
import { useFormState } from 'react-dom';
import { addEmailToMailingList } from '@/app/(routes)/landing/actions';

export default function JoinMailingListForm() {
  const [state, formAction] = useFormState(addEmailToMailingList, { message: '' });

  return (
    <div className="mx-6 mb-20 flex flex-col rounded-2xl border border-neutral-500 bg-gray-750 p-10 md:w-2/4 lg:w-1/3">
      <h1 className="mb-2 text-center text-5xl text-white">PREPARE</h1>
      <h1 className="mb-2 text-center text-5xl text-white">FOR ARIVAL</h1>
      <p className="mb-6 text-sm text-neutral-400">
        This is where we drop a bunch of copy to talk about whatever is in this content section.
      </p>

      <form action={formAction}>
        <input
          placeholder="name@example.com"
          className="mb-2 w-full appearance-none rounded-xl border border-neutral-500 bg-gray-850 p-4 leading-tight text-neutral-300"
          type="text"
          name="mail"
        />
        <button
          type="submit"
          className="mb-2 w-full appearance-none rounded-xl border border-neutral-500 bg-gray-850 p-4 leading-tight text-neutral-300 "
        >
          Join Mailing List
        </button>
      </form>

      <p className="my-2 text-neutral-300 ">{state.message}</p>

      <div className="flex justify-center">
        <SVGIcon iconPath={SiteImage.icon} alt="Logo" size="xxxl" />
      </div>
    </div>
  );
}
