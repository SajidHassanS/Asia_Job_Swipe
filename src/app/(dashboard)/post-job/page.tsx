"use client";
import React, { useState } from "react";
import FormLeftSide from "./components/FormLeftSide";
import FormRightSide from "./components/FormRightSide";

interface FormData {
  jobTitle: string;
  sector: string;
  skillsRequired: string[];
  country: string;
  city: string;
  province: string;
  description: string;
  benefits: string[];
  salaryFrom: string;
  salaryTo: string;
  urgency: string[];
  careerLevel: string[];
  jobType: string[];
  candidateType: string[];
  workPermitNeeded: boolean;
}

const PostJob: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    jobTitle: "",
    sector: "",
    skillsRequired: [],
    country: "",
    city: "",
    province: "",
    description: "",
    benefits: [],
    salaryFrom: "",
    salaryTo: "",
    urgency: [],
    careerLevel: [],
    jobType: [],
    candidateType: [],
    workPermitNeeded: false,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleMultiSelectChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const { value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [field]: checked
        ? [...prevData[field], value]
        : prevData[field].filter((item) => item !== value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-8 rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-10">Post a New Job</h2>
      <form onSubmit={handleSubmit} className="flex flex-wrap -mx-4">
        <div className="w-full md:w-1/2 px-4 mb-4">
          <FormLeftSide
            formData={formData}
            handleChange={handleChange}
            handleMultiSelectChange={handleMultiSelectChange}
          />
        </div>
        <div className="w-full md:w-1/2 px-4 mb-4">
          <FormRightSide
            formData={formData}
            handleChange={handleChange}
            handleMultiSelectChange={handleMultiSelectChange}
            handleSubmit={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
};

export default PostJob;
