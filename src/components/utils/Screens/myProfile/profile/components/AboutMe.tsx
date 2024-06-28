import React, { useState } from 'react';
import { FaRegEdit } from "react-icons/fa";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const AboutMe = () => {
  const [aboutText, setAboutText] = useState(`I’m a product designer + filmmaker currently working remotely at Twitter from beautiful Manchester, United Kingdom. I’m passionate about designing digital products that have a positive impact on the world.
  \n\nI’m a product designer + filmmaker currently working remotely at Twitter from beautiful Manchester, United Kingdom. I’m passionate about designing digital products that have a positive impact on the world.`);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    // Save the updated aboutText to the backend or state management here
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAboutText(e.target.value);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="border p-6 rounded-[20px] relative">
      <div className="flex justify-between items-center">
        <h1 className="text-modaltext text-2xl">About Me</h1>
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogTrigger asChild>
            <FaRegEdit className="text-signature border rounded-lg p-2 cursor-pointer" size={40} onClick={() => setIsEditing(true)} />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] p-6">
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold">Edit About Me</DialogTitle>
              <DialogDescription className="text-md text-gray-500">
                Make changes to your About Me section here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <textarea
                className="w-full border rounded-lg p-4 text-lg"
                rows={10}
                value={aboutText}
                onChange={handleChange}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleCancel}>Cancel</Button>
              <Button type="submit" onClick={handleSave}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className='text-signininput text-lg mt-4'>
        {aboutText.split('\n\n').map((paragraph, index) => (
          <p key={index} className="mb-4">{paragraph}</p>
        ))}
      </div>
    </div>
  );
}

export default AboutMe;
