import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { RootState, AppDispatch } from '../../../../../../store';
// import { updateProfile, fetchProfile } from '../../../../../../store/slices/ProfileSlice';
import Image from 'next/image';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ProfileCompletion: React.FC = () => {
  // const dispatch = useDispatch<AppDispatch>();
  // const { jobSeeker, status, error } = useSelector((state: RootState) => state.profile);
  // const token = useSelector((state: RootState) => state.auth.accessToken) as string;
  const [progress, setProgress] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    profession: '',
    company: '',
    city: '',
    country: '',
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string>('/images/profil.png');

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  // useEffect(() => {
  //   const userId = localStorage.getItem('_id') as string;
  //   if (token && userId) {
  //     console.log("Fetching profile with userId:", userId);
  //     dispatch(fetchProfile({ id: userId, token }));
  //   }
  // }, [dispatch, token]);

  // useEffect(() => {
  //   if (jobSeeker) {
  //     setFormData({
  //       firstName: jobSeeker.firstName || '',
  //       lastName: jobSeeker.lastName || '',
  //       profession: jobSeeker.profession || '',
  //       company: jobSeeker.company || '',
  //       city: jobSeeker.city || '',
  //       country: jobSeeker.country || '',
  //     });
  //     setProfileImagePreview(jobSeeker.profileImage || '/images/profil.png');
  //   }
  // }, [jobSeeker]);

  // const handleSave = () => {
  //   if (token && jobSeeker?._id) {
  //     console.log("Updating profile with jobSeekerId:", jobSeeker._id);
  //     dispatch(updateProfile({ id: jobSeeker._id, updates: { ...formData, profileImage }, token }));
  //     setIsEditing(false);
  //   }
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);
      setProfileImagePreview(URL.createObjectURL(file));
    }
  };

  // if (status === 'loading') return <p>Loading...</p>;
  // if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <div className="border rounded-[20px] relative">
      <div className="flex gap-4 items-center rounded-tr-[20px] rounded-tl-[20px] p-5 bg-darkGrey relative">
        <div className="w-1/3 md:relative">
          <div className="md:absolute border-8 rounded-full border-white md:left-[40px] md:top-[10px] w-24 h-24 md:w-36 md:h-36 overflow-hidden">
            <Image src={profileImagePreview} alt="profile" width={150} height={150} className="rounded-full object-cover w-24 md:w-36" />
          </div>
        </div>
        <div className="md:w-2/3 w-full md:py-10">
          <div className="flex text-white justify-between">
            <div>
              <h1>Profile Completion</h1>
            </div>
            <div>
              <h1>{progress}%</h1>
            </div>
          </div>
          <Progress value={progress} color="bg-greenprogress" className="md:w-[100%] w-[80%]" />
        </div>
      </div>

      <div className="md:flex md:p-5 gap-3 md:gap-10">
        <div className="flex md:flex-col mt-5 gap-3 md:mt-16 md:items-center px-4 py-4 bg-switchbg rounded-lg md:w-1/3">
          <div>
            <Switch id="airplane-mode" />
          </div>
          <div className="text-greenprogress">
            <h1>OPEN FOR OPPORTUNITIES</h1>
          </div>
        </div>
        <div className="md:w-2/3 p-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="md:text-3xl text-xl text-modaltext">{formData.firstName} {formData.lastName}</h1>
              <p className="md:text-xl text-md text-signininput4 py-7">
                {formData.profession} at <span className="text-md md:text-xl text-modaltext">{formData.company}</span>
              </p>
              <div className="flex items-center text-signininput4 gap-3">
                <FaMapMarkerAlt />
                <p className="md:text-xl text-md text-signininput4">{formData.city}, {formData.country}</p>
              </div>
            </div>
            <div>
              <Dialog >
                <DialogTrigger asChild>
                  <Button className="text-blue" variant="outline" onClick={() => setIsEditing(true)}>Edit Profile</Button>
                </DialogTrigger>
                <DialogContent className="w-full max-w-lg p-6 ">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Edit Profile</DialogTitle>
                    <DialogDescription className="text-md text-gray-500">
                      Make changes to your profile here. Click save when you&apos;re done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="flex justify-center items-center mb-4">
                      <div className="relative">
                        <Image src={profileImagePreview} alt="profile" width={100} height={100} className="rounded-full object-cover w-24 h-24" />
                        <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleImageChange} />
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="firstName" className="text-right">First Name</Label>
                      <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="lastName" className="text-right">Last Name</Label>
                      <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="profession" className="text-right">Profession</Label>
                      <Input id="profession" name="profession" value={formData.profession} onChange={handleChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="company" className="text-right">Company</Label>
                      <Input id="company" name="company" value={formData.company} onChange={handleChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="city" className="text-right">City</Label>
                      <Input id="city" name="city" value={formData.city} onChange={handleChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="country" className="text-right">Country</Label>
                      <Input id="country" name="country" value={formData.country} onChange={handleChange} className="col-span-3" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" >Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCompletion;
