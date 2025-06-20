import Image from "next/image";
import { useRouter } from "next/navigation";
import HeroImg from "../app/assets/Hero_gif.gif";

const HeroSection = () => {
  const router = useRouter();

  const handleGetSolutions = () => {
    router.push("/get-solutions");
  };

  const handleGotoKnowMore = () => {
    router.push("/know-more");
  };

  return (
    <div className="relative min-h-[60vh] bg-gradient-to-br from-white to-gray-50">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('../app/assets/Bg_top_left.png')] bg-no-repeat bg-top-left opacity-50"></div>
      
      {/* Content container */}
      <div className="relative container mx-auto px-4 lg:px-8 flex min-h-[60vh]">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full max-w-7xl mx-auto py-12 lg:py-0">
          {/* Text content */}
          <div className="flex flex-col space-y-6 lg:space-y-8 text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className="text-[#5dc464] block">Welcome to NetNXT</span>
            </h1>
            
            <p className="text-gray-700 text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl leading-relaxed">
              At NetNXT, we specialize in delivering comprehensive cyber security
              solutions tailored to meet your unique needs. Choose an option
              below to explore how we can assist you
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                onClick={handleGetSolutions}
                className="bg-[#4cb849] hover:bg-[#3e9d3d] text-white px-8 py-4 rounded-full text-base sm:text-lg lg:text-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center"
              >
                Buy Now
              </button>
              <button
                onClick={handleGotoKnowMore}
                className="bg-[#150b2080] hover:bg-[#150b20cc] text-white px-8 py-4 rounded-full text-base sm:text-lg lg:text-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center"
              >
                Know More
              </button>
            </div>
          </div>

          {/* Image section */}
          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-green-100 to-blue-100 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
              <Image
                src={HeroImg}
                alt="Hero Image"
                className="relative w-full h-auto object-contain transform hover:scale-105 transition-transform duration-500"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;