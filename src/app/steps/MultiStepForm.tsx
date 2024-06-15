"use client";
import React, { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Image from "next/image";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([false, false, false]);
  const [formData, setFormData] = useState({
    companyName: "",
    companySize: "",
    foundedYear: "",
    companyDescription: "",
    websiteUrl: "",
    contactNumber: "",
    email: "",
    country: "",
    province: "",
    city: "",
    address: "",
    mediaUrl: "",
    companyLogo: null,
    companyImages: null,
  });

  const nextStep = () => {
    if (validateStep()) {
      const newCompletedSteps = [...completedSteps];
      newCompletedSteps[step - 1] = true;
      setCompletedSteps(newCompletedSteps);
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const submitForm = () => {
    // Handle form submission
    console.log(formData);
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        return (
          formData.companyName &&
          formData.companySize &&
          formData.foundedYear &&
          formData.companyDescription
        );
      case 2:
        return (
          formData.websiteUrl &&
          formData.contactNumber &&
          formData.email &&
          formData.country &&
          formData.province &&
          formData.city &&
          formData.address
        );
      case 3:
        return formData.mediaUrl && formData.companyLogo && formData.companyImages;
      default:
        return false;
    }
  };

  return (
    <>
      <div className="relative">
        <div className="absolute right-0 bottom-0">
          <Image src="/images/tree.png" alt="logo" width={200} height={200} />
        </div>

        <div className="max-w-6xl mx-auto p-4">
          <div className="flex justify-between border mb-8">
            <div
              className={`flex-1 flex justify-center items-center gap-2 py-2 ${
                step >= 1 ? "text-signature" : "text-gray-400"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full ${
                  step > 1 || completedSteps[0]
                    ? "bg-signature"
                    : "bg-secondary text-custom-gray-blue"
                }`}
              >
                {completedSteps[0] ? (
                  <FaCheck  className="w-5 h-5 mx-auto mt-3 text-white" />
                ) : (
                  <img
                    src="/images/companydetails.svg"
                    alt="Step 1"
                    className="w-7 h-7 mx-auto mt-3"
                  />
                )}
              </div>
              <div className="mt-2">
                <h1>1/3</h1>
                <h1>Company Details</h1>
              </div>
            </div>
            <div
              className={`flex-1 flex justify-center items-center gap-2 py-2 ${
                step >= 2 ? "text-signature" : "text-gray-400"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full ${
                  step > 2 || completedSteps[1]
                    ? "bg-signature"
                    : "bg-secondary text-custom-gray-blue"
                }`}
              >
                {completedSteps[1] ? (
                  <FaCheck  className="w-5 h-5 mx-auto mt-3 text-white" />
                ) : (
                  <img
                    src="/images/phone.svg"
                    alt="Step 2"
                    className="w-7 h-7 mx-auto mt-3"
                  />
                )}
              </div>
              <div className="mt-2">
                <h1 className="text-sm">2/3</h1>
                <h1>Contact Details</h1>
              </div>
            </div>
            <div
              className={`flex-1 flex justify-center items-center gap-2 py-2 ${
                step >= 3 ? "text-signature" : "text-gray-400"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full ${
                  step === 3 || completedSteps[2]
                    ? "bg-signature"
                    : "bg-secondary text-custom-gray-blue"
                }`}
              >
                {completedSteps[2] ? (
                  <FaCheck  className="w-5 h-5 mx-auto mt-3 text-white" />
                ) : (
                  <img
                    src="/images/notes.svg"
                    alt="Step 3"
                    className="w-7 h-7 mx-auto mt-3"
                  />
                )}
              </div>
              <div className="mt-2">
                <h1>3/3</h1>
                <h1>Company Media</h1>
              </div>
            </div>
          </div>
          {step === 1 && (
            <Step1
              formData={formData}
              setFormData={setFormData}
              nextStep={nextStep}
            />
          )}
          {step === 2 && (
            <Step2
              formData={formData}
              setFormData={setFormData}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}
          {step === 3 && (
            <Step3
              formData={formData}
              setFormData={setFormData}
              prevStep={prevStep}
              submitForm={submitForm}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default MultiStepForm;
