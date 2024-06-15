"use client";
import React from 'react';
import Header from "./HeroSection"
import CompaniesGrow from './CompaniesGrow';
import PopulatCategory from './PopulatCategory';
import MatchedJobs from './MatchedJobs';
import EmpowerJob from './EmpowerJob';
import withProtectedRoutes from '@/components/HOC/ProtectedRoutes';
import withAuthenticatedRoutes from '@/components/HOC/AuthenticatedRoutes';
const Home = () => {
  return (
    <>

    <div className='bg-lightPink'>
    <Header/>
    </div>
    <CompaniesGrow/>
    <div className='bg-lightWhite'>
    <PopulatCategory/>

    </div>

    <div>
      <MatchedJobs/>
    </div>

    <div>
      <EmpowerJob/>
    </div>
    </>
  );
};

export default withAuthenticatedRoutes(Home);
