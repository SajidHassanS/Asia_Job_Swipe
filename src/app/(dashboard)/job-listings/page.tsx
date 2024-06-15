import { Metadata } from "next";
import AllAppliedCandidates from "./AllAppliedCandidates";
import Title from "@/components/Title";

export const metadata: Metadata = {
  title: "All Companies",
  description: "Asia JobsSwipe Admin Panel - All Companies",
};

const JobListings = () => {
  return (
    <Title
      title="Job Listings"
      className="w-full min-h-screen flex flex-col bg-background p-4"
    >
      <AllAppliedCandidates />
    </Title>
  );
};

export default JobListings;
