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

interface ExperienceData {
  company: string;
  role: string;
  type: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  location: string;
  description: string;
  image: string;
}

const Experience = () => {
  const [experiences, setExperiences] = useState<ExperienceData[]>([
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
  const [selectedExperience, setSelectedExperience] =
    useState<ExperienceData | null>(null);
  const [experienceText, setExperienceText] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [type, setType] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [location, setLocation] = useState("");
  const [imagePreview, setImagePreview] = useState<
    string | ArrayBuffer | null
  >(null);

  const handleEditClick = (experience: ExperienceData) => {
    setSelectedExperience(experience);
    setExperienceText(experience.description);
    setCompany(experience.company);
    setRole(experience.role);
    setType(experience.type);
    setStartDate(experience.startDate || null);
    setEndDate(experience.endDate || null);
    setLocation(experience.location);
    setImagePreview(experience.image);
    setIsEditing(true);
  };

  const handleAddClick = () => {
    setSelectedExperience(null);
    setExperienceText("");
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
    if (selectedExperience) {
      selectedExperience.description = experienceText;
      selectedExperience.company = company;
      selectedExperience.role = role;
      selectedExperience.type = type;
      selectedExperience.startDate = startDate || undefined;
      selectedExperience.endDate = endDate || undefined;
      selectedExperience.location = location;
      if (typeof imagePreview === "string") {
        selectedExperience.image = imagePreview;
      }
      setExperiences([...experiences]);
    } else {
      const newExperience: ExperienceData = {
        company,
        role,
        type,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        location,
        description: experienceText,
        image:
          typeof imagePreview === "string" ? imagePreview : "/images/default.png", // Placeholder image
      };
      setExperiences([...experiences, newExperience]);
    }
    setIsEditing(false);
    setIsAdding(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setExperienceText(e.target.value);
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
        <h1 className="text-modaltext text-2xl font-semibold">Experiences</h1>
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
              <DialogTitle className="text-3xl font-bold">Add Experience</DialogTitle>
              <DialogDescription className="text-md text-gray-500">
                Add your new experience here. Click save when you're done.
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
                      alt="Experience Image"
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
                  value={experienceText}
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

      {experiences.map((experience, index) => (
        <div key={index} className={`pb-5 mb-5 ${index !== experiences.length - 1 ? 'border-b' : ''}`}>
          <div className="flex justify-between gap-5">
            <div>
              <Image src={experience.image} alt={experience.company} width={100} height={100} className="rounded-lg shadow-sm" />
            </div>
            <div>
              <div>
                <h1 className="text-lg font-semibold">{experience.role}</h1>
                <div className="flex text-base text-signininput">
                  <h1 className="text-modaltext font-medium">{experience.company}</h1> .<h1>{experience.type}</h1> .<h1>{format(experience.startDate!, "PPP")} - {format(experience.endDate!, "PPP")}</h1>
                </div>
                <div>
                  <h1 className="text-lg text-signininput">{experience.location}</h1>
                </div>
                <div>
                  <p className="text-modaltext">{experience.description}</p>
                </div>
              </div>
            </div>
            <div>
              <Dialog open={isEditing && selectedExperience === experience} onOpenChange={setIsEditing}>
                <DialogTrigger asChild>
                  <FaRegEdit className="text-signature border rounded-lg p-2 cursor-pointer" size={40} onClick={() => handleEditClick(experience)} />
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] p-6">
                  <DialogHeader>
                    <DialogTitle className="text-3xl font-bold">Edit Experience</DialogTitle>
                    <DialogDescription className="text-md text-gray-500">
                      Make changes to your experience here. Click save when you're done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="col-span-2 flex justify-center mb-4">
                      <div className="relative w-24 h-24 border-2 border-dashed rounded-full flex items-center justify-center">
                        {imagePreview ? (
                          <Image src={typeof imagePreview === "string" ? imagePreview : "/images/default.png"} alt="Experience Image" width={100} height={100} className="rounded-full" />
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
                      <textarea id="description" className="w-full border rounded-lg p-4 text-lg" rows={4} value={experienceText} onChange={handleChange} placeholder="Description" />
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

export default Experience;
