"use client";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../../store';
import { fetchCompanies } from '../../../../store/slices/companySlice';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BiMessageRoundedDetail } from "react-icons/bi";
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

const JobListings: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { companies, status, error, totalPages, currentPage } = useSelector((state: RootState) => state.company);
  const [isGridView, setIsGridView] = useState(true); // State to track the view mode

  useEffect(() => {
    dispatch(fetchCompanies({ page: currentPage }));
  }, [dispatch, currentPage]);

  const handlePageChange = (page: number) => {
    dispatch(fetchCompanies({ page }));
  };

  const toggleViewMode = () => {
    setIsGridView(!isGridView); // Toggle the view mode
  };

  return (
    <div className="md:w-full p-4">
      <div className="flex justify-between items-center mb-2">
        <div className="">
          <h2 className="lg:text-3xl md:text-2xl text-md font-bold">Suggested Companies</h2>
        </div>
        <div className="flex items-center gap-3">
          <div>
            <p className="text-sm md:text-lg">Sort by: </p>
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
        <p>Showing {Math.min(companies.length, 3)} results</p>
      </div>

      <div className={isGridView ? "grid md:grid-cols-3 gap-8" : "grid md:grid-cols-1 gap-8"}>
        {companies.slice(0, 3).map((company) => (
          <Card key={company._id} className="p-8 flex flex-col justify-between">
            <div className="bg-background square-card">
              <div className="flex justify-between mb-5 md:mb-2">
                <div>
                  <Image
                    width={61}
                    height={61}
                    src={company.companyImages[0] || '/public/images/22.png'}
                    alt={company.companyName}
                    className="mr-4"
                  />
                </div>
                <div className="flex text-signature items-center gap-3">
                  <BiMessageRoundedDetail size={25} />
                  <p className="md:text-sm bg-muted p-2 font-bold">3 Jobs{company.plan}</p>
                </div>
              </div>
              <div>
                <h3 className="md:text-xl mb-5 text-lg font-bold">
                  {company.companyName}
                </h3>
                <div className="flex md:gap-3 items-center">
                  <p className="text-sm mb-5 text-gray-600">
                    Nomad is located in Paris, France. Nomad has generates $728,000 in sales (USD).
                  </p>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex flex-wrap gap-2 items-center mt-2">
                  <Link
                    className="border text-signature text-sm md:px-4 md:py-2 rounded-[30px]"
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
