import React, { useState } from 'react';
import JobListings from './JobListings';
import Hero from './Hero';

const jobs = [
  {
    id: 1,
    title: "Social Media Assistant",
    company: "Nomad",
    location: "Paris, France",
    job: "3 job",
    logo: "/images/66.png",
    tags: ["Full-Time", "Marketing", "Design"]
  },
  {
    id: 2,
    title: "Brand Designer",
    company: "Dropbox",
    location: "New York, USA",
    job: "3 job",
    logo: "/images/22.png",
    tags: ["Part-Time", "Marketing", "Design"]
  },
  {
    id: 3,
    title: "Interactive Developer",
    company: "Terraform",
    location: "London, UK",
    job: "3 job",
    logo: "/images/33.png",
    tags: ["Full-Time", "Marketing", "Design"]
  },
  {
    id: 4,
    title: "Email Marketing",
    company: "Revolut",
    location: "Berlin, Germany",
    job: "3 job",
    logo: "/images/44.png",
    tags: ["Full-Time", "Marketing", "Design"]
  },
  {
    id: 5,
    title: "Lead Engineer",
    company: "Canva",
    location: "Sydney, Australia",
    job: "3 job",
    logo: "/images/77.png",
    tags: ["Part-Time", "Marketing", "Design"]
  },
  {
    id: 6,
    title: "Product Designer",
    company: "ClassPass",
    location: "Toronto, Canada",
    job: "3 job",
    logo: "/images/55.png",
    tags: ["Full-Time", "Marketing", "Design"]
  },
  {
    id: 7,
    title: "Customer Manager",
    company: "Pitch",
    location: "Tokyo, Japan",
    job: "3 job",
    logo: "/images/88.png",
    tags: ["Full-Time", "Marketing", "Design"]
  }
];

const AllJobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (searchTerm: string, location: string) => {
    setSearchTerm(searchTerm);
    setLocation(location);
  };

  return (
    <>
      <Hero
        title="Search Companies"
        titleClassName="text-2xl md:text-5xl md:pt-8 text-center font-bold text-darkGrey"
        onSearch={handleSearch}
        showSearchBar={true}
        showSearchFields={true}
      />
      <div className='md:container md:my-16 my-4'>
        <div className="md:flex gap-5">
          <JobListings jobs={jobs} searchTerm={searchTerm} location={location} />
        </div>
      </div>
    </>
  );
}

export default AllJobs;
