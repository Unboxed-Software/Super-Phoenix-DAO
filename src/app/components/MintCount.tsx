function MintCount({ mintedCount }: { mintedCount: number }) {
  return (
    <p className="mx-3 mb-8 text-center font-semplicita text-xl font-light text-stone-200 md:text-2xl lg:w-3/4 ">
      {`${mintedCount + 516} /10301 Minted`}
    </p>
  );
}

export default MintCount;
