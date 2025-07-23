import Header from "@/components/layouts/Header";
import Hero from "@/components/layouts/Hero";
import MenuGrid from "@/components/grid/MenuGrid";
import Footer from "@/components/layouts/Footer";

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
