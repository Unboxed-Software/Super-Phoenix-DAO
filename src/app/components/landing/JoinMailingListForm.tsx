'use client';

import { SiteImage } from '@/app/models/images';
import SVGIcon from '../SVGIcon';
import { useFormState } from 'react-dom';
import { addEmailToMailingList } from '@/app/(routes)/landing/actions';
import { useEffect, useState } from 'react';

export default function JoinMailingListForm() {
  const [state, formAction] = useFormState(addEmailToMailingList, { message: '' });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setNotLoading();
  }, [state]);

  const setLoading = () => {
    setIsLoading(true);
  };
  const setNotLoading = () => {
    setIsLoading(false);
  };

  const renderForm = () => {
    if (state.message) return null;

    return <div>
      <h1 className="mb-2 text-center text-5xl text-stone-200">PREPARE</h1>
      <h1 className="mb-2 text-center text-5xl text-stone-200">FOR ARIVAL</h1>
      <p className="mb-6 text-center text-sm text-neutral-400">
        Sign up to receive upcoming notifications from The Super Phoenix DAO
      </p>

      <form action={formAction} onSubmit={setLoading}>
        <input
          placeholder="name@example.com"
          className="mb-5 w-full appearance-none rounded-xl border border-neutral-500 bg-gray-850 p-4 leading-tight text-neutral-300"
          type="text"
          name="mail"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="mb-2 w-full appearance-none rounded-md border border-neutral-500 p-3 font-medium leading-tight text-neutral-300 hover:bg-gray-850 active:bg-gray-900"
        >
          {isLoading ? 'Transmitting...' : 'Join Mailing List'}
        </button>
      </form>
    </div>;
  };

  const renderSuccessMessage = () => {
    if (!state.message) return null;

    return <div>
      <h1 className="mb-2 text-center text-5xl text-stone-200">TRANSMISSION</h1>
      <h1 className="mb-2 text-center text-5xl text-stone-200">COMPLETE</h1>
      <p className="my-8 text-center text-neutral-300 ">{state.message}</p>

    </div>

  };

  return (
    <div className="mx-6 mb-20 flex flex-col rounded-2xl border border-neutral-500 bg-gray-750 p-10 md:w-2/4 lg:w-1/3">


      {renderForm()}
      {renderSuccessMessage()}

      <div className="flex justify-center">
        <SVGIcon iconPath={SiteImage.icon} alt="Logo" size="xxxl" />
      </div>
    </div>
  );
}
