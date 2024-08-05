import React, { useState, useEffect } from "react";
import ProfileCompletion from "./components/ProfileCompletion";
import AdditionalDetails from "./components/AdditionalDetails";
import AboutMe from "./components/AboutMe";
import Experience from "./components/Experience";
import Educations from "./components/Educations";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import PersonalDetails from "./components/PersonalDetails";
import Resume from "./components/Resume";
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../../../store';
import { fetchProfile, updateProfile } from '../../../../../store/slices/profileSlices';

export interface ProfileFormData {
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  introduction: string;
  profession: string;
  skills: string[];
  languages: string[];
  city: string;
  province: string;
  country: string;
  nationality: string;
  postalCode: string;
  email: string;
  phone: string;
  profilePicture: string;
  company: string;
  openToOffers: boolean;
  // experience: any[]; // Array of experiences
  // education: any[]; // Array of educations
  // projects: any[]; // Array of projects
  // resume: string; // Resume URL
}


const Profile = () => {
  const dispatch: AppDispatch = useDispatch();
  const { jobSeeker } = useSelector((state: RootState) => state.profile);
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: '',
    lastName: '',
    gender: 'notSpecified',
    dateOfBirth: '',
    introduction: '',
    profession: '',
    skills: [],
    languages: [],
    city: '',
    province: '',
    country: '',
    nationality: '',
    postalCode: '',
    email: '',
    phone: '',
    profilePicture: '',
    company: '',
    openToOffers: false,
    // experience: [], // Add this line
    // education: [], // Add this line
    // projects: [], // Add this line
    // resume: '',
    
  });

  useEffect(() => {
    const storedId = localStorage.getItem('_id');
    const storedAccessToken = localStorage.getItem('accessToken');
    if (storedId && storedAccessToken) {
      dispatch(fetchProfile({ id: storedId, token: storedAccessToken }));
    }
  }, [dispatch]);

  useEffect(() => {
    if (jobSeeker) {
      const latestExperience = jobSeeker.experience?.reduce((latest, current) => {
        return new Date(latest.to) > new Date(current.to) ? latest : current;
      }, jobSeeker.experience[0]);
  
      setFormData({
        ...formData,
        firstName: jobSeeker.firstName || '',
        lastName: jobSeeker.lastName || '',
        gender: jobSeeker.gender || 'notSpecified',
        dateOfBirth: jobSeeker.dateOfBirth || '',
        introduction: jobSeeker.introduction || '',
        profession: jobSeeker.profession || '',
        skills: jobSeeker.skills || [],
        languages: jobSeeker.languages || [],
        city: jobSeeker.city || '',
        province: jobSeeker.province || '',
        country: jobSeeker.country || '',
        nationality: jobSeeker.nationality || '',
        postalCode: jobSeeker.postalCode || '',
        email: jobSeeker.userInfo?.email || '',
        phone: jobSeeker.phone || '',
        profilePicture: jobSeeker.profilePicture || '',
        company: latestExperience?.companyName || '',
        openToOffers: jobSeeker.openToOffers || false,
        // experience: jobSeeker.experience || [], // Include experiences
        // education: jobSeeker.education || [], // Include education
        // projects: jobSeeker.projects || [], // Include projects
        // resume: jobSeeker.resume || '', // Include resume
      });
    }
  }, [jobSeeker]);
  

  const handleSave = (updates: Partial<ProfileFormData>) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      ...updates,
    }));

    const storedId = localStorage.getItem('_id');
    const storedAccessToken = localStorage.getItem('accessToken');
    if (storedId && storedAccessToken) {
      dispatch(updateProfile({ id: storedId, updates: { ...formData, ...updates }, token: storedAccessToken }));
    }
  };

  return (
    <div>
      <div className="md:flex px-4 py-5 md:gap-10">
        <div className="md:w-2/3 w-full">
          <ProfileCompletion formData={formData} setFormData={setFormData} handleSave={handleSave} />
          <div className="my-10">
            <AboutMe formData={formData} setFormData={setFormData} handleSave={handleSave} />
          </div>
          <div className="my-10">
            <Experience />
          </div>
          <div className="my-10">
            <Educations />
          </div>
          <div className="my-10">
            <Projects />
          </div>
          <div className="my-10">
            <Skills formData={formData} setFormData={setFormData} handleSave={handleSave} />
          </div>
        </div>
        <div className="md:w-1/3 w-full">
          <AdditionalDetails formData={formData} setFormData={setFormData} handleSave={handleSave} />
          <div className="my-10">
            <PersonalDetails formData={formData} setFormData={setFormData} handleSave={handleSave} />
          </div>
          <div className="my-10">
            <Resume />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
