"use client";
import Image from "next/image";
import { useState } from "react";

const Hero = () => {
  return (
    <div className="relative w-full">
      <Image
        src="/BG.png"
        alt="hero"
        width={1920}
        height={1080}
        className="w-full h-auto"
        priority
      />
    </div>
  );
};

export default Hero;
