"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,  
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoIosArrowDown } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RootState, AppDispatch } from "@/store";
import { logout } from "@/store/slices/authSlice";
import {fetchCompanyById} from "@/store/slices/companySlice"; // Assuming you have this action
import Image from "next/image";

const Admin = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Fetch company ID from local storage
  const companyId = typeof window !== "undefined" ? localStorage.getItem("_id") : null;

  useEffect(() => {
    if (companyId) {
      dispatch(fetchCompanyById(companyId));
    }
  }, [companyId, dispatch]);

  // Fetch company data from the state
  const company = useSelector((state: RootState) => state.company);
console.log("Company dataaaa:", company);


const selectedCompany = useSelector((state: RootState) => state.company.selectedCompany);

// Ensure that selectedCompany is not null before accessing its properties
const companyLogo = selectedCompany?.companyLogo || '/images/avatar.png';
const companyName = selectedCompany?.companyName || 'Company Name';
const companyEmail = selectedCompany?.userInfo?.email || 'company@company.com';

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("_id");
    }
    dispatch(logout());
    router.push("/signin");
  };

  return (
    <div className="flex items-center gap-2 cursor-pointer">
      <div>
        <Image src={companyLogo} alt="avatar" className="rounded-full" width={30} height={30} />
      </div>
      <div className="">
       
        <p className="text-sm">{companyName || 'Company Name'}</p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="border-none outline-none">
            <IoIosArrowDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 truncate">
          <DropdownMenuLabel>{companyEmail || 'company@company.com'}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="gap-2 text-red-500 hover:text-red-400 transition-colors cursor-pointer"
            onSelect={() => setIsDialogOpen(true)}
          >
            <MdLogout />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px] sm:max-h-[300px] bg-background p-5">
          <DialogHeader>
            <DialogTitle>Confirm Sign Out</DialogTitle>
            <DialogDescription>
              Are you sure you want to sign out?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" className="bg-signature text-background" onClick={handleLogout}>Sign Out</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
