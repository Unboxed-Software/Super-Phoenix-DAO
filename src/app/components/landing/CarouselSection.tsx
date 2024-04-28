import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export default function CarouselSection() {
  return (
    <div className="px-6">
      <Carousel>
        <CarouselContent>
          <CarouselItem className="basis-1/3">
            <div className="w-100 relative aspect-video">
              <Image src="/assets/img5.jpg" fill alt="Caruosel Image" style={{ objectFit: 'cover' }} />
            </div>
          </CarouselItem>
          <CarouselItem className="basis-1/3">
            <div className="w-100 relative aspect-video">
              <Image src="/assets/img6.jpg" fill alt="Caruosel Image" style={{ objectFit: 'cover' }} />
            </div>
          </CarouselItem>
          <CarouselItem className="basis-1/3">
            <div className="w-100 relative aspect-video">
              <Image src="/assets/img7.jpg" fill alt="Caruosel Image" style={{ objectFit: 'cover' }} />
            </div>
          </CarouselItem>
          <CarouselItem className="basis-1/3">
            <div className="w-100 relative aspect-video">
              <Image src="/assets/img8.jpg" fill alt="Caruosel Image" style={{ objectFit: 'cover' }} />
            </div>
          </CarouselItem>
          <CarouselItem className="basis-1/3">
            <div className="w-100 relative aspect-video">
              <Image src="/assets/img9.jpg" fill alt="Caruosel Image" style={{ objectFit: 'cover' }} />
            </div>
          </CarouselItem>
          <CarouselItem className="basis-1/3">
            <div className="w-100 relative aspect-video">
              <Image src="/assets/img10.jpg" fill alt="Caruosel Image" style={{ objectFit: 'cover' }} />
            </div>
          </CarouselItem>
          <CarouselItem className="basis-1/3">
            <div className="w-100 relative aspect-video">
              <Image src="/assets/img11.jpg" fill alt="Caruosel Image" style={{ objectFit: 'cover' }} />
            </div>
          </CarouselItem>
          <CarouselItem className="basis-1/3">
            <div className="w-100 relative aspect-video">
              <Image src="/assets/img12.jpg" fill alt="Caruosel Image" style={{ objectFit: 'cover' }} />
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
