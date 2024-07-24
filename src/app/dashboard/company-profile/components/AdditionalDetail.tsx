import React, { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
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

interface AdditionalDetailProps {
  email: string;
  address: string;
  languages: string;
  onUpdate: (updates: Partial<{
    email: string;
    address: string;
    languages: string[];
  }>) => Promise<void>;
}

const AdditionalDetail: React.FC<AdditionalDetailProps> = ({ email, address, languages, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email,
    languages,
    address,
  });

  useEffect(() => {
    console.log("Updating formData with:", { email, address, languages });
    setFormData({
      email,
      languages,
      address,
    });
  }, [email, address, languages]);

  const handleSave = async () => {
    await onUpdate({
      email: formData.email,
      languages: formData.languages.split(",").map(lang => lang.trim()),
      address: formData.address,
    });
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="border rounded-[20px] py-6 px-5">
      <div className="flex justify-between">
        <h1 className="text-modaltext text-2xl">Additional Details</h1>
        <button onClick={() => setIsEditing(true)}>
          <FaRegEdit className="text-signature border rounded-lg p-2 cursor-pointer" size={40} />
        </button>
      </div>

      <div className="py-8">
        <div className="flex gap-5">
          <div>
            <MdOutlineMailOutline className="text-signininput4" size={30} />
          </div>
          <div>
            <h1 className="text-lg text-signininput4">Email</h1>
            <p className="text-lg text-modaltext">{formData.email}</p>
          </div>
        </div>
        <div className="py-8">
          <div className="flex gap-5">
            <div>
              <FaMapMarkerAlt className="text-signininput4" size={30} />
            </div>
            <div>
              <h1 className="text-lg text-signininput4">Address</h1>
              <p className="text-lg text-modaltext">{formData.address}</p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex gap-5">
            <div>
              <TbLanguage className="text-signininput4" size={30} />
            </div>
            <div>
              <h1 className="text-lg text-signininput4">Languages</h1>
              <p className="text-lg text-modaltext">{formData.languages}</p>
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
              <Label htmlFor="address" className="text-right">
                Address
              </Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
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
