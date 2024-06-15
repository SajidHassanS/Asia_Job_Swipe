"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type CommonDataType = {
  activePage: string;
  activeTab: string;
  changeActivePage: (page: string) => void;
  changeActiveTab: (tab: string) => void;
};
const CommonData = createContext<CommonDataType | undefined>(undefined);

export const CommonDataProvider = ({ children }: { children: ReactNode }) => {
  const [activePage, setActivePage] = useState<string>("Dashboard");
  const [activeTab, setActiveTab] = useState<string>("active");

  const changeActivePage = (page: string) => {
    setActivePage(page);
  };

  const changeActiveTab = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <CommonData.Provider
      value={{
        activePage,
        activeTab,
        changeActivePage,
        changeActiveTab,
      }}
    >
      {children}
    </CommonData.Provider>
  );
};

export const useCommonData = () => {
  const context = useContext(CommonData);
  if (context === undefined) {
    throw new Error("useCommonData must be used within a CommonDataProvider");
  }
  return context;
};
