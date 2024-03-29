import { useState } from 'react';
import SVGIcon from '../SVGIcon';

type FAQ = {
  q: string;
  ans: string;
};

export default function FAQItem({ q, ans }: FAQ) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button
      className="my-6 flex w-full flex-col rounded-2xl border border-neutral-500 bg-gray-750 p-6"
      onClick={() => setIsOpen((prevState) => !prevState)}
    >
      <div className="flex w-full justify-between">
        <p className="mb-0 text-xl font-medium text-stone-200">{q}</p>
        <SVGIcon iconPath="/assets/icons/plus.svg" alt="Expand" />
      </div>
      <div className="w-2/3">{isOpen && <p className="mt-2 text-start text-sm text-neutral-400">{ans}</p>}</div>
    </button>
  );
}
