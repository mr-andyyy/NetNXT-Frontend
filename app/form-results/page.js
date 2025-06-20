"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ArrowLeft from "../assets/icons/arrowLeft.svg";
import GetSolutionsDefault from "../assets/getSolutionsDefault.png";
import LogoHeader from "../../components/LogoHeader";

export default function FormResultsPage() {
  const [formData, setFormData] = useState([]);
  const [totalEstimate, setTotalEstimate] = useState(0);
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [questionsData, setQuestionsData] = useState([]);
  const [servicesData, setServicesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const calculateCardRate = useCallback((cardData) => {
    const serviceRateData = JSON.parse(
      localStorage.getItem("ServiceRateData") || "[]"
    );

    const serviceRates = serviceRateData.filter(
      (item) => item.service === cardData.serviceID
    );

    if (serviceRates.length === 0) return 0;

    const matchingRate = serviceRates.find((serviceRate) => {
      return serviceRate.answers.every((rateAnswer) => {
        var cardAnswer = cardData[rateAnswer.questionId];
        if (cardAnswer === undefined) return false;

        if (Array.isArray(cardAnswer) && cardAnswer.length > 1) {
          cardAnswer = "All";
        } 
        else if (Array.isArray(cardAnswer) && cardAnswer.length === 1) {
        //  cardAnswer = cardAnswer.length === 1 ? cardAnswer[0] : cardAnswer;
          cardAnswer = cardAnswer[0];        
        }
        else if (Array.isArray(cardAnswer) && cardAnswer.length === 0){
          cardAnswer = "";
        }
        if (Array.isArray(cardAnswer)) {
          if (typeof rateAnswer.answer === "number") {
            return cardAnswer.length === rateAnswer.answer;
            
          }
          return cardAnswer.some(
            (item) => item.toString() === rateAnswer.answer.toString()
          );
        }
        return cardAnswer.toString() === rateAnswer.answer.toString();
      });
    });

    return matchingRate ? matchingRate.rate : 0;
  }, []);

  const calculateTotalEstimate = useCallback(
    (data) => {
      let total = 0;
      data.forEach((card) => {
        total += calculateCardRate(card);
      });
      setTotalEstimate(total);
    },
    [calculateCardRate]
  );

  useEffect(() => {
    const savedData = localStorage.getItem("formResults");
    const questions = JSON.parse(localStorage.getItem("QuestionsData") || "[]");
    const services = JSON.parse(localStorage.getItem("ServicesData") || "[]");

    setQuestionsData(questions);
    setServicesData(services);

    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData(parsedData);
      calculateTotalEstimate(parsedData);
    } else {
      router.push("/");
    }

    setIsLoading(false);
  }, [router, calculateTotalEstimate]);

  const getServiceImage = (serviceName) => {
    const matchedService = servicesData.find(
      (service) => service.service === serviceName
    );
    return matchedService?.serviceImg || GetSolutionsDefault;
  };

  const handleRemove = (indexToRemove) => {
    const updatedData = formData.filter((_, index) => index !== indexToRemove);
    setFormData(updatedData);
    localStorage.setItem("formResults", JSON.stringify(updatedData));
    calculateTotalEstimate(updatedData);

    // Adjust current index if we're removing the current or a previous service
    if (currentServiceIndex >= indexToRemove) {
      setCurrentServiceIndex(Math.max(0, currentServiceIndex - 1));
    }

    if (updatedData.length === 0) {
      router.push("/");
    }
  };

  const handleUpdate = (data, indexToUpdate) => {
    localStorage.setItem(
      "partialFormData",
      JSON.stringify({
        ...data,
        formHeading: data.formHeading,
        serviceID: data.serviceID,
      })
    );
    router.push("/solution-inputs");
  };

  const handleAddService = () => {
    const currentServices = formData.map((item) => item.serviceID);
    localStorage.setItem(
      "alreadySelectedServices",
      JSON.stringify(currentServices)
    );
    router.push("/get-solutions");
  };

  const goToNextService = () => {
    setCurrentServiceIndex((prev) => prev + 1);
  };

  const goToPrevService = () => {
    setCurrentServiceIndex((prev) => prev - 1);
  };

  const getQuestionText = (questionId) => {
    const question = questionsData.find((q) => q._id === questionId);
    return question ? question.question : `Question (ID: ${questionId})`;
  };

  const isQuestionCompulsory = (questionId) => {
    const question = questionsData.find((q) => q._id === questionId);
    return question ? question.compulsory : false;
  };

  const currentService = formData[currentServiceIndex];
  const cardRate = currentService ? calculateCardRate(currentService) : 0;
  const isLastService = currentServiceIndex === formData.length - 1;
  const isFirstService = currentServiceIndex === 0;

  if (isLoading) {
    return (
      <>
        <LogoHeader />
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      </>
    );
  }

  if (!currentService) {
    return null; // or loading state
  }

  return (
    <>
      <LogoHeader />
      <div className="bgImg_centerRight pt-0 pb-8 bg-white min-h-screen flex flex-col justify-between 650:gap-12 gap-6">
        <div className="w-full 1080:mt-10 650:mt-10 mt-0 1550:min-w-[1550px] max-w-[1200px] mx-auto 650:px-8 px-2 flex flex-col items-start justify-start 1550:gap-14 gap-8">
          <div className="mb-5">
            <div className="650:px-0 px-4">
              <p className="1550:text-[52px] 1080:text-[28px] 650:text-[24px] text-[20px] font-bold 650:text-left text-center">
                Your Cart
              </p>
              <p className="1550:text-[36px] 1080:text-[20px] 650:text-[18px] text-[16px] font-normal border-b-[1px] border-[#4CB849] pb-[8px] 650:text-left text-center">
                NetNxt is a trusted Security Partner for Digital Native Companies
                across the Globe
              </p>
            </div>
          </div>

          <div className="w-full mb-2 flex 1080:flex-row justify-start 1550:gap-20 gap-14 flex-col">
            <div className="flex flex-col justify-center items-center 1550:gap-10 gap-5">
              <div className="1550:w-[450px] 1550:h-[450px] sm:w-[280px] sm:h-[280px] w-[250px] h-[250px] flex flex-col justify-center overflow-hidden">
                <div className="flex-[0.7] p-2 bg-[#fff] rounded-t-2xl flex justify-center items-center">
                  <Image
                    src={getServiceImage(currentService.formHeading)}
                    alt={currentService.formHeading}
                    width={100}
                    height={100}
                    priority
                    className="1550:w-[250px] 1550:h-[250px] 650:w-[150px] 650:h-[150px] w-[120px] h-[120px] object-cover"
                  />
                </div>
                <div className="flex-[0.3] p-4 bg-[#bed9bd] rounded-b-2xl flex items-center justify-center">
                  <p className="650:text-[20px] text-[16px] font-semibold text-gray-800 text-center">
                    {currentService.formHeading}
                  </p>
                </div>
              </div>
            </div>

            {/* shadow-[0_4px_4px_0px_rgba(0,0,0,0.2)] */}
            <div className="py-2 pl-8 flex flex-col justify-between">
              <div className="">
                <p className="1550:text-[36px] 650:text-[20px] text-[16px] font-normal mb-2">
                  Inputs Provided -
                </p>
                <ul className="flex flex-col gap-1">
                  {Object.entries(currentService)
                    .filter(
                      ([key, value]) =>
                        ![
                          "formHeading",
                          "lastUpdated",
                          "serviceID",
                          "usersInput",
                        ].includes(key) &&
                        value !== "" &&
                        value !== null &&
                        !(Array.isArray(value) && value.length === 0) &&
                        isQuestionCompulsory(key)
                    )
                    .map(([key, value]) => (
                      <li key={key} className="flex">
                        <span className="1550:text-[32px] 650:text-[20px] text-[16px] font-normal">
                          &#x2022;{" "}
                        </span>
                        <span className="mr-2 pl-2 1550:text-[32px] 650:text-[20px] text-[16px] font-normal">
                          {getQuestionText(key)}:{" "}
                          {Array.isArray(value)
                            ? value.join(", ")
                            : value.toString()}
                        </span>
                      </li>
                    ))}
                </ul>
              </div>

              <div className="flex flex-col gap-4 mt-5">
                <div className="1550:text-[32px] 650:text-[20px] text-[16px] font-normal mb-2">
                  Total Estimate - ${Number(cardRate).toLocaleString()}
                </div>
                <div className="flex flex-row gap-4">
                  <button
                    onClick={handleAddService}
                    className={`1080:py-3 650:py-2 py-2 1080:px-12 650:px-8 px-6 bg-transparent border-[1px] border-[#45A743] rounded-[50px] flex justify-center items-center gap-2`}
                  >
                    <Image
                      src={ArrowLeft}
                      alt="abc"
                      priority
                      className="1550:w-[32px] 1550:h-[32px] 650:w-[24px] 650:h-[24px] w-[18px] h-[18px] object-cover"
                    />
                    <span className="text-[#45A743] 1550:text-[34px] 650:text-[20px] text-[16px] font-normal">
                      Change Service
                    </span>
                  </button>
                  <a
                    href="https://book.netnxt.com/#/customer/4521459000000035054"
                    target="_blank"
                    className={`bg-[#5dc464] hover:bg-[#4cb849] text-[#fff] 1550:text-[34px] 650:text-[20px] text-[16px] font-normal rounded-[50px] transition-colors 1550:py-3 1080:py-3 650:py-2 py-2 1550:px-14 1080:px-12 650:px-8 px-6`}
                  >
                    Let&apos;s Get Started
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*  fixed bottom-12 right-0 */}
        <div className="w-full">
          <div className="w-full flex 1080:justify-between justify-center gap-4 px-8">
            {isFirstService && <div></div>}

            {!isFirstService && (
              <button
                onClick={goToPrevService}
                className={`bg-gray-500 hover:bg-gray-600 text-white 650:text-[20px] text-[16px] font-normal rounded-[50px] transition-colors 1080:py-3 650:py-2 py-2 1080:px-12 650:px-8 px-6`}
              >
                Previous
              </button>
            )}
          </div>
        </div>

        {/* Total Estimate for all Services per month */}
        {/* <div className="max-w-[600px] mx-auto mb-12  text-[25px] font-bold bg-[#d9d9d980] rounded-[15px] shadow-[0_4px_4px_0px_rgba(0,0,0,0.2)]">
        <p className="text-center">
          Your Estimate - ${totalEstimate} per month
        </p>
      </div> */}
      </div>
    </>
  );
}
