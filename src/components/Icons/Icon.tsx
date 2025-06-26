import Image from "next/image";

const Icon = ({ image }: { image: string }) => {
  return (
    <Image
      src={`/icons/${image}.svg`}
      alt="icon"
      width={20}
      height={20}
      className="object-contain"
    />
  );
};

export default Icon;
