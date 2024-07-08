import React, { useState, useRef } from "react";
import { FiPlus } from "react-icons/fi";
import Image from "next/image";

const CompanyImages = () => {
  const [companyImage, setCompanyImage] = useState("/images/companyImage.png");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setCompanyImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="border rounded-[20px] py-6 px-5">
      <div className="border-b flex justify-between pb-5 mb-5">
        <h1 className="text-modaltext text-2xl">Company Images</h1>
        <FiPlus
          className="text-signature border rounded-lg p-2 cursor-pointer"
          size={40}
          onClick={handleImageClick}
        />
      </div>

      <div className="relative w-full h-96 cursor-pointer" onClick={handleImageClick}>
        <Image
          src={companyImage}
          alt="Company Image"
          layout="fill"
          objectFit="cover"
        />
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleImageChange}
        />
      </div>
    </div>
  );
};

export default CompanyImages;
