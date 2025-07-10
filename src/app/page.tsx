
import NewProducts from "@/components/NewProducts";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Banner } from "@/components/common/Home/Banner/Banner";
import FeatureHighlights from "@/components/FeatureHighlights";
import Latest from "@/components/Latest";
import BrandCarousel from "@/components/BrandCarousel";
import CountdownTimer from "@/components/CountdownTimer";


export default function Home() {
const targetDate = new Date('2025-07-30T23:59:59');

  return (
    <main className="flex flex-col items-center justify-start  overflow-x-hidden">
      <Banner />
      <BrandCarousel />
      <NewProducts />
      <div className="flex flex-wrap justify-center gap-8 w-full px-4 mt-8 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600">
        <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2">
          <CountdownTimer targetDate={targetDate} />
        </div>
      </div>
      <Latest />
      <FeatureHighlights />
    </main>
  );
}
