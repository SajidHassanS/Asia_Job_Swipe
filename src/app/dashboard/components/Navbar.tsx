"use client";
import { useState, useEffect } from "react";
import { ThemeBtn } from "../../../components/ThemeBtn";
import Admin from "./Admin";
import { PiChatCircleText } from "react-icons/pi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCommonData } from "@/context/commonData";

const Navbar = () => {
  const pathname = usePathname();
  const isActive = (path: string): string => {
    return pathname == path ? "text-signature" : "";
  };

  const { activePage } = useCommonData();
  return (
    <div className="w-full h-20 sticky top-0 z-50 flex justify-between items-center bg-background px-4 shadow">
      <div className="text-3xl font-bold capitalize">{activePage}</div>
      <div className=" flex justify-between items-center gap-4">
        <ThemeBtn />

        <Link href="/messages">
          <PiChatCircleText
            className={`${isActive("/messages")} h-[1.4rem] w-[1.4rem]`}
          />
        </Link>

        <Admin />
      </div>
    </div>
  );
};

export default Navbar;
