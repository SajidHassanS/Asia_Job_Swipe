import { Checkbox } from "@/components/ui/checkbox"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"



 

const PaginationComponent = () => {
    return (
    
        <div className="flex justify-center mt-4">
  <Pagination>
<PaginationContent>
  <PaginationItem>
    <PaginationPrevious href="#" />
  </PaginationItem>
  <PaginationItem>
    <PaginationLink href="#" isActive >1</PaginationLink>
  </PaginationItem>
  <PaginationItem>
    <PaginationLink href="#" >
      2
    </PaginationLink>
  </PaginationItem>
  <PaginationItem>
    <PaginationLink href="#">3</PaginationLink>
  </PaginationItem>
  <PaginationItem>
    <PaginationEllipsis />
  </PaginationItem>
  <PaginationItem>
    <PaginationNext href="#" />
  </PaginationItem>
</PaginationContent>
</Pagination>
  </div>
     
    );
  }
  
  export default PaginationComponent;