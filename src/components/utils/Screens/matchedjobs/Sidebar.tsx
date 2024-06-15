import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import MyCheckbox from "../../../../components/repeatComponents/Checkbox";
import { GoSidebarCollapse } from "react-icons/go";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";





import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
  


const Sidebar = () => {
  return (
    <> 
    <div className="md:w-1/4 md:block hidden  ">

      
      <div className="bg-lightPink rounded-xl p-4 ">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-base ">Job Type</AccordionTrigger>
            <AccordionContent>
              <MyCheckbox id="part-time" className="">
                {" "}
                Full-time (3)
              </MyCheckbox>
              <MyCheckbox id="part-time" className="">
                Part-Time (5)
              </MyCheckbox>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-base ">
              Categories
            </AccordionTrigger>
            <AccordionContent>
              <MyCheckbox id="part-time" className="">
                Design (24)
              </MyCheckbox>
              <MyCheckbox id="part-time" className="">
                Sales (3)
              </MyCheckbox>
              <MyCheckbox id="part-time" className="">
                Marketing (3)
              </MyCheckbox>
              <MyCheckbox id="part-time" className="">
                Business (3)
              </MyCheckbox>
              <MyCheckbox id="part-time" className="">
                Human Resource (6)
              </MyCheckbox>
              <MyCheckbox id="part-time" className="">
                Finance (4)
              </MyCheckbox>
              <MyCheckbox id="part-time" className="">
                Engineering (4)
              </MyCheckbox>
              <MyCheckbox id="part-time" className="">
                Technology (5)
              </MyCheckbox>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-base ">
              Career Level
            </AccordionTrigger>
            <AccordionContent>
              <MyCheckbox id="part-time" className="">
                Entry Level (57)
              </MyCheckbox>
              <MyCheckbox id="part-time" className="">
                Middle (3)
              </MyCheckbox>
              <MyCheckbox id="part-time" className="">
                Senior (5)
              </MyCheckbox>
              <MyCheckbox id="part-time" className="">
                Executive (12)
              </MyCheckbox>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-base ">
              Candidate Type
            </AccordionTrigger>
            <AccordionContent>
              <MyCheckbox id="part-time" className="">
                Remote (4)
              </MyCheckbox>
              <MyCheckbox id="part-time" className="">
                Contract (6)
              </MyCheckbox>
              <MyCheckbox id="part-time" className="">
                Internship (10)
              </MyCheckbox>
              <MyCheckbox id="part-time" className="">
                Foreigner (4)
              </MyCheckbox>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger className="text-base ">
              Salary Range
            </AccordionTrigger>
            <AccordionContent>
              <MyCheckbox id="part-time" className="">
                $700 - $1000 (4)
              </MyCheckbox>
              <MyCheckbox id="part-time" className="">
                $1000 - $1500 (6)
              </MyCheckbox>
              <MyCheckbox id="part-time" className="">
                $1500 - $2000 (10)
              </MyCheckbox>
              <MyCheckbox id="part-time" className="">
                $3000 or above (4)
              </MyCheckbox>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>

<div className="md:hidden block ">
<Sheet>
  <SheetTrigger><GoSidebarCollapse size={30} /></SheetTrigger>
  <SheetContent className="w-full ">
  <div className="bg-lightPink rounded-lg p-4 ">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-base ">Job Type</AccordionTrigger>
            <AccordionContent>
              <MyCheckbox id="part-time" className="">
                {" "}
                Full-time (3)
              </MyCheckbox>
              <MyCheckbox id="part-time" className="">
                Part-Time (5)
              </MyCheckbox>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-base ">
              Categories
            </AccordionTrigger>
            <AccordionContent>
              <MyCheckbox id="part-time" className="">
                Design (24)
              </MyCheckbox>
              <MyCheckbox id="part-time" className="">
                Sales (3)
              </MyCheckbox>
              <MyCheckbox id="part-time" className="">
                Marketing (3)
              </MyCheckbox>
              <MyCheckbox id="part-time" className="">
                Business (3)
              </MyCheckbox>
              <MyCheckbox id="part-time" className="">
                Human Resource (6)
              </MyCheckbox>
              <MyCheckbox id="part-time" className="">
                Finance (4)
              </MyCheckbox>
              <MyCheckbox id="part-time" className="">
                Engineering (4)
              </MyCheckbox>
              <MyCheckbox id="part-time" className="">
                Technology (5)
              </MyCheckbox>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-base ">
              Career Level
            </AccordionTrigger>
            <AccordionContent>
              <MyCheckbox id="part-time" className="">
                Entry Level (57)
              </MyCheckbox>
              <MyCheckbox id="part-time" className="">
                Middle (3)
              </MyCheckbox>
              <MyCheckbox id="part-time" className="">
                Senior (5)
              </MyCheckbox>
              <MyCheckbox id="part-time" className="">
                Executive (12)
              </MyCheckbox>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-base ">
              Candidate Type
            </AccordionTrigger>
            <AccordionContent>
              <MyCheckbox id="part-time" className="">
                Remote (4)
              </MyCheckbox>
              <MyCheckbox id="part-time" className="">
                Contract (6)
              </MyCheckbox>
              <MyCheckbox id="part-time" className="">
                Internship (10)
              </MyCheckbox>
              <MyCheckbox id="part-time" className="">
                Foreigner (4)
              </MyCheckbox>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger className="text-base ">
              Salary Range
            </AccordionTrigger>
            <AccordionContent>
              <MyCheckbox id="part-time" className="">
                $700 - $1000 (4)
              </MyCheckbox>
              <MyCheckbox id="part-time" className="">
                $1000 - $1500 (6)
              </MyCheckbox>
              <MyCheckbox id="part-time" className="">
                $1500 - $2000 (10)
              </MyCheckbox>
              <MyCheckbox id="part-time" className="">
                $3000 or above (4)
              </MyCheckbox>
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
