"use client";

import React, { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const SuccessGoogleContent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Get tokens and role from URL
      const accessToken = searchParams.get("accessToken");
      const refreshToken = searchParams.get("refreshToken");
      const role = searchParams.get("role");

      if (accessToken && refreshToken && role) {
        // Set tokens and role in localStorage
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("role", role);

        // Redirect based on role
        if (role === "company") {
          router.push("/dashboard");
        } else if (role === "jobSeeker") {
          router.push("/");
        }
      } else {
        // Handle error or redirect to an error page if tokens or role are missing
        router.push("/signin");
      }
    }
  }, [router, searchParams]);

  return <div>Signing in...</div>;
};

const SuccessGoogle: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      success google
    </Suspense>
  );
};

export default SuccessGoogle;
