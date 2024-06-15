import React from 'react'


import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { FaMapMarkerAlt } from "react-icons/fa";



const ProfileCompletion = () => {

    const [progress, setProgress] = React.useState(13);

    React.useEffect(() => {
      const timer = setTimeout(() => setProgress(66), 500);
      return () => clearTimeout(timer);
    }, []);
  return (
    <div className="border  rounded-[20px] relative">
    <div className="flex gap-4 items-center rounded-tr-[20px] rounded-tl-[20px] p-5 bg-darkGrey relative">
      <div className="w-1/3 md:relative">
        <div
          className="md:absolute border-8 rounded-full border-white  md:left-[40px] md:top-[10px]
          w-24 h-24 md:w-36 md:h-36 overflow-hidden"
          // style={{ width: "150px", height: "150px" }}
        >
          {" "}
          {/* Ensure container is square */}
          <Image
            src="/images/profil.png"
            alt="profile"
            width={150}
            height={150}
            className="rounded-full object-cover w-24 md:w-36"
          />
        </div>
      </div>

      <div className="md:w-2/3 w-full md:py-10   ">
        <div className="flex   text-white justify-between">
          <div>
            <h1>Profile Completion</h1>
          </div>
          <div>
            <h1>50%</h1>
          </div>
        </div>
        <Progress value={50} color='bg-greenprogress' className="md:w-[100%] w-[80%] " />
      </div>
    </div>

    <div className="md:flex md:p-5 gap-3 md:gap-10">
      <div className="flex md:flex-col mt-5 gap-3  md:mt-16 md:items-center px-4 py-4 bg-switchbg rounded-lg md:w-1/3 ">
        <div className="">
        
          <Switch id="airplane-mode" />
        </div>
        <div className='text-greenprogress'>
          <h1>OPEN FOR OPPORTUNITIES</h1>
        </div>
       
      </div>
      <div className="md:w-2/3 p-4">
        <div className="flex justify-between">
          <div>
            <h1 className="md:text-3xl text-xl text-modaltext">Jake Gyll</h1>
            <p className="md:text-xl text-md text-signininput4 py-7">
              Product Designer at{" "}
              <span className="text-md md:text-xl text-modaltext">Twitter</span>
            </p>
            <div className="flex items-center text-signininput4 gap-3">
              <FaMapMarkerAlt />
              <p className="md:text-xl text-md text-signininput4">
                Manchester, UK
              </p>
            </div>
          </div>
          <div>
            <Button className="text-blue" variant="outline">
              Edit Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default ProfileCompletion