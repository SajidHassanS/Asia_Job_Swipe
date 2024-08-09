"use client";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { AppDispatch, RootState } from '@/store';
import { fetchJobById } from '@/store/slices/jobSlice';
import { applyForJob, toggleSaveJob } from '@/store/slices/jobSeekerSlice';
import { Button } from '@/components/ui/button';
import { CiCircleCheck } from 'react-icons/ci';
import Image from 'next/image';
import { IoShareSocialOutline, IoCheckmarkDoneSharp } from 'react-icons/io5';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Slash } from "lucide-react"; 
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Discord from './components/Discord';
import SimilarJobs from './components/SimilarJobs';
import Layout from '@/components/utils/layout';

const JobDescription = () => {
  const dispatch: AppDispatch = useDispatch();
  const { id } = useParams();
  const { job, status } = useSelector((state: RootState) => state.job);
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const origin = searchParams.get('origin');

  useEffect(() => {
    if (id) {
      dispatch(fetchJobById(id as string));
    }
  }, [id, dispatch]);

  const handleApplyClick = async (jobId: string) => {
    const jobSeekerId = localStorage.getItem('_id');
    if (jobSeekerId) {
      try {
        await dispatch(applyForJob({ jobId, jobSeekerId })).unwrap();
        toast({
          title: 'Application Submitted',
          description: 'Your job application was submitted successfully!',
        });
      } catch (error: any) {
        const errorMessage = error === 'You have already applied for this job'
          ? 'You have already applied for this job'
          : 'Failed to apply for the job. Please try again later.';
        toast({
          title: 'Application Failed',
          description: errorMessage,
          variant: 'destructive',
        });
      }
    } else {
      console.error('Missing jobSeekerId');
      toast({
        title: 'Missing Information',
        description: 'Missing jobSeekerId',
        variant: 'destructive',
      });
    }
  };

  const handleBookmarkClick = async (jobId: string) => {
    const jobSeekerId = localStorage.getItem('_id');
    const accessToken = localStorage.getItem('accessToken');
    if (jobSeekerId && accessToken) {
      try {
        await dispatch(toggleSaveJob({ jobId, jobSeekerId, accessToken })).unwrap();
        toast({
          title: 'Job Saved',
          description: 'Job saved successfully!',
        });
      } catch (error) {
        console.error('Failed to save job:', error);
        toast({
          title: 'Failed to Save Job',
          description: 'There was an error saving the job.',
          variant: 'destructive',
        });
      }
    } else {
      console.error('Missing jobSeekerId or accessToken');
      toast({
        title: 'Missing Information',
        description: 'Missing jobSeekerId or accessToken',
        variant: 'destructive',
      });
    }
  };

  const getBreadcrumbLink = (origin: string | null) => {
    switch (origin) {
      case 'find-jobs':
        return { href: '/findjobs', label: 'Find Jobs' };
      case 'matched-jobs':
        return { href: '/matchedjobs', label: 'Matched Jobs' };
      case 'saved-jobs':
      default:
        return { href: '/savedjobs', label: 'Saved Jobs' };
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error loading job details</div>;
  }

  const breadcrumbLink = getBreadcrumbLink(origin);
  const companyLogo = job?.company?.companyLogo || '/images/default-company-logo.png'; // Fallback logo

  return (
    <>
      <Layout>
        {job && (
          <div className="">
            {/* Breadcrumb */}
            <div className="bg-gray-100 py-3 md:py-10">
              <div className="mx-3 md:container">
                <div className="mx-3 md:container">
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator>
                        <Slash />
                      </BreadcrumbSeparator>
                      <BreadcrumbItem>
                        <BreadcrumbLink href={breadcrumbLink.href}>{breadcrumbLink.label}</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator>
                        <Slash />
                      </BreadcrumbSeparator>
                      <BreadcrumbItem>
                        <BreadcrumbPage>{job.title}</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
                <div className="">
                  <Card className="my-5 bg-background p-4">
                    <div className="flex justify-between mb-5 md:mb-2">
                      <div className="flex items-center">
                        <Image
                          width={70}
                          height={70}
                          src={companyLogo}
                          alt={job.company.companyName}
                          className="rounded-full mr-4"
                        />
                        <div>
                          <h3 className="md:text-xl text-lg font-bold">{job.title}</h3>
                          <div className="flex md:gap-3 items-center">
                            <p className="text-sm text-gray-600">
                              {job.company.companyName} • {job.city}, {job.province}, {job.country}
                            </p>
                            <div className="md:block hidden">
                              <IoCheckmarkDoneSharp className="text-green-500" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="md:mt-3">
                        <div className="md:hidden mb-2 flex justify-end">
                          <IoShareSocialOutline className="text-signature" size={20} />
                        </div>
                        <p className="md:text-xl text-md font-bold">
                          ${job.salary.from}/Monthly
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex flex-wrap gap-3 md:ml-20 items-center">
                        <Button className='rounded-full text-signature bg-mutedLight'>
                          {job.jobType}
                        </Button>
                        {job.skills.map((skill) => (
                          <Button
                            variant={"outline"}
                            className={`rounded-full `}
                            key={skill}
                          >
                            {skill}
                          </Button>
                        ))}
                        <div className="md:block hidden">
                          <IoShareSocialOutline className="text-signature" size={30} />
                        </div>
                      </div>
                      <div className="flex flex-col mt-2">
                        <Button
                          className="bg-signature text-background text-sm px-8 py-2 rounded-md"
                          onClick={() => handleApplyClick(job._id)}
                        >
                          Apply
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>

            <div className="mx-5 md:container flex flex-col md:flex-row gap-5 pt-16 pb-10">
              <div className="w-full md:w-2/3">
                <div>
                  <div className="">
                    <h1 className="text-3xl font-bold text-modaltext pb-5">Job Description</h1>
                    <p className="text-signininput">{job.description}</p>
                  </div>
                  <div className="my-10">
                    <h1 className="text-3xl text-modaltext font-bold pb-5">Responsibilities</h1>
                    {job.skills.map((skill, index) => (
                      <div key={index} className="flex items-center mb-5 gap-5">
                        <CiCircleCheck className="text-signature w-32 md:w-8 " size={25} />
                        <p className="text-signininput">{skill}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/3">
                <div className="md:px-10">
                  <div className="flex items-center mb-5 justify-between">
                    <h1 className="text-signininput">Job Posted On</h1>
                    <p className="text-modaltext">{new Date(job.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center mb-5 justify-between">
                    <h1 className="text-signininput">Job Type</h1>
                    <p className="text-modaltext">{job.jobType}</p>
                  </div>
                  <div className="flex items-center mb-5 justify-between">
                    <h1 className="text-signininput">Salary</h1>
                    <p className="text-modaltext">${job.salary.from} - ${job.salary.to} USD</p>
                  </div>
                  <hr className="border-hrline my-6" />
                  <div className="">
                    <h1 className="text-3xl font-bold text-modaltext pb-5">Categories</h1>
                    <div className="flex gap-3">
                      <Button className="bg-yellowBg text-base text-yellow rounded-[20px]">{job.company.sector}</Button>
                    </div>
                    <hr className="border-hrline my-6" />
                  </div>
                  <div className="">
                    <h1 className="text-3xl font-bold text-modaltext pb-5">Required Skills</h1>
                    <div className="flex flex-wrap gap-3">
                      {job.skills.map((skill, index) => (
                        <Button key={index} className="bg-muted text-base text-signature">{skill}</Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='mx-5 md:container'>
              <div className="">
                <h1 className="text-3xl font-bold text-modaltext pb-5">Perks & Benefits</h1>
                <p className="text-signininput">This job comes with several perks and benefits</p>
              </div>
              <div className="flex flex-wrap md:items-center md:justify-between my-10 gap-2">
                <div className="bg-muted flex flex-col gap-4 items-center justify-between rounded-xl px-6 py-3 md:px-16 md:py-8">
                  <Image src="/images/benefits/statoscope.png" alt="statoscope" width={50} height={50} />
                  <h1 className="text-modaltext">Full Healthcare</h1>
                </div>
                <div className="bg-muted flex flex-col gap-4 items-center justify-between rounded-xl md:px-16 px-6 py-3 md:py-8">
                  <Image src="/images/benefits/vacation.png" alt="statoscope" width={50} height={50} />
                  <h1 className="text-modaltext">Unlimited Vacation</h1>
                </div>
                <div className="bg-muted flex flex-col gap-4 items-center justify-between rounded-xl md:px-16 px-6 py-3 md:py-8">
                  <Image src="/images/benefits/development.png" alt="statoscope" width={50} height={50} />
                  <h1 className="text-modaltext">Skill Development</h1>
                </div>
                <div className="bg-muted flex flex-col gap-4 items-center justify-between rounded-xl md:px-16 px-6 py-3 md:py-8">
                  <Image src="/images/benefits/summits.png" alt="statoscope" width={50} height={50} />
                  <h1 className="text-modaltext">Team Summits</h1>
                </div>
              </div>
            </div>

            <Discord />

            <SimilarJobs />
          </div>
        )}
      </Layout>
    </>
  );
};

export default JobDescription;
