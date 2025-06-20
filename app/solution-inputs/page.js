"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Header from "@/components/layout/Header"; // <-- Add this import
import ServiceForm from "../../components/others/ServiceForm";
import Logo from "../../public/Logos/logo.png";

export default function SolutionInputs() {
  const router = useRouter();
  const [selectedServices, setSelectedServices] = useState([]);
  const [currentFormIndex, setCurrentFormIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingServices, setIsAddingServices] = useState(false);
  const [isUpdatingService, setIsUpdatingService] = useState(false);
  const [servicesData, setServicesData] = useState([]);
  const FORM_DATA_KEY = "serviceFormDataArray";

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const savedSelection = localStorage.getItem("securityServicesData");
        const partialData = localStorage.getItem("partialFormData");
        const servicesFromStorage =
          JSON.parse(localStorage.getItem("ServicesData")) || [];
        setServicesData(servicesFromStorage);

        if (partialData) {
          const { serviceID } = JSON.parse(partialData);
          const { selectedServices: services } = JSON.parse(savedSelection);

          setSelectedServices(services);
          const serviceIndex = services.findIndex((s) => s._id === serviceID);
          setCurrentFormIndex(serviceIndex);
          setIsUpdatingService(true);
          setIsAddingServices(false);
        } else if (savedSelection) {
          const {
            selectedServices: services,
            isAddingServices: addingServices,
          } = JSON.parse(savedSelection);

          setIsAddingServices(!!addingServices);
          let startIndex = 0;

          if (addingServices) {
            const existingResults = JSON.parse(
              localStorage.getItem("formResults") || "[]"
            );
            startIndex = existingResults.length;
          }

          setSelectedServices(services);
          setCurrentFormIndex(startIndex);
          setIsUpdatingService(false);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Initialization error:", error);
        router.push("/get-solutions");
      }
    };

    loadInitialData();
  }, [router]);

  const getServiceImage = (serviceId) => {
    const service = servicesData.find((s) => s._id === serviceId);
    return service ? service.serviceImg : "";
  };

  const saveFormData = (formData, serviceId) => {
    try {
      if (!serviceId) {
        throw new Error("Service ID is required to save form data");
      }

      const currentData = JSON.parse(localStorage.getItem(FORM_DATA_KEY)) || [];

      const existingIndex = currentData.findIndex(
        (item) => item.serviceID === serviceId
      );

      const newFormData = {
        ...formData,
        serviceID: serviceId,
        lastUpdated: new Date().toISOString(),
      };

      const updatedData =
        existingIndex >= 0
          ? [
              ...currentData.slice(0, existingIndex),
              newFormData,
              ...currentData.slice(existingIndex + 1),
            ]
          : [...currentData, newFormData];

      localStorage.setItem(FORM_DATA_KEY, JSON.stringify(updatedData));
      return true;
    } catch (error) {
      console.error("Failed to save form data:", error);
      return false;
    }
  };

  const handleFormSubmit = (formData, index) => {
    const serviceId = selectedServices[index]._id;
    const isUpdate = localStorage.getItem("partialFormData") !== null;

    saveFormData(formData, serviceId);

    if (isUpdate) {
      handleFinalSubmission();
    } else if (index < selectedServices.length - 1) {
      setCurrentFormIndex(index + 1);
    } else {
      handleFinalSubmission();
    }
  };

  const handleFinalSubmission = async () => {
    setIsSubmitting(true);
    try {
      const allFormData = JSON.parse(localStorage.getItem(FORM_DATA_KEY)) || [];

      if (isUpdatingService) {
        const existingResults = JSON.parse(
          localStorage.getItem("formResults") || []
        );
        const updatedData = allFormData.find(
          (d) => d.serviceID === selectedServices[currentFormIndex]._id
        );

        if (updatedData) {
          const updatedResults = existingResults.map((item) =>
            item.serviceID === updatedData.serviceID ? updatedData : item
          );
          localStorage.setItem("formResults", JSON.stringify(updatedResults));
        }
      } else if (isAddingServices) {
        const existingResults = JSON.parse(
          localStorage.getItem("formResults") || []
        );
        const existingServiceIds = existingResults.map(
          (item) => item.serviceID
        );

        const newFormData = allFormData.filter(
          (data) => !existingServiceIds.includes(data.serviceID)
        );

        const mergedResults = [...existingResults, ...newFormData];
        localStorage.setItem("formResults", JSON.stringify(mergedResults));
      } else {
        localStorage.setItem("formResults", JSON.stringify(allFormData));
      }

      localStorage.removeItem("partialFormData");
      router.push("/form-results");
    } catch (error) {
      console.error("Submission failed:", error);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCurrentFormData = () => {
    try {
      const currentServiceId = selectedServices[currentFormIndex]?._id;
      const savedData = JSON.parse(localStorage.getItem(FORM_DATA_KEY)) || [];
      return (
        savedData.find((data) => data.serviceID === currentServiceId) || null
      );
    } catch (error) {
      console.error("Error loading saved data:", error);
      return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute top-0 left-0 w-full p-4 z-20">
        <button
          className="flex items-center"
          onClick={() => router.push("/")}
        >
          <Image
            src={Logo}
            alt="NetNXT Logo"
            className="w-[60px] h-auto sm:w-[70px] md:w-[80px]"
            priority
          />
        </button>
      </div>
      <div className="650:px-8 650:py-8 px-4 650:pb-[100px] pb-[60px] min-h-screen bgImg_ServiceForm">
        {selectedServices.map((service, index) => (
          <div
            key={service._id}
            className={`${index === currentFormIndex ? "block" : "hidden"}`}
          >
            <ServiceForm
              formHeading={service.service}
              serviceImg={getServiceImage(service._id)}
              serviceID={service._id}
              onSubmit={(data) => handleFormSubmit(data, index)}
              isLastForm={index === selectedServices.length - 1}
              initialData={getCurrentFormData()}
              onBack={() => setCurrentFormIndex(index - 1)}
              showBackButton={index > 0 && !isAddingServices}
              currentFormNumber={index + 1}
              totalForms={selectedServices.length}
              isSubmitting={isSubmitting}
              isUpdatingService={isUpdatingService && index === currentFormIndex}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
