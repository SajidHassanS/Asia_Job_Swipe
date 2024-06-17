import Navbar from "@/app/components/Navbar";
import Sidebar from "@/app/components/Sidebar";

import '../globals.css';


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
