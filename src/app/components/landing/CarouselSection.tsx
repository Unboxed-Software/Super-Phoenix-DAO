import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export default function CarouselSection() {
  return (
    <div className="px-6">
      <Carousel>
        <CarouselContent>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <div className="w-100 relative aspect-video">
              <Image src="/assets/artworks/img5.jpg" fill alt="Caruosel Image" style={{ objectFit: 'cover' }} />
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <div className="w-100 relative aspect-video">
              <Image src="/assets/artworks/img6.jpg" fill alt="Caruosel Image" style={{ objectFit: 'cover' }} />
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <div className="w-100 relative aspect-video">
              <Image src="/assets/artworks/img7.jpg" fill alt="Caruosel Image" style={{ objectFit: 'cover' }} />
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <div className="w-100 relative aspect-video">
              <Image src="/assets/artworks/img8.jpg" fill alt="Caruosel Image" style={{ objectFit: 'cover' }} />
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <div className="w-100 relative aspect-video">
              <Image src="/assets/artworks/img9.jpg" fill alt="Caruosel Image" style={{ objectFit: 'cover' }} />
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <div className="w-100 relative aspect-video">
              <Image src="/assets/artworks/img10.jpg" fill alt="Caruosel Image" style={{ objectFit: 'cover' }} />
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <div className="w-100 relative aspect-video">
              <Image src="/assets/artworks/img11.jpg" fill alt="Caruosel Image" style={{ objectFit: 'cover' }} />
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <div className="w-100 relative aspect-video">
              <Image src="/assets/artworks/img12.jpg" fill alt="Caruosel Image" style={{ objectFit: 'cover' }} />
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
