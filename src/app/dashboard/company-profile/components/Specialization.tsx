import React from "react";

import { FaRegEdit } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FiPlus } from "react-icons/fi";
const Specialization = () => {
  return (
    <div className="border rounded-[20px] py-6 px-5">
      <div className=" flex justify-between mb-5">
        <h1 className="text-modaltext text-2xl">Specialization</h1>

        <div className="flex gap-2">
          <FiPlus className="text-signature border rounded-lg p-2" size={40} />
          <FaRegEdit className="text-signature border rounded-lg p-2" size={40} />
        </div>
      </div>

      <div className="flex gap-3 flex-wrap ">

      <div >
        <Button className="bg-bglite text-base text-signature">Communication</Button>
      </div>
      <div >
        <Button className="bg-bglite text-base text-signature">Analytics</Button>
      </div>
      <div >
        <Button className="bg-bglite text-base text-signature">Facebook Ads</Button>
      </div>
      <div >
        <Button className="bg-bglite text-base text-signature">Content Planning</Button>
      </div>
      <div >
        <Button className="bg-bglite text-base text-signature">Community Manager</Button>
      </div>

     < div >
        <Button className="bg-bglite text-base text-signature">Community Manager</Button>
      </div>
      </div>
    </div>
  );
};

export default Specialization;
