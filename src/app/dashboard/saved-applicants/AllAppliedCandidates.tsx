"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/store"; // Make sure to update the imports according to your store setup
import { fetchShortlistedApplications } from "@/store/slices/appliedApplicantSlice/appliedApplicantSlice"; // Import the thunk
import LoadingSkeleton from "@/components/LoadingSkeleton";
import PaginationComponent from "@/components/Pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DataTable from "@/components/DataTable";
import Image from "next/image";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AiFillDelete } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { BsBookmarkDash } from "react-icons/bs";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Checkbox } from "@/components/ui/checkbox";

const AllShortlistedApplications = () => {
  const [page, setPage] = useState<number>(1);
  const dispatch = useDispatch<AppDispatch>();

  // Retrieve state from Redux
  const { applications, pagination, status, error } = useSelector(
    (state: RootState) => state.appliedApplicant
  );

  useEffect(() => {
    const token = localStorage.getItem("accesstoken"); // Retrieve the token from local storage
    const companyId = localStorage.getItem("_id"); // Replace with your actual company ID or get it from context/state

    if (token && companyId) {
      dispatch(fetchShortlistedApplications({ companyId, token }));
    }
  }, [dispatch, page]);

  if (status === "loading") return <LoadingSkeleton />;
  if (status === "failed") return <div>Error: {error}</div>;

  const headers = [
    "Profile Picture",
    "Name",
    "Matched",
    "Sector",
    "Experience",
    "Action",
  ];

  const renderApplicationRow = (application: typeof applications[0]) => (
    <>
      <TableCell>
        <div className="flex items-center space-x-2">
          <Checkbox id="select-application" />
        </div>
      </TableCell>
      <TableCell className="flex gap-5 items-center">
        <Image
          src={application.jobSeeker.profilePicture || "/images/avatar.png"}
          alt={application.jobSeeker.firstName}
          width={40}
          height={40}
        />{" "}
        {application.jobSeeker.firstName} {application.jobSeeker.lastName}
      </TableCell>

      <TableCell>
        <div className="border rounded-full py-3 flex justify-center text-signature border-blue">
          {application.job.title}
        </div>
      </TableCell>
      <TableCell>{application.job.sector}</TableCell>
      <TableCell>{application.jobSeeker.experience.length} Years Experience</TableCell>
      <TableCell className="flex items-center gap-6">
        <Link href={"#"} className="text-threeicons bg-muted p-3 rounded-xl hover:text-signature/80 transition-colors">
          <BiMessageRoundedDetail size={20} />
        </Link>
        <Link href={"#"} className="text-threeicons bg-muted p-3 rounded-xl hover:text-signature/80 transition-colors">
          <BsBookmarkDash size={20} />
        </Link>
        <Dialog>
          <DialogTrigger asChild>
            <div className="cursor-pointer bg-muted p-3 rounded-xl text-threeicons hover:text-signature/80 transition-colors">
              <RiDeleteBin5Line size={20} />
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] p-3">
            <DialogHeader>
              <DialogTitle>Delete Application</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this application?
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
    </>
  );

  return (
    <div>
      <main className="my-4 px-4 flex-1">
        <div className="pb-3">
          <h1 className="text-2xl font-bold pb-3">All Shortlisted Candidates</h1>
          <p>Showing {applications.length} Candidates</p>
        </div>
        <DataTable
          headers={headers}
          data={applications}
          renderRow={renderApplicationRow}
        />
      </main>

      <PaginationComponent
        page={page}
        pagination={pagination}
        changePage={setPage}
      />
    </div>
  );
};

export default AllShortlistedApplications;
