"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BsBookmarkDash } from "react-icons/bs";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MdGridView } from "react-icons/md";
import Image from "next/image";

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

// Specify the type of the jobs parameter using the Job interface
const JobListings: React.FC<{ jobs: Job[] }> = ({ jobs }) => {
  const [isGridView, setIsGridView] = useState(false); // State to track the view mode

  const toggleViewMode = () => {
    setIsGridView(!isGridView); // Toggle the view mode
  };

  return (
    <div className="md:w-full p-4">
      <div className="flex justify-between items-center mb-2">
        <div className="">
          <h2 className="lg:text-3xl md:text-2xl text-xl font-bold">All Jobs</h2>
        </div>
        <div className="flex items-center gap-3">
          <div>
            <p>Sort by: </p>
          </div>
          <div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger> Most relevant</AccordionTrigger>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="h-5 border border-black hidden md:block"></div>
          <div className="hidden md:block cursor-pointer" onClick={toggleViewMode}>
            <MdGridView />
          </div>
        </div>
      </div>
      <div className="md:mb-10">
        <p>Showing {jobs.length} results</p>
      </div>
      <div className={isGridView ? "grid md:grid-cols-3 gap-8" : "grid md:grid-cols-1 gap-8"}>
        {jobs.map((job) => (
          <Card key={job.id} className="mb-5 p-4">
            <div className="bg-background">
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
                    <h3 className="md:text-xl text-lg font-bold">{job.title}</h3>
                    <div className="flex md:gap-3 items-center">
                      <p className="text-sm text-gray-600">
                        {job.company} • {job.location}
                      </p>
                      <div className="md:block hidden">
                        <IoCheckmarkDoneSharp className="text-signature" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:mt-3">
                  <div className="md:hidden mb-2 flex justify-end">
                    <BsBookmarkDash className="text-signature " size={20} />
                  </div>
                  <p className="md:text-xl text-md font-bold">{job.salary}</p>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex flex-wrap gap-3 md:ml-20 items-center mt-2">
                  {/* Render buttons for different categories */}
                  <Link
                    key="full-time"
                    className="bg-sky-300 text-signature text-sm md:px-4 md:py-2 rounded-[30px] inline-block"
                    href="/signin"
                  >
                    Full-Time
                  </Link>
                  <div className="hidden md:block h-5 border border-lightgrey"></div>
                  <div className="border border-darkGrey text-darkGrey text-sm px-4 py-2 rounded-[30px] inline-block">
                    Marketing
                  </div>
                  <div className="border border-darkGrey text-darkGrey text-sm px-4 py-2 rounded-[30px] inline-block">
                    Design
                  </div>
                  <div className="md:block hidden">
                    <BsBookmarkDash className="text-signature " size={30} />
                  </div>
                </div>

                <div className="flex flex-col mt-2">
                  <Link
                    className="bg-signature text-background text-sm px-4 py-2 rounded-md inline-block text-center"
                    href=""
                  >
                    Apply
                  </Link>
                  <Button variant="ghost" className="text-red-500 text-sm px-4 py-2 rounded-md">
                    Decline
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default JobListings;
