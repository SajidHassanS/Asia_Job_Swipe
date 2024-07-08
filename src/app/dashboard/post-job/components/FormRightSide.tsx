"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

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
  urgency: string;
  careerLevel: string;
  jobType: string;
  candidateType: string;
  workPermitNeeded: boolean;
}

type FormDataKey = keyof FormData;

interface FormRightSideProps {
  formData: FormData;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  handleMultiSelectChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>, field: FormDataKey) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const FormRightSide: React.FC<FormRightSideProps> = ({
  formData,
  handleChange,
  handleMultiSelectChange,
  handleSubmit,
}) => {
  return (
    <div>
      <div className="mb-8">
        <Label htmlFor="benefits">Benefits (Optional)</Label>
        <select
          id="benefits"
          name="benefits"
          value={formData.benefits}
          onChange={(e) => handleMultiSelectChange(e, "benefits")}
          className="w-full border rounded p-2"
          multiple
        >
          <option value="Dental">Dental</option>
          <option value="Car">Car</option>
          <option value="Flat">Flat</option>
          <option value="Overtimepay">Overtimepay</option>
        </select>
        <div className="flex gap-2 flex-wrap">
          {formData.benefits.map((benefit) => (
            <div
              key={benefit}
              className="rounded-lg mt-2 bg-background text-signature p-1"
            >
              {benefit}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8 gap-4">
        <div>
          <Label htmlFor="salaryFrom">Salary Indication</Label>
          <Input
            type="text"
            id="salaryFrom"
            name="salaryFrom"
            placeholder="Enter minimum salary"
            value={formData.salaryFrom}
            onChange={handleChange}
            className="w-full border mb-2 rounded p-2"
          />
          <Input
            type="text"
            id="salaryTo"
            name="salaryTo"
            placeholder="Enter maximum salary"
            value={formData.salaryTo}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
      </div>

      <div className="mb-8">
        <Label>Level of Urgency</Label>
        <div className="flex border justify-around items-center p-2 bg-background gap-2">
          {["High", "Medium", "Low"].map((level) => (
            <label key={level} className="flex items-center">
              <input
                type="radio"
                name="urgency"
                value={level}
                checked={formData.urgency === level}
                onChange={handleChange}
                className="mr-2"
              />
              {level}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <Label>Career Level</Label>
        <div className="flex border justify-around items-center p-2 bg-background gap-2">
          {["entry", "middle", "senior", "executive"].map((level) => (
            <label key={level} className="flex items-center">
              <input
                type="radio"
                name="careerLevel"
                value={level}
                checked={formData.careerLevel === level}
                onChange={handleChange}
                className="mr-2"
              />
              {level}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <Label>Job Type</Label>
        <div className="flex border justify-around items-center p-2 bg-background gap-2">
          {["full-time", "part-time"].map((type) => (
            <label key={type} className="flex items-center">
              <input
                type="radio"
                name="jobType"
                value={type}
                checked={formData.jobType === type}
                onChange={handleChange}
                className="mr-2"
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <Label>Candidate Type</Label>
        <div className="flex border justify-around items-center p-2 bg-background gap-2">
          {["remote", "contractual", "internship", "foreigner"].map((type) => (
            <label key={type} className="flex items-center">
              <input
                type="radio"
                name="candidateType"
                value={type}
                checked={formData.candidateType === type}
                onChange={handleChange}
                className="mr-2"
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-8 flex items-center">
        <Checkbox
          id="workPermitNeeded"
          name="workPermitNeeded"
          checked={formData.workPermitNeeded}
          onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
          className="mr-2"
        />
        <Label htmlFor="workPermitNeeded">Work Permit Needed</Label>
      </div>

      <div className=" ">
        <Button
          type="submit"
          className="w-full bg-signature text-background py-3"
          onClick={handleSubmit}
        >
          Post a Job
        </Button>
      </div>
    </div>
  );
};

export default FormRightSide;
