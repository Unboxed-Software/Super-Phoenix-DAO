import Image from "next/image";

const SIZE = { sm: 24, md: 32, lg: 48, xl: 62, xxl: 86, xxxl: 93 } as const;

type Props = {
  iconPath: string;
  size?: keyof typeof SIZE;
  alt: string;
};

export default function SVGIcon({ iconPath, size = "md", alt }: Props) {
  return (
    <Image alt={alt} src={iconPath} width={SIZE[size]} height={SIZE[size]} />
  );
}
