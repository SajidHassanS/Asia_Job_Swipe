"use client";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegEdit } from 'react-icons/fa';
import { CiSquarePlus } from 'react-icons/ci';
import { AppDispatch, RootState } from '@/store';
import { fetchExperiences, addExperience, updateExperience, deleteExperience } from '@/store/slices/experienceSlice/experienceSlice';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { RiDeleteBin5Line } from 'react-icons/ri';

interface ExperienceData {
  _id?: string;
  companyName: string;
  jobTitle: string;
  from: Date | null;
  to?: Date | null;
  onGoing?: boolean;
  description: string;
}

const Experience = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { experiences } = useSelector((state: RootState) => state.experience);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<ExperienceData | null>(null);
  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [from, setFrom] = useState<Date | null>(null);
  const [to, setTo] = useState<Date | null>(null);
  const [onGoing, setOnGoing] = useState(false);
  const [description, setDescription] = useState('');

  useEffect(() => {
    dispatch(fetchExperiences());
  }, [dispatch]);

  const handleEditClick = (experience: ExperienceData) => {
    setSelectedExperience(experience);
    setCompanyName(experience.companyName);
    setJobTitle(experience.jobTitle);
    setFrom(experience.from);
    setTo(experience.to || null);
    setOnGoing(experience.onGoing || false);
    setDescription(experience.description);
    setIsEditing(true);
  };

  const handleAddClick = () => {
    setSelectedExperience(null);
    setCompanyName('');
    setJobTitle('');
    setFrom(null);
    setTo(null);
    setOnGoing(false);
    setDescription('');
    setIsAdding(true);
  };

  const handleSave = async () => {
    if (description.trim() === '') {
      alert('Description cannot be empty');
      return;
    }

    const experienceData: ExperienceData = {
      companyName,
      jobTitle,
      from: from,
      to: to || undefined,
      onGoing,
      description,
    };

    try {
      if (selectedExperience) {
        await dispatch(updateExperience({ experienceId: selectedExperience._id!, experience: experienceData })).unwrap();
      } else {
        await dispatch(addExperience(experienceData)).unwrap();
      }
      await dispatch(fetchExperiences());
      setIsEditing(false);
      setIsAdding(false);
    } catch (error) {
      console.error('Failed to save experience:', error);
    }
  };

  const handleDeleteClick = (experience: ExperienceData) => {
    setSelectedExperience(experience);
    setIsDeleting(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (selectedExperience) {
        await dispatch(deleteExperience({ experienceId: selectedExperience._id! })).unwrap();
        setIsDeleting(false);
        setSelectedExperience(null);
        await dispatch(fetchExperiences());
      }
    } catch (error) {
      console.error('Failed to delete experience:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  return (
    <div className="border rounded-[20px] py-6 px-5 bg-white shadow-md">
      <div className="flex justify-between mb-5">
        <h1 className="text-modaltext text-2xl font-semibold">Experiences</h1>
        <Dialog open={isAdding} onOpenChange={setIsAdding}>
          <DialogTrigger asChild>
            <CiSquarePlus className="text-signature border rounded-lg p-2 cursor-pointer" size={40} onClick={handleAddClick} />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] p-6">
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold">Add Experience</DialogTitle>
              <DialogDescription className="text-md text-gray-500">
                Add your new experience here. Click save when you are done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input id="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Company Name" />
              </div>
              <div>
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input id="jobTitle" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} placeholder="Job Title" />
              </div>
              <div>
                <Label htmlFor="from">From</Label>
                <DatePicker
                  selected={from}
                  onChange={(date) => setFrom(date as Date)}
                  className="w-full border rounded-lg p-2"
                  placeholderText="Pick a date"
                />
              </div>
              <div>
                <Label htmlFor="to">To</Label>
                <DatePicker
                  selected={to}
                  onChange={(date) => setTo(date as Date)}
                  className="w-full border rounded-lg p-2"
                  placeholderText="Pick a date"
                  disabled={onGoing}
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="onGoing">Ongoing</Label>
                <input
                  id="onGoing"
                  type="checkbox"
                  checked={onGoing}
                  onChange={(e) => setOnGoing(e.target.checked)}
                  className="ml-2"
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="description">Description</Label>
                <textarea id="description" className="w-full border rounded-lg p-4 text-lg" rows={4} value={description} onChange={handleChange} placeholder="Description" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
              <Button type="submit" onClick={handleSave}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {experiences.map((experience, index) => (
        <div key={index} className={`pb-5 mb-5 ${index !== experiences.length - 1 ? 'border-b' : ''}`}>
          <div className="flex justify-between gap-5">
            <div>
              <h1 className="text-lg font-semibold">{experience?.jobTitle || 'Untitled'}</h1>
              <div className="flex text-base text-signininput">
                <h1 className="text-modaltext font-medium">{experience?.companyName || 'Unknown Company'}</h1>
                .<h1>{experience?.from ? format(new Date(experience.from), "PPP") : ''} - {experience?.onGoing ? 'Present' : (experience?.to ? format(new Date(experience.to), "PPP") : '')}</h1>
              </div>
              <div>
                <p className="text-modaltext">{experience?.description || 'No description available'}</p>
              </div>
            </div>
            <div>
              <Dialog open={isEditing && selectedExperience?._id === experience._id} onOpenChange={setIsEditing}>
                <DialogTrigger asChild>
                  <FaRegEdit className="text-signature border rounded-lg p-2 cursor-pointer" size={40} onClick={() => handleEditClick(experience)} />
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] p-6">
                  <DialogHeader>
                    <DialogTitle className="text-3xl font-bold">Edit Experience</DialogTitle>
                    <DialogDescription className="text-md text-gray-500">
                      Make changes to your experience here. Click save when you are done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4 py-4">
                    <div>
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input id="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Company Name" />
                    </div>
                    <div>
                      <Label htmlFor="jobTitle">Job Title</Label>
                      <Input id="jobTitle" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} placeholder="Job Title" />
                    </div>
                    <div>
                      <Label htmlFor="from">From</Label>
                      <DatePicker
                        selected={from}
                        onChange={(date) => setFrom(date as Date)}
                        className="w-full border rounded-lg p-2"
                        placeholderText="Pick a date"
                      />
                    </div>
                    <div>
                      <Label htmlFor="to">To</Label>
                      <DatePicker
                        selected={to}
                        onChange={(date) => setTo(date as Date)}
                        className="w-full border rounded-lg p-2"
                        placeholderText="Pick a date"
                        disabled={onGoing}
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="onGoing">Ongoing</Label>
                      <input
                        id="onGoing"
                        type="checkbox"
                        checked={onGoing}
                        onChange={(e) => setOnGoing(e.target.checked)}
                        className="ml-2"
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="description">Description</Label>
                      <textarea id="description" className="w-full border rounded-lg p-4 text-lg" rows={4} value={description} onChange={handleChange} placeholder="Description" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                    <Button type="submit" onClick={handleSave}>Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <RiDeleteBin5Line className="text-red-500 cursor-pointer" size={30} onClick={() => handleDeleteClick(experience)} />
            </div>
          </div>
        </div>
      ))}

      {/* Confirmation Dialog for Delete */}
      <Dialog open={isDeleting} onOpenChange={setIsDeleting}>
        <DialogContent className="sm:max-w-[400px] p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Confirm Delete</DialogTitle>
            <DialogDescription className="text-md text-gray-500">
              Are you sure you want to delete this experience? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleting(false)}>Cancel</Button>
            <Button type="submit" onClick={handleDeleteConfirm}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Experience;
