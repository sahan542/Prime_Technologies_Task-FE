// import Image from "next/image";
// import Hero from "../components/Hero";
import NewProducts from "@/components/NewProducts";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Banner } from "@/components/common/Home/Banner/Banner";
import FeatureHighlights from "@/components/FeatureHighlights";


export default function Home() {
  return (
    <main className="flex flex-col items-center justify-start bg-gray-100 overflow-x-hidden">
      {/* <Hero /> */}
      <Banner />
      <NewProducts />
      <FeatureHighlights />

    </main>
  );
}
