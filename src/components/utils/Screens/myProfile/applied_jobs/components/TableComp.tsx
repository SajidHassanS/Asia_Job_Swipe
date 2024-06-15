"use client";
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BsThreeDots, BsChevronRight, BsChevronDown } from "react-icons/bs";
import Image from 'next/image';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Define the possible status values
type Status = 'In Review' | 'Shortlisted' | 'Processing';

const tableData = [
  {
    serial: "1",
    companyName: "Nomad",
    icon: "/images/harvard.png",
    Roles: "Social Media Assistant",
    dateApplied: "24 July 2021",
    status: "In Review" as Status,
  },
  {
    serial: "2",
    companyName: "Nomad",
    icon: "/images/harvard.png",
    Roles: "Social Media Assistant",
    dateApplied: "24 July 2021",
    status: "Shortlisted" as Status,
  },
  {
    serial: "3",
    companyName: "Nomad",
    icon: "/images/harvard.png",
    Roles: "Social Media Assistant",
    dateApplied: "24 July 2021",
    status: "Processing" as Status,
  },
  {
    serial: "4",
    companyName: "Nomad",
    icon: "/images/harvard.png",
    Roles: "Social Media Assistant",
    dateApplied: "24 July 2021",
    status: "In Review" as Status,
  },
  {
    serial: "5",
    companyName: "Nomad",
    icon: "/images/harvard.png",
    Roles: "Social Media Assistant",
    dateApplied: "24 July 2021",
    status: "In Review" as Status,
  },
];

const TableComp = () => {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const getStatusClass = (status: Status) => {
    switch (status) {
      case 'In Review':
        return 'border-reviewYellow text-reviewYellow';
      case 'Shortlisted':
        return 'border-greenprogress text-greenprogress';
      case 'Processing':
        return 'border-processingPurple text-processingPurple';
      default:
        return '';
    }
  };

  const getRowClass = (index: number) => {
    if (selectedRow === index) {
      return 'bg-blue border-blue text-white';
    } else {
      return index % 2 === 0 ? 'bg-lightPink' : 'bg-white';
    }
  };

  return (
    <>
      <div className='border rounded-[20px] my-10'>
        <Table className=''>
          <TableHeader className='hidden md:table-header-group'>
            <TableRow className='text-signinemail text-base'>
              <TableHead className="">#</TableHead>
              <TableHead className="">Company Name</TableHead>
              <TableHead className="">Roles</TableHead>
              <TableHead className="">Date Applied</TableHead>
              <TableHead className="">Status</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className='text-modaltext text-base'>
            {tableData.map((item, index) => (
              <React.Fragment key={item.serial}>
                <TableRow
                  className={`hover:bg-blue-300 cursor-pointer ${getRowClass(index)}`}
                  onClick={() => setSelectedRow(index)}
                >
                  <TableCell className="font-medium">{item.serial}</TableCell>
                  <TableCell className='flex flex-col md:flex-row gap-3'>
                    <Image src={item.icon} alt='icons' width={30} height={30} />
                    {item.companyName}
                  </TableCell>
                  <TableCell className="md:table-cell hidden">{item.Roles}</TableCell>
                  <TableCell className="md:table-cell hidden">{item.dateApplied}</TableCell>
                  <TableCell className=" ">
                    <span className={`rounded-full border text-center px-3 py-1 ${getStatusClass(item.status)}`}>
                      {item.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right md:hidden">
                    {expandedRow === index ? (
                      <BsChevronDown onClick={() => setExpandedRow(null)} size={25} />
                    ) : (
                      <BsChevronRight onClick={() => setExpandedRow(index)} size={25} />
                    )}
                  </TableCell>
                  <TableCell className="text-right hidden md:table-cell">
                    <BsThreeDots size={25} />
                  </TableCell>
                </TableRow>
                {expandedRow === index && (
                  <TableRow className="md:hidden bg-blue  text-white">
                    <TableCell colSpan={6} className="p-0">
                      <div className="p-4">
                        <div className='flex justify-between items-center'>
                          <div>
                            <div><strong>Roles:</strong> {item.Roles}</div>
                            <div><strong>Date Applied:</strong> {item.dateApplied}</div>
                          </div>
                          <BsThreeDots size={25} className='text-white' />
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className='my-10'>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};

export default TableComp;
