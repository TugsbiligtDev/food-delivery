import AuthButtons from "@/components/auth/AuthButtons";
import Image from "next/image";

const Hero = () => {
  return (
    <Image
      src="/BG.png"
      alt="hero"
      width={1920}
      height={1080}
      className="w-full h-auto"
    />
  );
};

export default Hero;
