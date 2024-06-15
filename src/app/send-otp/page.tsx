"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { sendOTP, verifyOTP, googleSignIn } from '../../store/slices/authSlice';
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
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import withProtectedRoutes from "@/components/HOC/AuthenticatedRoutes";
import withAuthenticatedRoutes from "@/components/HOC/AuthenticatedRoutes";

const SendOTPPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('sendOTP'); // 'sendOTP' or 'verifyOTP'
  const [role, setRole] = useState('jobSeeker'); // 'jobSeeker' or 'company'
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      // Optionally, store tokens in local storage
      localStorage.setItem('accessToken', auth.accessToken || '');
      localStorage.setItem('refreshToken', auth.refreshToken || '');
      router.push('/');
    }
  }, [session, router, auth.accessToken, auth.refreshToken]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    console.log('OAuth Callback Params:', { code, state });

    if (code && state) {
      setRole(state);
      dispatch(googleSignIn({ code, role: state })).then((response) => {
        if (response.meta.requestStatus === 'fulfilled') {
          console.log('Google Sign-In Successful:', response.payload);
        } else {
          console.error('Google Sign-In Failed:', response.payload);
        }
      });
    }
  }, [dispatch]);

  const handleSendOTP = async () => {
    const response = await dispatch(sendOTP({ email }));
    if (response.meta.requestStatus === 'fulfilled') {
      setStep('verifyOTP');
      setMessage('OTP has been sent to your email.');
      setMessageType('success');
    } else if (response.payload === 'User already exists with this email') {
      setMessage('User already exists with this email.');
      setMessageType('error');
    } else {
      setMessage('Failed to send OTP. Please try again.');
      setMessageType('error');
    }
  };

  const handleVerifyOTP = async () => {
    console.log('Attempting to verify OTP with email:', email, 'and OTP:', otp);
    const response = await dispatch(verifyOTP({ email, otp }));
    console.log('Verify OTP Response:', response);
    if (response.meta.requestStatus === 'fulfilled') {
      router.push('/signup');
    } else {
      setMessage('Failed to verify OTP. Please try again.');
      setMessageType('error');
    }
  };

  const handleGoogleSignIn = (selectedRole: string) => {
    setRole(selectedRole);
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google?role=${selectedRole}`;
  };

  return (
    <div className="md:flex">
      <div className="hidden md:flex md:w-1/2 w-full min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/signupimage.png')" }}>
      </div>
      <div className="md:w-1/2 w-full flex items-center justify-center min-h-screen py-8">
        <div className="w-[550px]">
          <Tabs defaultValue="jobseeker" className="w-full">
            <TabsList className="flex justify-center w-full mb-4">
              <TabsTrigger value="jobseeker" className="w-1/3" onClick={() => setRole('jobSeeker')}>Job Seeker</TabsTrigger>
              <TabsTrigger value="company" className="w-1/3" onClick={() => setRole('company')}>Company</TabsTrigger>
            </TabsList>
            <TabsContent value="jobseeker">
              <Card className="border-none shadow-none">
                <CardHeader>
                  <CardTitle className="flex mb-5 justify-center text-darkGrey md:text-3xl">
                    {step === 'sendOTP' ? 'Verify your email' : 'Enter OTP'}
                  </CardTitle>
                  <CardDescription>
                    <Button
                      className="w-full text-darkGrey"
                      variant="outline"
                      onClick={() => signIn('google')}
                    >
                      <FcGoogle size={25} className="mr-2" /> Sign Up with Google
                    </Button>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  {message && (
                    <p className={messageType === 'success' ? 'text-green-500' : 'text-red-500'}>
                      {message}
                    </p>
                  )}
                  {step === 'sendOTP' ? (
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
                  ) : (
                    <div className="space-y-1">
                      <Label htmlFor="otp" className="text-signininput text-base">OTP</Label>
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
                      className="bg-blue w-full text-white"
                      onClick={step === 'sendOTP' ? handleSendOTP : handleVerifyOTP}
                    >
                      {step === 'sendOTP' ? 'Send OTP' : 'Verify OTP'}
                    </Button>
                  </div>
                  {auth.otpError && <p className="text-red-500">{auth.otpError}</p>}
                  <div className="flex items-center">
                    <h1 className="text-signinemail text-base">Already have an account?</h1>
                    <Button asChild variant="link" className="text-blue">
                      <Link href="/signin">Sign In</Link>
                    </Button>
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
                  <CardTitle className="flex mb-5 justify-center text-darkGrey md:text-3xl">
                    {step === 'sendOTP' ? 'Verify your email' : 'Enter OTP'}
                  </CardTitle>
                  <CardDescription>
                    <Button
                      className="w-full text-darkGrey"
                      variant="outline"
                      onClick={() => signIn('google')}
                    >
                      <FcGoogle size={25} className="mr-2" /> Sign Up with Google
                    </Button>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  {message && (
                    <p className={messageType === 'success' ? 'text-green-500' : 'text-red-500'}>
                      {message}
                    </p>
                  )}
                  {step === 'sendOTP' ? (
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
                  ) : (
                    <div className="space-y-1">
                      <Label htmlFor="otp" className="text-signininput text-base">OTP</Label>
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
                      className="bg-blue w-full text-white"
                      onClick={step === 'sendOTP' ? handleSendOTP : handleVerifyOTP}
                    >
                      {step === 'sendOTP' ? 'Send OTP' : 'Verify OTP'}
                    </Button>
                  </div>
                  {auth.otpError && <p className="text-red-500">{auth.otpError}</p>}
                  <div className="flex items-center">
                    <h1 className="text-signinemail text-base">Already have an account?</h1>
                    <Button asChild variant="link" className="text-blue">
                      <Link href="/signin">Sign In</Link>
                    </Button>
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

export default withAuthenticatedRoutes(SendOTPPage);
