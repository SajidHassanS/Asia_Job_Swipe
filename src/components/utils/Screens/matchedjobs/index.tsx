"use client";
import React from 'react'
import HeroSection from './HeroSection'
import MatchedJobs from './MatchedJobs'
import withProtectedRoutes from '@/components/HOC/ProtectedRoutes'

const index = () => {
  return (
    <>
    <div className=' bg-lightPink'>
    <HeroSection/>
    </div>

    <div>
        <MatchedJobs/>
    </div>
   
    </>
  )
}

export default withProtectedRoutes(index)