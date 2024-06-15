import React from 'react'
import HeroComponent from '@/components/repeatComponents/Hero'

const HeroSection: React.FC = () => {
  const isSpecialPage = false // Set this to true if you want to exclude the search bar section

  return (
    <>
      <HeroComponent
        title="Search Companies"
        suggestionText="Suggestion: Designer, Programming, Digital Marketing, Video, Animation"
        
        showSuggestions={true}
        backgroundImage="url-to-image"
        showSearchBar={!isSpecialPage}
      />
      {/* Other content for Page2 */}
    </>
  )
}

export default HeroSection