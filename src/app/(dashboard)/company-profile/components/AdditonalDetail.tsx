import React from 'react'
import Image from "next/image";

import { FaRegEdit } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdPhoneAndroid } from "react-icons/md";
import { TbLanguage } from "react-icons/tb";
const AdditonalDetail = () => {
  return (
    <div className="border rounded-[20px] py-6 px-5">
              <div className="flex justify-between">
                <h1 className="text-modaltext text-2xl">Additional Details</h1>
                <FaRegEdit  className="text-blue border rounded-lg p-2" size={40} />
              </div>

              <div className=" py-8">
                <div className="flex  gap-5">
                 <div> <MdOutlineMailOutline className="text-signininput4" size={30} /></div>
                  <div>
                    <h1 className="text-lg text-signininput4">Email</h1>

                    <p className="text-lg text-modaltext">jakegyll@email.com</p>
                  </div>
                </div>
                <div className=" py-8">
                <div className="flex  gap-5">
                 <div> <MdPhoneAndroid className="text-signininput4" size={30} /></div>
                  <div>
                    <h1 className="text-lg text-signininput4">Phone</h1>

                    <p className="text-lg text-modaltext">+44 1245 572 135</p>
                  </div>
                </div>
              </div>
              <div className=" ">
                <div className="flex  gap-5">
                 <div> <TbLanguage className="text-signininput4" size={30} /></div>
                  <div>
                    <h1 className="text-lg text-signininput4">Languages</h1>

                    <p className="text-lg text-modaltext">English, French</p>
                  </div>
                </div>
              </div>
              </div>
            </div>
  )
}

export default AdditonalDetail