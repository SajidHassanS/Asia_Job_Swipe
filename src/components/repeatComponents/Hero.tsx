"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { FiSearch } from 'react-icons/fi';
import { TiLocationOutline } from 'react-icons/ti';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import PakistanCities from './CitiesName';

interface HeroProps {
  title: string;
  subtitle?: string;
  suggestionText?: string;
  showSuggestions?: boolean;
  backgroundImage?: string;
  titleClassName?: string;
  spanText?: string;
  afterSpanText?: string;
  spanClassName?: string;
  showSearchBar?: boolean;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  suggestionText = 'Suggestion: Designer, Programming, Digital Marketing, Video, Animation',
  showSuggestions = true,
  backgroundImage,
  titleClassName = 'text-3xl md:text-7xl md:pt-8 text-center font-bold text-darkGrey',
  spanText,
  afterSpanText,
  spanClassName = 'text-blue',
  showSearchBar = true,
}) => {

  const [location, setLocation] = useState('');
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLocation = event.target.value;
    setLocation(newLocation);

    if (newLocation) {
      const filtered = PakistanCities.filter(city =>
        city.toLowerCase().includes(newLocation.toLowerCase()) ||
        isFuzzyMatch(city.toLowerCase(), newLocation.toLowerCase())
      );
      setFilteredCities(filtered);
    } else {
      setFilteredCities([]);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setFilteredCities([]);
    }
  };

  const isFuzzyMatch = (city: string, input: string) => {
    const inputChars = input.split('');
    let index = 0;
    for (const char of inputChars) {
      index = city.indexOf(char, index);
      if (index === -1) return false;
      index++;
    }
    return true;
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="md:max-w-4xl md:mx-auto mx-5">
      <div className="py-8">
        {backgroundImage && (
          <div
            className="bg-cover bg-center md:py-10 bg-no-repeat"
            style={{
              backgroundImage: `url('${backgroundImage}')`,
              backgroundSize: '600px 200px',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          >
            <h1 className={titleClassName}>
              {title} {spanText && <span className={spanClassName}>{spanText}</span>}{afterSpanText}
            </h1>
          </div>
        )}
        {!backgroundImage && (
          <h1 className={titleClassName}>
            {title} {spanText && <span className={spanClassName}>{spanText}</span>}
          </h1>
        )}
        {subtitle && (
          <div className="md:py-8">
            <p className="text-lg md:text-2xl text-center text-paragraphBlue">
              {subtitle}
            </p>
          </div>
        )}
        {showSearchBar && (
          <div className="max-w-4xl bg-white justify-between rounded-lg p-3 flex flex-col md:flex-row gap-5 items-center mt-8 mx-auto">
            <div className="relative flex items-center">
              <FiSearch size={35} className="absolute inset-y-1 text-blue left-0 pl-3 pointer-events-none" />
              <Input
                type="text"
                placeholder="Job title, Keyword..."
                className="pl-10 text-inputGrey text-lg md:border-none md:outline-none"
                disableFocusStyles
              />
            </div>
            <div className="md:border-l relative flex items-center" ref={dropdownRef}>
              <TiLocationOutline size={35} className="absolute text-blue inset-y-1 left-0 pl-3 pointer-events-none" />
              <Input
                type="text"
                placeholder="Your Location"
                className="pl-10 md:border-none text-inputGrey text-lg md:outline-none"
                value={location}
                onChange={handleInputChange}
                disableFocusStyles
              />
              {filteredCities.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto z-10">
                  {filteredCities.map(city => (
                    <div
                      key={city}
                      className="p-2 cursor-pointer hover:bg-gray-200"
                      onClick={() => {
                        setLocation(city);
                        setFilteredCities([]);
                      }}
                    >
                      {city}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Button asChild>
              <Link className="bg-blue text-white text-sm px-4 py-3 rounded-md" href="/signin">
                Find Jobs
              </Link>
            </Button>
          </div>
        )}
        {showSuggestions && (
          <div className="max-w-4xl flex md:justify-start text-center mt-4">
            <p>{suggestionText}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
