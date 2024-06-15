import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import Image from "next/image";
const Projects = () => {
  return (
    <div className="border rounded-[20px] py-6 px-5">
      <div className="border-b flex justify-between mb-5">
        <h1 className="text-modaltext text-2xl">Projects</h1>
        <CiSquarePlus className="text-blue border rounded-lg p-2" size={40} />
      </div>

      <div className=" pb-5">
        <div className="flex   gap-5">
          <div className="w-1/5">
            <Image
              src="/images/feast.png"
              alt="twitter"
              width={100}
              height={100}
            />
          </div>
          <div className="w-4/5">
            <div>
                <div className="flex justify-between">
                    <div>
                    <h1 className="text-lg">FeastFlow Software Development</h1>
                    </div>
                <div className="">
            <FaRegEdit className="text-blue border rounded-lg p-2" size={40} />
          </div>
                </div>
              
              <div className=" mt-5 border-b text-base text-signininput">
                <h1 className="text-modaltext">Software Development</h1>
              </div>

              <div className="border-b py-3 text-base text-signininput">
                <h1 className="">
               <span className=" text-modaltext">Description:</span>  Software Development xyz......
                </h1>
                <h1>2005 - 2009</h1>
              </div>
             
              <div>
                <h1 className="text-base text-signininput">
                
              <h1> <span className=" text-modaltext">Link:</span> http/-hndkhmldhkdlhf</h1>
                </h1>
              </div>
              
            </div>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default Projects;
