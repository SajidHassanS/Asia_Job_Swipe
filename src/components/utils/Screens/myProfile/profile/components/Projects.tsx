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

interface ProjectData {
  name: string;
  description: string;
  startDate: Date | null;
  endDate: Date | null;
  link: string;
  image: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<ProjectData[]>([
    {
      name: "FeastFlow Software Development",
      description: "Software Development xyz......",
      startDate: new Date(2005, 0, 1),
      endDate: new Date(2009, 0, 1),
      link: "http://ajs-files.hostdonor.com",
      image: "/images/feast.png",
    },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [projectLink, setProjectLink] = useState("");
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);

  const handleEditClick = (project: ProjectData) => {
    setSelectedProject(project);
    setProjectName(project.name);
    setProjectDescription(project.description);
    setStartDate(project.startDate);
    setEndDate(project.endDate);
    setProjectLink(project.link);
    setImagePreview(project.image);
    setIsEditing(true);
  };

  const handleAddClick = () => {
    setSelectedProject(null);
    setProjectName("");
    setProjectDescription("");
    setStartDate(null);
    setEndDate(null);
    setProjectLink("");
    setImagePreview(null);
    setIsAdding(true);
  };

  const handleSave = () => {
    if (selectedProject) {
      selectedProject.name = projectName;
      selectedProject.description = projectDescription;
      selectedProject.startDate = startDate;
      selectedProject.endDate = endDate;
      selectedProject.link = projectLink;
      if (typeof imagePreview === "string") {
        selectedProject.image = imagePreview;
      }
      setProjects([...projects]);
    } else {
      const newProject: ProjectData = {
        name: projectName,
        description: projectDescription,
        startDate,
        endDate,
        link: projectLink,
        image: typeof imagePreview === "string" ? imagePreview : "/images/default.png",
      };
      setProjects([...projects, newProject]);
    }
    setIsEditing(false);
    setIsAdding(false);
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
      <div className="border-b flex justify-between mb-5">
        <h1 className="text-modaltext text-2xl font-semibold">Projects</h1>
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
              <DialogTitle className="text-3xl font-bold">Add Project</DialogTitle>
              <DialogDescription className="text-md text-gray-500">
                Add your new project here. Click save when you&apos;re done.
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
                      alt="Project Image"
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
                <Label htmlFor="projectName">Project Name</Label>
                <Input
                  id="projectName"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="Project Name"
                />
              </div>
              <div>
                <Label htmlFor="projectLink">Project Link</Label>
                <Input
                  id="projectLink"
                  value={projectLink}
                  onChange={(e) => setProjectLink(e.target.value)}
                  placeholder="Project Link"
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
                <Label htmlFor="projectDescription">Description</Label>
                <textarea
                  id="projectDescription"
                  className="w-full border rounded-lg p-4 text-lg"
                  rows={4}
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
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

      {projects.map((project, index) => (
        <div key={index} className={`pb-5 ${index !== projects.length - 1 ? 'border-b mb-5' : ''}`}>
          <div className="flex gap-5">
            <div className="w-1/5">
              <Image src={project.image} alt={project.name} width={100} height={100} className="rounded-lg shadow-sm" />
            </div>
            <div className="w-4/5">
              <div>
                <div className="flex justify-between">
                  <div>
                    <h1 className="text-lg font-semibold">{project.name}</h1>
                  </div>
                  <div>
                    <Dialog open={isEditing && selectedProject === project} onOpenChange={setIsEditing}>
                      <DialogTrigger asChild>
                        <FaRegEdit className="text-signature border rounded-lg p-2 cursor-pointer" size={40} onClick={() => handleEditClick(project)} />
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px] p-6">
                        <DialogHeader>
                          <DialogTitle className="text-3xl font-bold">Edit Project</DialogTitle>
                          <DialogDescription className="text-md text-gray-500">
                            Make changes to your project here. Click save when you&apos;re done.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-2 gap-4 py-4">
                          <div className="col-span-2 flex justify-center mb-4">
                            <div className="relative w-24 h-24 border-2 border-dashed rounded-full flex items-center justify-center">
                              {imagePreview ? (
                                <Image src={typeof imagePreview === "string" ? imagePreview : "/images/default.png"} alt="Project Image" width={100} height={100} className="rounded-full" />
                              ) : (
                                <span className="text-gray-500">Add Image</span>
                              )}
                              <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="projectName">Project Name</Label>
                            <Input id="projectName" value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="Project Name" />
                          </div>
                          <div>
                            <Label htmlFor="projectLink">Project Link</Label>
                            <Input id="projectLink" value={projectLink} onChange={(e) => setProjectLink(e.target.value)} placeholder="Project Link" />
                          </div>
                          <div>
                            <Label htmlFor="startDate">Start Date</Label>
                            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className="w-full border rounded-lg p-2" placeholderText="Pick a date" />
                          </div>
                          <div>
                            <Label htmlFor="endDate">End Date</Label>
                            <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} className="w-full border rounded-lg p-2" placeholderText="Pick a date" />
                          </div>
                          <div className="col-span-2">
                            <Label htmlFor="projectDescription">Description</Label>
                            <textarea id="projectDescription" className="w-full border rounded-lg p-4 text-lg" rows={4} value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} placeholder="Description" />
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
                <div className="mt-5 border-b text-base text-signininput">
                  <h1 className="text-modaltext">Software Development</h1>
                </div>
                <div className="border-b py-3 text-base text-signininput">
                  <h1><span className="text-modaltext">Description:</span> {project.description}</h1>
                  <h1>{format(project.startDate!, "PPP")} - {format(project.endDate!, "PPP")}</h1>
                </div>
                <div>
                  <h1 className="text-base text-signininput">
                    <span className="text-modaltext">Link:</span> <a href={project.link} target="_blank" rel="noopener noreferrer">{project.link}</a>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;
