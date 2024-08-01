"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import PaginationComponent from "@/components/Pagination";
import { Table, TableBody, TableCell, TableRow, TableHeader, TableHead } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RootState, AppDispatch } from "@/store";
import { getJobsByCompany } from "@/store/slices/postJobSlice";
import { format } from "date-fns";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

const AllCompaniesData = () => {
  const [page, setPage] = useState<number>(1);
  const dispatch = useDispatch<AppDispatch>();
  const { jobs, status, error, pagination } = useSelector((state: RootState) => state.postJob);

  const [paginationState, setPaginationState] = useState({
    totalPages: 1,
    currentPage: 1,
    hasNextPage: false,
    hasPreviousPage: false,
    nextPage: null as number | null,
    previousPage: null as number | null,
  });

  // Ensure localStorage access only in client-side environment
  const companyId = typeof window !== 'undefined' ? localStorage.getItem("_id") : null;

  useEffect(() => {
    if (companyId) {
      dispatch(getJobsByCompany({ companyId, page }));
    }
  }, [dispatch, companyId, page]);

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

  const renderJobRow = (job: any) => (
    <TableRow key={job._id}>
      <TableCell>
        <div className="flex items-center space-x-2">
          <Checkbox id={`job-${job._id}`} />
        </div>
      </TableCell>
      <TableCell className="font-medium">{job.title}</TableCell>
      <TableCell>
        <div className={`border rounded-full py-1 px-3 text-center ${job.active ? "text-green-500 border-green-500" : "text-yellow-500 border-yellow-500"}`}>
          {job.active ? "Active" : "Partially Active"}
        </div>
      </TableCell>
      <TableCell>{format(new Date(job.createdAt), "dd MMM, yyyy")}</TableCell>
      <TableCell>{job.careerLevel.charAt(0).toUpperCase() + job.careerLevel.slice(1)} Level</TableCell>
      <TableCell className="flex items-center gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <div className="cursor-pointer p-3 rounded-xl text-signature hover:text-blue-700 transition-colors">
              <FaEdit size={20} />
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] p-3">
            <DialogHeader>
              <DialogTitle>Edit Job</DialogTitle>
              <DialogDescription>
                {/* Include form or content to edit job details here */}
              </DialogDescription>
              <DialogFooter>
                <DialogClose>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="button">Save</Button>
              </DialogFooter>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <div className="cursor-pointer p-3 rounded-xl text-red-500 hover:text-red-700 transition-colors">
              <RiDeleteBin5Line size={20} />
            </div>
          </DialogTrigger>
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
              <Button type="button" variant={"destructive"}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
    </div>
  );
};

export default AllCompaniesData;
