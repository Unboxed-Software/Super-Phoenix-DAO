import Image from 'next/image';

type Props = {
  children: React.ReactNode;
  imagePath: string;
  imageLocation: 'left' | 'right';
  imageAlt: string;
};

export default function CardWithImage({ children, imagePath, imageLocation, imageAlt }: Props) {
  return (
    <div className="flex justify-center">
      <div
        className={`flex w-[230px] flex-col space-x-3 align-middle lg:w-full ${imageLocation === 'right' ? 'lg:flex-row-reverse lg:text-end' : 'lg:flex-row'}`}
      >
        <div className="w-100 relative aspect-square w-[230px] rounded-lg lg:h-[280px]">
          <Image src={imagePath} fill alt={imageAlt} className="rounded-lg" style={{ objectFit: 'cover' }} />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
