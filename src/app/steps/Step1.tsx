"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface StepProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  nextStep: () => void;
  errors: { [key: string]: string };
}

type FormData = {
  companyName: string;
  companySize: string;
  foundedYear: string;
  companyDescription: string;
  sector: string;
  services: string;
  languages: string;
  websiteUrl: string;
  contactNumber: string;
  email: string;
  country: string;
  province: string;
  city: string;
  address: string;
  mediaUrl: string;
  companyLogo: File | null;
  companyImages: File[];
};

const Step1: React.FC<StepProps> = ({ formData, setFormData, nextStep, errors }) => {
  return (
    <div className="max-w-3xl border rounded-lg mx-auto p-4">
      <h2 className="text-3xl text-custom-dark-blue text-center font-bold my-10">Company Details</h2>
      <div className="grid w-full items-center gap-1.5 mb-10">
        <Label className="text-custom-dark-blue" htmlFor="companyName">Company Name</Label>
        <Input
          type="text"
          id="companyName"
          placeholder="Enter company full name"
          value={formData.companyName}
          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
          className="w-full text-custom-gray-blue"
        />
        {errors.companyName && <p className="text-red-500">{errors.companyName}</p>}
      </div>

      <div className="grid w-full items-center gap-1.5 mb-10">
        <Label className="text-custom-dark-blue" htmlFor="companySize">Company Size</Label>
        <Input
          type="text"
          id="companySize"
          placeholder="Company Size"
          value={formData.companySize}
          onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
          className="w-full"
        />
        {errors.companySize && <p className="text-red-500">{errors.companySize}</p>}
      </div>

      <div className="grid w-full items-center gap-1.5 mb-10">
        <Label className="text-custom-dark-blue" htmlFor="foundedYear">Founded Year</Label>
        <Input
          type="text"
          id="foundedYear"
          placeholder="Founded Year"
          value={formData.foundedYear}
          onChange={(e) => setFormData({ ...formData, foundedYear: e.target.value })}
          className="w-full"
        />
        {errors.foundedYear && <p className="text-red-500">{errors.foundedYear}</p>}
      </div>

      <div className="grid w-full items-center gap-1.5 mb-10">
        <Label className="text-custom-dark-blue" htmlFor="companyDescription">Company Description</Label>
        <Input
          type="text"
          id="companyDescription"
          placeholder="Company Description"
          value={formData.companyDescription}
          onChange={(e) => setFormData({ ...formData, companyDescription: e.target.value })}
          className="w-full"
        />
        {errors.companyDescription && <p className="text-red-500">{errors.companyDescription}</p>}
      </div>

      <div className="grid w-full items-center gap-1.5 mb-10">
        <Label className="text-custom-dark-blue" htmlFor="sector">Sector</Label>
        <Input
          type="text"
          id="sector"
          placeholder="Sector"
          value={formData.sector}
          onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
          className="w-full"
        />
        {errors.sector && <p className="text-red-500">{errors.sector}</p>}
      </div>

      <div className="grid w-full items-center gap-1.5 mb-10">
        <Label className="text-custom-dark-blue" htmlFor="services">Services</Label>
        <Input
          type="text"
          id="services"
          placeholder="Services (comma-separated)"
          value={formData.services}
          onChange={(e) => setFormData({ ...formData, services: e.target.value })}
          className="w-full"
        />
        {errors.services && <p className="text-red-500">{errors.services}</p>}
      </div>

      <div className="grid w-full items-center gap-1.5 mb-10">
        <Label className="text-custom-dark-blue" htmlFor="languages">Languages</Label>
        <Input
          type="text"
          id="languages"
          placeholder="Languages (comma-separated)"
          value={formData.languages}
          onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
          className="w-full"
        />
        {errors.languages && <p className="text-red-500">{errors.languages}</p>}
      </div>

      <div className="flex justify-end">
        <Button onClick={nextStep} className="bg-signature w-full">Continue</Button>
      </div>
    </div>
  );
};

export default Step1;
