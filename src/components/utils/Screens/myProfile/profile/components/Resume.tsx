import React, { useState } from 'react';
import { CiLinkedin, CiSquarePlus } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Resume = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeFileName, setResumeFileName] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleAddClick = () => {
    setResumeFile(null);
    setIsAdding(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
      setResumeFileName(e.target.files[0].name);
    }
  };

  const handleSave = () => {
    setIsAdding(false);
  };

  const handleDelete = () => {
    setResumeFile(null);
    setResumeFileName(null);
    setIsDeleting(false);
  };

  return (
    <div className="border rounded-[20px] py-6 px-5 bg-white shadow-md">
      <div className="flex justify-between">
        <h1 className="text-modaltext text-2xl font-semibold">Resume/CV</h1>
        <Dialog open={isAdding} onOpenChange={setIsAdding}>
          <DialogTrigger asChild>
            <CiSquarePlus
              className="text-signature border rounded-lg p-2 cursor-pointer"
              size={40}
              onClick={handleAddClick}
            />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] p-6">
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold">Add Resume/CV</DialogTitle>
              <DialogDescription className="text-md text-gray-500">
                Upload your resume or CV file here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="resume">Resume/CV</Label>
                  <Input
                    id="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="w-full mt-2"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
              <Button type="submit" onClick={handleSave}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {resumeFileName && (
        <div className="py-8">
          <div className="flex items-center gap-5">
            <div>
              <p className="text-lg text-modaltext">{resumeFileName}</p>
            </div>
            <Dialog open={isDeleting} onOpenChange={setIsDeleting}>
              <DialogTrigger asChild>
                <RiDeleteBin5Line
                  className="text-red-500 cursor-pointer"
                  size={30}
                  onClick={() => setIsDeleting(true)}
                />
              </DialogTrigger>
              <DialogContent className="sm:max-w-[400px] p-6">
                <DialogHeader>
                  <DialogTitle className="text-3xl font-bold">Delete Resume/CV</DialogTitle>
                  <DialogDescription className="text-md text-gray-500">
                    Are you sure you want to delete this resume or CV? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDeleting(false)}>Cancel</Button>
                  <Button variant="destructive" onClick={handleDelete}>Delete</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}
    </div>
  );
}

export default Resume;
