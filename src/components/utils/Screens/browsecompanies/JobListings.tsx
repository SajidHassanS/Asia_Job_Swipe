"use client";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../../store';
import { fetchCompanies } from '../../../../store/slices/companySlice'; // Adjust the import path as needed
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BsBookmarkDash } from "react-icons/bs";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import PaginationComponent from "./Pagination";
import {
  Accordion,
  AccordionContent,
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
  job: string;
  logo: string;
  tags: string[];
  categories?: string[];
}

const JobListings: React.FC<{ jobs: Job[] }> = ({ jobs }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { companies, status, error, totalPages, currentPage } = useSelector((state: RootState) => state.company);

  useEffect(() => {
    dispatch(fetchCompanies({ page: currentPage }));
  }, [dispatch, currentPage]);

  const handlePageChange = (page: number) => {
    dispatch(fetchCompanies({ page }));
  };

  return (
    <div className="md:w-full p-4">
      <div className="flex justify-between items-center mb-2">
        <div className="">
          <h2 className="lg:text-3xl md:text-2xl text-xl font-bold ">All Jobs</h2>
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
          <div className="hidden md:block">
            <MdGridView />
          </div>
        </div>
      </div>
      <div className="md:mb-10">
        <p>Showing {companies.length} results</p>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {companies.map((company) => (
          <Card key={company._id} className="px-5 py-8">
            <div className="bg-white">
              <div className="flex justify-between mb-5 md:mb-2">
                <div>
                  <Image
                    width={61}
                    height={61}
                    src={company.companyImages[0] || '/images/default.png'} // Use a default image if no image is provided
                    alt={company.companyName}
                    className="mr-4"
                  />
                </div>
                <div className="md:mt-3">
                  <p className="md:text-xl text-md bg-lightPink p-2 font-bold">{company.plan}</p>
                </div>
              </div>
              <div>
                <h3 className="md:text-xl text-lg font-bold">
                  {company.companyName}
                </h3>
                <div className="flex md:gap-3 items-center">
                  <p className="text-sm text-gray-600">
                    {company.userInfo?.email} • {company.userInfo?.role}
                  </p>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex flex-wrap gap-2 items-center mt-2">
                  <Button asChild className="rounded-[30px]">
                    <Link
                      className="border text-blue text-sm md:px-4 md:py-2"
                      href="/signin"
                    >
                      Business Service
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      {totalPages > 1 && (
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default JobListings;
