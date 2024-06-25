"use client";

import { useRouter } from "next/navigation";
import { ComponentType, useEffect } from "react";

const withAuthenticatedRoutes = <P extends object>(
  WrappedComponent: ComponentType<P>
) => {
  const AuthenticatedRoutes: React.FC<P> = (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("accessToken");
      const role = localStorage.getItem("role");

      if (token) {
        if (role === "company") {
          router.push("/dashboard");
        } else {
          router.push("/");
        }
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedRoutes;
};

export default withAuthenticatedRoutes;
