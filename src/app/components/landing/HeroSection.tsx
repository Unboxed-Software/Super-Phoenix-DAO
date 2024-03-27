import Image from "next/image";

type Props = {
  header: string;
  description: string;
  imagePath: string;
  imageLocation: "left" | "right";
  imageAlt: string;
  size?: "md" | "lg";
};

export default function HeroSection({
  header,
  description,
  imagePath,
  imageLocation,
  imageAlt,
  size = "md",
}: Props) {
  return (
    <div className="w-full p-6 lg:p-20 mt-10">
      <div
        className={`w-full flex align-middle justify-evenly flex-col ${imageLocation === "right" ? "lg:flex-row-reverse lg:text-end" : "lg:flex-row"}`}
      >
        <Image src={imagePath} width={580} height={330} alt={imageAlt} />
        <div className="my-5 lg:my-10 lg:mx-10 mx-0  flex flex-col justify-center">
          <h1
            className={`text-white mb-2 ${size === "md" ? "text-2xl" : "text-4xl"}`}
          >
            {header}
          </h1>
          <p className="text-neutral-400 text-base">{description}</p>
        </div>
      </div>
    </div>
  );
}
