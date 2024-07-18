"use client";
import React, { useState } from 'react';
import { Accordion, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { MdGridView } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/navigation';

interface Company {
  _id: string;
  companyName: string;
  companyImages: string[];
  plan: string;
}

interface JobListingsProps {
  jobs: Company[];
  searchTerm: string;
  location: string;
}

const JobListings: React.FC<JobListingsProps> = ({ jobs, searchTerm, location }) => {
  const [isGridView, setIsGridView] = useState(true);
  const router = useRouter();

  const toggleViewMode = () => {
    setIsGridView(!isGridView);
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearchTerm = job.companyName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearchTerm;
  });

  const handleCardClick = (id: string) => {
    router.push(`/company-profile/${id}`);
  };

  return (
    <div className="md:w-full p-4">
      <div className="flex justify-between items-center mb-2">
        <div className="">
          <h2 className="lg:text-3xl md:text-2xl text-md font-bold">Suggested Companies</h2>
        </div>
        <div className="flex items-center gap-3">
          <div>
            <p className='text-sm md:text-lg'>Sort by: </p>
          </div>
          <div>
            <Accordion type="single" collapsible className="w-full text-sm md:text-lg">
              <AccordionItem value="item-1">
                <AccordionTrigger>Most relevant</AccordionTrigger>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="h-5 border border-black hidden md:block"></div>
          <div className="hidden md:block cursor-pointer" onClick={toggleViewMode}>
            <MdGridView />
          </div>
        </div>
      </div>
      <div className="md:mb-10 text-sm mb-4 md:text-lg">
        <p>Showing {filteredJobs.length} results</p>
      </div>

      <div className={isGridView ? "grid md:grid-cols-3 gap-8" : "grid md:grid-cols-1 gap-8"}>
        {filteredJobs.map((job) => (
          <Card key={job._id} className="px-5 py-8" onClick={() => handleCardClick(job._id)}>
            <div className="bg-background">
              <div className="flex justify-between mb-5 md:mb-2">
                <div>
                  <Image
                    width={61}
                    height={61}
                    src={job.companyImages[0] || '/images/default.png'}
                    alt={job.companyName}
                    className="mr-4"
                  />
                </div>
                <div className="md:mt-3">
                  <p className="md:text-xl text-signature bg-muted p-2">{job.plan ? job.plan : "1 job"}</p>
                </div>
              </div>
              <div>
                <h3 className="md:text-xl mb-5 text-lg font-bold">{job.companyName}</h3>
              </div>
              <div className="flex justify-between">
                <div className="flex flex-wrap gap-2 items-center mt-2">
                  <Link
                    className="border text-signature text-sm md:px-4 p-2 md:py-2 rounded-[30px]"
                    href="/signin"
                  >
                    Business Service
                  </Link>
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
