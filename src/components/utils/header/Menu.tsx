"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { initializeAuth, logout } from '../../../store/slices/authSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hook';
import UserProfile from './UserProfile'; // Import UserProfile component

const Menu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      setAccessToken(token);
      if (token) {
        dispatch(initializeAuth());
      }
    }
  }, [dispatch]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const getLinkClasses = (path: string) => {
    return pathname === path
      ? "text-signature border-b-2 border-blue"
      : "text-darkGrey";
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
    dispatch(logout());
    router.push('/signin');
  };

  return (
    <nav className="container py-4">
      <div>
        <div className="flex items-center justify-between">
          <span className="text-signature text-2xl font-bold">
            <Link href="/home">
              Asia <span className="text-darkBlue">Job</span>Swipe
            </Link>
          </span>
          <div className="md:hidden">
            <button className="text-signature focus:outline-none" onClick={toggleMenu}>
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
          <div className="hidden md:flex md:items-center">
            <Link href="/findjobs">
              <span className={`text-sm text-customdarkblue px-4 py-2 block md:inline cursor-pointer ${getLinkClasses('/findjobs')}`}>Find Jobs</span>
            </Link>
            <Link href="/joboffers">
              <span className={`text-sm text-customdarkblue px-4 py-2 block md:inline cursor-pointer ${getLinkClasses('/joboffers')}`}>Job Offers</span>
            </Link>
            <Link href="/matchedjobs">
              <span className={`text-sm text-customdarkblue px-4 py-2 block md:inline cursor-pointer ${getLinkClasses('/matchedjobs')}`}>Matched Jobs</span>
            </Link>
            <Link href="/savedjobs">
              <span className={`text-sm text-customdarkblue px-4 py-2 block md:inline cursor-pointer ${getLinkClasses('/savedjobs')}`}>Saved Jobs</span>
            </Link>
            <Link href="/browsecompanies">
              <span className={`text-sm text-customdarkblue px-4 py-2 block md:inline cursor-pointer ${getLinkClasses('/browsecompanies')}`}>Browse Companies</span>
            </Link>
          </div>
          <div className="hidden md:block">
            {accessToken ? (
              <UserProfile
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
                handleLogout={handleLogout}
              />
            ) : (
              <Link href="/signin">
                <Button className="bg-signature text-background text-sm px-4 py-2 rounded-md">Sign In</Button>
              </Link>
            )}
          </div>
        </div>
        {isOpen && (
          <div className="bg-background mt-4 p-4 rounded-lg shadow-lg md:hidden">
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
            {accessToken ? (
              <Button variant="outline" className='bg-signature text-background w-full mt-4' onClick={() => setIsDialogOpen(true)}>Sign Out</Button>
            ) : (
              <Link href="/signin">
                <Button className="bg-signature text-background text-sm px-4 py-2 rounded-md w-full mt-4">Sign In</Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Menu;
