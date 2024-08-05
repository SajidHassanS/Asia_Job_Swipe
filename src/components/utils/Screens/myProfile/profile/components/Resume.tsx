import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CiSquarePlus } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BiSolidFilePdf } from "react-icons/bi";
import { AppDispatch, RootState } from '@/store';
import { addOrUpdateResume, deleteResume } from '@/store/slices/profileSlices';
import moment from 'moment';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Resume = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { jobSeeker } = useSelector((state: RootState) => state.profile);
  const [resumeFileName, setResumeFileName] = useState<string | null>(null);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [uploadDate, setUploadDate] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    console.log('jobSeeker data:', jobSeeker); // Log jobSeeker data for debugging
    if (jobSeeker && jobSeeker.resume) {
      const fileName = jobSeeker.resume.split('/').pop(); // Extract filename for display
      setResumeUrl(jobSeeker.resume); // Store full resume URL
      setResumeFileName(fileName || null);
      setUploadDate(jobSeeker.resumeUploadDate);
      setFileSize(jobSeeker.resumeFileSize);
    } else {
      console.warn('JobSeeker or resume not available');
    }
  }, [jobSeeker]);
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setResumeFileName(file.name);
      setFileSize(Math.round(file.size / 1024));
      setUploadDate(moment().format('DD MMM YYYY [at] hh:mm a'));

      console.log('File name:', file.name);
      const storedId = localStorage.getItem('_id') || '';
      const storedAccessToken = localStorage.getItem('accessToken') || '';
  
      if (storedId && storedAccessToken) {
        try {
          // Optimistically update UI
          setResumeUrl(URL.createObjectURL(file));

          // Assuming result contains { resumeUrl: string }
          const result = await dispatch(addOrUpdateResume({ id: storedId, file, token: storedAccessToken })).unwrap();
          console.log('API response XXXXXXXXXXXXXXX:', result);

          if (result.resumeUrl) {
            setResumeUrl(result.resumeUrl); // Store the full resume URL returned from the backend
          } else {
            console.error('No resume URL returned from the server');
          }
        } catch (error: any) {
          console.error('Failed to update resume:', error);
          // Revert optimistic update if needed
          setResumeUrl(null);
          setResumeFileName(null);
        }
      } else {
        console.error('No ID or access token found in local storage');
      }
    }
  };

  const handleDelete = async () => {
    const storedAccessToken = localStorage.getItem('accessToken') || '';

    console.log('Attempting to delete resume');
    console.log('Resume URL:', resumeUrl);
    console.log('Access Token:', storedAccessToken);

    if (resumeUrl && storedAccessToken) {
      const filename = resumeUrl.split('/').pop(); // Extract filename or unique identifier from URL

      if (filename) {
        try {
          // Optimistically update the UI
          setResumeFileName(null);
          setResumeUrl(null);
          setUploadDate(null);
          setFileSize(null);

          // Pass the filename or unique identifier, not the full URL
          const result = await dispatch(deleteResume({ filename, token: storedAccessToken })).unwrap();
          console.log('Resume deleted successfully', result);
        } catch (error: any) {
          console.error('Failed to delete resume:', error);
          // Rollback optimistic update if deletion fails
          if (jobSeeker && jobSeeker.resume) {
            setResumeUrl(jobSeeker.resume);
            const fileName = jobSeeker.resume.split('/').pop();
            setResumeFileName(fileName || null);
            setUploadDate(jobSeeker.resumeUploadDate);
            setFileSize(jobSeeker.resumeFileSize);
          }
        }
      } else {
        console.error('Filename could not be extracted from resumeUrl.');
      }
    } else {
      console.error('No resume URL or access token available.');
    }
    setIsDialogOpen(false); // Close the dialog after deletion
  };

  console.log("Resume name:", resumeFileName);

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="border rounded-[20px] py-6 px-5 bg-background shadow-md">
      <div className="flex justify-between">
        <h1 className="text-modaltext text-2xl font-semibold">Resume/CV</h1>
        <CiSquarePlus
          className="text-signature border rounded-lg p-2 cursor-pointer"
          size={40}
          onClick={handleFileClick}
        />
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {resumeFileName && (
        <div className="py-8">
          <div className="flex items-center gap-5">
            <BiSolidFilePdf className="text-red-500" size={60} />
            <div className="flex flex-col">
              <a href={resumeUrl || '#'} target="_blank" rel="noopener noreferrer" className="text-lg text-modaltext">
                {resumeFileName}
              </a>
              <span className="text-sm text-gray-500">{fileSize} Kb • {uploadDate}</span>
            </div>
            <RiDeleteBin5Line
              className="text-red-500 cursor-pointer"
              size={30}
              onClick={openDialog}
            />
          </div>
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[400px] p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Confirm Delete</DialogTitle>
            <DialogDescription className="text-md text-gray-500">
              Are you sure you want to delete this resume? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Resume;
