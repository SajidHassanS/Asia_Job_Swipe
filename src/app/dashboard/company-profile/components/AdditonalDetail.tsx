import React, { useState } from 'react';
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineMailOutline, MdPhoneAndroid } from "react-icons/md";
import { TbLanguage } from "react-icons/tb";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AdditionalDetail = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [details, setDetails] = useState({
    email: "jakegyll@email.com",
    phone: "+44 1245 572 135",
    languages: "English, French",
  });
  const [formData, setFormData] = useState(details);

  const handleEditClick = () => {
    setFormData(details); // Reset form data to current details
    setIsEditing(true);
  };

  const handleSave = () => {
    setDetails(formData);
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="border rounded-[20px] py-6 px-5">
      <div className="flex justify-between">
        <h1 className="text-modaltext text-2xl">Additional Details</h1>
        <button onClick={handleEditClick}>
          <FaRegEdit className="text-signature border rounded-lg p-2 cursor-pointer" size={40} />
        </button>
      </div>

      <div className="py-8">
        <div className="flex gap-5">
          <div><MdOutlineMailOutline className="text-signininput4" size={30} /></div>
          <div>
            <h1 className="text-lg text-signininput4">Email</h1>
            <p className="text-lg text-modaltext">{details.email}</p>
          </div>
        </div>
        <div className="py-8">
          <div className="flex gap-5">
            <div><MdPhoneAndroid className="text-signininput4" size={30} /></div>
            <div>
              <h1 className="text-lg text-signininput4">Phone</h1>
              <p className="text-lg text-modaltext">{details.phone}</p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex gap-5">
            <div><TbLanguage className="text-signininput4" size={30} /></div>
            <div>
              <h1 className="text-lg text-signininput4">Languages</h1>
              <p className="text-lg text-modaltext">{details.languages}</p>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-[600px] p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Edit Additional Details</DialogTitle>
            <DialogDescription className="text-md text-gray-500">
              Make changes to your additional details here. Click save when you are done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="languages" className="text-right">
                Languages
              </Label>
              <Input
                id="languages"
                name="languages"
                value={formData.languages}
                onChange={handleChange}
                placeholder="Languages"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleSave}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdditionalDetail;
