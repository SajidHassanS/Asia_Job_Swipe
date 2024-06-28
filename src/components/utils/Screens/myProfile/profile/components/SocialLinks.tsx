import React, { useState } from 'react';
import { CiLinkedin } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
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

const SocialLinks = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [linkedinUrl, setLinkedinUrl] = useState("www.linkedin.xyz");

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="border rounded-[20px] py-6 px-5 bg-white shadow-md">
      <div className="flex justify-between">
        <h1 className="text-modaltext text-2xl font-semibold">Social Links</h1>
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogTrigger asChild>
            <FaRegEdit className="text-signature border rounded-lg p-2 cursor-pointer" size={40} onClick={() => setIsEditing(true)} />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[400px] p-6">
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold">Edit Social Links</DialogTitle>
              <DialogDescription className="text-md text-gray-500">
                Make changes to your social links here. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="linkedinUrl">LinkedIn</Label>
                  <Input
                    id="linkedinUrl"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    placeholder="LinkedIn URL"
                    className="w-full mt-2"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button type="submit" onClick={handleSave}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="py-8">
        <div className="flex gap-5">
          <CiLinkedin className="text-signininput4" size={30} />
          <div>
            <h1 className="text-lg text-signininput4">LinkedIn</h1>
            <p className="text-lg text-signature">{linkedinUrl}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SocialLinks;
