import Navbar from "@/app/dashboard/components/Navbar";
import Sidebar from "@/app/dashboard/components/Sidebar";

import '../globals.css';
import DashboardProtectedRoutes from "@/components/HOC/DashboardProtectedRoutes";


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DashboardProtectedRoutes>
    <div className="flex w-full bg-secondary">
      <Sidebar />
      <div className="flex flex-col flex-1 w-full bg-secondary">
        <Navbar />
        <main className="my-4 px-4">{children}</main>
      </div>{" "}
    </div>
    </DashboardProtectedRoutes>
  );
};

export default  DashboardLayout;
