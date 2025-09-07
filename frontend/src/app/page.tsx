"use client";
import { Suspense } from "react";
import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import MenuGrid from "@/components/features/menu/MenuGrid";
import Footer from "@/components/layout/Footer";
import { LoadingPage } from "../components/ui/loading";

export default function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <div className="w-[90%] mx-auto flex justify-center my-10">
        <Suspense fallback={<LoadingPage />}>
          <MenuGrid />
        </Suspense>
      </div>
      <Footer />
    </>
  );
}
