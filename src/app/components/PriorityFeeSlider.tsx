interface PriorityFeeSliderProps {
  priorityFee: number;
  setPriorityFee: (priorityFee: number) => void;
}

function PriorityFeeSlider(props: PriorityFeeSliderProps) {
  const { priorityFee, setPriorityFee } = props;
  return (
    <div className="mx-3 mb-8 text-center font-semplicita text-lg font-light text-stone-200 md:text-xl lg:w-3/4">
      <p>{`Priority Fee: ${priorityFee.toLocaleString()} microlamports`}</p>
      <input
        type="range"
        min="5000"
        max="500000"
        step="5000"
        value={priorityFee}
        onChange={(e) => setPriorityFee(parseInt(e.target.value, 10))}
        className="slider mt-4 h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
      />
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          background-color: #998e52;
          border: 2px solid #0a0a12;
          border-radius: 50%;
          height: 20px;
          width: 20px;
          cursor: pointer;
          -webkit-appearance: none;
          appearance: none;
        }

        .slider::-moz-range-thumb {
          background-color: #998e52;
          border: 2px solid #0a0a12;
          border-radius: 50%;
          height: 20px;
          width: 20px;
          cursor: pointer;
        }

        .slider::-ms-thumb {
          background-color: #998e52;
          border: 2px solid #0a0a12;
          border-radius: 50%;
          height: 20px;
          width: 20px;
          cursor: pointer;
        }

        .slider {
          background-color: #1e1e1e;
        }
      `}</style>
    </div>
  );
}

export default PriorityFeeSlider;
