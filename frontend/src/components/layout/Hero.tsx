"use client";
import Image from "next/image";
import { useState } from "react";
import { LoadingSpinner } from "@/components/ui/loading";

const Hero = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative w-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 min-h-[400px]">
          <div className="text-center space-y-4">
            <LoadingSpinner size="lg" />
            <p className="text-gray-600">Loading hero image...</p>
          </div>
        </div>
      )}

      {hasError ? (
        <div className="flex items-center justify-center bg-gray-100 min-h-[400px]">
          <div className="text-center space-y-4">
            <p className="text-gray-600">Failed to load hero image</p>
            <button
              onClick={() => {
                setHasError(false);
                setIsLoading(true);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      ) : (
        <Image
          src="/BG.png"
          alt="hero"
          width={1920}
          height={1080}
          className="w-full h-auto"
          priority
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
        />
      )}
    </div>
  );
};

export default Hero;
