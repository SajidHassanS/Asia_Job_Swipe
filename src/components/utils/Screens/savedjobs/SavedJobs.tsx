"use client";
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import JobListings from './JobListings';
import SkeletonJobCard from './SkeletonJobCard';
import HeroComponent from '../../../../components/repeatComponents/Hero';
import PaginationComponent from './Pagination';
import { RootState, AppDispatch } from '../../../../store';
import { getSavedJobs } from '../../../../store/slices/jobSeekerSlice';

const SavedJobs: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;

  const accessToken = useSelector((state: RootState) => state.auth.accessToken) || (typeof window !== 'undefined' && localStorage.getItem('accessToken'));
  const jobSeekerId = useSelector((state: RootState) => state.auth.jobSeekerId) || (typeof window !== 'undefined' && localStorage.getItem('_id'));
  const jobSeeker = useSelector((state: RootState) => state.jobSeeker.jobSeeker);
  const savedJobs = useSelector((state: RootState) => state.jobSeeker.jobSeeker?.savedJobs) || [];

  const jobSeekerStatus = useSelector((state: RootState) => state.jobSeeker.status);
  const jobSeekerError = useSelector((state: RootState) => state.jobSeeker.error);

  useEffect(() => {
    if (jobSeekerId && accessToken) {
      console.log('Dispatching getSavedJobs');
      dispatch(getSavedJobs({ jobSeekerId, accessToken }));
    }
  }, [dispatch, jobSeekerId, accessToken]);

  useEffect(() => {
    console.log('Job Seeker Updated:', JSON.stringify(jobSeeker, null, 2));
    console.log('Saved Jobs:', JSON.stringify(savedJobs, null, 2));
  }, [jobSeeker, savedJobs]);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = savedJobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (jobSeekerStatus === 'loading') {
    return (
      <>
        {Array.from({ length: jobsPerPage }).map((_, index) => (
          <SkeletonJobCard key={index} />
        ))}
      </>
    );
  }

  if (jobSeekerStatus === 'failed') {
    return <p className="text-center text-lg mt-4 text-red-500">{jobSeekerError}</p>;
  }

  return (
    <div>
      <div className='bg-muted md:pb-10'>
        <HeroComponent
          title="Your Saved Jobs"
          titleClassName="text-3xl md:text-7xl md:pt-8 text-center font-bold text-darkGrey"
          spanClassName="text-signature"
          showSuggestions={false}
          backgroundImage="url-to-image"
          showSearchBar={false}
        />
      </div>
      <div className="md:container md:my-16 my-4 md:flex gap-5">
        <div className="w-full">
          {savedJobs.length === 0 ? (
            <p className="text-center text-lg mt-4">No saved jobs found.</p>
          ) : (
            <>
              <JobListings jobs={currentJobs} totalJobs={savedJobs.length} />
              <PaginationComponent
                jobsPerPage={jobsPerPage}
                totalJobs={savedJobs.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedJobs;
