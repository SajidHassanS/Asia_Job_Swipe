"use client";
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { AppDispatch } from '../../store';
import { resetPassword } from '../../store/slices/authSlice';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ResetPasswordPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      await dispatch(resetPassword({ email, otp, newPassword })).unwrap();
      setMessage('Password has been reset successfully.');
      router.push('/login'); // Redirect to login page
    } catch (error) {
      setMessage(error as string);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-8">
      <div className="w-[400px]">
        <Card className="border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-center text-darkGrey md:text-3xl">Reset Password</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {message && <p className="text-center text-red-500">{message}</p>}
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
            <div className="space-y-1">
              <Label htmlFor="newPassword" className="text-signininput text-base">New Password</Label>
              <Input
                type="password"
                id="newPassword"
                className="text-signininput3 text-base"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="confirmPassword" className="text-signininput text-base">Confirm Password</Label>
              <Input
                type="password"
                id="confirmPassword"
                className="text-signininput3 text-base"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
              />
            </div>
            <div>
              <Button
                variant="outline"
                size={"lg"}
                className="bg-signature w-full text-background"
                onClick={handleResetPassword}
              >
                Reset Password
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
