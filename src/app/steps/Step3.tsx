import React from 'react';
import { LuUpload } from "react-icons/lu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface StepProps {
  formData: any;
  setFormData: (data: any) => void;
  prevStep: () => void;
  submitForm: () => void;
}

const Step3: React.FC<StepProps> = ({ formData, setFormData, prevStep, submitForm }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setFormData({ ...formData, [field]: file });
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

      <div className="flex justify-end">
        <Button onClick={submitForm} className="bg-signature w-full p-2 rounded">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Step3;
