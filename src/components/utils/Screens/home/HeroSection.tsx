import Hero from '@/components/repeatComponents/Hero'
import React from 'react'

const HeroSection: React.FC = () => {
  return (
    <Hero
      title="Explore Over "
      spanText="7,000+ "
      afterSpanText="Job Opportunities"
      subtitle="Discover a platform tailored for passionate job seekers interested in startups. Find your next career opportunity and connect with like-minded individuals."
      backgroundImage="/images/net.png"
      titleClassName="text-3xl md:text-7xl md:pt-8 text-center font-bold text-darkGrey"
      spanClassName="text-signature"
      showSearchBar
    />
  )
}

export default HeroSection;
