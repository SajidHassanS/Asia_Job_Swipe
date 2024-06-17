import { Metadata } from "next";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "Settings",
  description: "Asia JobsSwipe Admin Panel Settings",
};

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default SettingsLayout;
