"use client";

import LoadingSkeleton from "@/components/LoadingSkeleton";
import PaginationComponent from "@/components/Pagination";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import DataTable from "@/components/DataTable";
import Image from "next/image";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AiFillDelete } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { BsBookmarkDash, BsBookmarkFill } from "react-icons/bs";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Checkbox } from "@/components/ui/checkbox";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllApplications, shortlistApplication, rejectApplication } from "@/store/slices/appliedApplicantSlice/appliedApplicantSlice";
import { RootState, AppDispatch } from "@/store";

interface Experience {
  from: string;
  to: string;
  onGoing: boolean;
}

interface JobSeeker {
  firstName: string;
  lastName: string;
  profilePicture: string;
  experience?: Experience[];
}

interface Job {
  title: string;
  sector: string;
  // Add other relevant fields here if needed
}

interface JobApplication {
  _id: string;
  job: Job;
  jobSeeker: JobSeeker;
  shortlisted?: boolean;
  status: string;
  // Add other relevant fields here if needed
}

interface Pagination {
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPage: number | null;
  previousPage: number | null;
}

const AllCompaniesData = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState<number>(1);
  const [selectedApplicationId, setSelectedApplicationId] = useState<string | null>(null);
  const [isShortlistDialogOpen, setIsShortlistDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);

  const token = localStorage.getItem("accessToken");
  const companyId = localStorage.getItem("_id");

  const { applications = [], pagination, status, error } = useSelector((state: RootState) => state.appliedApplicant);

  useEffect(() => {
    if (token && companyId) {
      dispatch(fetchAllApplications({ companyId, token }));
    }
  }, [dispatch, token, companyId, page]);

  const headers = [
    "Picture",
    "Name",
    "Contact Info",
    "Sector",
    "Job Title",
    "Experience",
    "Action",
  ];

  if (status === "loading") return <LoadingSkeleton />;
  if (error) return <div>Error: {error}</div>;

  const calculateTotalExperience = (experience: Experience[] = []): number => {
    let totalExperience = 0;

    experience.forEach(job => {
      const fromDate = new Date(job.from);
      const toDate = job.onGoing ? new Date() : new Date(job.to);
      const duration = toDate.getTime() - fromDate.getTime();
      totalExperience += duration;
    });

    return totalExperience / (1000 * 60 * 60 * 24 * 365);
  };

  const handleShortlistConfirm = () => {
    if (selectedApplicationId && token) {
      dispatch(shortlistApplication({ applicationId: selectedApplicationId, token }));
      setIsShortlistDialogOpen(false);
    }
  };

  const handleRejectConfirm = () => {
    if (selectedApplicationId && token) {
      dispatch(rejectApplication({ applicationId: selectedApplicationId, token }));
      setIsRejectDialogOpen(false);
    }
  };

  const renderCompanyRow = (application: JobApplication) => {
    const totalExperience = calculateTotalExperience(application.jobSeeker.experience);

    return (
      <>
        <TableCell>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
          </div>
        </TableCell>
        
        <TableCell className="flex gap-5 items-center">
        <Link href={`/applicant-profile/${application._id}`} className="flex gap-5 items-center">
            <div className="w-10 h-10 overflow-hidden rounded-full">
              <Image src={application.jobSeeker.profilePicture} alt={`${application.jobSeeker.firstName} ${application.jobSeeker.lastName}`} width={40} height={40} className="object-cover w-full h-full"/>
            </div>
            <span>{`${application.jobSeeker.firstName} ${application.jobSeeker.lastName}`}</span>
          </Link>
        </TableCell>

        <TableCell>
          <div className="border rounded-full py-3 flex justify-center text-signature border-blue">
            {/* Add the matched percentage or other info if available */}
          </div>
        </TableCell>
      
        <TableCell>{`${application.job.title}`}</TableCell>
        <TableCell>{`${totalExperience.toFixed(1)} years`}</TableCell>
        <TableCell className="flex items-center gap-6">
          <Link href={"#"} className="text-threeicons bg-muted p-3 rounded-xl hover:text-signature/80 transition-colors">
            <BiMessageRoundedDetail size={20} />
          </Link>
          <button
            onClick={() => {
              setSelectedApplicationId(application._id);
              setIsShortlistDialogOpen(true);
            }}
            className="text-threeicons bg-muted p-3 rounded-xl hover:text-signature/80 transition-colors"
          >
             {application.status === "shortlisted" ?  <BsBookmarkFill color="blue" size={20} /> : <BsBookmarkDash size={20} />}
          </button>
          <button
            onClick={() => {
              setSelectedApplicationId(application._id);
              setIsRejectDialogOpen(true);
            }}
            className="cursor-pointer bg-muted p-3 rounded-xl text-threeicons hover:text-signature/80 transition-colors"
          >
            <RiDeleteBin5Line size={20} />
          </button>
        </TableCell>
      </>
    );
  };

  return (
    <div>
      <main className="my-4 px-4 flex-1">
        <div className="pb-3">
          <h1 className="text-2xl font-bold pb-3">All Applied Candidates</h1>
          <p>Showing {applications.length} People</p>
        </div>
        <DataTable headers={headers} data={applications} renderRow={renderCompanyRow} />
      </main>

      <PaginationComponent page={page} pagination={pagination} changePage={setPage} />

      <Dialog open={isShortlistDialogOpen} onOpenChange={setIsShortlistDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Shortlist Application</DialogTitle>
            <DialogDescription>
              Are you sure you want to shortlist this application?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="button" variant={"destructive"} onClick={handleShortlistConfirm}>
              Shortlist
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Reject Application</DialogTitle>
            <DialogDescription>
              Are you sure you want to reject this application?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="button" variant={"destructive"} onClick={handleRejectConfirm}>
              Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllCompaniesData;
