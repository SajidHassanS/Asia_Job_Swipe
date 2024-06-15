"use client"
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IoIosArrowDown } from "react-icons/io";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Checked = DropdownMenuCheckboxItemProps["checked"];

interface StepProps {
  formData: any;
  setFormData: (data: any) => void;
  nextStep: () => void;
}

const Step1: React.FC<StepProps> = ({ formData, setFormData, nextStep }) => {
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true);
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false);
  const [showPanel, setShowPanel] = React.useState<Checked>(false);

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
      </div>

      <div className="grid w-full gap-1.5 mb-10">
        <Label className="text-custom-dark-blue" htmlFor="industry">Industry</Label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex justify-between items-center pr-3 border w-full cursor-pointer">
              <Input
                type="text"
                id="industry"
                placeholder="Select"
                value={formData.industry || ''}
                readOnly
                className="w-full border-none focus:ring-0"
              />
              <IoIosArrowDown />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Industry Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={formData.industry === 'Technology'}
              onCheckedChange={() => setFormData({ ...formData, industry: 'Technology' })}
            >
              Technology
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={formData.industry === 'Finance'}
              onCheckedChange={() => setFormData({ ...formData, industry: 'Finance' })}
            >
              Finance
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={formData.industry === 'Healthcare'}
              onCheckedChange={() => setFormData({ ...formData, industry: 'Healthcare' })}
            >
              Healthcare
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid w-full gap-1.5 mb-10">
        <Label className="text-custom-dark-blue" htmlFor="specialization">Specialization</Label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex justify-between items-center pr-3 border w-full cursor-pointer">
              <Input
                type="text"
                id="specialization"
                placeholder="Select"
                value={formData.specialization || ''}
                readOnly
                className="w-full border-none focus:ring-0"
              />
              <IoIosArrowDown />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Specialization Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={formData.specialization === 'Software Development'}
              onCheckedChange={() => setFormData({ ...formData, specialization: 'Software Development' })}
            >
              Software Development
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={formData.specialization === 'Data Science'}
              onCheckedChange={() => setFormData({ ...formData, specialization: 'Data Science' })}
            >
              Data Science
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={formData.specialization === 'Cybersecurity'}
              onCheckedChange={() => setFormData({ ...formData, specialization: 'Cybersecurity' })}
            >
              Cybersecurity
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <Button className="w-full" onClick={nextStep}>Continue</Button>
    </div>
  );
};

export default Step1;
