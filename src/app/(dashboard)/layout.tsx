import Navbar from "@/app/(dashboard)/components/Navbar";
import Sidebar from "@/app/(dashboard)/components/Sidebar";
import { Metadata } from "next";
import '../globals.css';
export const metadata: Metadata = {
  title: "Dashboard",
  description: "Asia JobsSwipe Admin Panel Dashboard",
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full bg-secondary">
      <Sidebar />
      <div className="flex flex-col flex-1 w-full bg-secondary">
        <Navbar />
        <main className="my-4 px-4">{children}</main>
      </div>{" "}
    </div>
  );
};

export default DashboardLayout;
