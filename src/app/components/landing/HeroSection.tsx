import Image from 'next/image';

type Props = {
  header: string;
  description: string;
  imagePath: string;
  imageLocation: 'left' | 'right';
  imageAlt: string;
  size?: 'md' | 'lg';
};

export default function HeroSection({ header, description, imagePath, imageLocation, imageAlt, size = 'md' }: Props) {
  return (
    <div className="w-full px-6 lg:px-20">
      <div
        className={`flex w-full flex-col justify-evenly align-middle ${imageLocation === 'right' ? 'lg:flex-row-reverse lg:text-end' : 'lg:flex-row'}`}
      >
        <div className="w-100 relative  aspect-video lg:h-[300px] lg:w-[500px]">
          <Image src={imagePath} fill alt={imageAlt} />
        </div>
        <div className="mx-0 my-5 flex flex-col  justify-center lg:mx-10 lg:my-10">
          <h1 className={`mb-2 text-white ${size === 'md' ? 'text-2xl' : 'text-4xl'}`}>{header}</h1>
          <p className="text-base text-neutral-400">{description}</p>
        </div>
      </div>
    </div>
  );
}
