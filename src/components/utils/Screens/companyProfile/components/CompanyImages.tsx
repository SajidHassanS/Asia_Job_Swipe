import React from "react";
import Image from "next/image";

interface CompanyImagesProps {
  companyImages: string[];
}

const CompanyImages: React.FC<CompanyImagesProps> = ({ companyImages = [] }) => {
  const image = companyImages?.[0] || "/images/companyImage.png";

  return (
    <div className="border rounded-[20px] py-6 px-5">
      <div className="border-b flex justify-between pb-5 mb-5">
        <h1 className="text-modaltext text-2xl">Company Images</h1>
      </div>

      <div className="relative w-full h-96">
        <Image src={image} alt="Company Image" layout="fill" objectFit="cover" />
      </div>
    </div>
  );
};

export default CompanyImages;
