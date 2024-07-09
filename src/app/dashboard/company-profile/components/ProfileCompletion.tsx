import React, { useState, useRef } from "react";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";
import { FaGripfire, FaUsers } from "react-icons/fa";
import { TbBuildingSkyscraper } from "react-icons/tb";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const ProfileCompletion = () => {
  const [progress, setProgress] = useState(66);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "Dcodax",
    website: "https://www.dcodax.com",
    founded: "July 31, 2011",
    employees: "4000+",
    industry: "Software",
  });
  const [profileImage, setProfileImage] = useState("/images/motion.png");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSave = () => {
    // Handle save logic here
    setIsEditing(false);
    console.log("Saved data:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    // Reset form data to default or previous state
    setFormData({
      companyName: "Dcodax",
      website: "https://www.dcodax.com",
      founded: "July 31, 2011",
      employees: "4000+",
      industry: "Software",
    });
    setIsEditing(false);
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="border rounded-[20px] relative">
      <div className="flex gap-4 items-center rounded-tr-[20px] rounded-tl-[20px] bg-gradient-to-tr from-blue to-blue/20 p-5 relative">
        <div className="w-1/3 md:relative">
          <div
            className="md:absolute border-8 rounded-full border-white md:left-[40px] md:top-[10px] w-24 h-24 md:w-36 md:h-36 overflow-hidden cursor-pointer"
            onClick={handleImageClick}
          >
            <Image
              src={profileImage}
              alt="profile"
              width={150}
              height={150}
              className="rounded-full object-cover w-24 md:w-36"
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
        </div>

        <div className="md:w-2/3 w-full md:py-10">
          <div className="flex text-background justify-between">
            <div className="pb-3">
              <h1>Profile Completion</h1>
            </div>
            <div>
              <h1>50%</h1>
            </div>
          </div>
          <Progress color="bg-darkGrey" value={50} className="md:w-[100%] w-[80%]" />
        </div>
      </div>

      <div className="md:flex md:p-5 gap-3 md:gap-10">
        <div className="flex md:flex-col mt-5 gap-3 md:mt-16 md:items-center md:w-1/3"></div>
        <div className="md:w-2/3 p-4">
          <div className="flex justify-between">
            <div>
              <h1 className="md:text-3xl text-xl text-modaltext">{formData.companyName || "Full Name"}</h1>
              <p className="md:text-xl text-md text-signininput4 py-2">
                <Link href={formData.website || "#"} className="text-signature hover:underline" target="_blank" rel="noopener noreferrer">
                  {formData.website || "https://ajs-files.hostdonor.com"}
                </Link>
              </p>
            </div>
            <div>
              <Dialog open={isEditing} onOpenChange={setIsEditing}>
                <DialogTrigger asChild>
                  <Button className="text-signature" variant="outline" onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] p-6">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Edit Profile</DialogTitle>
                    <DialogDescription className="text-md text-gray-500">
                      Make changes to your profile here. Click save when you are done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="companyName" className="text-right">
                        Company Name
                      </Label>
                      <Input
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="Full Name"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="website" className="text-right">
                        Website
                      </Label>
                      <Input
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        placeholder="https://ajs-files.hostdonor.com"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="founded" className="text-right">
                        Founded
                      </Label>
                      <Input
                        id="founded"
                        name="founded"
                        value={formData.founded}
                        onChange={handleChange}
                        placeholder="July 31, 2011"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="employees" className="text-right">
                        Employees
                      </Label>
                      <Input
                        id="employees"
                        name="employees"
                        value={formData.employees}
                        onChange={handleChange}
                        placeholder="4000+"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="industry" className="text-right">
                        Industry
                      </Label>
                      <Input
                        id="industry"
                        name="industry"
                        value={formData.industry}
                        onChange={handleChange}
                        placeholder="Software"
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter className="flex justify-between">
                    <Button variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                    <Button type="submit" onClick={handleSave}>
                      Save changes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
      <div className="px-5 md:px-7 pb-5 flex justify-around">
        <div className="flex items-center gap-3">
          <div>
            <FaGripfire className="text-signature" size={30} />
          </div>
          <div className="text-xl">
            <h1 className="text-signininput">Founded</h1>
            <p>{formData.founded}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div>
            <FaUsers className="text-signature" size={30} />
          </div>
          <div className="text-xl">
            <h1 className="text-signininput">Employees</h1>
            <p>{formData.employees}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div>
            <TbBuildingSkyscraper className="text-signature" size={30} />
          </div>
          <div className="text-xl">
            <h1 className="text-signininput">Industry</h1>
            <p>{formData.industry}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCompletion;
