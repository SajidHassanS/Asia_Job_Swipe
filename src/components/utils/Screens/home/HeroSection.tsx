import Hero from '@/components/repeatComponents/Hero'
import React from 'react'

const HeroSection: React.FC = () => {
  const isSpecialPage = false 
  return (
    <>
    <Hero
        title="Explore Over "
        spanText="7,000+ "
        afterSpanText= "Job Opportunities"
        subtitle="Discover a platform tailored for passionate job seekers interested in startups. Find your next career opportunity and connect with like-minded individuals."
        suggestionText="Suggestion: Designer, Programming, Digital Marketing, Video, Animation"
        backgroundImage="/images/net.png" // Custom background image for Page1
        titleClassName="text-3xl md:text-7xl md:pt-8 text-center font-bold text-darkGrey" // Custom title style for Page1
        spanClassName="text-blue" // Custom span style for Page1
      
        showSearchBar={!isSpecialPage}
      />
    </>
  )
}

export default HeroSection