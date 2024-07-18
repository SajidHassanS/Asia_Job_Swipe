"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { fetchCompanyById } from "@/store/slices/companySlice";
import { RootState, AppDispatch } from "@/store";

import ProfileCompletion from "./components/ProfileCompletion";
import AdditionalDetail from "./components/AdditionalDetail";
import AboutMe from "./components/Description";
import Projects from "./components/CompanyImages";
import Skills from "./components/Skills";
import SocialLinks from "./components/SocialLinks";
import Title from "@/components/Title";
import Services from "./components/Services";
import Specialization from "./components/Specialization";

const CompanyProfile = () => {
  const dispatch: AppDispatch = useDispatch();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  useEffect(() => {
    console.log("ID from URL:", id);
    if (id) {
      dispatch(fetchCompanyById(id));
    }
  }, [id, dispatch]);

  const { selectedCompany, status, error } = useSelector((state: RootState) => state.company);

  useEffect(() => {
    console.log("Status:", status);
    console.log("Selected Company:", selectedCompany);
    console.log("Error:", error);
  }, [status, selectedCompany, error]);

  if (!id) {
    return <div>No ID provided in URL.</div>;
  }

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  if (!selectedCompany) {
    return <div>No company data available.</div>;
  }

  const specialtyArray: string[] = Array.isArray(selectedCompany.specialty)
    ? selectedCompany.specialty
    : selectedCompany.specialty
    ? [selectedCompany.specialty]
    : [];

  return (
    <>
      <Title
        title="Company Profile"
        className="w-full min-h-screen flex flex-col bg-background p-4"
      >
        <div>
          <div className="md:flex px-4 py-5 md:gap-10">
            <div className="md:w-2/3 w-full">
              <ProfileCompletion company={selectedCompany} />
              {selectedCompany.description && (
                <div className="my-10">
                  <AboutMe description={selectedCompany.description} />
                </div>
              )}
              {Array.isArray(selectedCompany.services) && selectedCompany.services.length > 0 && (
                <div className="my-10">
                  <Services services={selectedCompany.services} />
                </div>
              )}
              {specialtyArray.length > 0 && (
                <div className="my-10">
                  <Specialization specialty={specialtyArray} />
                </div>
              )}
              {Array.isArray(selectedCompany.skills) && selectedCompany.skills.length > 0 && (
                <div className="my-10">
                  <Skills skills={selectedCompany.skills} />
                </div>
              )}
              {Array.isArray(selectedCompany.companyImages) && selectedCompany.companyImages.length > 0 && (
                <div className="my-10">
                  <Projects companyImages={selectedCompany.companyImages} />
                </div>
              )}
            </div>
            <div className="md:w-1/3 w-full">
              {(selectedCompany.userInfo || (Array.isArray(selectedCompany.languages) && selectedCompany.languages.length > 0)) && (
                <AdditionalDetail 
                  userInfo={selectedCompany.userInfo} 
                  languages={selectedCompany.languages || []} 
                  city={selectedCompany.city}
                  province={selectedCompany.province}
                  country={selectedCompany.country}
                  address={selectedCompany.address}
                />
              )}
              {selectedCompany.socialLinks && Object.keys(selectedCompany.socialLinks).length > 0 && (
                <div className="my-10">
                  <SocialLinks socialLinks={selectedCompany.socialLinks} />
                </div>
              )}
            </div>
          </div>
        </div>
      </Title>
    </>
  );
};

export default CompanyProfile;
