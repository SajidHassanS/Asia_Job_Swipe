import React from "react";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { IoIosPhonePortrait } from "react-icons/io";
import { CiLinkedin } from "react-icons/ci";
import { AiOutlineMail } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdPhoneAndroid } from "react-icons/md";
import { TbLanguage } from "react-icons/tb";
import { FaSquareFacebook } from "react-icons/fa6";
import { TfiWorld } from "react-icons/tfi";
import { LuInstagram } from "react-icons/lu";
const ApplicantName = () => {
  return (
    <>
      <div className="flex gap-5 p-3">
        <div>
          <Image
            src="/images/profilepics.png"
            alt="profile"
            width={70}
            height={70}
          />
        </div>
        <div>
          <h1 className="text-custom-dark-blue mb-2 text-xl">Applicant Name</h1>
          <h1 className="text-custom-gray-blue  text-sm">Product Designer</h1>
        </div>
      </div>

      <div className="bg-secondary rounded-lg m-3">
        <div className="flex border-b  justify-between p-3">
          <h1>Applied Jobs</h1>
          <h1>2 days ago</h1>
        </div>

        <div className="p-3 ">
          <div>
            <h1 className="text-custom-dark-blue mb-2 text-xl">
              Product Development
            </h1>
            <h1 className="text-custom-gray-blue  text-sm">
              Marketing . Full-Time
            </h1>
          </div>
        </div>
      </div>

      <div className="w-full md:py-3 px-3  ">
        <div className="flex    justify-between">
          <div className="pb-3">
            <h1>Profile Matched</h1>
          </div>
          <div>
            <h1>50%</h1>
          </div>
        </div>
        <Progress
          color="bg-signature"
          value={50}
          className="md:w-[100%] w-[80%] "
        />
      </div>

      <div className=" px-5">
        <p className="text-custom-gray-blue md:text-sm">Status</p>
        <div className="flex flex-wrap gap-2">
          <span className=" bg-signature text-background md:text-sm    px-2 py-1 ">
            Reviewing
          </span>
          <span className=" bg-secondary text-signature md:text-sm   px-2 py-1 ">
            Processing
          </span>
          <span className=" bg-secondary text-signature md:text-sm   px-2 py-1 ">
            Interviewing
          </span>
        </div>
      </div>
      <div className="px-3 my-5">
        <hr />
      </div>

      {/* contact */}

      <div className=" pb-3 px-3">
        <div className="">
          <h1 className="text-modaltext text-xl">Contact</h1>
        </div>
        <div className="pt-3">
          <div className="flex  gap-5">
            <div>
              {" "}
              <AiOutlineMail className="text-signininput4" size={20} />
            </div>
            <div>
              <h1 className="text-sm text-signininput4">Email</h1>

              <p className="text-sm text-blue">email@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <div className="flex  gap-5">
            <div>
              {" "}
              <IoIosPhonePortrait className="text-signininput4" size={20} />
            </div>
            <div>
              <h1 className="text-sm text-signininput4">Phone</h1>

              <p className="text-sm text-blue">+44 1245 572 135</p>
            </div>
          </div>
        </div>
        <div className="pt-4">
          <div className="flex  gap-5">
            <div>
              {" "}
              <CiLinkedin className="text-signininput4" size={20} />
            </div>
            <div>
              <h1 className="text-sm text-signininput4">Linkedin</h1>

              <p className="text-sm text-blue">www.linkedin.xyz</p>
            </div>
          </div>
        </div>
        <div className=" py-4">
          <div className="flex  gap-5">
            <div>
              {" "}
              <FaSquareFacebook className="text-signininput4" size={20} />
            </div>
            <div>
              <h1 className="text-sm text-signininput4">Facebook</h1>

              <p className="text-sm text-blue">www.facebook.xyz</p>
            </div>
          </div>
        </div>

        <div className=" ">
          <div className="flex  gap-5">
            <div>
              {" "}
              <TfiWorld className="text-signininput4" size={20} />
            </div>
            <div>
              <h1 className="text-sm text-signininput4">Website</h1>

              <p className="text-sm text-blue">www.website.xyz</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicantName;
