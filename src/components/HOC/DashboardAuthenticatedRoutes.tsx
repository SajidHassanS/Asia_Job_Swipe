"use client";

import { useRouter } from "next/navigation";
import { ComponentType, useEffect } from "react";

const withAuthenticatedRoutes = <P extends object>(
  WrappedComponent: ComponentType<P>
) => {
  const AuthenticatedRoutes: React.FC<P> = (props) => {
    const router = useRouter();
    useEffect(() => {
      if (localStorage.getItem("accessToken")) {
        router.push("/dashboard");
      }
    }, [router]);
    return <WrappedComponent {...props} />;
  };

  return AuthenticatedRoutes;
};
export default withAuthenticatedRoutes;
