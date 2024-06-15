"use client";
import withAuthenticatedRoutes from "@/components/HOC/AuthenticatedRoutes";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { signIn } from '../../store/slices/authSlice';

const SignInPage = () => {
  const [userType, setUserType] = useState('jobSeeker'); 
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  
  // useEffect(() => {
  //   if (auth.user) {
  //     router.push('/');
  //   }
  // }, [auth.user, router]);

  const handleSignIn = async () => {
    const response = await dispatch(signIn({ email, password, userType }));
    if (response.meta.requestStatus === 'fulfilled') {
      router.push('/');
    }
  };

  return (
    <div className="md:flex">
      <div className="hidden md:flex md:w-1/2 w-full min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/signupimage.png')" }}>
      </div>
      <div className="md:w-1/2 w-full flex items-center justify-center min-h-screen py-8">
        <div className="w-[550px]">
          <Tabs defaultValue="jobseeker" className="w-full" onValueChange={setUserType}>
            <TabsList className="flex justify-center w-full mb-4">
              <TabsTrigger value="jobseeker" className="w-1/3">Job Seeker</TabsTrigger>
              <TabsTrigger value="employer" className="w-1/3">Employer</TabsTrigger>
            </TabsList>
            <TabsContent value="jobseeker">
              <Card className="border-none shadow-none">
                <CardHeader>
                  <CardTitle className="flex mb-5 justify-center text-darkGrey md:text-3xl">
                    Get more opportunities
                  </CardTitle>
                  <CardDescription>
                    <Button className="w-full text-darkGrey" variant="outline">
                      <FcGoogle size={25} className="mr-2" /> Sign In with Google
                    </Button>
                  </CardDescription>
                  <CardDescription>
                    <div className="flex items-center justify-center">
                      <div className="flex-grow border-t border-gray-300"></div>
                      <Button variant="link" className="mx-4 text-signinemail">
                        <Link href="/send-otp">Or Sign In with email</Link> 
                      </Button>
                      <div className="flex-grow border-t border-gray-300"></div>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
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
                  <div className="space-y-1">
                    <Label htmlFor="password" className="text-signininput text-base">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      className="text-signininput3 text-base"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter Password"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm signininput font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember me
                    </label>
                  </div>
                  <div>
                    <Button
                      variant="outline"
                      size={"lg"}
                      className="bg-blue w-full text-white"
                      onClick={handleSignIn}
                    >
                      Continue
                    </Button>
                  </div>
                  {auth.error && <p className="text-red-500">{auth.error}</p>}
                  <div className="flex items-center">
                    <h1 className="text-signinemail text-base">Don’t have an account?</h1>
                    <Button asChild variant="link" className="text-blue">
                      <Link href="/send-otp">Sign Up</Link>
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
            <TabsContent value="employer">
              <Card className="border-none shadow-none">
                <CardHeader>
                  <CardTitle className="flex mb-5 justify-center text-darkGrey md:text-3xl">
                    Get more opportunities
                  </CardTitle>
                  <CardDescription>
                    <Button className="w-full text-darkGrey" variant="outline">
                      <FcGoogle size={25} className="mr-2" /> Sign In with Google
                    </Button>
                  </CardDescription>
                  <CardDescription>
                    <div className="flex items-center justify-center">
                      <div className="flex-grow border-t border-gray-300"></div>
                      <Button variant="link" className="mx-4 text-signinemail">
                        Or Sign In with email
                      </Button>
                      <div className="flex-grow border-t border-gray-300"></div>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
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
                  <div className="space-y-1">
                    <Label htmlFor="password" className="text-signininput text-base">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      className="text-signininput3 text-base"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter Password"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm signininput font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember me
                    </label>
                  </div>
                  <div>
                    <Button
                      variant="outline"
                      size={"lg"}
                      className="bg-blue w-full text-white"
                      onClick={handleSignIn}
                    >
                      Continue
                    </Button>
                  </div>
                  {auth.error && <p className="text-red-500">{auth.error}</p>}
                  <div className="flex items-center">
                    <h1 className="text-signinemail text-base">Don’t have an account?</h1>
                    <Button asChild variant="link" className="text-blue">
                      <Link href="/signup">Sign Up</Link>
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

export default withAuthenticatedRoutes(SignInPage);
