"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import PaginationComponent from "@/components/Pagination";
import { Table, TableBody, TableCell, TableRow, TableHeader, TableHead } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { RootState, AppDispatch } from "@/store";
import { getJobsByCompany, getJobById, deleteJob, updateJob } from "@/store/slices/postJobSlice";
import { format } from "date-fns";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import EditJobDialog from "./components/EditJobDialog";
import JobDetailsDialog from "./components/JobDetailsDialog"; // Import the new JobDetailsDialog component

interface Job {
  _id: string;
  title: string;
  sector: string;
  skills: string[];
  country: string;
  city: string;
  province: string;
  description: string;
  benefits: string[];
  salary: {
    from: number;
    to: number;
  };
  availability: string;
  careerLevel: string;
  jobType: string;
  candidateType: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  workPermitNeeded: boolean;
}

interface FormStateData {
  jobTitle: string;
  sector: string;
  skillsRequired: string[];
  country: string;
  city: string;
  province: string;
  description: string;
  benefits: string[];
  salaryFrom: string;
  salaryTo: string;
  urgency: string;
  careerLevel: string;
  jobType: string;
  candidateType: string;
  workPermitNeeded: boolean;
}

const AllCompaniesData = () => {
  const [page, setPage] = useState<number>(1);
  const [jobs, setJobs] = useState<Job[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const { jobs: fetchedJobs, status, error, pagination } = useSelector((state: RootState) => state.postJob);

  const [paginationState, setPaginationState] = useState({
    totalPages: 1,
    currentPage: 1,
    hasNextPage: false,
    hasPreviousPage: false,
    nextPage: null as number | null,
    previousPage: null as number | null,
  });

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isJobDetailsDialogOpen, setIsJobDetailsDialogOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const [editFormData, setEditFormData] = useState<FormStateData>({
    jobTitle: "",
    sector: "",
    skillsRequired: [],
    country: "",
    city: "",
    province: "",
    description: "",
    benefits: [],
    salaryFrom: "",
    salaryTo: "",
    urgency: "",
    careerLevel: "",
    jobType: "",
    candidateType: "",
    workPermitNeeded: true,
  });

  const companyId = typeof window !== 'undefined' ? localStorage.getItem("_id") : null;

  useEffect(() => {
    if (companyId) {
      dispatch(getJobsByCompany({ companyId, page }));
    }
  }, [dispatch, companyId, page]);

  useEffect(() => {
    if (fetchedJobs) {
      setJobs(fetchedJobs);
    }
  }, [fetchedJobs]);

  useEffect(() => {
    if (pagination) {
      setPaginationState({
        totalPages: pagination.totalPages || 1,
        currentPage: pagination.currentPage || 1,
        hasNextPage: pagination.hasNextPage || false,
        hasPreviousPage: pagination.hasPreviousPage || false,
        nextPage: pagination.nextPage,
        previousPage: pagination.previousPage,
      });
    }
  }, [pagination]);

  if (status === 'loading') return <LoadingSkeleton />;
  if (status === 'failed') return <div>Error: {error}</div>;

  const handleEditClick = async (jobId: string) => {
    setSelectedJobId(jobId);
    const response = await dispatch(getJobById(jobId)).unwrap();
    if (response && response.job) {
      setEditFormData({
        jobTitle: response.job.title,
        sector: response.job.sector,
        skillsRequired: response.job.skills || [],
        country: response.job.country,
        city: response.job.city,
        province: response.job.province,
        description: response.job.description,
        benefits: response.job.benefits || [],
        salaryFrom: response.job.salary?.from ? response.job.salary.from.toString() : '',
        salaryTo: response.job.salary?.to ? response.job.salary.to.toString() : '',
        urgency: response.job.availability,
        careerLevel: response.job.careerLevel,
        jobType: response.job.jobType,
        candidateType: response.job.candidateType,
        workPermitNeeded: response.job.workPermitNeeded || true,
      });
      setIsEditDialogOpen(true);
    }
  };

  const handleViewClick = async (jobId: string) => {
    setSelectedJobId(jobId);
    const response = await dispatch(getJobById(jobId)).unwrap();
    if (response && response.job) {
      setSelectedJob(response.job);
      setIsJobDetailsDialogOpen(true);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedJobId) {
      const updatedJobData = {
        title: editFormData.jobTitle,
        sector: editFormData.sector,
        skills: editFormData.skillsRequired,
        benefits: editFormData.benefits,
        salary: {
          from: parseInt(editFormData.salaryFrom),
          to: parseInt(editFormData.salaryTo)
        },
        availability: editFormData.urgency,
        careerLevel: editFormData.careerLevel,
        jobType: editFormData.jobType,
        candidateType: editFormData.candidateType,
        city: editFormData.city,
        province: editFormData.province,
        country: editFormData.country,
        description: editFormData.description,
        workPermitNeeded: editFormData.workPermitNeeded
      };

      await dispatch(updateJob({ id: selectedJobId, jobData: updatedJobData })).unwrap();
      // Update the job list state in the main component
      setJobs((prevJobs) => prevJobs.map((job) => (job._id === selectedJobId ? { ...job, ...updatedJobData } : job)));
      setIsEditDialogOpen(false);
    }
  };

  const handleDeleteClick = (jobId: string) => {
    setSelectedJobId(jobId);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteSubmit = async () => {
    if (selectedJobId) {
      await dispatch(deleteJob(selectedJobId)).unwrap();
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== selectedJobId));
      setIsDeleteDialogOpen(false);
    }
  };

  const renderJobRow = (job: Job) => (
    <TableRow key={job._id}>
      <TableCell>
        <div className="flex items-center space-x-2">
          <Checkbox id={`job-${job._id}`} />
        </div>
      </TableCell>
      <TableCell className="font-medium cursor-pointer" onClick={() => handleViewClick(job._id)}>{job.title}</TableCell>
      <TableCell>
        <div className={`border rounded-full py-1 px-3 text-center ${job.active ? "text-green-500 border-green-500" : "text-yellow-500 border-yellow-500"}`}>
          {job.active ? "Active" : "Partially Active"}
        </div>
      </TableCell>
      <TableCell>{format(new Date(job.createdAt), "dd MMM, yyyy")}</TableCell>
      <TableCell>{job.careerLevel.charAt(0).toUpperCase() + job.careerLevel.slice(1)} Level</TableCell>
      <TableCell className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
        <Button variant="outline" size="icon" onClick={() => handleEditClick(job._id)}>
          <FaEdit size={20} />
        </Button>
        <Button variant="destructive" size="icon" onClick={() => handleDeleteClick(job._id)}>
          <RiDeleteBin5Line size={20} />
        </Button>
      </TableCell>
    </TableRow>
  );

  return (
    <div>
      <main className="my-4 px-4 flex-1">
        <div className="pb-3">
          <h1 className="text-2xl font-bold pb-3">All Posted Jobs</h1>
          <p>Showing {jobs.length} Jobs</p>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Job Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead>Career Level</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map(renderJobRow)}
          </TableBody>
        </Table>
      </main>

      <PaginationComponent page={page} pagination={paginationState} changePage={setPage} />

      <EditJobDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSubmit={handleEditSubmit}
        formData={editFormData}
        setFormData={setEditFormData}
      />

      <JobDetailsDialog
        isOpen={isJobDetailsDialogOpen}
        onClose={() => setIsJobDetailsDialogOpen(false)}
        job={selectedJob}
      />

      <Dialog open={isDeleteDialogOpen} onOpenChange={() => setIsDeleteDialogOpen(false)}>
        <DialogContent className="sm:max-w-[425px] p-3">
          <DialogHeader>
            <DialogTitle>Delete Job</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this job?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="button" variant={"destructive"} onClick={handleDeleteSubmit}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllCompaniesData;
