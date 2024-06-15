"use client";
import React from 'react'
import HeroSection from './HeroSection'
import SavedJobs from './SavedJobs'
import withProtectedRoutes from '@/components/HOC/ProtectedRoutes'

const index = () => {
  return (
    <>
    <div className=' bg-lightPink'>
    <HeroSection/>
    </div>

    <div>
        <SavedJobs/>
    </div>
   
    </>
  )
}

export default withProtectedRoutes(index)