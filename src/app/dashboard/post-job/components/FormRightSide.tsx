"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RiArrowDropDownLine, RiCloseLine } from "react-icons/ri";

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const benefitsOptions = ["Dental", "Car", "Flat", "Overtimepay"];
  const [selectedBenefits, setSelectedBenefits] = useState<string[]>(formData.benefits);

  const handleBenefitToggle = (benefit: string) => {
    const updatedBenefits = selectedBenefits.includes(benefit)
      ? selectedBenefits.filter((b) => b !== benefit)
      : [...selectedBenefits, benefit];

    setSelectedBenefits(updatedBenefits);
    handleMultiSelectChange(
      {
        target: { name: "benefits", value: updatedBenefits } as unknown as HTMLSelectElement,
        currentTarget: {} as HTMLSelectElement,
      } as React.ChangeEvent<HTMLSelectElement>,
      "benefits"
    );
  };

  const handleDeleteBenefit = (benefit: string) => {
    const updatedBenefits = selectedBenefits.filter((b) => b !== benefit);
    setSelectedBenefits(updatedBenefits);
    handleMultiSelectChange(
      {
        target: { name: "benefits", value: updatedBenefits } as unknown as HTMLSelectElement,
        currentTarget: {} as HTMLSelectElement,
      } as React.ChangeEvent<HTMLSelectElement>,
      "benefits"
    );
  };

  return (
    <div>
      <div className="mb-8">
        <Label htmlFor="benefits">Benefits (Optional)</Label>
        <div className="relative">
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full justify-between"
              >
                Select Benefits
                <RiArrowDropDownLine size={25} className="absolute right-0" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full max-h-80 overflow-y-auto">
              <DropdownMenuLabel>Benefits</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {benefitsOptions.map((benefit) => (
                <DropdownMenuCheckboxItem
                  key={benefit}
                  checked={selectedBenefits.includes(benefit)}
                  onCheckedChange={() => handleBenefitToggle(benefit)}
                >
                  {benefit}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex gap-2 flex-wrap mt-2">
          {selectedBenefits.map((benefit) => (
            <div
              key={benefit}
              className="flex items-center gap-2 bg-gray-200 rounded p-1"
            >
              <span>{benefit}</span>
              <RiCloseLine
                className="text-red-500 cursor-pointer"
                size={16}
                onClick={() => handleDeleteBenefit(benefit)}
              />
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
