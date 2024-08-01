"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { sendOTP, verifyOTP, clearErrors } from "../../store/slices/authSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaArrowLeft } from "react-icons/fa6";
import { useRouter, useSearchParams } from "next/navigation";

const SendOTPPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [step, setStep] = useState<string>("sendOTP"); // 'sendOTP' or 'verifyOTP'
  const [role, setRole] = useState<string>("jobSeeker"); // 'jobSeeker' or 'company'
  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<string>(""); // 'success' or 'error'
  const [timer, setTimer] = useState<number>(0);
  const [canResend, setCanResend] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check for tokens and role in the URL after Google signup
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");
    const userRole = searchParams.get("role");

    if (accessToken && refreshToken && userRole) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("role", userRole);

      // Redirect based on role
      if (userRole === "company") {
        router.push("/dashboard");
      } else if (userRole === "jobSeeker") {
        router.push("/");
      }
    }
  }, [router, searchParams]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0 && !canResend) {
      setCanResend(true);
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer, canResend]);

  const handleSendOTP = async () => {
    setMessage("");
    setMessageType("");
    setCanResend(false);
    setTimer(60);
    dispatch(clearErrors());
    const response = await dispatch(sendOTP({ email }));
    if (response.meta.requestStatus === "fulfilled") {
      setStep("verifyOTP");
      setMessage("OTP has been sent to your email.");
      setMessageType("success");
    } else if (Array.isArray(response.payload) && response.payload.some(error => error.message === "User already exists with this email")) {
      setMessage("User already exists with this email.");
      setMessageType("error");
    } else {
      setMessage("Failed to send OTP. Please try again.");
      setMessageType("error");
    }
  };

  const handleVerifyOTP = async () => {
    setMessage("");
    setMessageType("");
    const response = await dispatch(verifyOTP({ email, otp }));
    if (response.meta.requestStatus === "fulfilled") {
      router.push(`/signup?email=${email}&otp=${otp}&role=${role}`);
    } else {
      setMessage("Failed to verify OTP. Please try again.");
      setMessageType("error");
    }
  };

  const handleGoogleSignIn = (selectedRole: string) => {
    setRole(selectedRole);
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google?role=${selectedRole}`;
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="md:flex">
        <div
          className="hidden md:flex md:w-1/2 w-full min-h-screen bg-cover bg-center"
          style={{ backgroundImage: "url('/images/signupimage.png')" }}
        ></div>
        <div className="md:w-1/2 w-full flex items-center justify-center min-h-screen py-8">
          <div className="w-[550px]">
            <Tabs defaultValue="jobSeeker" className="w-full">
              <TabsList className="flex justify-center w-full mb-4">
                <TabsTrigger value="jobSeeker" className="w-1/3" onClick={() => setRole("jobSeeker")}>
                  Job Seeker
                </TabsTrigger>
                <TabsTrigger value="company" className="w-1/3" onClick={() => setRole("company")}>
                  Company
                </TabsTrigger>
              </TabsList>
              <TabsContent value="jobSeeker">
                <Card className="border-none shadow-none">
                  <CardHeader>
                    <CardTitle className="flex mb-5 justify-center text-darkGrey md:text-3xl">
                      {step === "sendOTP" ? "Verify your email" : "Enter OTP"}
                    </CardTitle>
                    <CardDescription>
                      <Button
                        className="w-full text-darkGrey"
                        variant="outline"
                        onClick={() => handleGoogleSignIn("jobSeeker")}
                      >
                        <FcGoogle size={25} className="mr-2" /> Sign Up with Google
                      </Button>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    {message && (
                      <p className={messageType === "success" ? "text-green-500" : "text-red-500"}>
                        {message}
                      </p>
                    )}
                    {step === "sendOTP" ? (
                      <div className="space-y-1">
                        <Label htmlFor="email" className="text-signininput text-base">
                          Email Address
                        </Label>
                        <Input
                          type="email"
                          id="email"
                          className="text-signininput3 text-base"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter email address"
                        />
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <Label htmlFor="otp" className="text-signininput text-base">
                          OTP
                        </Label>
                        <Input
                          type="text"
                          id="otp"
                          className="text-signininput3 text-base"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          placeholder="Enter OTP"
                        />
                      </div>
                    )}
                    <div>
                      <Button
                        variant="outline"
                        size={"lg"}
                        className="bg-signature w-full text-background"
                        onClick={step === "sendOTP" ? handleSendOTP : handleVerifyOTP}
                      >
                        {step === "sendOTP" ? "Send OTP" : "Verify OTP"}
                      </Button>
                      {step === "verifyOTP" && (
                        <div className="flex justify-between items-center mt-4">
                          <span className="text-sm text-gray-600">
                            {canResend
                              ? "Didn't receive the code?"
                              : `Resend code in ${timer}s`}
                          </span>
                          {canResend && (
                            <Button
                              variant="link"
                              onClick={handleSendOTP}
                              disabled={!canResend}
                              className="text-signature"
                            >
                              Resend OTP
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                    {auth.otpError && <p className="text-red-500">{auth.otpError}</p>}
                    <div className="flex items-center">
                      <h1 className="text-signinemail text-base">Already have an account?</h1>
                      <Button asChild variant="link" className="text-signature">
                        <Link href="/signin">Sign In</Link>
                      </Button>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="link" className="w-full text-signature">
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
                    <CardTitle className="flex mb-5 justify-center text-darkGrey md:text-3xl">
                      {step === "sendOTP" ? "Verify your email" : "Enter OTP"}
                    </CardTitle>
                    <CardDescription>
                      <Button
                        className="w-full text-darkGrey"
                        variant="outline"
                        onClick={() => handleGoogleSignIn("company")}
                      >
                        <FcGoogle size={25} className="mr-2" /> Sign Up with Google
                      </Button>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    {message && (
                      <p className={messageType === "success" ? "text-green-500" : "text-red-500"}>
                        {message}
                      </p>
                    )}
                    {step === "sendOTP" ? (
                      <div className="space-y-1">
                        <Label htmlFor="email" className="text-signininput text-base">
                          Email Address
                        </Label>
                        <Input
                          type="email"
                          id="email"
                          className="text-signininput3 text-base"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter email address"
                        />
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <Label htmlFor="otp" className="text-signininput text-base">
                          OTP
                        </Label>
                        <Input
                          type="text"
                          id="otp"
                          className="text-signininput3 text-base"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          placeholder="Enter OTP"
                        />
                      </div>
                    )}
                    <div>
                      <Button
                        variant="outline"
                        size={"lg"}
                        className="bg-signature w-full text-background"
                        onClick={step === "sendOTP" ? handleSendOTP : handleVerifyOTP}
                      >
                        {step === "sendOTP" ? "Send OTP" : "Verify OTP"}
                      </Button>
                      {step === "verifyOTP" && (
                        <div className="flex justify-between items-center mt-4">
                          <span className="text-sm text-gray-600">
                            {canResend
                              ? "Didn't receive the code?"
                              : `Resend code in ${timer}s`}
                          </span>
                          {canResend && (
                            <Button
                              variant="link"
                              onClick={handleSendOTP}
                              disabled={!canResend}
                              className="text-signature"
                            >
                              Resend OTP
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                    {auth.otpError && <p className="text-red-500">{auth.otpError}</p>}
                    <div className="flex items-center">
                      <h1 className="text-signinemail text-base">Already have an account?</h1>
                      <Button asChild variant="link" className="text-signature">
                        <Link href="/signin">Sign In</Link>
                      </Button>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="link" className="w-full text-signature">
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
    </Suspense>
  );
};

export default SendOTPPage;
