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
    <div className="mt-10 w-full p-6 lg:p-20">
      <div
        className={`flex w-full flex-col justify-evenly align-middle ${imageLocation === 'right' ? 'lg:flex-row-reverse lg:text-end' : 'lg:flex-row'}`}
      >
        <Image src={imagePath} width={580} height={330} alt={imageAlt} />
        <div className="mx-0 my-5 flex flex-col  justify-center lg:mx-10 lg:my-10">
          <h1 className={`mb-2 text-white ${size === 'md' ? 'text-2xl' : 'text-4xl'}`}>{header}</h1>
          <p className="text-base text-neutral-400">{description}</p>
        </div>
      </div>
    </div>
  );
}
