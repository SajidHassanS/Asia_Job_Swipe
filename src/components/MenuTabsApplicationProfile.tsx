"use client";
import { useCommonData } from "@/context/commonData";

interface Props {
  activeTab: string;
  changeTab: (tab: Tab) => void;
  tabMenu: string[];
}

const MenuTabsApplicationProfile = ({ activeTab, changeTab, tabMenu }: Props) => {
  const { changeActivePage } = useCommonData();
  const isActive = (path: string): string => {
    return path === activeTab
      ? "border-b-2 border-signature text-custom-dark-blue"
      : "text-custom-gray-blue hover:text-signature";
  };

  return (
    <ul className="flex border-b gap-4 h-8">
      {tabMenu.map((tab) => (
        <li
          key={tab}
          className={`${isActive(
            tab
          )} capitalize flex items-center font-semibold h-full  px-2 transition-colors cursor-pointer `}
          onClick={() => changeTab(tab as Tab)}
        >
          {tab}
        </li>
      ))}
    </ul>
  );
};

export default MenuTabsApplicationProfile;
