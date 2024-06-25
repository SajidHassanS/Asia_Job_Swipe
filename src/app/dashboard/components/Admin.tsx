"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoIosArrowDown } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useAppDispatch } from "@/store/hook";
import { useRouter } from "next/navigation";
import { logout } from "@/store/slices/authSlice";

const Admin = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const admin = {
    email: "admin@admin.com",
    role: "admin",
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
    dispatch(logout());
    router.push("/signin");
  };

  return (
    <div className="flex items-center gap-2 cursor-pointer">
      <div className="">
        <Avatar className="h-[2rem] w-[2rem]">
          <AvatarImage src="/images/avatar.png" alt="avatar" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="">
        <p className="font-semibold w-28 truncate overflow-hidden">
          {admin.email}
        </p>
        <p className="text-xs">{admin.role}</p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost" // Changed from "simple" to "ghost"
            className="border-none outline-none"
          >
            <IoIosArrowDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 truncate">
          <DropdownMenuLabel>{admin.email}</DropdownMenuLabel>
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
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="bg-signature text-background"
              onClick={handleLogout}
            >
              Sign Out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
