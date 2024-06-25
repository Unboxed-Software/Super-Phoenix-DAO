interface PriorityFeeSliderProps {
  priorityFee: number;
  setPriorityFee: (priorityFee: number) => void;
}

function PriorityFeeSlider(props: PriorityFeeSliderProps) {
  const { priorityFee, setPriorityFee } = props;
  return (
    <div className="w mx-3 mb-8 text-center font-semplicita text-lg font-light text-stone-200 md:text-xl lg:w-3/4">
      <p>{`Priority Fee: ${priorityFee.toLocaleString()} microlamports`}</p>
      <input
        type="range"
        min="5000"
        max="500000"
        step="5000"
        value={priorityFee}
        onChange={(e) => setPriorityFee(parseInt(e.target.value, 10))}
        className="mt-4 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 slider"
      />
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          background-color: #998E52;
          border: 2px solid #0A0A12;
          border-radius: 50%;
          height: 20px;
          width: 20px;
          cursor: pointer;
          -webkit-appearance: none;
          appearance: none;
        }

        .slider::-moz-range-thumb {
          background-color: #998E52;
          border: 2px solid #0A0A12;
          border-radius: 50%;
          height: 20px;
          width: 20px;
          cursor: pointer;
        }

        .slider::-ms-thumb {
          background-color: #998E52;
          border: 2px solid #0A0A12;
          border-radius: 50%;
          height: 20px;
          width: 20px;
          cursor: pointer;
        }

        .slider {
          background-color: #1E1E1E;
        }
      `}</style>
    </div>
  );
}

export default PriorityFeeSlider;