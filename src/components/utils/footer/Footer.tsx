import Link from "next/link";
import React from "react";
import { Separator } from "../../ui/separator";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaApple,
  FaGooglePlay,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-lightPink pt-16  ">
      <div className="md:container mx-5 flex flex-wrap justify-between   ">
        {/* Column 1: Logo and Social Media */}
        <div className="mb-8 md:mb-0 w-full md:w-2/5 ">
          <div>
            <span className="text-blue md:text-6xl text-2xl  font-bold">
              <Link href="/">
                Asia <span className="text-darkBlue">Job</span>Swipe
              </Link>
            </span>
          </div>
          <div className="py-5 text-darkGrey">
            <p>
              Find your next career opportunity and connect with like-minded
              individuals. Find your next career opportunity and connect with
              like-minded individuals.
            </p>
          </div>
          <div className="flex space-x-4">
            <div>
              {" "}
              <FaFacebookF className="text-blue" size={25} />
            </div>

            <div className="border-x border-darkGrey px-5">
              {" "}
              <FaLinkedinIn className="text-blue" size={25} />
            </div>

            <div>
              {" "}
              <FaTwitter className="text-blue" size={25} />
            </div>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="mb-8 md:mb-0  sm:w-1/2 md:w-1/5 ">
          <h1 className="font-bold md:text-2xl text-lg  mb-4">Quick Links</h1>
          <ul className="space-y-2 md:text-xl text-md flex flex-col gap-5 text-darkGrey">
            <li>
              <Link href="/about">Search Jobs</Link>
            </li>
            <li>
              <Link href="/services">Featured Jobs</Link>
            </li>
            <li>
              <Link href="/careers">Top Companies</Link>
            </li>
            <li>
              <Link href="/blog">Download App</Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Help Links */}
        <div className="mb-8 md:mb-0  sm:w-1/2 md:w-1/5 ">
          <h1 className="font-bold md:text-2xl text-xl  mb-4">Help Links</h1>
          <ul className="space-y-2 md:text-xl text-md flex flex-col gap-5 text-darkGrey">
            <li>
              <Link href="/faq">About Us</Link>
            </li>
            <li>
              <Link href="/support">Services</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms">Terms & Condition</Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Get Our App */}
        <div className="mb-8  md:mb-0  sm:w-full md:w-1/5">
          <h1 className="font-bold md:text-2xl text-lg mb-4">
            Get Our App Now!
          </h1>
          <div className="sm:flex sm:gap-5 md:block">
            <div className="  flex items-center my-6 mb-5 p-2 text-white rounded-lg gap-3  bg-darkGrey">
              <div>
                <Link href="https://play.google.com/store">
                  <FaGooglePlay className="text-white" size={30} />
                </Link>
              </div>

              <div>
                <p className="text-lg">GET IT ON</p>
                <h1 className="lg:text-2xl md:text-xl  text-lg">Google Play</h1>
              </div>
            </div>


            <div className="flex items-center my-6 mb-5 p-2 text-white rounded-lg gap-3  bg-darkGrey">
              <div>
                <Link href="https://www.apple.com/app-store/">
                <FaApple className="text-white" size={30} />
                </Link>
              </div>

              <div>
                <p className="text-lg">GET ON THE</p>
                <h1 className="lg:text-2xl md:text-xl  text-lg">App Store</h1>
              </div>
            </div>


            
            </div>
          
        </div>
      </div>

      <div className="mx-5 md:container ">
        <div className="py-5">
          <hr className=" border-darkGrey " />
        </div>
        <div className="flex pb-5 flex-col justify-center items-center">
          <h1>All rights reserved. Copyright &copy; Asia Job Swipe</h1>
        </div>
      </div>
    </div>
  );
};

export default Footer;
