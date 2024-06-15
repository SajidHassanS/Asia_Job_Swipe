import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
// import Sidebar from './Sidebar';
import JobListings from './JobListings';



const jobs = [
    {
      id: 1,
      title: "Social Media Assistant",
      company: "Nomad",
      location: "Nomad is located in Paris, France. Nomad has generates $728,000 in sales (USD).",
        job: "3 job",
      logo: "/images/66.png",
      tags: ["Full-Time", "Marketing", "Design"]
    },
    { 
      id: 2,
      title: "Brand Designer",
      company: "Dropbox",
      location: "Nomad is located in Paris, France. Nomad has generates $728,000 in sales (USD).",
      
      job: "3 job",
      logo: "/images/22.png",
      tags: ["Part-Time", "Marketing", "Design"]
    },
    {
      id: 3,
      title: "Interactive Developer",
      company: "Terraform",
      location: "Nomad is located in Paris, France. Nomad has generates $728,000 in sales (USD).",
           job: "3 job",
      logo: "/images/33.png",
      tags: ["Full-Time", "Marketing", "Design"]
    },
    {
      id: 4,
      title: "Email Marketing",
      company: "Revolut",
      location: "Nomad is located in Paris, France. Nomad has generates $728,000 in sales (USD).",
        job: "3 job",
      logo: "/images/44.png",
      tags: ["Full-Time", "Marketing", "Design"]
    },
    {
      id: 5,
      title: "Lead Engineer",
      company: "Canva",
      location: "Nomad is located in Paris, France. Nomad has generates $728,000 in sales (USD).",
         job: "3 job",
      logo: "/images/77.png",
      tags: ["Part-Time", "Marketing", "Design"]
    },
    {
      id: 6,
      title: "Product Designer",
      company: "ClassPass",
      location: "Nomad is located in Paris, France. Nomad has generates $728,000 in sales (USD).",
          job: "3 job",
      logo: "/images/55.png",
      tags: ["Full-Time", "Marketing", "Design"]
    },
    {
      id: 7,
      title: "Customer Manager",
      company: "Pitch",
      location: "Nomad is located in Paris, France. Nomad has generates $728,000 in sales (USD).",
          job: "3 job",
      logo: "/images/88.png",
      tags: ["Full-Time", "Marketing", "Design"]
    }
  ];
  
const AllJobs = () => {
  return (
<div className='md:container md:my-16 my-4'>
      <div className="md:flex gap-5 ">
       
        {/* <Sidebar /> */}
       
    
        
   
        <JobListings jobs={jobs} />
      </div>
     
    </div>
   
  );
}

export default AllJobs;




   
 


