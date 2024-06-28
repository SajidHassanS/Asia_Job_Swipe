"use client";
import React, { useState, useMemo } from 'react';
import { CiSearch } from "react-icons/ci";
import { IoFilterSharp } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TableComp from './TableComp';

// Define the possible status values
type Status = 'In Review' | 'Shortlisted' | 'Processing';

// Sample data for demonstration
const tableData = [
  {
    serial: "1",
    companyName: "Apple",
    icon: "/images/harvard.png",
    Roles: "Software Engineer",
    dateApplied: "1 August 1, 2021",
    status: "In Review" as Status,
  },
  {
    serial: "2",
    companyName: "Google",
    icon: "/images/harvard.png",
    Roles: "Product Manager",
    dateApplied: "15 September 1, 2021",
    status: "Shortlisted" as Status,
  },
  {
    serial: "3",
    companyName: "Microsoft",
    icon: "/images/harvard.png",
    Roles: "Data Scientist",
    dateApplied: "3 October 1, 2021",
    status: "Processing" as Status,
  },
  {
    serial: "4",
    companyName: "Facebook",
    icon: "/images/harvard.png",
    Roles: "UX Designer",
    dateApplied: "10 November 1, 2021",
    status: "In Review" as Status,
  },
  {
    serial: "5",
    companyName: "Amazon",
    icon: "/images/harvard.png",
    Roles: "Cloud Architect",
    dateApplied: "20 December 1, 2021",
    status: "In Review" as Status,
  },
  {
    serial: "6",
    companyName: "Netflix",
    icon: "/images/harvard.png",
    Roles: "Frontend Developer",
    dateApplied: "5 January 1, 2022",
    status: "Processing" as Status,
  },
  {
    serial: "7",
    companyName: "Spotify",
    icon: "/images/harvard.png",
    Roles: "Backend Developer",
    dateApplied: "10 February 1, 2022",
    status: "Shortlisted" as Status,
  },
  {
    serial: "8",
    companyName: "Tesla",
    icon: "/images/harvard.png",
    Roles: "Full Stack Developer",
    dateApplied: "15 March 1, 2022",
    status: "In Review" as Status,
  },
  {
    serial: "9",
    companyName: "SpaceX",
    icon: "/images/harvard.png",
    Roles: "DevOps Engineer",
    dateApplied: "20 April 1, 2022",
    status: "Processing" as Status,
  },
  {
    serial: "10",
    companyName: "Uber",
    icon: "/images/harvard.png",
    Roles: "QA Engineer",
    dateApplied: "25 May 1, 2022",
    status: "Shortlisted" as Status,
  },
  {
    serial: "11",
    companyName: "Airbnb",
    icon: "/images/harvard.png",
    Roles: "Mobile Developer",
    dateApplied: "30 June 1, 2022",
    status: "In Review" as Status,
  },
];

const AppliedJobs = () => {
  const [showStatusBar, setShowStatusBar] = useState(false);
  const [showActivityBar, setShowActivityBar] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Status[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilterChange = (status: Status) => {
    setStatusFilter(prevStatusFilter => {
      if (prevStatusFilter.includes(status)) {
        return prevStatusFilter.filter(s => s !== status);
      } else {
        return [...prevStatusFilter, status];
      }
    });
  };

  const filteredTableData = useMemo(() => {
    return tableData.filter(item =>
      (item.Roles.toLowerCase().includes(searchTerm.toLowerCase()) || item.companyName.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter.length === 0 || statusFilter.includes(item.status))
    );
  }, [searchTerm, statusFilter]);

  return (
    <>
      <div>
        <div className="flex justify-between items-center">
          <div><h1 className='text-modaltext text-lg md:text-2xl'>Applications History</h1></div>
          <div className="flex flex-col md:flex-row  items-center gap-4">
            <div className="relative flex w-24 items-center">
              <CiSearch className="absolute left-3 text-gray-500" size={20} />
              <Input
                type="text"
                placeholder="Search by Role or Company"
                className="pl-10"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <IoFilterSharp size={20} />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {['In Review', 'Shortlisted', 'Processing'].map(status => (
                    <DropdownMenuCheckboxItem
                      key={status}
                      checked={statusFilter.includes(status as Status)}
                      onCheckedChange={() => handleStatusFilterChange(status as Status)}
                    >
                      {status}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        <TableComp filteredData={filteredTableData} />
      </div>
    </>
  );
};

export default AppliedJobs;
