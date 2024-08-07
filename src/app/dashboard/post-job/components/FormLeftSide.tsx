import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchSkills, Skill } from "@/store/slices/profileSlices";
import { RootState, AppDispatch } from "@/store";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RiArrowDropDownLine, RiCloseLine } from "react-icons/ri";
import { Country, State, City, ICountry, IState, ICity } from 'country-state-city';

interface FormData {
  jobTitle: string;
  sector: string;
  skillsRequired: string[];
  country: string;
  city: string;
  province: string;
  description: string;
  benefits: string[];
  salaryFrom: string;
  salaryTo: string;
  urgency: string;
  careerLevel: string;
  jobType: string;
  candidateType: string;
  workPermitNeeded: boolean;
}

interface FormLeftSideProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleMultiSelectChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: keyof FormData) => void;
}

const FormLeftSide: React.FC<FormLeftSideProps> = ({ formData, handleChange, handleMultiSelectChange }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { skills } = useSelector((state: RootState) => state.profile);
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // States for country, province (state), and city
  const [countries] = useState<ICountry[]>(Country.getAllCountries());
  const [states, setStates] = useState<IState[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);

  useEffect(() => {
    dispatch(fetchSkills());
  }, [dispatch]);

  useEffect(() => {
    if (skills.length > 0) {
      const initialSelectedSkills = formData.skillsRequired
        .map((skillName) => skills.find((skill) => skill.name === skillName))
        .filter((skill): skill is Skill => skill !== undefined);
      setSelectedSkills(initialSelectedSkills);
    }
  }, [skills, formData.skillsRequired]);

  const handleSkillToggle = (skill: Skill) => {
    const updatedSelectedSkills = selectedSkills.some((s) => s._id === skill._id)
      ? selectedSkills.filter((s) => s._id !== skill._id)
      : [...selectedSkills, skill];

    setSelectedSkills(updatedSelectedSkills);
    handleMultiSelectChange(
      { 
        target: { name: 'skillsRequired', value: updatedSelectedSkills.map((s) => s.name) } as unknown as HTMLSelectElement, 
        currentTarget: {} as HTMLSelectElement 
      } as React.ChangeEvent<HTMLSelectElement>, 
      'skillsRequired'
    );
  };

  const handleDelete = (skillName: string) => {
    const updatedSkills = selectedSkills.filter((s) => s.name !== skillName);
    setSelectedSkills(updatedSkills);
    handleMultiSelectChange(
      { 
        target: { name: 'skillsRequired', value: updatedSkills.map((s) => s.name) } as unknown as HTMLSelectElement, 
        currentTarget: {} as HTMLSelectElement 
      } as React.ChangeEvent<HTMLSelectElement>, 
      'skillsRequired'
    );
  };

  const handleCountryChange = (countryCode: string) => {
    setStates(State.getStatesOfCountry(countryCode));
    setCities([]);
    handleChange({
      target: { name: 'country', value: countryCode } as HTMLSelectElement,
      currentTarget: {} as HTMLSelectElement,
    } as React.ChangeEvent<HTMLSelectElement>);
    handleChange({
      target: { name: 'province', value: '' } as HTMLSelectElement,
      currentTarget: {} as HTMLSelectElement,
    } as React.ChangeEvent<HTMLSelectElement>);
    handleChange({
      target: { name: 'city', value: '' } as HTMLSelectElement,
      currentTarget: {} as HTMLSelectElement,
    } as React.ChangeEvent<HTMLSelectElement>);
  };

  const handleStateChange = (stateCode: string) => {
    setCities(City.getCitiesOfState(formData.country, stateCode));
    handleChange({
      target: { name: 'province', value: stateCode } as HTMLSelectElement,
      currentTarget: {} as HTMLSelectElement,
    } as React.ChangeEvent<HTMLSelectElement>);
    handleChange({
      target: { name: 'city', value: '' } as HTMLSelectElement,
      currentTarget: {} as HTMLSelectElement,
    } as React.ChangeEvent<HTMLSelectElement>);
  };

  const handleCityChange = (cityName: string) => {
    handleChange({
      target: { name: 'city', value: cityName } as HTMLSelectElement,
      currentTarget: {} as HTMLSelectElement,
    } as React.ChangeEvent<HTMLSelectElement>);
  };

  return (
    <div>
      <div className="mb-8">
        <Label htmlFor="jobTitle">Job Title</Label>
        <Input
          type="text"
          id="jobTitle"
          name="jobTitle"
          placeholder="Enter job title"
          value={formData.jobTitle}
          onChange={handleChange}
          className="w-full"
        />
      </div>

      <div className="mb-8">
        <Label htmlFor="sector">Sector</Label>
        <select
          id="sector"
          name="sector"
          value={formData.sector}
          onChange={handleChange}
          className="w-full border rounded p-2"
        >
          <option value="">Select</option>
          <option value="IT">IT</option>
          <option value="Finance">Finance</option>
          <option value="Healthcare">Healthcare</option>
        </select>
      </div>

      <div className="mb-8">
        <Label htmlFor="skillsRequired">Skills Required</Label>
        <div className="relative">
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full justify-between"
              >
                Select Skills
                <RiArrowDropDownLine size={25} className="absolute right-0" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full max-h-80 overflow-y-auto">
              <DropdownMenuLabel>Skills</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {skills.map((skill) => (
                <DropdownMenuCheckboxItem
                  key={skill._id}
                  checked={selectedSkills.some((s) => s._id === skill._id)}
                  onCheckedChange={() => handleSkillToggle(skill)}
                >
                  {skill.name}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex gap-2 flex-wrap mt-2">
          {selectedSkills.map((skill) => (
            <div
              key={skill._id}
              className="flex items-center gap-2 bg-gray-200 rounded p-1"
            >
              <span>{skill.name}</span>
              <RiCloseLine
                className="text-red-500 cursor-pointer"
                size={16}
                onClick={() => handleDelete(skill.name)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <Label htmlFor="country">Country</Label>
        <select
          id="country"
          name="country"
          value={formData.country}
          onChange={(e) => handleCountryChange(e.target.value)}
          className="w-full border rounded p-2"
        >
          <option value="">Select</option>
          {countries.map((country) => (
            <option key={country.isoCode} value={country.isoCode}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-8">
        <Label htmlFor="province">State/Province</Label>
        <select
          id="province"
          name="province"
          value={formData.province}
          onChange={(e) => handleStateChange(e.target.value)}
          className="w-full border rounded p-2"
          disabled={!states.length}
        >
          <option value="">Select</option>
          {states.map((state) => (
            <option key={state.isoCode} value={state.isoCode}>
              {state.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-8">
        <Label htmlFor="city">City</Label>
        <select
          id="city"
          name="city"
          value={formData.city}
          onChange={(e) => handleCityChange(e.target.value)}
          className="w-full border rounded p-2"
          disabled={!cities.length}
        >
          <option value="">Select</option>
          {cities.map((city) => (
            <option key={city.name} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-8">
        <Label htmlFor="description">Description</Label>
        <textarea
          id="description"
          name="description"
          placeholder="Enter job description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded p-2"
          rows={4}
        />
      </div>
    </div>
  );
};

export default FormLeftSide;
