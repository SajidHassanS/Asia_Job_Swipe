import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Skills = () => {
  const [skills, setSkills] = useState<string[]>([
    "Communication",
    "Analytics",
    "Facebook Ads",
    "Content Planning",
    "Community Manager",
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [skillInput, setSkillInput] = useState("");

  const handleEditClick = (skill: string) => {
    setSelectedSkill(skill);
    setSkillInput(skill);
    setIsDialogOpen(true);
  };

  const handleAddClick = () => {
    setSelectedSkill(null);
    setSkillInput("");
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (selectedSkill) {
      const updatedSkills = skills.map((skill) =>
        skill === selectedSkill ? skillInput : skill
      );
      setSkills(updatedSkills);
    } else {
      setSkills([...skills, skillInput]);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (skill: string) => {
    const updatedSkills = skills.filter((s) => s !== skill);
    setSkills(updatedSkills);
  };

  return (
    <div className="border rounded-[20px] py-6 px-5">
      <div className="flex justify-between mb-5">
        <h1 className="text-modaltext text-2xl font-semibold">Skills</h1>
        <CiSquarePlus
          className="text-signature border rounded-lg p-2 cursor-pointer"
          size={40}
          onClick={handleAddClick}
        />
      </div>

      <div className="flex gap-3 flex-wrap">
        {skills.map((skill, index) => (
          <div key={index} className="flex items-center gap-2">
            <Button
              className="bg-bglite text-base text-signature"
              onClick={() => handleEditClick(skill)}
            >
              {skill}
            </Button>
            <IoMdClose
              className="text-red-500 cursor-pointer"
              size={24}
              onClick={() => handleDelete(skill)}
            />
          </div>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <div></div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[400px] p-6">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold">
              {selectedSkill ? "Edit Skill" : "Add Skill"}
            </DialogTitle>
            <DialogDescription className="text-md text-gray-500">
              {selectedSkill ? "Edit your skill here." : "Add a new skill here."} Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="skill">Skill</Label>
            <Input
              id="skill"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              placeholder="Skill"
              className="w-full mt-2"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleSave}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Skills;
