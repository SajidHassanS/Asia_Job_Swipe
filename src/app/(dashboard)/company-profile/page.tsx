"use client";
import React from "react";

import ProfileCompletion from "./components/ProfileCompletion";
import AdditonalDetail from "./components/AdditonalDetail";
import AboutMe from "./components/Description";

import Projects from "./components/CompanyImages";
import Skills from "./components/Skills";
import SocialLinks from "./components/SocialLinks";

import { Metadata } from "next";
// import AllAppliedCandidates from "./AllAppliedCandidates";
import Title from "@/components/Title";
import Services from "./components/Services";
import Specialization from "./components/Specialization";

// export const metadata: Metadata = {
//   title: "All Companies",
//   description: "Asia JobsSwipe Admin Panel - All Companies",
// };

const Profile = () => {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <Title
        title="Company Profile"
        className="w-full min-h-screen flex flex-col bg-background p-4"
      >
        <div>
          <div className="md:flex px-4 py-5 md:gap-10">
            <div className="md:w-2/3 w-full  ">
              <ProfileCompletion />
              <div className="my-10">
                <AboutMe />
              </div>
              <div className="my-10">
                <Services />
              </div>

              <div className="my-10">
                <Specialization />
              </div>
              <div className="my-10">
                <Skills />
              </div>

              <div className="my-10">
                <Projects />
              </div>
            </div>
            <div className="md:w-1/3  w-full">
              <AdditonalDetail />
              <div className="my-10">
                <SocialLinks />
              </div>

              
            </div>
          </div>
        </div>
      </Title>
    </>
  );
};

export default Profile;
