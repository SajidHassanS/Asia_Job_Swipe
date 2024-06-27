"use client";
import React from 'react'
// import HeroSection from './HeroSection'
import AllJobs from './BrowseCompanies'
import withProtectedRoutes from '@/components/HOC/ProtectedRoutes'

const index = () => {
  return (
    <>
    {/* <div >
    <HeroSection/>
    </div> */}

    <div>
        <AllJobs/>
    </div>
   
    </>
  )
}

export default withProtectedRoutes(index)