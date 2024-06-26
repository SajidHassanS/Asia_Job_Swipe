"use client";
import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { registerJobSeeker, registerCompany } from '../../store/slices/authSlice';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from 'next/navigation';
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa6";

const SignUpForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState<string>(searchParams.get('email') || '');
  const [otp, setOtp] = useState<string>(searchParams.get('otp') || '');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [role, setRole] = useState<string>('jobSeeker'); // Correct casing for role
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (auth?.user) {
      const role = localStorage.getItem("role");
      if (role === "company") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    }
  }, [auth?.user, router]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = async () => {
    setErrorMessage(null); // Clear previous error messages
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      let response;
      if (role === 'jobSeeker') {
        response = await dispatch(registerJobSeeker({ email, password, firstName, lastName, otp, role })).unwrap();
      } else if (role === 'company') {
        response = await dispatch(registerCompany({ email, password, otp, role, companyName })).unwrap();
      }

      if (response) {
        localStorage.setItem("role", role); // Store the role in localStorage
        localStorage.setItem("_id", response._id); // Store user ID in localStorage
        router.push(role === 'company' ? '/dashboard' : '/');
      }
    } catch (error: any) {
      setErrorMessage(error.message || 'An error occurred during registration.');
    }
  };

  return (
    <div className="md:flex">
      <div className="hidden md:flex md:w-1/2 w-full min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/signupimage.png')" }}></div>
      <div className="md:w-1/2 w-full flex items-center justify-center min-h-screen py-8">
        <div className="w-[550px]">
          <Tabs defaultValue="jobSeeker" className="w-full" onValueChange={setRole}>
            <TabsList className="flex justify-center w-full mb-4">
              <TabsTrigger value="jobSeeker" className="w-1/3">Job Seeker</TabsTrigger>
              <TabsTrigger value="company" className="w-1/3">Company</TabsTrigger>
            </TabsList>
            <TabsContent value="jobSeeker">
              <Card className="border-none shadow-none">
                <CardHeader>
                  <CardTitle className="flex mb-5 justify-center text-darkGrey md:text-3xl">Get more opportunities</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="space-y-1">
                    <Label htmlFor="firstName" className="text-signininput text-base">First Name</Label>
                    <Input
                      id="firstName"
                      className="text-signininput3"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="lastName" className="text-signininput text-base">Last Name</Label>
                    <Input
                      id="lastName"
                      className="text-signininput3"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Enter your last name"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email" className="text-signininput text-base">Email Address</Label>
                    <Input
                      type="email"
                      id="email"
                      className="text-signininput3 text-base"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email address"
                    />
                  </div>
                  <div className="space-y-1 relative">
                    <Label htmlFor="password" className="text-signininput text-base">Password</Label>
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      className="text-signininput3 text-base"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter Password"
                    />
                      <div
                      className="absolute inset-y-0 right-0 pr-3 flex items-center top-5 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash /> }
                    </div>
                  </div>
                  <div className="space-y-1 relative">
                    <Label htmlFor="confirmPassword" className="text-signininput text-base">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      className="text-signininput3 text-base"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm Password"
                    />
                      <div
                      className="absolute inset-y-0 right-0 pr-3 flex items-center top-5 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash /> }
                    </div>
                  </div>
                  <div>
                    <Button
                      variant="outline"
                      size={"lg"}
                      className="bg-blue w-full text-white"
                      onClick={handleSignUp}
                      disabled={auth.status === 'loading'}
                    >
                      Continue
                    </Button>
                  </div>
                  {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                  <div className="flex items-center">
                    <h1 className="text-signinemail text-base">Already have an account?</h1>
                    <Button asChild variant="link" className="text-blue">
                      <Link href="/signin">Login</Link>
                    </Button>
                  </div>
                  <div className="flex items-center">
                    <h1 className="text-signininput4 text-base">
                      By clicking &apos;Continue&apos;, you acknowledge that you have read and accept the{" "}
                      <span className="text-blue">Terms of Service</span> and{" "}
                      <span className="text-blue">Privacy Policy</span>.
                    </h1>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="link" className="w-full text-blue">
                    <Link href="/home">
                      <FaArrowLeft size={20} className="mr-2" /> Back to Home
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="company">
              <Card className="border-none shadow-none">
                <CardHeader>
                  <CardTitle className="flex mb-5 justify-center text-darkGrey md:text-3xl">Get more opportunities</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="space-y-1">
                    <Label htmlFor="companyName" className="text-signininput text-base">Company Name</Label>
                    <Input
                      id="companyName"
                      className="text-signininput3"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Enter company name"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email" className="text-signininput text-base">Email Address</Label>
                    <Input
                      type="email"
                      id="email"
                      className="text-signininput3 text-base"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email address"
                    />
                  </div>
                  <div className="space-y-1 relative">
                    <Label htmlFor="password" className="text-signininput text-base">Password</Label>
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      className="text-signininput3 text-base"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter Password"
                    />
                      <div
                      className="absolute inset-y-0 right-0 pr-3 flex items-center top-5 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash /> }
                    </div>
                  </div>
                  <div className="space-y-1 relative">
                    <Label htmlFor="confirmPassword" className="text-signininput text-base">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      className="text-signininput3 text-base"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm Password"
                    />
                      <div
                      className="absolute inset-y-0 right-0 pr-3 flex items-center top-5 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash /> }
                    </div>
                  </div>
                  <div>
                    <Button
                      variant="outline"
                      size={"lg"}
                      className="bg-blue w-full text-white"
                      onClick={handleSignUp}
                      disabled={auth.status === 'loading'}
                    >
                      Continue
                    </Button>
                  </div>
                  {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                  <div className="flex items-center">
                    <h1 className="text-signinemail text-base">Already have an account?</h1>
                    <Button asChild variant="link" className="text-blue">
                      <Link href="/signin">Login</Link>
                    </Button>
                  </div>
                  <div className="flex items-center">
                    <h1 className="text-signininput4 text-base">
                      By clicking &apos;Continue&apos;, you acknowledge that you have read and accept the{" "}
                      <span className="text-blue">Terms of Service</span> and{" "}
                      <span className="text-blue">Privacy Policy</span>.
                    </h1>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="link" className="w-full text-blue">
                    <Link href="/home">
                      <FaArrowLeft size={20} className="mr-2" /> Back to Home
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

const SignUpPage: React.FC = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <SignUpForm />
  </Suspense>
);

export default SignUpPage;
