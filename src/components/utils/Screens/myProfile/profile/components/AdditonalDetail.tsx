import React, { useState } from 'react';
import Image from "next/image";
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

const AdditionalDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState("jakegyll@email.com");
  const [phone, setPhone] = useState("+44 1245 572 135");
  const [languages, setLanguages] = useState("English, French");

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="border rounded-[20px] py-6 px-5 bg-white shadow-md">
      <div className="flex justify-between">
        <h1 className="text-modaltext text-2xl font-semibold">Additional Details</h1>
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogTrigger asChild>
            <FaRegEdit className="text-signature border rounded-lg p-2 cursor-pointer" size={40} onClick={() => setIsEditing(true)} />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] p-6">
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold">Edit Additional Details</DialogTitle>
              <DialogDescription className="text-md text-gray-500">
                Make changes to your additional details here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone"
                    className="w-full mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="languages">Languages</Label>
                  <Input
                    id="languages"
                    value={languages}
                    onChange={(e) => setLanguages(e.target.value)}
                    placeholder="Languages"
                    className="w-full mt-2"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button type="submit" onClick={handleSave}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="py-8">
        <div className="flex gap-5">
          <MdOutlineMailOutline className="text-signininput4" size={30} />
          <div>
            <h1 className="text-lg text-signininput4">Email</h1>
            <p className="text-lg text-modaltext">{email}</p>
          </div>
        </div>
      </div>
      <div className="py-8">
        <div className="flex gap-5">
          <MdPhoneAndroid className="text-signininput4" size={30} />
          <div>
            <h1 className="text-lg text-signininput4">Phone</h1>
            <p className="text-lg text-modaltext">{phone}</p>
          </div>
        </div>
      </div>
      <div>
        <div className="flex gap-5">
          <TbLanguage className="text-signininput4" size={30} />
          <div>
            <h1 className="text-lg text-signininput4">Languages</h1>
            <p className="text-lg text-modaltext">{languages}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdditionalDetails;
