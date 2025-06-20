"use client";

import { useEffect } from "react";
import axios from "axios";
import { PRODURL, LOCALURL } from "../app/url";

const useFetchData = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const fetchData = async () => {
        try {
          // Remove existing items from localStorage
          localStorage.removeItem("ServicesData");
          localStorage.removeItem("QuestionsData");
          localStorage.removeItem("QuestionSetData");
          localStorage.removeItem("ServiceRateData");
          localStorage.removeItem("serviceFormDataArray");
          localStorage.removeItem("formResults");

          // Fetch all data in a single request
          const response = await axios.get(`${PRODURL}/api/get-initial-data`);
          const { services, questions, questionSets, serviceRates } =
            response.data;

          // Store services data
          localStorage.setItem("ServicesData", JSON.stringify(services));

          // Store questions data
          localStorage.setItem("QuestionsData", JSON.stringify(questions));

          // Store question sets data
          localStorage.setItem("QuestionSetData", JSON.stringify(questionSets));

          // Store service rates data
          localStorage.setItem("ServiceRateData", JSON.stringify(serviceRates));
        } catch (error) {
          console.error("Failed to fetch data:", error);
        }
      };

      fetchData();
    }
  }, []);
};

export default useFetchData;