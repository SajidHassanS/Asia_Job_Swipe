import React from 'react'

import DashboardLayout from '../(dashboard)/layout'
import Home from '../(dashboard)/home-dashboard/page'

const page: React.FC = () => {
  return (
    <DashboardLayout>
    <Home/>
    </DashboardLayout>  
  )
}

export default page
