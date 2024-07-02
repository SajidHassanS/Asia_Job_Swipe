"use client";
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from './Sidebar';
import JobListings from './JobListings';
import HeroComponent from "../../../../components/repeatComponents/Hero";
import PaginationComponent from './Pagination';
import { RootState, AppDispatch } from '../../../../store';
import { fetchJobs, setCurrentPage } from '../../../../store/slices/jobSlice';

interface Job {
  _id: string;
  title: string;
  company: {
    companyLogo: string;
    companyName: string;
    city: string;
    province: string;
    country: string;
  };
  salary: {
    from: number;
    to: number;
  };
  skills: string[];
  jobType: string;
  city: string;
  province: string;
  country: string;
}

const AllJobs: React.FC = () => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');

  const dispatch = useDispatch<AppDispatch>();

  const currentPage = useSelector((state: RootState) => state.job.pagination.currentPage);
  const jobs = useSelector((state: RootState) => state.job.jobs);
  const loading = useSelector((state: RootState) => state.job.status === 'loading');
  const totalPages = useSelector((state: RootState) => state.job.pagination.totalPages);

  useEffect(() => {
    dispatch(fetchJobs(currentPage));
  }, [dispatch, currentPage]);

  const handleCheckboxChange = (filter: string) => {
    setSelectedFilters(prevFilters =>
      prevFilters.includes(filter)
        ? prevFilters.filter(f => f !== filter)
        : [...prevFilters, filter]
    );
    dispatch(setCurrentPage(1)); // Reset to first page on filter change
  };

  const handleSearch = (searchTerm: string, location: string) => {
    setSearchTerm(searchTerm);
    setLocation(location);
    dispatch(setCurrentPage(1)); // Reset to first page on new search
  };

  const filteredJobs = jobs.filter((job: Job) => {
    const matchesFilters = selectedFilters.length === 0 || selectedFilters.some(filter =>
      job.skills.includes(filter) || job.jobType.includes(filter)
    );
    const matchesSearchTerm = searchTerm === '' || job.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = location === '' || job.city.toLowerCase().includes(location.toLowerCase());

    return matchesFilters && matchesSearchTerm && matchesLocation;
  });

  const paginate = (pageNumber: number) => dispatch(setCurrentPage(pageNumber));

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className='bg-muted md:pb-10'>
        <HeroComponent
          title="Find the best job!"
          titleClassName="text-3xl md:text-7xl md:pt-8 text-center font-bold text-darkGrey"
          spanClassName="text-signature"
          showSuggestions={true}
          backgroundImage="url-to-image"
          showSearchBar={true}
          onSearch={handleSearch}
        />
      </div>
      <div className="md:container md:my-16 my-4 md:flex gap-5">
        <Sidebar onCheckboxChange={handleCheckboxChange} selectedFilters={selectedFilters} />
        <div className="w-full">
          <JobListings jobs={filteredJobs} totalJobs={filteredJobs.length} />
          <PaginationComponent
            jobsPerPage={10}
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
