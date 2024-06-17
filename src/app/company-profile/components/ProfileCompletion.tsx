import React from 'react'


import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { FaMapMarkerAlt } from "react-icons/fa";
import  Link  from 'next/link';
import { FaGripfire } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { TbBuildingSkyscraper } from "react-icons/tb";
const ProfileCompletion = () => {

    const [progress, setProgress] = React.useState(13);

    React.useEffect(() => {
      const timer = setTimeout(() => setProgress(66), 500);
      return () => clearTimeout(timer);
    }, []);
  return (
    <div className="border  rounded-[20px] relative">
    <div className="flex gap-4 items-center rounded-tr-[20px] rounded-tl-[20px] bg-gradient-to-tr from-blue to-blue/20 p-5  relative">
      <div className="w-1/3 md:relative">
        <div
          className="md:absolute border-8 rounded-full border-white  md:left-[40px] md:top-[10px]
          w-24 h-24 md:w-36 md:h-36 overflow-hidden"
          // style={{ width: "150px", height: "150px" }}
        >
          {" "}
          {/* Ensure container is square */}
          <Image
            src="/images/motion.png"
            alt="profile"
            width={150}
            height={150}
            className="rounded-full object-cover w-24 md:w-36"
          />
        </div>
      </div>

      <div className="md:w-2/3 w-full md:py-10   ">
        <div className="flex   text-white justify-between">
          <div className='pb-3'>
            <h1>Profile Completion</h1>
          </div>
          <div>
            <h1>50%</h1>
          </div>
        </div>
        <Progress color='bg-darkGrey' value={50} className="md:w-[100%] w-[80%] " />
      </div>
    </div>

    <div className="md:flex md:p-5 gap-3 md:gap-10">
      <div className="flex md:flex-col mt-5 gap-3  md:mt-16 md:items-center   md:w-1/3 ">
       
      </div>
      <div className="md:w-2/3 p-4">
        <div className="flex justify-between">
          <div>
            <h1 className="md:text-3xl text-xl text-modaltext">Dcodax</h1>
            <p className="md:text-xl text-md text-signininput4 py-2">
      <Link href="https://www.dcodax.com" 
      className="text-blue hover:underline" target="_blank" rel="noopener noreferrer">
          www.dcodax.com
   
      </Link>
    </p>
           
          </div>
          <div>
            <Button className="text-blue" variant="outline">
              Edit Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
    <div className='px-5 md:px-7 pb-5  flex justify-around'>

    <div className='flex items-center  gap-3'>
        <div>
        <FaGripfire className='text-blue' size={30} />
        </div>
        <div className='text-xl' >
          <h1 className='text-signininput'>Founded</h1>
          <p>July 31,2011</p>
        </div>
      </div>
      <div className='flex items-center  gap-3'>
        <div>
        <FaUsers className='text-blue' size={30} />
        </div>
        <div className='text-xl' >
          <h1 className='text-signininput'>Empoyees</h1>
          <p>4000+</p>
        </div>
      </div>

      <div className='flex items-center  gap-3'>
        <div>
        <TbBuildingSkyscraper className='text-blue' size={30} />
        </div>
        <div className='text-xl' >
          <h1 className='text-signininput'>Industry</h1>
          <p>Software</p>
        </div>
      </div>

      
    </div>
  </div>
  )
}

export default ProfileCompletion