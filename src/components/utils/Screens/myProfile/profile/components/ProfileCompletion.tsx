import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store'; // Ensure the correct import path for your store
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ProfileFormData } from '../Profile';
import { Switch } from '@/components/ui/switch';
import { updateProfilePicture, fetchProfile } from '@/store/slices/profileSlices'; // Adjust the import path if necessary
//import { JobSeeker } from '@/store/slices/profileSlices'; // Adjust the import path

interface ProfileCompletionProps {
  formData: ProfileFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProfileFormData>>;
  handleSave: (updates: Partial<ProfileFormData>) => void;
}

const ProfileCompletion: React.FC<ProfileCompletionProps> = ({ formData, setFormData, handleSave }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { jobSeeker } = useSelector((state: RootState) => state.profile);
  const [isEditing, setIsEditing] = useState(false);
  const [profileImagePreview, setProfileImagePreview] = useState<string>(formData.profilePicture || '/images/profile.png');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    calculateProgress();
    setProfileImagePreview(formData.profilePicture || '/images/profile.png');
  }, [formData]);

  const calculateProgress = () => {
    let completedFields = 0;
    const totalFields = Object.keys(formData).length;
    Object.values(formData).forEach((value) => {
      if (value) completedFields++;
    });
    const progressValue = Math.round((completedFields / totalFields) * 100);
    setProgress(progressValue);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);
      setProfileImagePreview(URL.createObjectURL(file));
      const storedId = localStorage.getItem('_id') || ''; // Retrieve the ID from local storage
      const storedAccessToken = localStorage.getItem('accessToken') || ''; // Retrieve the token from local storage

      if (storedId && storedAccessToken) {
        dispatch(updateProfilePicture({ id: storedId, file, token: storedAccessToken }))
          .unwrap() // Unwrap the action to handle fulfilled/rejected actions directly
          // .then((updatedProfileData: JobSeeker) => {
          //   console.log('Profile picture updated successfully', updatedProfileData);
          //   setFormData((prevFormData) => ({
          //     ...prevFormData,
          //     profilePicture: updatedProfileData.profilePicture,
          //   }));
          //   // Fetch updated profile data to ensure it is reflected in the state
          //   dispatch(fetchProfile({ id: storedId, token: storedAccessToken }));
          // })
          .catch((error: any) => { // Ensure error is typed as any to avoid unknown type issue
            console.error('Failed to update profile picture:', error);
          });
      } else {
        console.error('No ID or access token found in local storage');
      }
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    calculateProgress();
  };

  const handleSaveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleSave(formData);
    setIsEditing(false);
  };

  return (
    <div className="border rounded-[20px] relative">
      <div className="flex gap-4 items-center rounded-tr-[20px] rounded-tl-[20px] p-5 bg-darkGrey relative">
        <div className="w-1/3 md:relative">
          <div
            className="md:absolute border-8 rounded-full border-white md:left-[40px] md:top-[10px] w-24 h-24 md:w-36 md:h-36 overflow-hidden cursor-pointer"
            onClick={handleImageClick}
          >
            <Image
              src={profileImagePreview}
              alt="profile"
              width={150}
              height={150}
              className="rounded-full object-cover w-24 md:w-36"
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageChange}
            />
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
              <h1 className="md:text-3xl text-xl text-modaltext">
                {formData.firstName} {formData.lastName}
              </h1>
              <p className="md:text-xl text-md text-signininput4 py-7">
                {formData.profession}
              </p>
              <div className="flex items-center text-signininput4 gap-3">
                <FaMapMarkerAlt />
                <p className="md:text-xl text-md text-signininput4">
                  {formData.city}, {formData.country}
                </p>
              </div>
            </div>
            <div>
              <Dialog open={isEditing} onOpenChange={setIsEditing}>
                <DialogTrigger asChild>
                  <Button className="text-blue" variant="outline" onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-full max-w-lg p-6">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Edit Profile</DialogTitle>
                    <DialogDescription className="text-md text-gray-500">
                      Make changes to your profile here. Click save when you&apos;re done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="firstName" className="text-right">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="lastName" className="text-right">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="profession" className="text-right">
                        Profession
                      </Label>
                      <Input
                        id="profession"
                        name="profession"
                        value={formData.profession}
                        onChange={handleChange}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="company" className="text-right">
                        Company
                      </Label>
                      <Input
                        id="company"
                        name="company"
                        //value={formData.company}
                        onChange={handleChange}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="city" className="text-right">
                        City
                      </Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="country" className="text-right">
                        Country
                      </Label>
                      <Input
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" onClick={handleSaveClick}>
                      Save changes
                    </Button>
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
