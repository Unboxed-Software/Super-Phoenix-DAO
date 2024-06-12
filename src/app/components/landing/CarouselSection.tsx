import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const imgSrcs = [
  '/assets/artworks/img5.jpg',
  '/assets/artworks/img6.jpg',
  '/assets/artworks/img7.jpg',
  '/assets/artworks/img8.jpg',
  '/assets/artworks/img9.jpg',
  '/assets/artworks/img10.jpg',
  '/assets/artworks/img11.jpg',
  '/assets/artworks/img12.jpg',
];

export default function CarouselSection() {
  return (
    <div className="px-6">
      <Carousel>
        <CarouselContent>
          {imgSrcs.map((src, i) => (
            <CarouselItem key={i} className="basis-2/3 md:basis-1/2 lg:basis-1/3">
              <div className="relative aspect-video w-full">
                <Image
                  src={src}
                  sizes="(max-width: 768px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  fill
                  alt="Caruosel Image"
                  style={{ objectFit: 'cover' }}
                  quality={50}
                  priority={true}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
