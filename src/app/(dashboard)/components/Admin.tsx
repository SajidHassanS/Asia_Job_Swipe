"use client";

import * as React from "react";

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
import { useRouter } from "next/navigation";
const Admin = () => {
  const admin = {
    email: "admin@admin.com",
    role: "admin",
  };
  const router = useRouter();
  const handleLogout = () => {
    router.replace("/login");
  };
  return (
    <Dialog>
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
              variant="simple"
              size={"none"}
              className="border-none outline-none"
            >
              <IoIosArrowDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 truncate">
            <DropdownMenuLabel>{admin.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DialogTrigger asChild>
              <DropdownMenuItem className="gap-2 text-red-500 hover:text-red-400 transition-colors cursor-pointer">
                <MdLogout className="w-[1.2rem] h-[1.2rem]" /> Logout
              </DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Logout</DialogTitle>
          <DialogDescription>
            Are you sure you want to logout?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="button" variant={"destructive"} onClick={handleLogout}>
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Admin;
