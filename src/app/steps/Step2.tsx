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
  prevStep: () => void;
}

const Step2: React.FC<StepProps> = ({ formData, setFormData, nextStep, prevStep }) => {
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
            <DropdownMenuCheckboxItem
              checked={formData.country === 'USA'}
              onCheckedChange={() => setFormData({ ...formData, country: 'USA' })}
            >
              USA
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={formData.country === 'Canada'}
              onCheckedChange={() => setFormData({ ...formData, country: 'Canada' })}
            >
              Canada
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={formData.country === 'UK'}
              onCheckedChange={() => setFormData({ ...formData, country: 'UK' })}
            >
              UK
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
            <DropdownMenuCheckboxItem
              checked={formData.province === 'California'}
              onCheckedChange={() => setFormData({ ...formData, province: 'California' })}
            >
              California
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={formData.province === 'Ontario'}
              onCheckedChange={() => setFormData({ ...formData, province: 'Ontario' })}
            >
              Ontario
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={formData.province === 'London'}
              onCheckedChange={() => setFormData({ ...formData, province: 'London' })}
            >
              London
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
            <DropdownMenuCheckboxItem
              checked={formData.city === 'Los Angeles'}
              onCheckedChange={() => setFormData({ ...formData, city: 'Los Angeles' })}
            >
              Los Angeles
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={formData.city === 'Toronto'}
              onCheckedChange={() => setFormData({ ...formData, city: 'Toronto' })}
            >
              Toronto
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={formData.city === 'London'}
              onCheckedChange={() => setFormData({ ...formData, city: 'London' })}
            >
              London
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
      </div>

      {/* <div className="flex justify-between"> */}
        {/* <Button onClick={prevStep} className="bg-custom-gray-blue w-full ">Back</Button> */}
        <Button onClick={nextStep} className="bg-signature w-full ">Continue</Button>
      {/* </div> */}
    </div>
  );
};

export default Step2;
