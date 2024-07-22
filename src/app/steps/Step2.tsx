"use client";
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoIosArrowDown } from "react-icons/io";

interface StepProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  nextStep: () => void;
  prevStep: () => void;
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

const countries = ["Thailand", "USA", "Canada"] as const;
const provinces: { [key in typeof countries[number]]: string[] } = {
  Thailand: ["Bangkok", "Chiang Mai", "Phuket"],
  USA: ["California", "Texas", "New York"],
  Canada: ["Ontario", "Quebec", "British Columbia"],
};

const cities: { [key: string]: string[] } = {
  Bangkok: ["District 1", "District 2"],
  "Chiang Mai": ["District 1", "District 2"],
  Phuket: ["District 1", "District 2"],
  California: ["Los Angeles", "San Francisco"],
  Texas: ["Houston", "Dallas"],
  "New York": ["New York City", "Buffalo"],
  Ontario: ["Toronto", "Ottawa"],
  Quebec: ["Montreal", "Quebec City"],
  "British Columbia": ["Vancouver", "Victoria"],
};

const Step2: React.FC<StepProps> = ({ formData, setFormData, nextStep, prevStep, errors }) => {
  return (
    <div className="max-w-3xl border rounded-lg mx-auto p-4">
      <h2 className="text-3xl text-custom-dark-blue text-center font-bold my-10">Contact Details</h2>

      <div className="grid w-full items-center gap-1.5 mb-10">
        <Label className="text-custom-dark-blue" htmlFor="websiteUrl">Website URL</Label>
        <Input
          type="text"
          id="websiteUrl"
          placeholder="Enter website URL"
          value={formData.websiteUrl}
          onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
          className="w-full"
        />
        {errors.websiteUrl && <p className="text-red-500">{errors.websiteUrl}</p>}
      </div>

      <div className="grid w-full items-center gap-1.5 mb-10">
        <Label className="text-custom-dark-blue" htmlFor="contactNumber">Contact Number</Label>
        <Input
          type="text"
          id="contactNumber"
          placeholder="Enter contact number"
          value={formData.contactNumber}
          onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
          className="w-full"
        />
        {errors.contactNumber && <p className="text-red-500">{errors.contactNumber}</p>}
      </div>

      <div className="grid w-full items-center gap-1.5 mb-10">
        <Label className="text-custom-dark-blue" htmlFor="email">Email Address</Label>
        <Input
          type="email"
          id="email"
          placeholder="Enter email address"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full"
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
      </div>

      <div className="grid w-full gap-1.5 mb-10">
        <Label className="text-custom-dark-blue" htmlFor="country">Country</Label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex justify-between items-center pr-3 border w-full cursor-pointer">
              <Input
                type="text"
                id="country"
                placeholder="Select country"
                value={formData.country || ''}
                readOnly
                className="w-full border-none focus:ring-0"
              />
              <IoIosArrowDown />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Country Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {countries.map(country => (
              <DropdownMenuCheckboxItem
                key={country}
                checked={formData.country === country}
                onCheckedChange={() => setFormData({ ...formData, country })}
              >
                {country}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        {errors.country && <p className="text-red-500">{errors.country}</p>}
      </div>

      <div className="grid w-full gap-1.5 mb-10">
        <Label className="text-custom-dark-blue" htmlFor="province">Province</Label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex justify-between items-center pr-3 border w-full cursor-pointer">
              <Input
                type="text"
                id="province"
                placeholder="Select province"
                value={formData.province || ''}
                readOnly
                className="w-full border-none focus:ring-0"
              />
              <IoIosArrowDown />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Province Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {(provinces[formData.country as keyof typeof provinces] || []).map(province => (
              <DropdownMenuCheckboxItem
                key={province}
                checked={formData.province === province}
                onCheckedChange={() => setFormData({ ...formData, province })}
              >
                {province}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        {errors.province && <p className="text-red-500">{errors.province}</p>}
      </div>

      <div className="grid w-full gap-1.5 mb-10">
        <Label className="text-custom-dark-blue" htmlFor="city">City</Label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex justify-between items-center pr-3 border w-full cursor-pointer">
              <Input
                type="text"
                id="city"
                placeholder="Select city"
                value={formData.city || ''}
                readOnly
                className="w-full border-none focus:ring-0"
              />
              <IoIosArrowDown />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>City Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {(cities[formData.province] || []).map(city => (
              <DropdownMenuCheckboxItem
                key={city}
                checked={formData.city === city}
                onCheckedChange={() => setFormData({ ...formData, city })}
              >
                {city}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        {errors.city && <p className="text-red-500">{errors.city}</p>}
      </div>

      <div className="grid w-full items-center gap-1.5 mb-10">
        <Label className="text-custom-dark-blue" htmlFor="address">Address</Label>
        <Input
          type="text"
          id="address"
          placeholder="Enter address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className="w-full"
        />
        {errors.address && <p className="text-red-500">{errors.address}</p>}
      </div>

      <div className="flex justify-between">
        <Button onClick={prevStep} className="bg-custom-gray-blue w-1/4">Back</Button>
        <Button onClick={nextStep} className="bg-signature w-1/4">Continue</Button>
      </div>
    </div>
  );
};

export default Step2;
