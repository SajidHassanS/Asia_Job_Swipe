"use client";
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BsChevronRight, BsChevronDown } from "react-icons/bs";
import { RiDeleteBin5Line } from "react-icons/ri";
import Image from 'next/image';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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

interface TableCompProps {
  filteredData: {
    serial: string;
    companyName: string;
    icon: string;
    Roles: string;
    dateApplied: string;
    status: Status;
  }[];
}

const TableComp: React.FC<TableCompProps> = ({ filteredData = [] }) => {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(filteredData);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  useEffect(() => {
    setData(filteredData);
  }, [filteredData]);

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
      return 'bg-signature border-blue text-background';
    } else {
      return index % 2 === 0 ? 'bg-muted' : 'bg-background';
    }
  };

  const handleDelete = () => {
    if (itemToDelete) {
      setData(prevData => prevData.filter(item => item.serial !== itemToDelete));
      setItemToDelete(null);
      setDeleteModalOpen(false);
    }
  };

  const openDeleteModal = (serial: string) => {
    setItemToDelete(serial);
    setDeleteModalOpen(true);
  };

  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / itemsPerPage);

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
            {currentItems.map((item, index) => (
              <React.Fragment key={item.serial}>
                <TableRow
                  className={`hover:bg-signature-300 cursor-pointer ${getRowClass(index)}`}
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
                    <RiDeleteBin5Line onClick={() => openDeleteModal(item.serial)} size={25} className="cursor-pointer text-red-500" />
                  </TableCell>
                </TableRow>
                {expandedRow === index && (
                  <TableRow className="md:hidden bg-signature  text-background">
                    <TableCell colSpan={6} className="p-0">
                      <div className="p-4">
                        <div className='flex justify-between items-center'>
                          <div>
                            <div><strong>Roles:</strong> {item.Roles}</div>
                            <div><strong>Date Applied:</strong> {item.dateApplied}</div>
                          </div>
                          <RiDeleteBin5Line onClick={() => openDeleteModal(item.serial)} size={25} className='text-background cursor-pointer text-red-500' />
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

      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent className="sm:max-w-[400px] p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="py-4">Are you sure you want to delete this job application?</div>
          <DialogFooter className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className='my-10'>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} />
            </PaginationItem>
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink href="#" isActive={i + 1 === currentPage} onClick={() => setCurrentPage(i + 1)}>
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext href="#" onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};

export default TableComp;
