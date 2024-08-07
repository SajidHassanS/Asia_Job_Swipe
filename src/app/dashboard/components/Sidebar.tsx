"use client";
import { useCommonData } from "@/context/commonData";
import { menu } from "@/utils/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  const pathname = usePathname();
  const { changeActivePage } = useCommonData();
  const isActive = (path: string): string => {
    return (path === "/" ? pathname === path : pathname.includes(path))
      ? "bg-signature text-background"
      : "hover:text-signature";
  };

  const dashboardPath = "/dashboard";

  return (
    <>
      <div className="w-68 h-[120vh] sticky top-0 bg-background shadow px-4 border-r-2">
        <div className="h-20 flex justify-center items-center border-b border-blue text-signature text-3xl font-bold">
          <Link href={"/dashboard"}>Asia&nbsp;<span className="text-primary">Jobs</span>Swipe</Link>
        </div>
        <div className="flex flex-col gap-4 my-8">
          {menu.map(({ name, path, icon: Icon }) => (
            <Link
              key={path}
              href={`${dashboardPath}${path}`}
              className={`${isActive(
                path
              )} flex items-center gap-2 font-bold text-sm p-4 transition-colors cursor-pointer rounded-lg`}
            >
              <Icon />
              <p>{name}</p>
            </Link>
          ))}

          <div className="text-black border-t border-signature"></div>

          <Link href={`${dashboardPath}/post-job`}>
            <Button variant="outline" className="flex gap-5 justify-start w-full rounded-xl text-background py-7 bg-darkGrey">
              <FaPlus style={{ fontSize: 20 }} /> Post a New Job
            </Button>
          </Link>

          <div className="absolute bottom-0 w-56">
            <hr className="border w-full" />
            <Link
              href={`${dashboardPath}/settings`}
              className="flex items-center gap-2 font-bold text-sm p-4 transition-colors cursor-pointer rounded-lg"
            >
              <IoSettingsOutline style={{ fontSize: 20 }} />
              <p>Settings</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
