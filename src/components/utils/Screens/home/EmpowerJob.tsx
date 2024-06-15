import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaApple } from "react-icons/fa";
import { FaGooglePlay } from "react-icons/fa6";
import { GiCheckMark } from "react-icons/gi";

const EmpowerJob = () => {
  return (
    <div className="md:container pb-24">
      <div className="bg-darkGrey flex md:flex-row flex-col items-center md:px-16 px-5 py-10  md:rounded-[30px]">
        <div className="text-white flex flex-col md:w-1/2">
          <div className="mb-6">
            <h1 className="lg:text-4xl md:text-3xl text-2xl">
              Empower Your Job Search with{" "}
              <span className="text-blue">Asia Job Swipe</span>
            </h1>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center md:text-xl text-lg gap-2">
              <GiCheckMark size={20} />
              <span>Discover Your Perfect Job</span>
            </div>
            <div className="flex items-center gap-2">
              <GiCheckMark size={20} />
              <span>Apply With Ease</span>
            </div>
            <div className="flex items-center gap-2">
              <GiCheckMark size={20} />
              <span>Get Hired Faster</span>
            </div>
          </div>
          <div className="mt-6">
           <div className=" md:w-full">
           <h1 className="font-bold  lg:text-2xl md:text-xl  text-lg mb-4">Get the App</h1>
            <div className="sm:flex md:flex-col  gap-3">
              <div className="sm:w-1/2 flex items-center justify-center mb-5 p-2 text-black rounded-lg gap-3  bg-white">
               <div>
               <Link href="https://play.google.com/store">
                  <FaGooglePlay className="text-black" size={30} />
                </Link>
               </div>
               
                <div>
                  <p className="text-lg">GET IT ON</p>
                  <h1 className="lg:text-2xl md:text-xl  text-lg">Google Play</h1>
                </div>
              </div>


              <div className="sm:w-1/2 flex items-center justify-center mb-5 p-2 text-black rounded-lg gap-3  bg-white">
               <div>
               <Link href="https://www.apple.com/app-store/">
               <FaApple className="text-black" size={30} />
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
        </div>
        <div className="md:w-1/2 flex items-center justify-center">
          <Image
            src="/images/iphone.png"
            width={524}
            height={473}
            alt="iphone 15"
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default EmpowerJob;
