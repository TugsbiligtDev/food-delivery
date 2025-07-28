import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import MenuGrid from "@/components/features/menu/MenuGrid";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <div className="w-[90%] mx-auto flex justify-center">
        <MenuGrid />
      </div>
      <Footer />
    </>
  );
}

//todo understand login and signup
//todo complete UI of Homepage
//todo style footer
//todo add categories
//todo complete backend
//todo In weekend, complete all Homepage etc
//todo In next week complete project and use motion
