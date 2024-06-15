"use client";
import React from "react";

import ProfileCompletion from "./components/ProfileCompletion";
import AdditonalDetail from "./components/AdditonalDetail";
import AboutMe from "./components/AboutMe";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import SocialLinks from "./components/SocialLinks";
import Resume from "./components/Resume";
const Profile = () => {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <div>
        <div className="md:flex px-4 py-5 md:gap-10">
          <div className="md:w-2/3 w-full  ">
            <ProfileCompletion />
            <div className="my-10">
              <AboutMe />
            </div>


            <div className="my-10">
              <Experience />
            </div>

            
            <div className="my-10">
              <Projects />
            </div>

            <div className="my-10">
              <Skills />
            </div>
          </div>
          <div className="md:w-1/3  w-full">
            <AdditonalDetail />
            <div className="my-10">
              <SocialLinks/>
            </div>

            <div className="my-10">
              <Resume/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
