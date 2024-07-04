"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BsBookmarkDash, BsBookmarkDashFill } from "react-icons/bs";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { MdGridView } from "react-icons/md";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Job } from "../../../../store/slices/types";
import { toggleSaveJob } from "../../../../store/slices/jobSeekerSlice";

interface JobListingsProps {
  jobs: Job[];
  totalJobs: number;
}

const JobListings: React.FC<JobListingsProps> = ({ jobs, totalJobs }) => {
  const [isGridView, setIsGridView] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const jobSeeker = useSelector((state: RootState) => state.jobSeeker.jobSeeker);

  const handleBookmarkClick = async (jobId: string) => {
    const jobSeekerId = localStorage.getItem("_id");
    const accessToken = localStorage.getItem("accessToken");

    if (jobSeekerId && accessToken) {
      await dispatch(toggleSaveJob({ jobId, jobSeekerId, accessToken }));
    }
  };

  const isJobSaved = (jobId: string) => {
    return jobSeeker?.savedJobs.some((job) => job._id === jobId);
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
                <AccordionTrigger>Most relevant</AccordionTrigger>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="h-5 border border-black hidden md:block"></div>
          <div
            className="hidden md:block cursor-pointer"
            onClick={() => setIsGridView(!isGridView)}
          >
            <MdGridView />
          </div>
        </div>
      </div>
      <div className="md:mb-10">
        <p>Showing {totalJobs} results</p>
      </div>
      <div className={isGridView ? "grid grid-cols-1 md:grid-cols-2 gap-5" : ""}>
        {jobs.map((job) => (
          <Card key={job._id} className="mb-5 p-4">
            <div className="">
              <div className="bg-background">
                <div className="flex justify-between mb-5 md:mb-2">
                  <div className="flex items-center">
                    <Image
                      width={61}
                      height={61}
                      src={job.company?.companyLogo || "/default-logo.png"}
                      alt={job.company?.companyName || "Company Logo"}
                      className="rounded-full mr-4"
                    />
                    <div>
                      <h3 className="md:text-xl text-lg font-bold">{job.title}</h3>
                      <div className="flex md:gap-3 items-center">
                        <p className="text-sm text-gray-600">
                          {job.company?.companyName} • {job.city || "N/A"}, {job.province || "N/A"}
                          , {job.country || "N/A"}
                        </p>
                        <div className="md:block hidden">
                          <IoCheckmarkDoneSharp className="text-signature" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="md:mt-3">
                    <div
                      className="md:hidden mb-2 flex justify-end cursor-pointer"
                      onClick={() => handleBookmarkClick(job._id)}
                    >
                      {isJobSaved(job._id) ? (
                        <BsBookmarkDashFill className="text-signature" size={20} />
                      ) : (
                        <BsBookmarkDash className="text-signature" size={20} />
                      )}
                    </div>
                    <p className="md:text-xl text-md font-bold">
                      ${job.salary?.from || 0}/Monthly
                    </p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex flex-wrap gap-3 md:ml-20 items-center mt-2">
                    <Link
                      className="bg-sky-300 text-signature text-sm md:px-4 md:py-2 rounded-[30px] inline-block"
                      href="/signin"
                    >
                      {job.jobType}
                    </Link>
                    <div className="hidden md:block h-5 border border-lightgrey"></div>
                    {job.skills?.map((skill) => (
                      <Link
                        key={skill}
                        className="border border-darkGrey text-darkGrey text-sm px-4 py-2 rounded-[30px] inline-block"
                        href="/signin"
                      >
                        {skill}
                      </Link>
                    ))}
                    <div
                      className="md:block hidden cursor-pointer"
                      onClick={() => handleBookmarkClick(job._id)}
                    >
                      {isJobSaved(job._id) ? (
                        <BsBookmarkDashFill className="text-signature" size={30} />
                      ) : (
                        <BsBookmarkDash className="text-signature" size={30} />
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col mt-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-signature text-background text-sm px-8 py-2 rounded-md">
                          Apply
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-background">
                        <DialogHeader className="bg-signature rounded-lg px-16 py-5 flex text-center">
                          <DialogTitle className="text-background text-3xl">
                            Your Profile Is Incomplete
                          </DialogTitle>
                        </DialogHeader>
                        <DialogDescription className="px-16">
                          <h1 className="modaltext text-2xl">
                            Complete your Profile to Apply for job!
                          </h1>
                          <p className="text-signininput4">
                            Click on button to complete your profile.
                          </p>
                        </DialogDescription>
                        <div className="px-16 pb-10">
                          <Link
                            className="bg-signature text-background text-sm w-full inline-block text-center rounded-md py-6"
                            href="/myprofile"
                          >
                            Go to My Profile
                          </Link>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="ghost"
                      className="text-red-500 text-sm px-4 py-2 rounded-md"
                    >
                      Declined
                    </Button>
                  </div>
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
