"use client"
import React from 'react'
// import HeroSection from './HeroSection'
import AllJobs from './AllJobs'
import withProtectedRoutes from '@/components/HOC/ProtectedRoutes'
import SuggestedCompanies from './SuggestedCompanies'

const index = () => (
  <>
    

    <div className='bg-background '>
        <AllJobs/>
        <div className='md:container md:mb-16'>
        <SuggestedCompanies/>
        </div>
    </div>
  </>
)

export default withProtectedRoutes(index)
