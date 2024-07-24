"use client";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { fetchCompanyProfile, updateCompanyProfile } from '@/store/slices/companyProfileSlice/companyProfileSlice';
import Title from '@/components/Title';
import ProfileCompletion from './components/ProfileCompletion';
import AdditionalDetail from './components/AdditionalDetail';
import AboutMe from './components/AboutMe';
import Services from './components/Services';
import CompanyImages from './components/CompanyImages';

interface CompanyData {
  _id: string;
  companyName: string;
  website: string;
  foundedYear: string;
  numberOfEmployees: string;
  sector: string;
  email: string;
  address: string;
  city: string;
  country: string;
  province: string;
  languages: string[];
  description: string;
  services: string[];
  companyImages: string[];
  companyLogo: string;
}

const Profile = () => {
  const dispatch: AppDispatch = useDispatch();
  const { company } = useSelector((state: RootState) => state.companyProfile);

  const [companyData, setCompanyData] = useState<CompanyData>({
    _id: "",
    companyName: "Company Name",
    website: "https://companywebsite.com",
    foundedYear: "2000",
    numberOfEmployees: "0",
    sector: "Industry",
    email: "email@domain.com",
    address: "Enter your address",
    city: "",
    country: "",
    province: "",
    languages: [],
    description: "Description of the company",
    services: [],
    companyImages: [],
    companyLogo: "/images/motion.png",
  });

  useEffect(() => {
    const storedCompanyId = localStorage.getItem("_id");
    const storedToken = localStorage.getItem("accessToken");
    if (storedCompanyId) {
      dispatch(fetchCompanyProfile(storedCompanyId));
    }
  }, [dispatch]);

  useEffect(() => {
    if (company) {
      console.log("Company data from Redux:", company);
      setCompanyData({
        _id: company._id,
        companyName: company.companyName,
        website: company.website,
        foundedYear: new Date(company.foundedYear).getFullYear().toString(),
        numberOfEmployees: company.numberOfEmployees.toString(),
        sector: company.sector,
        email: company.userInfo.email,
        address: company.address,
        city: company.city,
        country: company.country,
        province: company.province,
        languages: company.languages,
        description: company.description,
        services: company.services,
        companyImages: company.companyImages,
        companyLogo: company.companyLogo || "/images/motion.png",
      });
    }
  }, [company]);

  const handleUpdate = async (updates: Partial<CompanyData>) => {
    const storedCompanyId = localStorage.getItem("_id");
    const storedAccessToken = localStorage.getItem("accessToken");

    if (storedCompanyId && storedAccessToken) {
      const updatedData = {
        ...companyData,
        ...updates,
        numberOfEmployees: parseInt(companyData.numberOfEmployees, 10).toString(), // Ensure numberOfEmployees remains a string
      };

      await dispatch(
        updateCompanyProfile({
          id: storedCompanyId,
          updates: updatedData,
          token: storedAccessToken,
        })
      );
      setCompanyData((prevData) => ({ ...prevData, ...updates }));
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-background p-4">
      <Title title="Company Profile">
        <div>
          <div className="md:flex px-4 py-5 md:gap-10">
            <div className="md:w-2/3 w-full">
              <ProfileCompletion company={companyData} token={localStorage.getItem("accessToken") || ""} onUpdate={handleUpdate} />
              <div className="my-10">
                <AboutMe description={companyData.description} onUpdate={handleUpdate} />
              </div>
              <div className="my-10">
                <Services services={companyData.services} onUpdate={handleUpdate} />
              </div>
              <div className="my-10">
                <CompanyImages companyImages={companyData.companyImages} onUpdate={handleUpdate} />
              </div>
            </div>
            <div className="md:w-1/3 w-full">
              <AdditionalDetail
                email={companyData.email}
                address={companyData.address}
                languages={companyData.languages.join(', ')}
                onUpdate={handleUpdate}
              />
            </div>
          </div>
        </div>
      </Title>
    </div>
  );
};

export default Profile;
