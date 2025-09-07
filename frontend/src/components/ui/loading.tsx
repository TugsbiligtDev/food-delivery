"use client";
import React from "react";

interface LoadingPageProps {
  progress?: number;
}

export const LoadingPage = ({ progress = 0 }: LoadingPageProps) => {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-center space-y-8">
        <div className="w-48 h-2 bg-slate-gray mx-auto rounded-full overflow-hidden">
          <div
            className="h-full bg-cherry-red transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-7xl font-bold text-cherry-red">
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
};
