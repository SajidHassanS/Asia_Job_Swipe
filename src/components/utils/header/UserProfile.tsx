"use client";
import React from 'react';
import { useSelector } from 'react-redux';
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
} from "@/components/ui/dialog";
import { RootState } from '../../../store';  // Adjust the path as necessary
import Link from 'next/link';

interface UserProfileProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
  handleLogout: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ isDialogOpen, setIsDialogOpen, handleLogout }) => {
  const jobSeeker = useSelector((state: RootState) => state.auth.user);

  // Use a default avatar image if none is provided
  const avatarSrc =  '/images/avatar.png';

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <div className="flex items-center gap-2 cursor-pointer">
        <div className="">
          <Avatar className="h-[2rem] w-[2rem]">
            <AvatarImage src={avatarSrc} alt="avatar" />
            <AvatarFallback>{jobSeeker?.firstName?.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
        <div className="">
          <p className="font-semibold truncate overflow-hidden">
            {jobSeeker?.firstName ?? 'Guest'}
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="border-none outline-none">
              <IoIosArrowDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 truncate">
            <DropdownMenuLabel>{jobSeeker?.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/myprofile">
              <DropdownMenuItem className="gap-2 hover:text-blue-500 transition-colors cursor-pointer">
                Profile Settings
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-2 text-red-500 hover:text-red-400 transition-colors cursor-pointer"
              onClick={() => setIsDialogOpen(true)}
            >
              <MdLogout className="w-[1.2rem] h-[1.2rem]" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <DialogContent className="sm:max-w-[425px] sm:max-h-[300px] bg-background p-5">
        <DialogHeader>
          <DialogTitle>Confirm Sign Out</DialogTitle>
          <DialogDescription>
            Are you sure you want to sign out?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          <Button variant="destructive" className='bg-signature text-background' onClick={handleLogout}>Sign Out</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfile;
