"use client";

import LoadingSkeleton from "@/components/LoadingSkeleton";
import PaginationComponent from "@/components/Pagination";
import useFetchCompanies from "@/hooks/useFetchCompanies";
import { baseUrl } from "@/utils/constants";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DataTable from "@/components/DataTable";
import Image from "next/image";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AiFillDelete } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { BsBookmarkDash } from "react-icons/bs";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Checkbox } from "@/components/ui/checkbox"



const AllCompaniesData = () => {
  const [page, setPage] = useState<number>(1);
  const api = `${baseUrl}/companies?page=${page}`;
  const [pagination, setPagination] = useState<Pagination>({
    totalPages: 5,
    currentPage: 1,
    hasNextPage: false,
    hasPreviousPage: false,
    nextPage: null,
    previousPage: null,
  });

  const { data, loading, error } = useFetchCompanies(api, setPagination);

  const companies = [
    {
      picture: "/images/avatar.png", // Replace with the actual path to the logo
      name: "Starbucks",
      matched: "30% matched",
      sector: "Software Development",
      experience: "3 Years Experience",
     
    },
      {
      picture: "/images/avatar.png", // Replace with the actual path to the logo
      name: "Starbucks",
      matched: "30% matched",
      sector: "Software Development",
      experience: "3 Years Experience",
    
    },
    // Add more entries based on the image data
    {
      picture: "/images/avatar.png",
      name: "Starbucks",
      matched: "30% matched",
      sector: "Software Development",
      experience: "3 Years Experience",
    
    },
    {
      picture: "/images/avatar.png",
      name: "Starbucks",
      matched: "30% matched",
      sector: "Software Development",
      experience: "3 Years Experience",
    
    },
    {
      picture: "/images/avatar.png",
      name: "Starbucks",
      matched: "30% matched",
      sector: "Software Development",
      experience: "3 Years Experience",

    },
    {
      picture: "/images/avatar.png",
      name: "Starbucks",
      matched: "30% matched",
      sector: "Software Development",
      experience: "3 Years Experience",
    
    },
    {
      picture: "/images/avatar.png",
      name: "Starbucks",
      matched: "30% matched",
      sector: "Software Development",
      experience: "3 Years Experience",
      
    },
    {
      picture: "/images/avatar.png",
      name: "Starbucks",
      matched: "30% matched",
      sector: "Software Development",
      experience: "3 Years Experience",
      
    },
    {
      picture: "/images/avatar.png",
      name: "Starbucks",
      matched: "30% matched",
      sector: "Software Development",
      experience: "3 Years Experience",
      
    },
    {
      picture: "/images/avatar.png",
      name: "Starbucks",
      matched: "30% matched",
      sector: "Software Development",
      experience: "3 Years Experience",
      
    },
    {
      picture: "/images/avatar.png",
      name: "Starbucks",
      matched: "30% matched",
      sector: "Software Development",
      experience: "3 Years Experience",
      
    },
  ];

  const headers = [
    "Picture",
    "Name",
    "Contact Info",
    "Sector",
    "Joined at",
    "Company Size",
    "Action",
  ];

  if (loading) return <LoadingSkeleton />;
  // if (error) return <div>Error: {error.message}</div>;

  const renderCompanyRow = (company: (typeof companies)[0]) => (
    <>
    <TableCell> <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      
       
    </div></TableCell>
      <TableCell className="flex gap-5 items-center">
        <Image
          src={company.picture}
          alt={company.name}
          width={40}
          height={40}
        /> {company.name}
      </TableCell>
     
      <TableCell > <div className="border rounded-full py-3 flex justify-center text-blue border-blue">{company.matched}</div></TableCell>
      <TableCell>{company.sector}</TableCell>
      <TableCell>{company.experience}</TableCell>     
      <TableCell className="flex items-center gap-6">
        
        
      <Link
          href={"#"}
          className="text-threeicons bg-lightPink p-3 rounded-xl hover:text-blue/80 transition-colors"
        >
          <BiMessageRoundedDetail size={20} />
        </Link>
        <Link
          href={"#"}
          className="text-threeicons bg-lightPink p-3 rounded-xl hover:text-blue/80 transition-colors"
        >
          <BsBookmarkDash size={20} />
        </Link>
        <Dialog>
          <DialogTrigger asChild>
            <div className="cursor-pointer bg-lightPink p-3 rounded-xl text-threeicons hover:text-blue/80 transition-colors">
              <RiDeleteBin5Line size={20} />
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Delete Company</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this company?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="button" variant={"destructive"}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </TableCell>
    </>
  );

  return (
    <div>
      <main className="my-4 px-4 flex-1">

        <div className="pb-3">
          <h1 className="text-2xl font-bold pb-3">All Saved Candidates</h1>
          <p>Showing 73 People</p>
        </div>
        <DataTable
          headers={headers}
          data={companies}
          renderRow={renderCompanyRow}
        />
      </main>
      
      <PaginationComponent
        page={page}
        pagination={pagination}
        changePage={setPage}
      />
    </div>
  );
};

export default AllCompaniesData;
