import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
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
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [skillInput, setSkillInput] = useState("");

  const handleEditClick = (skill: string) => {
    setSelectedSkill(skill);
    setSkillInput(skill);
    setIsEditing(true);
  };

  const handleAddClick = () => {
    setSelectedSkill(null);
    setSkillInput("");
    setIsAdding(true);
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
    setIsEditing(false);
    setIsAdding(false);
  };

  return (
    <div className="border rounded-[20px] py-6 px-5">
      <div className="flex justify-between mb-5">
        <h1 className="text-modaltext text-2xl font-semibold">Skills</h1>
        <div className="flex gap-2">
          <Dialog open={isAdding} onOpenChange={setIsAdding}>
            <DialogTrigger asChild>
              <CiSquarePlus
                className="text-signature border rounded-lg p-2 cursor-pointer"
                size={40}
                onClick={handleAddClick}
              />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px] p-6">
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold">
                  {selectedSkill ? "Edit Skill" : "Add Skill"}
                </DialogTitle>
                <DialogDescription className="text-md text-gray-500">
                  {selectedSkill ? "Edit your skill here." : "Add a new skill here."} Click save when you're done.
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
                <Button variant="outline" onClick={() => setIsAdding(false)}>
                  Cancel
                </Button>
                <Button type="submit" onClick={handleSave}>
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isEditing} onOpenChange={setIsEditing}>
            <DialogTrigger asChild>
              <FaRegEdit
                className="text-signature border rounded-lg p-2 cursor-pointer"
                size={40}
              />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px] p-6">
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold">
                  {selectedSkill ? "Edit Skill" : "Add Skill"}
                </DialogTitle>
                <DialogDescription className="text-md text-gray-500">
                  {selectedSkill ? "Edit your skill here." : "Add a new skill here."} Click save when you're done.
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
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button type="submit" onClick={handleSave}>
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex gap-3 flex-wrap">
        {skills.map((skill, index) => (
          <div key={index}>
            <Button
              className="bg-bglite text-base text-signature"
              onClick={() => handleEditClick(skill)}
            >
              {skill}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
