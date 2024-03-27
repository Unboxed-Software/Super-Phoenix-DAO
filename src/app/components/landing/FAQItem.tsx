import { useState } from "react";
import SVGIcon from "../SVGIcon";

type FAQ = {
  q: string;
  ans: string;
};

export default function FAQItem({ q, ans }: FAQ) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button
      className="w-full bg-gray-750 border border-neutral-500 rounded-2xl p-6 flex flex-col my-6"
      onClick={() => setIsOpen((prevState) => !prevState)}
    >
      <div className="w-full flex justify-between">
        <p className="text-white font-bold text-xl mb-0">{q}</p>
        <SVGIcon iconPath="/assets/icons/plus.svg" alt="Expand" />
      </div>
      <div className="w-2/3">
        {isOpen && (
          <p className="text-neutral-400 text-sm mt-2 text-start">{ans}</p>
        )}
      </div>
    </button>
  );
}
