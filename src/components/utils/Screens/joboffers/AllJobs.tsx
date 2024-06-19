"use client"
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import JobListings from './JobListings';

const jobs = [
  {
    id: 1,
    title: "Social Media Assistant",
    company: "Nomad",
    location: "Paris, France",
    salary: "$15k/Monthly",
    logo: "/images/66.png",
    tags: ["Full-Time"],
    categories: ["Marketing", "Design"]
  },
  {
    id: 2,
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Francisco, USA",
    salary: "$15k/Monthly",
    logo: "/images/22.png",
    tags: ["Part-Time"],
    categories: ["Marketing", "Design"]
  },
  {
    id: 3,
    title: "Interactive Developer",
    company: "Terraform",
    location: "Hamburg, Germany",
    salary: "$15k/Monthly",
    logo: "/images/33.png",
    tags: ["Full-Time"],
    categories: ["Development", "Design"]
  },
  {
    id: 4,
    title: "Email Marketing Specialist",
    company: "Revolut",
    location: "Madrid, Spain",
    salary: "$15k/Monthly",
    logo: "/images/44.png",
    tags: ["Full-Time"],
    categories: ["Marketing"]
  },
  {
    id: 5,
    title: "Lead Engineer",
    company: "Canva",
    location: "Ankara, Turkey",
    salary: "$15k/Monthly",
    logo: "/images/77.png",
    tags: ["Part-Time"],
    categories: ["Development", "Engineering"]
  },
  {
    id: 6,
    title: "Product Designer",
    company: "ClassPass",
    location: "Berlin, Germany",
    salary: "$35k/Monthly",
    logo: "/images/55.png",
    tags: ["Part-Time"],
    categories: ["Design", "Product"]
  },
  {
    id: 7,
    title: "Customer Manager",
    company: "Pitch",
    location: "Berlin, Germany",
    salary: "$25k/Monthly",
    logo: "/images/88.png",
    tags: ["Part-Time"],
    categories: ["Customer Service"]
  },
  {
    id: 8,
    title: "Data Analyst",
    company: "Google",
    location: "London, UK",
    salary: "$20k/Monthly",
    logo: "/images/99.png",
    tags: ["Full-Time"],
    categories: ["Data", "Analysis"]
  },
  {
    id: 9,
    title: "HR Specialist",
    company: "Amazon",
    location: "Seattle, USA",
    salary: "$18k/Monthly",
    logo: "/images/101.png",
    tags: ["Part-Time"],
    categories: ["HR", "Administration"]
  },
  {
    id: 10,
    title: "Backend Developer",
    company: "Microsoft",
    location: "Redmond, USA",
    salary: "$30k/Monthly",
    logo: "/images/102.png",
    tags: ["Full-Time"],
    categories: ["Development", "Backend"]
  },
  {
    id: 11,
    title: "UI/UX Designer",
    company: "Apple",
    location: "Cupertino, USA",
    salary: "$28k/Monthly",
    logo: "/images/103.png",
    tags: ["Part-Time"],
    categories: ["Design", "UI/UX"]
  },
  {
    id: 12,
    title: "Sales Executive",
    company: "Salesforce",
    location: "Dublin, Ireland",
    salary: "$22k/Monthly",
    logo: "/images/104.png",
    tags: ["Full-Time"],
    categories: ["Sales", "Marketing"]
  },
  {
    id: 13,
    title: "Content Writer",
    company: "HubSpot",
    location: "Boston, USA",
    salary: "$12k/Monthly",
    logo: "/images/105.png",
    tags: ["Part-Time"],
    categories: ["Writing", "Marketing"]
  },
  {
    id: 14,
    title: "Network Engineer",
    company: "Cisco",
    location: "San Jose, USA",
    salary: "$25k/Monthly",
    logo: "/images/106.png",
    tags: ["Full-Time"],
    categories: ["Engineering", "Networking"]
  },
  {
    id: 15,
    title: "Project Manager",
    company: "Slack",
    location: "Remote",
    salary: "$30k/Monthly",
    logo: "/images/107.png",
    tags: ["Part-Time"],
    categories: ["Management", "Project"]
  },
];


const AllJobs: React.FC = () => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleCheckboxChange = (filter: string) => {
    setSelectedFilters(prevFilters =>
      prevFilters.includes(filter)
        ? prevFilters.filter(f => f !== filter)
        : [...prevFilters, filter]
    );
  };

  const filteredJobs = jobs.filter(job => {
    if (selectedFilters.length === 0) {
      return true; // No filters selected, show all jobs
    }

    // Check if job matches all selected filters
    const matchesTags = selectedFilters.every(filter => job.tags.includes(filter));
    const matchesCategories = selectedFilters.some(filter => job.categories?.includes(filter));

    return matchesTags || matchesCategories;
  });

  return (
    <div className='md:container md:my-16 my-4'>
      <div className="md:flex gap-5 ">
        <Sidebar onCheckboxChange={handleCheckboxChange} selectedFilters={selectedFilters} />
        <JobListings jobs={filteredJobs} />
      </div>
    </div>
  );
};

export default AllJobs;