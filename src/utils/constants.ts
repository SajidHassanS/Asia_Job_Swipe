import { FaSearchMinus } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoBriefcaseOutline, IoSettingsOutline } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { PiBuildingsFill } from "react-icons/pi";
import { PiPuzzlePiece } from "react-icons/pi";
import { FaBriefcase, FaUser, FaBuilding, FaDollarSign } from "react-icons/fa";
import { LuClipboardList } from "react-icons/lu";
export const baseUrl = "https://ajs-server.hostdonor.com";
import { IoBagCheck } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { TbBuildingSkyscraper } from "react-icons/tb";

// Define the Menu type
type Menu = {
  name: string;
  path: string;
  icon: React.ComponentType;
};

// Define the StatsData type
type StatsData = {
  icon: React.ComponentType;
  title: string;
  value: string;
  percentage: number;
  change: boolean;
};

// pages are dashboard, all-jobs, all companies, promotions, settings
export const menu: Menu[] = [
  {  
    name: "Home",
    path: "/company-admin-panel",
    icon: MdDashboard,
  },
  {
    name: "Matched Applicants",
    path: "/matched-applicants",
    icon: PiPuzzlePiece,
  },
  {
    name: "Job Listings",
    path: "/job-listings",
    icon: LuClipboardList,
  },
  {
    name: "Applied Applicants",
    path: "/applied-applicants",
    icon: IoBagCheck,
  },
  {
    name: "Message",
    path: "/messages",
    icon: AiOutlineMessage,
  },
  {
    name: "Saved Applicants",
    path: "/saved-applicants",
    icon: FaUsers,
  },
  {
    name: "Company Role",
    path: "/company-role",
    icon: FaUsers,
  },
  {
    name: "Company Profile",
    path: "/company-profile",
    icon: TbBuildingSkyscraper,
  },
];

export const statsData: StatsData[] = [
  {
    icon: FaBriefcase,
    title: "Open Jobs",
    value: "15,000",
    percentage: 12,
    change: true,
  },
  {
    icon: FaUser,
    title: "Total Job Seekers",
    value: "10,566.01",
    percentage: 33,
    change: true,
  },
  {
    icon: FaBuilding,
    title: "Total Companies",
    value: "956.00",
    percentage: 5,
    change: false,
  },
  {
    icon: FaDollarSign,
    title: "Business",
    value: "$5,566.01",
    percentage: 15,
    change: true,
  },
];
