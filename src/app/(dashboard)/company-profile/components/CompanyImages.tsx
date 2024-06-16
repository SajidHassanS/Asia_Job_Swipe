import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import Image from "next/image";
import { FiPlus } from "react-icons/fi";
const CompanyImages = () => {
  return (
    <div className="border rounded-[20px] py-6 px-5">
      <div className="border-b flex justify-between pb-5 mb-5">
        <h1 className="text-modaltext text-2xl">Company Images</h1>
        <FiPlus className="text-blue border rounded-lg p-2" size={40} />
      </div>

       
        <div className="relative w-full h-96">
          <Image
            src="/images/companyImage.png"
            alt="Company Image"
            layout="fill"
            objectFit="cover"
            className=""
          />
        </div>
      
          
         
         
        
    </div>
  );
};

export default CompanyImages;
