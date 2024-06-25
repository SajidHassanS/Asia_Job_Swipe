import React from 'react'
import { CiLinkedin } from "react-icons/ci";

import { FaRegEdit } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdPhoneAndroid } from "react-icons/md";
import { TbLanguage } from "react-icons/tb";
import { FaSquareFacebook } from "react-icons/fa6";
import { LuInstagram } from "react-icons/lu";

const SocialLinks = () => {
  return (
    <div className="border rounded-[20px] py-6 px-5">
    <div className="flex justify-between">
      <h1 className="text-modaltext text-2xl">Social Links</h1>
      <FaRegEdit  className="text-blue border rounded-lg p-2" size={40} />
    </div>

    <div className="pt-8">
      <div className="flex  gap-5">
       <div> <CiLinkedin  className="text-signininput4" size={30} /></div>
        <div>
          <h1 className="text-lg text-signininput4">Linkedin</h1>

          <p className="text-lg text-blue">www.linkedin.xyz</p>
        </div>
      </div>
    
    </div>
    <div className=" py-8">
      <div className="flex  gap-5">
       <div> <FaSquareFacebook   className="text-signininput4" size={30} /></div>
        <div>
          <h1 className="text-lg text-signininput4">Facebook</h1>

          <p className="text-lg text-blue">www.facebook.xyz</p>
        </div>
      </div>
    
    </div>

    <div className=" ">
      <div className="flex  gap-5">
       <div> <LuInstagram  className="text-signininput4" size={30} /></div>
        <div>
          <h1 className="text-lg text-signininput4">Instagram</h1>

          <p className="text-lg text-blue">www.Instagram.xyz</p>
        </div>
      </div>
    
    </div>
  </div>

  )
}

export default SocialLinks





  