import Image from 'next/image';
import Banner1 from "../../public/images/home/banner/banner1.jpg";
import Banner2 from "../../public/images/home/banner/banner2.jpg";
import Banner3 from "../../public/images/home/banner/banner3.jpg";
import Banner4 from "../../public/images/home/banner/banner4.jpg";

const Latest = () => {
  return (
    <div className="container mx-auto py-12 px-4">
        <h2 className='font-bold text-2xl pb-4 text-[#7b1f4b]'>Flash Sale!</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel */}
        <div className="relative col-span-1 lg:col-span-2">
          <Image
            src={Banner1}
            alt="PlayStation 5"
            width={600}
            height={400}
            className="rounded-lg w-full"
          />
          <div className="absolute bottom-4 left-4 text-white text-lg font-semibold">
            PlayStation 5
            <p className="text-sm">Black and White version of the PS5 coming out on sale.</p>
            <a href="#" className="text-blue-500 mt-2 block">Shop Now</a>
          </div>
        </div>

        {/* Right Panel */}
        <div className="lg:col-span-1">
          {/* Upper section with a full-width image */}
          <div className="mb-4 relative">
            <Image
              src={Banner2}
              alt="Perfume"
              width={600}
              height={400}
              className="rounded-lg w-full"
            />
            <div className="absolute bottom-4 left-4 text-white text-lg font-semibold">
              Perfume Sahan
              <p className="text-sm">GUCCI INTENSE OUD EDP.</p>
              <a href="#" className="text-blue-500 mt-2 block">Shop Now</a>
            </div>
          </div>

          {/* Lower section with two images in a row */}
          <div className="grid grid-rows-1 gap-4 bg-blue-400">
            <div className="relative">
              <Image
                src={Banner3}
                alt="Perfume"
                width={300}
                height={250} // Set height to 250px for consistency
                className="rounded-lg w-full"
              />
              <div className="absolute bottom-4 left-4 text-white text-sm sm:text-base md:text-lg font-semibold">
                Perfume
                <p className="text-xs sm:text-sm">GUCCI INTENSE OUD EDP.</p>
                <a href="#" className="text-blue-500 mt-2 block">Shop Now</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Latest;
