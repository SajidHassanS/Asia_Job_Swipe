import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

interface FormLeftSideProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleMultiSelectChange: (e: React.ChangeEvent<HTMLInputElement>, field: string) => void;
}

const FormLeftSide: React.FC<FormLeftSideProps> = ({ formData, handleChange, handleMultiSelectChange }) => {
  return (
    <div>
      <div className="mb-8">
        <Label htmlFor="jobTitle">Job Title</Label>
        <Input
          type="text"
          id="jobTitle"
          name="jobTitle"
          placeholder="Enter job title"
          value={formData.jobTitle}
          onChange={handleChange}
          className="w-full"
        />
      </div>

      <div className="mb-8">
        <Label htmlFor="sector">Sector</Label>
        <select
          id="sector"
          name="sector"
          value={formData.sector}
          onChange={handleChange}
          className="w-full border rounded p-2"
        >
          <option value="">Select</option>
          <option value="IT">IT</option>
          <option value="Finance">Finance</option>
          <option value="Healthcare">Healthcare</option>
        </select>
      </div>

      <div className="mb-8">
        <Label htmlFor="skillsRequired">Skills Required</Label>
        <select
                    id="benefits"
                    name="benefits"
                    value={formData.benefits}
                    onChange={handleChange}
                    className="w-full border mb-2 rounded p-2"
                >
                    <option value="Select">Select</option>
                    <option value="Car">Car</option>
                    <option value="Flat">Flat</option>
                    <option value="Overtimepay">Overtimepay</option>
                </select>
        <div className="flex gap-2 flex-wrap">
          {["Communication", "Analytics", "Facebook Ads"].map((skill) => (
             <div
             key={skill}
             className="rounded-lg mt-2 bg-background text-signature p-1"
         >
             {skill}
         </div>
          ))}
        </div>
      </div>
      <div className="mb-8">
                <Label htmlFor="country">Country</Label>
                <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                >
                    <option value="">Select</option>
                    <option value="USA">USA</option>
                    <option value="Canada">Canada</option>
                    <option value="UK">UK</option>
                </select>
            </div>

           
      <div className="mb-8">
        <Label htmlFor="city">City</Label>
        <select
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="w-full border rounded p-2"
        >
          <option value="">Select</option>
          <option value="New York">New York</option>
          <option value="Toronto">Toronto</option>
          <option value="London">London</option>
        </select>
      </div>

      <div className="mb-8">
                <Label htmlFor="province">Province</Label>
                <select
                    id="province"
                    name="province"
                    value={formData.province}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                >
                    <option value="">Select</option>
                    <option value="California">California</option>
                    <option value="Ontario">Ontario</option>
                    <option value="England">England</option>
                </select>
            </div>

      <div className="mb-8 ">
        <Label htmlFor="description">Description</Label>
        <textarea
          id="description"
          name="description"
          placeholder="Enter job description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded p-2"
          rows={4}
        />
      </div>

    
    </div>
  );
};

export default FormLeftSide;
