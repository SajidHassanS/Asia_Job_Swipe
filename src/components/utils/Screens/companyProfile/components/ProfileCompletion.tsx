import React from "react";
import Image from "next/image";
import { FaGripfire, FaUsers } from "react-icons/fa";
import { TbBuildingSkyscraper } from "react-icons/tb";
import Link from "next/link";

interface ProfileCompletionProps {
  company: {
    companyName: string;
    companyLogo: string;
    website: string;
    foundedYear: string;
    numberOfEmployees: string;
    sector: string;
  };
}

const ProfileCompletion: React.FC<ProfileCompletionProps> = ({ company }) => {
  const {
    companyName,
    companyLogo,
    website,
    foundedYear,
    numberOfEmployees,
    sector,
  } = company;

  return (
    <div className="border rounded-[20px] relative">
      <div className="flex gap-4 items-center rounded-tr-[20px] rounded-tl-[20px] bg-gradient-to-tr from-blue to-blue/20 p-5 relative">
        <div className="w-1/3 md:relative">
          <div
            className="md:absolute border-8 rounded-full border-white md:left-[40px] md:top-[10px] w-24 h-24 md:w-36 md:h-36 overflow-hidden"
          >
            <Image
              src={companyLogo}
              alt="profile"
              width={150}
              height={150}
              className="rounded-full object-cover w-24 md:w-36 h-24 md:h-36"
            />
          </div>
        </div>
        <div className="md:w-2/3 w-full md:py-10">
          <h1 className="md:text-3xl text-xl text-modaltext">{companyName}</h1>
          <p className="md:text-xl text-md text-signininput4 py-2">
            <Link href={website} className="text-signature hover:underline" target="_blank" rel="noopener noreferrer">
              {website}
            </Link>
          </p>
        </div>
      </div>
      <div className="px-5 md:px-7 py-10 mt-4">
        <div className="flex justify-around">
          <div className="flex items-center gap-3">
            <div>
              <FaGripfire className="text-signature" size={30} />
            </div>
            <div className="text-xl">
              <h1 className="text-signininput">Founded</h1>
              <p>{new Date(foundedYear).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div>
              <FaUsers className="text-signature" size={30} />
            </div>
            <div className="text-xl">
              <h1 className="text-signininput">Employees</h1>
              <p>{numberOfEmployees}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div>
              <TbBuildingSkyscraper className="text-signature" size={30} />
            </div>
            <div className="text-xl">
              <h1 className="text-signininput">Industry</h1>
              <p>{sector}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCompletion;
