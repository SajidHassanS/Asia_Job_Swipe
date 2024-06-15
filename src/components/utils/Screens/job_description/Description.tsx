import React from "react";
import { Button } from "@/components/ui/button";
import { CiCircleCheck } from "react-icons/ci";
import Image from 'next/image';
const Description = () => {
  return (
    <>
      <div className="mx-5 md:container">
        <div className="flex flex-col md:flex-row gap-5 pt-16 pb-10">
          <div className="w-full md:w-2/3">
            <div>
              <div className="">
                <h1 className="text-3xl font-bold text-modaltext pb-5">
                  Description
                </h1>
                <p className="text-signininput">
                  Stripe is looking for Social Media Marketing expert to help
                  manage our online networks. You will be responsible for
                  monitoring our social media channels, creating content,
                  finding effective ways to engage the community and incentivize
                  others to engage on our channels.
                </p>
              </div>

              <div className=" my-10">
                <h1 className="text-3xl text-modaltext font-bold pb-5">
                  Responsibilities
                </h1>
                <div className="flex items-center mb-5 gap-5">
                  <CiCircleCheck className="text-blue w-32 md:w-8 " size={25} />
                  <p className="text-signininput">
                    Community engagement to ensure that is supported and
                    actively represented online
                  </p>
                </div>
                <div className="flex items-center gap-5 mb-5">
                  <CiCircleCheck className="text-blue w-32 md:w-8" size={25} />
                  <p className="text-signininput">
                    Community engagement to ensure that is supported and
                    actively represented online
                  </p>
                </div>
                <div className="flex items-center gap-5 mb-5">
                  <CiCircleCheck className="text-blue w-32 md:w-8" size={25} />
                  <p className="text-signininput">
                    Community engagement to ensure that is supported and
                    actively represented online
                  </p>
                </div>
                <div className="flex items-center gap-5 mb-5">
                  <CiCircleCheck className="text-blue w-32 md:w-8" size={25} />
                  <p className="text-signininput">
                    Community engagement to ensure that is supported and
                    actively represented online
                  </p>
                </div>
                <div className="flex items-center gap-5 mb-5">
                  <CiCircleCheck className="text-blue w-32 md:w-8" size={25} />
                  <p className="text-signininput">
                    Community engagement to ensure that is supported and
                    actively represented online
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/3 ">
            <div className="md:px-10">
              <div className="flex items-center mb-5 justify-between">
                <h1 className="text-signininput">Job Posted On</h1>
                <p className="text-modaltext">July 1, 2021</p>
              </div>
              <div className="flex items-center mb-5 justify-between">
                <h1 className="text-signininput">Job Type</h1>
                <p className="text-modaltext">Full-Time</p>
              </div>

              <div className="flex items-center mb-5 justify-between">
                <h1 className="text-signininput">Salary</h1>
                <p className="text-modaltext">$75k-$85k USD</p>
              </div>
              <hr className=" border-hrline my-6" />

              <div className="">
                <h1 className="text-3xl font-bold text-modaltext pb-5">
                  Categories
                </h1>
                <div className="flex gap-3">
                  <Button className="bg-yellowBg text-base text-yellow rounded-[20px]">
                    Marketing
                  </Button>
                  <Button className=" bg-greenprogress/10  text-transparent  text-base text-greenprogress rounded-[20px]">
                    Marketing
                  </Button>
                </div>

                <hr className=" border-hrline my-6" />
              </div>

              <div className="">
                <h1 className="text-3xl font-bold text-modaltext pb-5">
                  Required Skills
                </h1>
                <div className="flex flex-wrap gap-3">
                  <Button className="bg-lightPink text-base text-blue">
                    Project Management
                  </Button>
                  <Button className="bg-lightPink text-base text-blue">
                    Copywriting
                  </Button>
                  <Button className="bg-lightPink text-base text-blue">
                    Social Media Marketing
                  </Button>
                  <Button className="bg-lightPink text-base text-blue">
                    English
                  </Button>
                  <Button className="bg-lightPink text-base text-blue">
                    Copy Editing
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
        <div className="">
                <h1 className="text-3xl font-bold text-modaltext pb-5">
                Perks & Benefits
                </h1>
                <p className="text-signininput">
                This job comes with several perks and benefits
                </p>
              </div>

              

              <div className="flex flex-wrap  md:items-center md:justify-between my-10 gap-2  ">
                <div className=" bg-lightPink flex flex-col gap-4 items-center justify-between rounded-xl px-6 py-3 md:px-16  md:py-8 ">
                    <Image src="/images/benefits/statoscope.png" alt="statoscope" width={50} height={50}/>
                    <h1 className="text-modaltext">Full Healthcare</h1>
                </div>
                <div className=" bg-lightPink flex flex-col gap-4 items-center justify-between rounded-xl  md:px-16 px-6 py-3  md:py-8">
                    <Image src="/images/benefits/vacation.png" alt="statoscope" width={50} height={50}/>
                    <h1 className="text-modaltext">Unlimited Vacation</h1>
                </div>
                <div className=" bg-lightPink flex flex-col gap-4 items-center justify-between rounded-xl md:px-16 px-6 py-3  md:py-8 ">
                    <Image src="/images/benefits/development.png" alt="statoscope" width={50} height={50}/>
                    <h1 className="text-modaltext">Skill Development</h1>
                </div>
                <div className=" bg-lightPink flex flex-col gap-4 items-center justify-between rounded-xl md:px-16 px-6 py-3  md:py-8 ">
                    <Image src="/images/benefits/summits.png" alt="statoscope" width={50} height={50}/>
                    <h1 className="text-modaltext">Team Summits</h1>
                </div>
                <div className=" bg-lightPink flex flex-col gap-4 items-center justify-between rounded-xl md:px-16 px-6 py-3  md:py-8 ">
                    <Image src="/images/benefits/summits.png" alt="statoscope" width={50} height={50}/>
                    <h1 className="text-modaltext">Team Summits</h1>
                </div>
              </div>
        </div>
      </div>
    </>
  );
};

export default Description;
