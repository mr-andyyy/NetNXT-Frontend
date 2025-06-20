"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Select, { components } from "react-select";
import GetSolutionsDefault from "../../app/assets/getSolutionsDefault.png";
import ChevronDown from "../../app/assets/js/ChevronDown";

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <ChevronDown />
    </components.DropdownIndicator>
  );
};

const ServiceForm = ({
  formHeading,
  serviceImg,
  serviceID,
  onSubmit,
  isLastForm,
  initialData,
  onBack,
  showBackButton,
  currentFormNumber,
  totalForms,
  isSubmitting,
  isUpdatingService = false,
}) => {
  const [formData, setFormData] = useState({
    formHeading: formHeading,
    serviceID: serviceID,
  });
  const [questionsData, setQuestionsData] = useState([]);
  const [questionSetData, setQuestionSetData] = useState([]);
  const [errors, setErrors] = useState({});
  const [visibleQuestions, setVisibleQuestions] = useState([]);

  // Load questions data
  useEffect(() => {
    const storedQuestionsData =
      JSON.parse(localStorage.getItem("QuestionsData")) || [];
    const queSetData =
      JSON.parse(localStorage.getItem("QuestionSetData")) || [];
    setQuestionsData(storedQuestionsData);
    setQuestionSetData(queSetData);
  }, []);

  // Set visible questions
  useEffect(() => {
    if (serviceID && questionSetData.length > 0 && questionsData.length > 0) {
      const visibleQuestionIds = questionSetData
        .filter(
          (item) => item.service === serviceID && item.showQuestion === true
        )
        .map((item) => item.question);

      setVisibleQuestions(visibleQuestionIds);
    }
  }, [serviceID, questionSetData, questionsData]);

  // Initialize form data
  useEffect(() => {
    if (visibleQuestions.length > 0 && questionsData.length > 0) {
      const newFormData = { formHeading, serviceID };

      visibleQuestions.forEach((questionId) => {
        const question = questionsData.find((q) => q._id === questionId);
        if (!question) return;

        // Initialize based on dropdownType
        if (question.dropdownType === "Multi") {
          newFormData[questionId] = initialData?.[questionId] || [];
        } else {
          newFormData[questionId] = initialData?.[questionId] || "";
        }
      });

      // Special handling for users input
      if (initialData?.usersInput) {
        newFormData.usersInput = initialData.usersInput;
      }

      setFormData(newFormData);
    }
  }, [visibleQuestions, questionsData, initialData, formHeading, serviceID]);

  const getQuestionOptions = useCallback(
    (questionId) => {
      const question = questionsData.find((q) => q._id === questionId);
      if (!question) return [];

      return (
        question.choices?.map((choice) => ({
          value: choice,
          label: choice.toString(),
        })) || []
      );
    },
    [questionsData]
  );

  const handleInputChange = (questionId, e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [questionId]: value,
    }));
    setErrors((prev) => ({ ...prev, [questionId]: undefined }));
  };

  const handleDropdownChange = (questionId, selectedOption, isMulti) => {
    const value = isMulti
      ? selectedOption.map((opt) => opt.value)
      : selectedOption?.value || "";

    setFormData((prev) => ({
      ...prev,
      [questionId]: value,
    }));
    setErrors((prev) => ({ ...prev, [questionId]: undefined }));
  };

  const handleUsersChange = (e) => {
    const value = e.target.value;
    const usersQuestionId = visibleQuestions.find((qId) => {
      const q = questionsData.find((q) => q._id === qId);
      return q?.question.toLowerCase().includes("user");
    });

    if (!usersQuestionId) {
      setFormData((prev) => ({
        ...prev,
        usersInput: value,
      }));
      return;
    }

    const userRanges = getQuestionOptions(usersQuestionId).map(
      (opt) => opt.value
    );
    let selectedRange = "";
    const numValue = parseInt(value);

    setFormData((prev) => ({
      ...prev,
      usersInput: value,
    }));

    if (!isNaN(numValue)) {
      for (const rangeRaw of userRanges) {
        const range = rangeRaw.trim();
        if (range.startsWith("<")) {
          const max = parseInt(range.substring(1));
          if (numValue <= max) {
            selectedRange = rangeRaw;
            break;
          }
        } else if (range.includes("-")) {
          const [min, max] = range.split("-").map((s) => Number(s.trim()));
          if (numValue >= min && numValue <= max) {
            selectedRange = rangeRaw;
            break;
          }
        } else if (range.endsWith("+")) {
          const min = parseInt(range.slice(0, -1));
          if (numValue >= min) {
            selectedRange = rangeRaw;
            break;
          }
        }
      }
    }

    setFormData((prev) => ({
      ...prev,
      [usersQuestionId]: selectedRange,
    }));
    setErrors((prev) => ({ ...prev, usersInput: undefined }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    visibleQuestions.forEach((questionId) => {
      const question = questionsData.find((q) => q._id === questionId);
      if (!question || !question.compulsory) return;

      // Special handling for users question
      if (question.question.toLowerCase().includes("number of user")) {
        const usersInput = formData.usersInput;
        const usersValue = formData[questionId];

        if (!usersInput || !usersValue) {
          newErrors.usersInput = "Please enter number of users/devices";
          newErrors[questionId] = "Please select a valid user range";
          isValid = false;
        }
        return;
      }

      const value = formData[questionId];
      const isEmpty = Array.isArray(value) ? value.length === 0 : !value;

      if (isEmpty) {
        newErrors[
          questionId
        ] = `Please provide ${question.question.toLowerCase()}`;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    try {
      const submissionData = { ...formData };
      //Remove any non compulsory data before submitting
      Object.keys(submissionData).forEach((key) => {
        if (key === "formHeading" || key === "serviceID" || key === "usersInput") return;
        const question = questionsData.find((q) => q._id === key);
        if (question && !question.compulsory) {
            const questionType = Array.isArray(submissionData[key]) ? [] : "";
            submissionData[key] = questionType;
        }
      });
      await onSubmit(submissionData);
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit form. Please try again.");
    }
  };

  const renderQuestionField = (questionId) => {
    const question = questionsData.find((q) => q._id === questionId);
    if (!question) return null;

    // Special case for users question
    if (question.question.toLowerCase().includes("number of user")) {
      return (
        <div key={questionId} className="">
          <label className="block text-[#2b2e34] 1550:text-[32px] text-[16px] font-normal mb-2">
            {question.question} *
          </label>
          <input
            type="number"
            value={formData.usersInput || ""}
            onChange={handleUsersChange}
            className={`txt_inp_width_ServiceForm px-[8px] 1550:py-[10px] 1080:py-[3.2px] 650:py-[6px] py-[7px] border rounded-[5px] ${
              errors.usersInput ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter number"
            min="1"
            disabled={isSubmitting}
          />
          {errors.usersInput && (
            <p className="text-[#ff0000] 1550:text-[22px] text-[14px] mt-1">
              {errors.usersInput}
            </p>
          )}
          {/* Also show the dropdown error if it exists */}
          {errors[questionId] && !errors.usersInput && (
            <p className="text-[#ff0000] 1550:text-[22px] text-[14px] mt-1">
              {errors[questionId]}
            </p>
          )}
        </div>
      );
    }

    // Handle different question types
    switch (question.dropdownType) {
      case "Single":
        return (
          <div key={questionId}>
            <label className="block text-[#2b2e34] 1550:text-[32px] text-[16px] font-normal mb-2">
              {question.question} {question.compulsory && "*"}
            </label>
            <Select
              options={getQuestionOptions(questionId)}
              value={getQuestionOptions(questionId).find(
                (opt) => opt.value === formData[questionId]
              )}
              onChange={(opt) => handleDropdownChange(questionId, opt, false)}
              className={`select_netnxt dropD_main_netnxt ${
                errors[questionId] ? "react-select-error" : ""
              }`}
              classNamePrefix="dropD_netnxt dropD"
              placeholder={`Select ${question.question.toLowerCase()}`}
              components={{ DropdownIndicator }}
              isDisabled={isSubmitting}
            />
            {errors[questionId] && (
              <p className="text-[#ff0000] 1550:text-[22px] text-[14px] mt-1">
                {errors[questionId]}
              </p>
            )}
          </div>
        );

      case "Multi":
        return (
          <div key={questionId}>
            <label className="block text-[#2b2e34] 1550:text-[32px] text-[16px] font-normal mb-2">
              {question.question} {question.compulsory && "*"}
            </label>
            <Select
              isMulti
              closeMenuOnSelect={false}
              options={getQuestionOptions(questionId)}
              value={getQuestionOptions(questionId).filter((opt) =>
                formData[questionId]?.includes(opt.value)
              )}
              onChange={(opt) => handleDropdownChange(questionId, opt, true)}
              className={`select_netnxt dropD_main_netnxt ${
                errors[questionId] ? "react-select-error" : ""
              }`}
              classNamePrefix="dropD_netnxt dropD"
              placeholder={`Select ${question.question.toLowerCase()}`}
              components={{ DropdownIndicator }}
              isDisabled={isSubmitting}
            />
            {errors[questionId] && (
              <p className="text-[#ff0000] 1550:text-[22px] text-[14px] mt-1">
                {errors[questionId]}
              </p>
            )}
          </div>
        );

      default:
        return (
          <div key={questionId}>
            <label className="block text-[#2b2e34] 1550:text-[32px] text-[16px] font-normal mb-2">
              {question.question} {question.compulsory && "*"}
            </label>
            <input
              type={question.type === "Number" ? "number" : "text"}
              value={formData[questionId] || ""}
              onChange={(e) => handleInputChange(questionId, e)}
              className={`w-full p-3 border rounded-lg ${
                errors[questionId] ? "border-red-500" : "border-gray-300"
              }`}
              disabled={isSubmitting}
              min={question.type === "Number" ? "0" : undefined}
            />
            {errors[questionId] && (
              <p className="text-[#ff0000] 1550:text-[22px] text-[14px] mt-1">
                {errors[questionId]}
              </p>
            )}
          </div>
        );
    }
  };

  return (
    <div className="rounded-lg pt-[60px] 1080:pl-[80px] 1080:pr-6 650:pb-[90px] pb-[50px]">
      <div className="flex flex-col items-center mb-8">
        {/* Progress indicator remains the same */}
      </div>

      <div className="pt-8 flex 1080:flex-row justify-start items-start gap-20 flex-col">
        {/* Img Div */}
        <div className="flex flex-col gap-6 1550:w-[450px] 1550:h-[450px] 1080:w-[280px] 1080:h-[280px] w-full h-full">
          <div className="1550:w-[450px] 1550:h-[450px] sm:w-[280px] sm:h-[280px] w-[250px] h-[250px] flex flex-col justify-center overflow-hidden mx-auto">
            <div className="flex-[0.7] p-2 bg-[#fff] rounded-t-2xl flex justify-center items-center">
              <Image
                src={serviceImg ? serviceImg : GetSolutionsDefault}
                alt={formHeading}
                width={100}
                height={100}
                priority
                className="1550:w-[250px] 1550:h-[250px] 650:w-[150px] 650:h-[150px] w-[120px] h-[120px] object-cover"
              />
            </div>
            <div className="flex-[0.3] p-4 bg-[#bed9bd] rounded-b-2xl flex items-center justify-center">
              <p className="1550:text-[28px] 650:text-[15px] text-[15px] font-semibold text-gray-800 text-center">
                {formHeading.toUpperCase()}
              </p>
            </div>
          </div>
        </div>

        <form
          id="serviceForm"
          onSubmit={handleSubmit}
          className="1080:w-auto w-full"
        >
          <p className="1550:text-[52px] text-[20px] font-medium text-[#2B2E34]">
            Enter additional details
          </p>
          <p className="1550:text-[42px] text-[15px] text-[#6a6e79] font-normal pb-6">
            Share more to help us find the right solutions for you.
          </p>
          <div className="grid 850:grid-cols-2 1550:gap-10 gap-6">
            {visibleQuestions.map((questionId) =>
              renderQuestionField(questionId)
            )}
          </div>
        </form>
      </div>

      <div className="w-full px-24 pt-[50px] pb-8 flex justify-center">
        {showBackButton && (
          <button
            type="button"
            onClick={onBack}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-[18px] font-medium px-8 rounded-[50px]"
            disabled={isSubmitting}
          >
            Previous
          </button>
        )}

        {!showBackButton && <div></div>}

        <button
          type="submit"
          form="serviceForm"
          className={`bg-[#5dc464] hover:bg-[#70b86d] text-[#fff] 1550:text-[34px] 1080:text-[28px] text-[20px] 1550:py-3 1080:py-2 py-2 1550:px-14 1080:px-12 px-10 rounded-full 650:w-[230px] w-[200px] ${
            isSubmitting ? "opacity-75 cursor-not-allowed" : ""
          }`}
          disabled={isSubmitting}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ServiceForm;
