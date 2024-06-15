"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { logout, initializeAuth } from '../../../store/slices/authSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hook';

const Menu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const getLinkClasses = (path: string) => {
    return pathname === path
      ? "text-blue border-b-2 border-blue"
      : "text-darkGrey";
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push('/signin');
  };

  return (
    <nav className="container py-4">
      <div>
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <span className="text-blue text-lg font-bold">
            <Link href="/home">
              Asia <span className="text-darkBlue">Job</span>Swipe
            </Link>
          </span>

          {/* Hamburger Menu (for mobile) */}
          <div className="md:hidden">
            <button
              className="text-blue focus:outline-none"
              onClick={toggleMenu}
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Desktop Menu Items */}
          <div className="hidden md:flex md:items-center">
            <Link href="/findjobs">
              <span className={`text-sm px-4 py-2 block md:inline cursor-pointer ${getLinkClasses('/findjobs')}`}>Find Jobs</span>
            </Link>
            <Link href="/joboffers">
              <span className={`text-sm px-4 py-2 block md:inline cursor-pointer ${getLinkClasses('/joboffers')}`}>Job Offers</span>
            </Link>
            <Link href="/matchedjobs">
              <span className={`text-sm px-4 py-2 block md:inline cursor-pointer ${getLinkClasses('/matchedjobs')}`}>Matched Jobs</span>
            </Link>
            <Link href="/savedjobs">
              <span className={`text-sm px-4 py-2 block md:inline cursor-pointer ${getLinkClasses('/savedjobs')}`}>Saved Jobs</span>
            </Link>
            <Link href="/browsecompanies">
              <span className={`text-sm px-4 py-2 block md:inline cursor-pointer ${getLinkClasses('/browsecompanies')}`}>Browse Companies</span>
            </Link>
          </div>

          {/* Right Side (Sign-in/Sign-out Button) */}
          <div className="hidden md:block">
            {user ? (
              <>
                <Button variant="outline" className='bg-blue text-white' onClick={() => setIsDialogOpen(true)}>Sign Out</Button>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogContent className="sm:max-w-[425px] sm:max-h-[300px] bg-white p-5">
                    <DialogHeader>
                      <DialogTitle>Confirm Sign Out</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to sign out?
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                      <Button variant="destructive" className='bg-blue text-white'  onClick={handleLogout}>Sign Out</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </>
            ) : (
              <Button asChild>
                <Link className="bg-blue text-white text-sm px-4 py-2 rounded-md" href="/signin">Sign In</Link>
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Menu Background */}
        {isOpen && (
          <div className="bg-white mt-4 p-4 rounded-lg shadow-lg md:hidden">
            <Link href="/findjobs">
              <span className={`text-sm px-4 py-2 block cursor-pointer ${getLinkClasses('/findjobs')}`}>Find Jobs</span>
            </Link>
            <Link href="/joboffers">
              <span className={`text-sm px-4 py-2 block cursor-pointer ${getLinkClasses('/joboffers')}`}>Job Offers</span>
            </Link>
            <Link href="/matchedjobs">
              <span className={`text-sm px-4 py-2 block cursor-pointer ${getLinkClasses('/matchedjobs')}`}>Matched Jobs</span>
            </Link>
            <Link href="/savedjobs">
              <span className={`text-sm px-4 py-2 block cursor-pointer ${getLinkClasses('/savedjobs')}`}>Saved Jobs</span>
            </Link>
            <Link href="/browsecompanies">
              <span className={`text-sm px-4 py-2 block cursor-pointer ${getLinkClasses('/browsecompanies')}`}>Browse Companies</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Menu;
