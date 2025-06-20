"use client";
import { useState, useEffect } from "react";
import useFetchData from "../../hooks/useFetchData";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import HeroImg from "../assets/Hero_gif.gif";
import GetSolutionsDefault from "../assets/getSolutionsDefault.png";
import Logo from "../../public/Logos/logo.png";
import LogoHeader from "../../components/LogoHeader";

export default function GetASolution() {
  const [servicesData, setServicesData] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [alreadySelected, setAlreadySelected] = useState([]);
  const [shouldFetchData, setShouldFetchData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const savedServicesData = localStorage.getItem("ServicesData");

    if (savedServicesData) {
      setShouldFetchData(false);
    } else {
      setShouldFetchData(true);
    }
  }, []);

  useFetchData(shouldFetchData);

  useEffect(() => {
    let checkInterval;
    let timeout;

    const loadServicesData = () => {
      const savedServicesData = localStorage.getItem("ServicesData");
      const alreadySelectedServices = JSON.parse(
        localStorage.getItem("alreadySelectedServices") || "[]"
      );

      if (savedServicesData) {
        try {
          const parsedData = JSON.parse(savedServicesData);
          if (Array.isArray(parsedData)) {
            setServicesData(parsedData);
            setAlreadySelected(alreadySelectedServices);
            setIsLoading(false);
            clearInterval(checkInterval);
            clearTimeout(timeout);
          }
        } catch (e) {
          console.error("Error parsing ServicesData:", e);
        }
      }
    };

    loadServicesData();

    if (isLoading) {
      checkInterval = setInterval(loadServicesData, 500);
      timeout = setTimeout(() => {
        clearInterval(checkInterval);
        setIsLoading(false);
      }, 10000);
    }

    return () => {
      clearInterval(checkInterval);
      clearTimeout(timeout);
    };
  }, [isLoading]);

  useEffect(() => {
    const partialData = localStorage.getItem("partialFormData");
    if (!partialData) {
      localStorage.removeItem("partialFormData");
    }
  }, []);

  const handleCardClick = (index) => {
    const serviceId = servicesData[index]._id;
    if (alreadySelected.includes(serviceId)) return;

    const selectedService = {
      service: servicesData[index].service,
      _id: servicesData[index]._id,
    };

    localStorage.setItem(
      "securityServicesData",
      JSON.stringify({
        selectedServices: [selectedService],
        timestamp: new Date().getTime(),
        isAddingServices: false,
      })
    );

    localStorage.removeItem("alreadySelectedServices");
    router.push("/solution-inputs");
  };

  if (isLoading || servicesData.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Image
          src={HeroImg}
          alt="Loading..."
          priority
          className="w-full max-w-md"
        />
      </div>
    );
  }

  return (
    <div className="bgImg_bottomRight 1080:px-8 650:px-8 px-8 1080:pt-8 650:pt-[80px] pt-[90px] 1080:pb-[40px] 650:pb-[50px] pb-[40px] bg-white min-h-screen flex flex-col justify-start items-center">
      <div className="w-full flex justify-start p-4 absolute top-0 left-0 z-20">
        <div
          className="cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Image 
            src={Logo} 
            alt="NetNXT Logo" 
            className="w-[60px] h-auto sm:w-[70px] md:w-[80px]"
            priority
          />
        </div>
      </div>

      <div className="w-full 1550:max-w-[1550px] max-w-6xl 1080:pt-[100px] 650:pt-[60px] pt-[60px]">
        <div className="flex flex-wrap justify-center 1550:gap-x-16 1550:gap-y-16 gap-x-8 gap-y-8">
          {servicesData.map((service, index) => {
            const isAlreadySelected = alreadySelected.includes(service._id);
            const hasValidDescription =
              service.body &&
              service.body.some((item) => item.text && item.text.trim() !== "");

            return (
              <div
                key={index}
                className={`flip-card 1550:w-[450px] 1550:h-[450px] sm:w-[280px] sm:h-[280px] w-[250px] h-[250px] bg-white rounded-2xl cursor-pointer transition-all duration-200 ${
                  isAlreadySelected ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onMouseEnter={() =>
                  !isAlreadySelected && setHoveredIndex(index)
                }
                onMouseLeave={() => !isAlreadySelected && setHoveredIndex(null)}
                onClick={() => !isAlreadySelected && handleCardClick(index)}
              >
                <motion.div
                  className="flip-card-inner w-full h-full"
                  animate={{ rotateY: hoveredIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.1 }}
                >
                  <div className="flip-card-front w-full h-full flex flex-col justify-center overflow-hidden">
                    <div className="flex-[0.758] p-2 bg-[#fff] rounded-t-2xl flex justify-center items-center">
                      <Image
                        src={
                          service.serviceImg
                            ? service.serviceImg
                            : GetSolutionsDefault
                        }
                        alt={service.service}
                        width={100}
                        height={100}
                        priority
                        className="1550:w-[250px] 1550:h-[250px] 650:w-[150px] 650:h-[150px] w-[120px] h-[120px] object-cover"
                      />
                    </div>
                    <div className="flex-[0.3] p-4 bg-[#bed9bd] rounded-b-2xl flex items-center justify-center">
                      <p className="1550:text-[28px] 650:text-[15px] text-[15px] font-semibold text-gray-800 text-center">
                        {service.service.toUpperCase()}
                      </p>
                    </div>
                  </div>

                  <div className="flip-card-back w-full h-full bg-[#bed9bd] border border-gray-200 text-gray-800 rounded-2xl p-6 1550:pt-10 flex flex-col justify-start">
                    <p className="1550:text-[38px] 650:text-[20px] text-[15px] font-bold mb-2">
                      Details
                    </p>
                    {hasValidDescription ? (
                      <ul className="list-disc pl-5 space-y-1">
                        {service.body
                          .sort((a, b) => a.orderNo - b.orderNo)
                          .map((item, i) => (
                            <li
                              key={i}
                              className="1550:text-[26px] 650:text-[16px] text-[12px]"
                            >
                              {item.text && item.text.trim() !== ""
                                ? item.text
                                : "No description available"}
                            </li>
                          ))}
                      </ul>
                    ) : (
                      <p className="text-gray-700">No description available</p>
                    )}
                  </div>
                </motion.div>
                {isAlreadySelected && (
                  <div className="absolute inset-0 bg-gray-100 bg-opacity-70 flex items-center justify-center rounded-2xl">
                    <span className="text-gray-700 font-bold">&nbsp;</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}