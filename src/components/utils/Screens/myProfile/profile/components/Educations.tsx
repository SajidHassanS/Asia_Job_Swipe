import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import Image from "next/image";
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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

interface EducationsData {
  company: string;
  role: string;
  type: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  location: string;
  description: string;
  image: string;
}

const Educations = () => {
  const [Educationss, setEducationss] = useState<EducationsData[]>([
    {
      company: "Twitter",
      role: "Product designer",
      type: "Full-Time",
      startDate: new Date(2019, 5, 1),
      endDate: new Date(2020, 5, 1),
      location: "Manchester, UK",
      description:
        "Created and executed social media plan for 10 brands utilizing multiple features and content types to increase brand outreach, engagement, and leads.",
      image: "/images/twitter.png",
    },
    {
      company: "Marketing",
      role: "Product designer",
      type: "Full-Time",
      startDate: new Date(2019, 5, 1),
      endDate: new Date(2020, 5, 1),
      location: "Manchester, UK",
      description:
        "Created and executed social media plan for 10 brands utilizing multiple features and content types to increase brand outreach, engagement, and leads.",
      image: "/images/marketing.png",
    },
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedEducations, setSelectedEducations] =
    useState<EducationsData | null>(null);
  const [EducationsText, setEducationsText] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [type, setType] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [location, setLocation] = useState("");
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    null
  );

  const handleEditClick = (Educations: EducationsData) => {
    setSelectedEducations(Educations);
    setEducationsText(Educations.description);
    setCompany(Educations.company);
    setRole(Educations.role);
    setType(Educations.type);
    setStartDate(Educations.startDate || null);
    setEndDate(Educations.endDate || null);
    setLocation(Educations.location);
    setImagePreview(Educations.image);
    setIsEditing(true);
  };

  const handleAddClick = () => {
    setSelectedEducations(null);
    setEducationsText("");
    setCompany("");
    setRole("");
    setType("");
    setStartDate(null);
    setEndDate(null);
    setLocation("");
    setImagePreview(null);
    setIsAdding(true);
  };

  const handleSave = () => {
    if (selectedEducations) {
      selectedEducations.description = EducationsText;
      selectedEducations.company = company;
      selectedEducations.role = role;
      selectedEducations.type = type;
      selectedEducations.startDate = startDate || undefined;
      selectedEducations.endDate = endDate || undefined;
      selectedEducations.location = location;
      if (typeof imagePreview === "string") {
        selectedEducations.image = imagePreview;
      }
      setEducationss([...Educationss]);
    } else {
      const newEducations: EducationsData = {
        company,
        role,
        type,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        location,
        description: EducationsText,
        image:
          typeof imagePreview === "string"
            ? imagePreview
            : "/images/default.png", // Placeholder image
      };
      setEducationss([...Educationss, newEducations]);
    }
    setIsEditing(false);
    setIsAdding(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEducationsText(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="border rounded-[20px] py-6 px-5 bg-white shadow-md">
      <div className="flex justify-between mb-5">
        <h1 className="text-modaltext text-2xl font-semibold">Educations</h1>
        <Dialog open={isAdding} onOpenChange={setIsAdding}>
          <DialogTrigger asChild>
            <CiSquarePlus
              className="text-signature border rounded-lg p-2 cursor-pointer"
              size={40}
              onClick={handleAddClick}
            />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] p-6">
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold">Add Educations</DialogTitle>
              <DialogDescription className="text-md text-gray-500">
                Add your new Educations here. Click save when you are done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="col-span-2 flex justify-center mb-4">
                <div className="relative w-24 h-24 border-2 border-dashed rounded-full flex items-center justify-center">
                  {imagePreview ? (
                    <Image
                      src={
                        typeof imagePreview === "string"
                          ? imagePreview
                          : "/images/default.png"
                      }
                      alt="Educations Image"
                      width={100}
                      height={100}
                      className="rounded-full"
                    />
                  ) : (
                    <span className="text-gray-500">Add Image</span>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Company"
                />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Role"
                />
              </div>
              <div>
                <Label htmlFor="type">Type</Label>
                <Input
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  placeholder="Type"
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Location"
                />
              </div>
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  className="w-full border rounded-lg p-2"
                  placeholderText="Pick a date"
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  className="w-full border rounded-lg p-2"
                  placeholderText="Pick a date"
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  className="w-full border rounded-lg p-4 text-lg"
                  rows={4}
                  value={EducationsText}
                  onChange={handleChange}
                  placeholder="Description"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
              <Button type="submit" onClick={handleSave}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {Educationss.map((Educations, index) => (
        <div key={index} className={`pb-5 mb-5 ${index !== Educationss.length - 1 ? 'border-b' : ''}`}>
          <div className="flex justify-between gap-5">
            <div>
              <Image src={Educations.image} alt={Educations.company} width={100} height={100} className="rounded-lg shadow-sm" />
            </div>
            <div>
              <div>
                <h1 className="text-lg font-semibold">{Educations.role}</h1>
                <div className="flex text-base text-signininput">
                  <h1 className="text-modaltext font-medium">{Educations.company}</h1> .<h1>{Educations.type}</h1> .<h1>{format(Educations.startDate!, "PPP")} - {format(Educations.endDate!, "PPP")}</h1>
                </div>
                <div>
                  <h1 className="text-lg text-signininput">{Educations.location}</h1>
                </div>
                <div>
                  <p className="text-modaltext">{Educations.description}</p>
                </div>
              </div>
            </div>
            <div>
              <Dialog open={isEditing && selectedEducations === Educations} onOpenChange={setIsEditing}>
                <DialogTrigger asChild>
                  <FaRegEdit className="text-signature border rounded-lg p-2 cursor-pointer" size={40} onClick={() => handleEditClick(Educations)} />
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] p-6">
                  <DialogHeader>
                    <DialogTitle className="text-3xl font-bold">Edit Educations</DialogTitle>
                    <DialogDescription className="text-md text-gray-500">
                      Make changes to your Educations here. Click save when you are done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="col-span-2 flex justify-center mb-4">
                      <div className="relative w-24 h-24 border-2 border-dashed rounded-full flex items-center justify-center">
                        {imagePreview ? (
                          <Image src={typeof imagePreview === "string" ? imagePreview : "/images/default.png"} alt="Educations Image" width={100} height={100} className="rounded-full" />
                        ) : (
                          <span className="text-gray-500">Add Image</span>
                        )}
                        <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company" />
                    </div>
                    <div>
                      <Label htmlFor="role">Role</Label>
                      <Input id="role" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role" />
                    </div>
                    <div>
                      <Label htmlFor="type">Type</Label>
                      <Input id="type" value={type} onChange={(e) => setType(e.target.value)} placeholder="Type" />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
                    </div>
                    <div>
                      <Label htmlFor="startDate">Start Date</Label>
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        className="w-full border rounded-lg p-2"
                        placeholderText="Pick a date"
                      />
                    </div>
                    <div>
                      <Label htmlFor="endDate">End Date</Label>
                      <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        className="w-full border rounded-lg p-2"
                        placeholderText="Pick a date"
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="description">Description</Label>
                      <textarea id="description" className="w-full border rounded-lg p-4 text-lg" rows={4} value={EducationsText} onChange={handleChange} placeholder="Description" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                    <Button type="submit" onClick={handleSave}>Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Educations;