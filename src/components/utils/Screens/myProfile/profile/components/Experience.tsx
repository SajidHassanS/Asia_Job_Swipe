import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import Image from "next/image";

const Experience = () => {
  return (
    <div className="border rounded-[20px] py-6 px-5">
      <div className="flex justify-between mb-5">
        <h1 className="text-modaltext text-2xl">Experiences</h1>
        <CiSquarePlus className="text-blue border rounded-lg p-2" size={40} />
      </div>

      <div className="border-b pb-5">
        <div className="flex justify-between gap-5">
          <div className="">
            <Image
              src="/images/twitter.png"
              alt="twitter"
              width={100}
              height={100}
            />
          </div>
          <div className="">
            <div>
              <h1 className="text-lg">Product designer</h1>
              <div className="flex text-base text-signininput">
                <h1 className="text-modaltext">Twitter</h1> .<h1>Full-Time</h1>{" "}
                .<h1>Jun 2019-Present (1y 1m)</h1>
              </div>

              <div>
                <h1 className="text-lg text-signininput">Manchester, UK</h1>
              </div>
              <div>
                <p className="text-modaltext">
                  Created and executed social media plan for 10 brands utilizing
                  multiple features and content types to increase brand
                  outreach, engagement, and leads.
                </p>
              </div>
            </div>
          </div>
          <div className="">
            <FaRegEdit className="text-blue border rounded-lg p-2" size={40} />
          </div>
        </div>
      </div>
      <div className="mt-5 pb-5">
        <div className="flex justify-between gap-5">
          <div className="">
            <Image
              src="/images/marketing.png"
              alt="twitter"
              width={100}
              height={100}
            />
          </div>
          <div className="">
            <div>
              <h1 className="text-lg">Product designer</h1>
              <div className="flex text-base text-signininput">
                <h1 className="text-modaltext">Twitter</h1> .<h1>Full-Time</h1>{" "}
                .<h1>Jun 2019-Present (1y 1m)</h1>
              </div>

              <div>
                <h1 className="text-lg text-signininput">Manchester, UK</h1>
              </div>
              <div>
                <p className="text-modaltext">
                  Created and executed social media plan for 10 brands utilizing
                  multiple features and content types to increase brand
                  outreach, engagement, and leads.
                </p>
              </div>
            </div>
          </div>
          <div className="">
            <FaRegEdit className="text-blue border rounded-lg p-2" size={40} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
