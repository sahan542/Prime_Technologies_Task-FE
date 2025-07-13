import Image from "next/image";
import Banner1 from "../../public/images/home/banner/banner1.jpg";
import Banner2 from "../../public/images/home/banner/banner2.jpg";
import Banner3 from "../../public/images/home/banner/banner3.jpg";

const Latest = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <h2 className="font-bold text-2xl pb-4 text-[#7b1f4b]">Flash Sale!</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="relative col-span-1 lg:col-span-2">
          <Image
            src={Banner1}
            alt="PlayStation 5"
            width={600}
            height={400}
            className="rounded-lg w-full transition duration-300 hover:shadow-[0_10px_25px_rgba(123,31,75,0.6)]"
          />
          <div className="absolute bottom-4 left-4 text-white text-lg font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
            💧 Radiant Glow, Naturally Yours
            <p className="text-sm">Gentle care for healthy glowing skin.</p>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="mb-4 relative">
            <Image
              src={Banner2}
              alt="Perfume"
              width={600}
              height={400}
              className="rounded-lg w-full transition duration-300 hover:shadow-[0_10px_25px_rgba(123,31,75,0.6)]"
            />
            <div className="absolute bottom-4 left-4 text-white text-lg font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
              🌿 Pure Ingredients, Visible Results
              <p className="text-sm">
                Nourish deeply with nature’s finest touch.
              </p>
            </div>
          </div>

          <div className="grid grid-rows-1 gap-4 bg-blue-400">
            <div className="relative">
              <Image
                src={Banner3}
                alt="Perfume"
                width={300}
                height={250}
                className="rounded-lg w-full transition duration-300 hover:shadow-[0_10px_25px_rgba(123,31,75,0.6)]"
              />
              <div className="absolute bottom-4 left-4 text-white text-lg font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                ✨ Beauty That Breathes
                <p className="text-xs sm:text-sm">
                  Hydrate, restore, and glow every day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Latest;
