"use client";
import React, { useState } from 'react';

import JobListings from './JobListings';
import HeroComponent from "../../../../../../components/repeatComponents/Hero";
import PaginationComponent from './Pagination';
import jobs from '../../../../../../components/repeatComponents/JobList'; // Importing jobs data

const AllJobs: React.FC = () => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;

  const handleCheckboxChange = (filter: string) => {
    setSelectedFilters(prevFilters =>
      prevFilters.includes(filter)
        ? prevFilters.filter(f => f !== filter)
        : [...prevFilters, filter]
    );
  };

  const handleSearch = (searchTerm: string, location: string) => {
    setSearchTerm(searchTerm);
    setLocation(location);
    setCurrentPage(1); // Reset to first page on new search
  };

  const filteredJobs = jobs.filter(job => {
    const matchesFilters = selectedFilters.length === 0 || selectedFilters.some(filter =>
      job.tags.includes(filter) || (job.categories && job.categories.includes(filter))
    );
    const matchesSearchTerm = searchTerm === '' || job.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = location === '' || job.location.toLowerCase().includes(location.toLowerCase());

    return matchesFilters && matchesSearchTerm && matchesLocation;
  });

  // Get current jobs
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
     
      <div className="md:container md:my-16 my-4 md:flex gap-5">
       
        <div className="w-full">
          <JobListings jobs={currentJobs} totalJobs={filteredJobs.length} />
          <PaginationComponent
            jobsPerPage={jobsPerPage}
            totalJobs={filteredJobs.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default AllJobs;
