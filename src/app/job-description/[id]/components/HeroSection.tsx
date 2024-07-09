"use client";
import React from "react";
import { Slash } from "lucide-react";
import { IoShareSocialOutline } from "react-icons/io5";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

import {
  Card,
} from "@/components/ui/card";

import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Define an interface for the shape of each job object
interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  logo: string;
  tags: string[];
  categories?: string[];
}

const jobs: Job[] = [
  {
    id: 1,
    title: "Social Media Assistant",
    company: "Nomad",
    location: "Paris, France",
    salary: "$15k/Monthly",
    logo: "/images/66.png",
    tags: ["Full-Time", "Marketing", "Design"],
  },
];

const HeroSection = () => {
  // Function to get the appropriate tag styles
  const getTagStyle = (tag: string) => {
    switch (tag) {
      case "Full-Time":
        return "bg-signature text-background";
      case "Marketing":
        return " ";
      case "Design":
        return " ";
      default:
        return "bg-gray-300 text-gray-800";
    }
  };

  return (
    <>
      <div className="bg-gray-100 py-3 md:py-10">
        <div className="mx-3 md:container">
          <div>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <Slash />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/components">Saved jobs</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <Slash />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage>Social Media Assistant</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="">
            {jobs.map((job) => (
              <Card className="my-5 bg-white p-4" key={job.id}>
                <div className="flex justify-between mb-5 md:mb-2">
                  <div className="flex items-center">
                    <Image
                      width={61}
                      height={61}
                      src={job.logo}
                      alt={job.company}
                      className="rounded-full mr-4"
                    />
                    <div>
                      <h3 className="md:text-xl text-lg font-bold">
                        {job.title}
                      </h3>
                      <div className="flex md:gap-3 items-center">
                        <p className="text-sm text-gray-600">
                          {job.company} • {job.location}
                        </p>
                        <div className="md:block hidden">
                          <IoCheckmarkDoneSharp className="text-green-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="md:mt-3">
                    <div className="md:hidden mb-2 flex justify-end">
                      <IoShareSocialOutline
                        className="text-blue-500"
                        size={20}
                      />
                    </div>
                    <p className="md:text-xl text-md font-bold">
                      {job.salary}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex flex-wrap gap-3 md:ml-20 items-center">
                    {job.tags.map((tag) => (
                      <Button variant={"outline"}	
                       
                        className={`rounded-full ${getTagStyle(tag)}`}
                        key={tag}
                      >
                  {tag}
                          
                        
                      </Button>
                    ))}
                    <div className="md:block hidden">
                      <IoShareSocialOutline className="text-signature" size={30} />
                    </div>
                  </div>
                  <div className="flex flex-col mt-2">
                    <Dialog>
                      <DialogTrigger>
                        <Button className=" text-sm px-8 py-2 rounded-md">
                          Apply
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-white overflow-y-auto w-full max-h-full pb-32 mb-16">
                        <DialogHeader className="bg-green-500 px-8 py-4 rounded-lg flex justify-center text-center">
                          <DialogTitle className="text-white text-center text-3xl">
                            Review your Information
                          </DialogTitle>
                        </DialogHeader>
                        <DialogDescription className="px-8">
                          <div>
                            <h1 className="text-2xl">Submit your application</h1>
                            <p className="text-gray-800">
                              The following is required and will only be shared
                            </p>
                          </div>
                          <form className="space-y-4 mt-4">
                            <div className="grid w-full gap-1.5">
                              <label htmlFor="full-name" className="block text-sm font-medium text-gray-700">Full Name</label>
                              <input type="text" id="full-name" placeholder="Enter your full name" className="w-full p-2 border border-gray-300 rounded" />
                            </div>
                            <div className="grid w-full gap-1.5">
                              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                              <input type="email" id="email" placeholder="Enter your email address" className="w-full p-2 border border-gray-300 rounded" />
                            </div>
                            <div className="grid w-full gap-1.5">
                              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                              <input type="tel" id="phone" placeholder="Enter your phone number" className="w-full p-2 border border-gray-300 rounded" />
                            </div>
                            <div className="grid w-full gap-1.5">
                              <label htmlFor="job-title" className="block text-sm font-medium text-gray-700">Current or Previous Job Title</label>
                              <input type="text" id="job-title" placeholder="What's your current or previous job title" className="w-full p-2 border border-gray-300 rounded" />
                            </div>
                            <div className="grid w-full gap-1.5">
                              <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">LinkedIn URL</label>
                              <input type="url" id="linkedin" placeholder="Link to your LinkedIn URL" className="w-full p-2 border border-gray-300 rounded" />
                            </div>
                            <div className="grid w-full gap-1.5">
                              <label htmlFor="additional-info" className="block text-sm font-medium text-gray-700">Additional Information</label>
                              <textarea id="additional-info" placeholder="Add a cover letter or anything else you want to share" className="w-full p-2 border border-gray-300 rounded"></textarea>
                            </div>
                            <div className="grid w-full gap-1.5">
                              <label htmlFor="text-editor" className="block text-sm font-medium text-gray-700">Text Editor</label>
                              <div id="text-editor" className="w-full p-2 border border-gray-300 rounded h-32">
                                {/* Placeholder for a rich text editor component */}
                              </div>
                            </div>
                            <div className="flex w-full gap-1.5 items-center">
                              <label htmlFor="resume" className="block text-sm font-medium text-gray-700">Attach Your Resume</label>
                              <input type="file" id="resume" className="p-2 border border-gray-300 rounded" />
                            </div>
                            <div className="flex w-full items-center gap-1.5">
                              <input type="checkbox" id="terms" className="text-green-500 border border-green-500 rounded" />
                              <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                                By sending the request you confirm that you accept our <a href="#" className="text-green-500">Terms of Service</a> and <a href="#" className="text-green-500">Privacy Policy</a>.
                              </label>
                            </div>
                            <button type="submit" className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600">
                              Submit Application
                            </button>
                          </form>
                        </DialogDescription>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
