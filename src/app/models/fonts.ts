import { Space_Mono, Space_Grotesk, Maven_Pro } from 'next/font/google';
import localFont from 'next/font/local';

export const semplicita = localFont({
  src: [
    { path: '../../../public/assets/fonts/Semplicita/semplicita-medium-italic.otf', weight: '400', style: 'italic' },
    { path: '../../../public/assets/fonts/Semplicita/semplicita-medium.otf', weight: '400', style: 'regular' },
    { path: '../../../public/assets/fonts/Semplicita/semplicita-ombra.otf', weight: '900', style: 'ombra' },
    { path: '../../../public/assets/fonts/Semplicita/semplicita-bold-italic.otf', weight: '700', style: 'bold-italic' },
    { path: '../../../public/assets/fonts/Semplicita/semplicita-bold.otf', weight: '700', style: 'bold' },
    {
      path: '../../../public/assets/fonts/Semplicita/semplicita-light-italic.otf',
      weight: '300',
      style: 'light-italic',
    },
    { path: '../../../public/assets/fonts/Semplicita/semplicita-light.otf', weight: '300', style: 'light' },
  ],
  variable: '--font-semplicita',
});

export const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: '700',
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: '300',
});

export const mavenPro = Maven_Pro({
  subsets: ['latin'],
  weight: '400',
});
