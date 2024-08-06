import React, { Suspense } from "react";
import SignInPage from "./SigniInPage";

const SignInLayout: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInPage />
    </Suspense>
  );
};

export default SignInLayout;
