import React from 'react';
import Checkbox from '../../../repeatComponents/Checkbox';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { GoSidebarCollapse } from 'react-icons/go';

interface SidebarProps {
  onCheckboxChange: (filter: string) => void;
  selectedFilters: string[];
}

const Sidebar: React.FC<SidebarProps> = ({ onCheckboxChange, selectedFilters }) => {
  return (
    <>
      <div className="md:w-1/4 md:block hidden">
        <div className="bg-lightPink rounded-xl p-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-base">Job Type</AccordionTrigger>
              <AccordionContent>
                <Checkbox id="full-time" checked={selectedFilters.includes("Full-Time")} onChange={() => onCheckboxChange("Full-Time")}>
                  Full-Time (3)
                </Checkbox>
                <Checkbox id="part-time" checked={selectedFilters.includes("Part-Time")} onChange={() => onCheckboxChange("Part-Time")}>
                  Part-Time (5)
                </Checkbox>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-base">Categories</AccordionTrigger>
              <AccordionContent>
                <Checkbox id="design" checked={selectedFilters.includes("Design")} onChange={() => onCheckboxChange("Design")}>
                  Design (24)
                </Checkbox>
                <Checkbox id="sales" checked={selectedFilters.includes("Sales")} onChange={() => onCheckboxChange("Sales")}>
                  Sales (3)
                </Checkbox>
                <Checkbox id="marketing" checked={selectedFilters.includes("Marketing")} onChange={() => onCheckboxChange("Marketing")}>
                  Marketing (3)
                </Checkbox>
                <Checkbox id="business" checked={selectedFilters.includes("Business")} onChange={() => onCheckboxChange("Business")}>
                  Business (3)
                </Checkbox>
                <Checkbox id="human-resource" checked={selectedFilters.includes("Human Resource")} onChange={() => onCheckboxChange("Human Resource")}>
                  Human Resource (6)
                </Checkbox>
                <Checkbox id="finance" checked={selectedFilters.includes("Finance")} onChange={() => onCheckboxChange("Finance")}>
                  Finance (4)
                </Checkbox>
                <Checkbox id="engineering" checked={selectedFilters.includes("Engineering")} onChange={() => onCheckboxChange("Engineering")}>
                  Engineering (4)
                </Checkbox>
                <Checkbox id="technology" checked={selectedFilters.includes("Technology")} onChange={() => onCheckboxChange("Technology")}>
                  Technology (5)
                </Checkbox>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-base">Career Level</AccordionTrigger>
              <AccordionContent>
                <Checkbox id="entry-level" checked={selectedFilters.includes("Entry Level")} onChange={() => onCheckboxChange("Entry Level")}>
                  Entry Level (57)
                </Checkbox>
                <Checkbox id="middle" checked={selectedFilters.includes("Middle")} onChange={() => onCheckboxChange("Middle")}>
                  Middle (3)
                </Checkbox>
                <Checkbox id="senior" checked={selectedFilters.includes("Senior")} onChange={() => onCheckboxChange("Senior")}>
                  Senior (5)
                </Checkbox>
                <Checkbox id="executive" checked={selectedFilters.includes("Executive")} onChange={() => onCheckboxChange("Executive")}>
                  Executive (12)
                </Checkbox>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-base">Candidate Type</AccordionTrigger>
              <AccordionContent>
                <Checkbox id="remote" checked={selectedFilters.includes("Remote")} onChange={() => onCheckboxChange("Remote")}>
                  Remote (4)
                </Checkbox>
                <Checkbox id="contract" checked={selectedFilters.includes("Contract")} onChange={() => onCheckboxChange("Contract")}>
                  Contract (6)
                </Checkbox>
                <Checkbox id="internship" checked={selectedFilters.includes("Internship")} onChange={() => onCheckboxChange("Internship")}>
                  Internship (10)
                </Checkbox>
                <Checkbox id="foreigner" checked={selectedFilters.includes("Foreigner")} onChange={() => onCheckboxChange("Foreigner")}>
                  Foreigner (4)
                </Checkbox>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger className="text-base">Salary Range</AccordionTrigger>
              <AccordionContent>
                <Checkbox id="$15k/Monthly" checked={selectedFilters.includes("$15k/Monthly")} onChange={() => onCheckboxChange("$15k/Monthly")}>
                  $15k/Monthly (6)
                </Checkbox>
                <Checkbox id="$25k/Monthly" checked={selectedFilters.includes("$25k/Monthly")} onChange={() => onCheckboxChange("$25k/Monthly")}>
                  $25k/Monthly (1)
                </Checkbox>
                <Checkbox id="$35k/Monthly" checked={selectedFilters.includes("$35k/Monthly")} onChange={() => onCheckboxChange("$35k/Monthly")}>
                  $35k/Monthly (1)
                </Checkbox>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <div className="md:hidden block">
        <Sheet>
          <SheetTrigger><GoSidebarCollapse size={30} /></SheetTrigger>
          <SheetContent className="w-full">
            <div className="bg-lightPink rounded-lg p-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-base">Job Type</AccordionTrigger>
                  <AccordionContent>
                    <Checkbox id="full-time" checked={selectedFilters.includes("Full-Time")} onChange={() => onCheckboxChange("Full-Time")}>
                      Full-Time (3)
                    </Checkbox>
                    <Checkbox id="part-time" checked={selectedFilters.includes("Part-Time")} onChange={() => onCheckboxChange("Part-Time")}>
                      Part-Time (5)
                    </Checkbox>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-base">Categories</AccordionTrigger>
                  <AccordionContent>
                    <Checkbox id="design" checked={selectedFilters.includes("Design")} onChange={() => onCheckboxChange("Design")}>
                      Design (24)
                    </Checkbox>
                    <Checkbox id="sales" checked={selectedFilters.includes("Sales")} onChange={() => onCheckboxChange("Sales")}>
                      Sales (3)
                    </Checkbox>
                    <Checkbox id="marketing" checked={selectedFilters.includes("Marketing")} onChange={() => onCheckboxChange("Marketing")}>
                      Marketing (3)
                    </Checkbox>
                    <Checkbox id="business" checked={selectedFilters.includes("Business")} onChange={() => onCheckboxChange("Business")}>
                      Business (3)
                    </Checkbox>
                    <Checkbox id="human-resource" checked={selectedFilters.includes("Human Resource")} onChange={() => onCheckboxChange("Human Resource")}>
                      Human Resource (6)
                    </Checkbox>
                    <Checkbox id="finance" checked={selectedFilters.includes("Finance")} onChange={() => onCheckboxChange("Finance")}>
                      Finance (4)
                    </Checkbox>
                    <Checkbox id="engineering" checked={selectedFilters.includes("Engineering")} onChange={() => onCheckboxChange("Engineering")}>
                      Engineering (4)
                    </Checkbox>
                    <Checkbox id="technology" checked={selectedFilters.includes("Technology")} onChange={() => onCheckboxChange("Technology")}>
                      Technology (5)
                    </Checkbox>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-base">Career Level</AccordionTrigger>
                  <AccordionContent>
                    <Checkbox id="entry-level" checked={selectedFilters.includes("Entry Level")} onChange={() => onCheckboxChange("Entry Level")}>
                      Entry Level (57)
                    </Checkbox>
                    <Checkbox id="middle" checked={selectedFilters.includes("Middle")} onChange={() => onCheckboxChange("Middle")}>
                      Middle (3)
                    </Checkbox>
                    <Checkbox id="senior" checked={selectedFilters.includes("Senior")} onChange={() => onCheckboxChange("Senior")}>
                      Senior (5)
                    </Checkbox>
                    <Checkbox id="executive" checked={selectedFilters.includes("Executive")} onChange={() => onCheckboxChange("Executive")}>
                      Executive (12)
                    </Checkbox>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-base">Candidate Type</AccordionTrigger>
                  <AccordionContent>
                    <Checkbox id="remote" checked={selectedFilters.includes("Remote")} onChange={() => onCheckboxChange("Remote")}>
                      Remote (4)
                    </Checkbox>
                    <Checkbox id="contract" checked={selectedFilters.includes("Contract")} onChange={() => onCheckboxChange("Contract")}>
                      Contract (6)
                    </Checkbox>
                    <Checkbox id="internship" checked={selectedFilters.includes("Internship")} onChange={() => onCheckboxChange("Internship")}>
                      Internship (10)
                    </Checkbox>
                    <Checkbox id="foreigner" checked={selectedFilters.includes("Foreigner")} onChange={() => onCheckboxChange("Foreigner")}>
                      Foreigner (4)
                    </Checkbox>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-base">Salary Range</AccordionTrigger>
                  <AccordionContent>
                    <Checkbox id="$15k/Monthly" checked={selectedFilters.includes("$15k/Monthly")} onChange={() => onCheckboxChange("$15k/Monthly")}>
                      $15k/Monthly (6)
                    </Checkbox>
                    <Checkbox id="$25k/Monthly" checked={selectedFilters.includes("$25k/Monthly")} onChange={() => onCheckboxChange("$25k/Monthly")}>
                      $25k/Monthly (1)
                    </Checkbox>
                    <Checkbox id="$35k/Monthly" checked={selectedFilters.includes("$35k/Monthly")} onChange={() => onCheckboxChange("$35k/Monthly")}>
                      $35k/Monthly (1)
                    </Checkbox>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default Sidebar;