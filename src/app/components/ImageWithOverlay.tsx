import React from 'react';

type Props = {
  src: string;
  children: React.ReactNode;
  alt: string;
  className?: string;
};

const ImageWithOverlay = ({ src, children, className, alt }: Props) => {
  return (
    <div className="group relative overflow-hidden">
      <img src={src} alt={alt} className={`block w-full ${className || 'h-auto'}`} />
      <div className="absolute inset-0 h-full rounded-lg border border-gold-500 bg-gray-750 bg-opacity-95 opacity-0 transition-opacity group-hover:opacity-100">
        <div className="absolute inset-0 flex h-full items-center justify-stretch">
          <div className="h-full translate-y-full transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
            <div className="h-full p-4">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageWithOverlay;
