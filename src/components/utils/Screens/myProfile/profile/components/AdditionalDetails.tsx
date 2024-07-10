// AdditionalDetails.tsx
import React, { useState, useEffect } from 'react';
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineMailOutline, MdPhoneAndroid } from "react-icons/md";
import { TbLanguage } from "react-icons/tb";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProfileFormData } from '../Profile';

interface AdditionalDetailsProps {
  formData: ProfileFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProfileFormData>>;
  handleSave: (updates: Partial<ProfileFormData>) => void;
}

const AdditionalDetails: React.FC<AdditionalDetailsProps> = ({ formData, setFormData, handleSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValues, setInputValues] = useState({
    email: formData.email,
    phone: formData.phone,
    languages: formData.languages.join(', '),
  });

  useEffect(() => {
    setInputValues({
      email: formData.email,
      phone: formData.phone,
      languages: formData.languages.join(', '),
    });
  }, [formData]);

  const handleSaveClick = () => {
    handleSave({
      phone: inputValues.phone,
      languages: inputValues.languages.split(',').map(lang => lang.trim()),
    });
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="border rounded-[20px] py-6 px-5 bg-white shadow-md">
      <div className="flex justify-between">
        <h1 className="text-modaltext text-2xl font-semibold">Additional Details</h1>
        <FaRegEdit className="text-signature border rounded-lg p-2 cursor-pointer" size={40} onClick={() => setIsEditing(true)} />
      </div>

      <div className="py-8">
        <div className="flex gap-5">
          <MdOutlineMailOutline className="text-signininput4" size={30} />
          <div>
            <h1 className="text-lg text-signininput4">Email</h1>
            <p className="text-lg text-modaltext">{formData.email}</p>
          </div>
        </div>
      </div>
      {formData.phone && (
        <div className="py-8">
          <div className="flex gap-5">
            <MdPhoneAndroid className="text-signininput4" size={30} />
            <div>
              <h1 className="text-lg text-signininput4">Phone</h1>
              <p className="text-lg text-modaltext">{formData.phone}</p>
            </div>
          </div>
        </div>
      )}
      <div>
        <div className="flex gap-5">
          <TbLanguage className="text-signininput4" size={30} />
          <div>
            <h1 className="text-lg text-signininput4">Languages</h1>
            <p className="text-lg text-modaltext">{formData.languages.join(', ')}</p>
          </div>
        </div>
      </div>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogTrigger asChild>
          <div></div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] p-6">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold">Edit Additional Details</DialogTitle>
            <DialogDescription className="text-md text-gray-500">
              Make changes to your additional details here. Click save when you are done.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="grid gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  value={inputValues.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full mt-2"
                  disabled
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={inputValues.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className="w-full mt-2"
                />
              </div>
              <div>
                <Label htmlFor="languages">Languages</Label>
                <Input
                  id="languages"
                  name="languages"
                  value={inputValues.languages}
                  onChange={handleChange}
                  placeholder="Languages"
                  className="w-full mt-2"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
            <Button type="submit" onClick={handleSaveClick}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdditionalDetails;
