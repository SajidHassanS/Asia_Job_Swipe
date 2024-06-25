"use client";
import { useRouter } from 'next/navigation';
import React, {useEffect} from 'react'
const DashboardProtectedRoutes = ({children} : any) => {
 const router = useRouter()
 useEffect(() => {
  if (!localStorage.getItem("accessToken")) {
    router.push("/signin");
  }
}, [router]);

  return (
    <div>{children}</div>
  )
}

export default DashboardProtectedRoutes