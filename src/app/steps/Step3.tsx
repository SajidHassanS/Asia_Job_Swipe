"use client";
import React from 'react';
import { LuUpload } from "react-icons/lu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface StepProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  prevStep: () => void;
  submitForm: () => void;
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

const Step3: React.FC<StepProps> = ({ formData, setFormData, prevStep, submitForm, errors }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 0) {
      if (field === 'companyLogo') {
        setFormData({ ...formData, companyLogo: files[0] });
      } else if (field === 'companyImages') {
        setFormData({ ...formData, companyImages: files });
      }
    }
  };

  return (
    <div className="max-w-3xl border rounded-lg mx-auto p-4">
      <h2 className="text-3xl text-custom-dark-blue text-center font-bold my-10">Company Media</h2>
      
      <div className="grid w-full items-center gap-1.5 mb-10">
        <Label className="text-custom-dark-blue" htmlFor="mediaUrl">Media URL</Label>
        <Input
          type="text"
          id="mediaUrl"
          placeholder="Enter media URL"
          value={formData.mediaUrl}
          onChange={(e) => setFormData({ ...formData, mediaUrl: e.target.value })}
          className="w-full"
        />
        {errors.mediaUrl && <p className="text-red-500">{errors.mediaUrl}</p>}
      </div>

      <div className="grid w-full items-center gap-1.5 mb-10">
        <Label className="text-custom-dark-blue" htmlFor="companyLogo">Company Logo</Label>
        <div className="flex items-center border p-4 rounded h-32 justify-center text-center">
          <input
            type="file"
            id="companyLogo"
            accept=".jpeg, .png"
            onChange={(e) => handleFileChange(e, 'companyLogo')}
            className="hidden"
          />
          <label htmlFor="companyLogo" className="cursor-pointer flex flex-col items-center gap-2">
            <LuUpload className="text-4xl" />
            <span className="text-sm text-gray-500">File formats: jpeg, png</span>
          </label>
        </div>
      </div>

      <div className="grid w-full items-center gap-1.5 mb-10">
        <Label className="text-custom-dark-blue" htmlFor="companyImages">Company Images</Label>
        <div className="flex items-center border p-4 rounded h-32 justify-center text-center">
          <input
            type="file"
            id="companyImages"
            accept=".jpeg, .png"
            multiple
            onChange={(e) => handleFileChange(e, 'companyImages')}
            className="hidden"
          />
          <label htmlFor="companyImages" className="cursor-pointer flex flex-col items-center gap-2">
            <LuUpload className="text-4xl" />
            <span className="text-sm text-gray-500">File formats: jpeg, png</span>
          </label>
        </div>
      </div>

      <div className="flex justify-between">
        <Button onClick={prevStep} className="bg-custom-gray-blue w-1/4">Back</Button>
        <Button onClick={submitForm} className="bg-signature w-1/4">Submit</Button>
      </div>
    </div>
  );
};

export default Step3;
