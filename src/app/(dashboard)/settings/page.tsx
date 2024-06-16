import { Metadata } from "next";
import Settings from "./Settings";
import Title from "@/components/Title";

export const metadata: Metadata = {
  title: "Settings",
  description: "Asia JobsSwipe Admin Panel - Settings",
};
const SettingsPage = () => {
  return (
    <Title title="Settings">
      <Settings />
    </Title>
  );
};

export default SettingsPage;
