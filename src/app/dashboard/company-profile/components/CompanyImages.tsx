import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { addOrUpdateCompanyImages, deleteCompanyImage } from '@/store/slices/companyProfileSlice/companyProfileSlice';
import Image from "next/image";
import { Label } from "@/components/ui/label";
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

interface CompanyImagesProps {
  companyImages: string[];
  onUpdate: (updates: Partial<{ companyImages: string[] }>) => Promise<void>;
}

const CompanyImages: React.FC<CompanyImagesProps> = ({ companyImages, onUpdate }) => {
  const dispatch: AppDispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [currentImages, setCurrentImages] = useState<string[]>(companyImages);
  const [newImage, setNewImage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setCurrentImages(companyImages);
  }, [companyImages]);

  const handleSave = async () => {
    const storedCompanyId = localStorage.getItem("_id");
    const storedAccessToken = localStorage.getItem("accessToken");

    if (storedCompanyId && storedAccessToken) {
      await dispatch(addOrUpdateCompanyImages({
        companyId: storedCompanyId,
        images: currentImages.map(image => dataURLtoFile(image, 'image.jpg')),
        token: storedAccessToken
      }));
      setIsEditing(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addImage = () => {
    if (newImage) {
      setCurrentImages([...currentImages, newImage]);
      setNewImage("");
    }
  };

  const removeImage = async (index: number) => {
    const storedAccessToken = localStorage.getItem("accessToken");
    if (storedAccessToken) {
      await dispatch(deleteCompanyImage({
        filename: currentImages[index],
        token: storedAccessToken
      }));
      setCurrentImages(currentImages.filter((_, i) => i !== index));
    }
  };

  const dataURLtoFile = (dataurl: string, filename: string) => {
    let arr = dataurl.split(',');
    let mimeMatch = arr[0].match(/:(.*?);/);
    if (!mimeMatch) {
      throw new Error("Invalid data URL format");
    }
    let mime = mimeMatch[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  return (
    <div className="border rounded-[20px] py-6 px-5">
      <div className="flex justify-between mb-5">
        <h1 className="text-modaltext text-2xl">Company Images</h1>
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogTrigger asChild>
            <Button className="text-signature" variant="outline" onClick={() => setIsEditing(true)}>
              Edit Images
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] p-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Edit Images</DialogTitle>
              <DialogDescription className="text-md text-gray-500">
                Add or remove company images here. Click save when you are done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="newImage" className="text-right">
                  New Image
                </Label>
                <Input
                  id="newImage"
                  name="newImage"
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="col-span-3"
                />
                <Button className="col-span-1" onClick={addImage}>
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-4">
                {currentImages.map((image, index) => (
                  <div key={index} className="relative">
                    <Image src={image} alt="Company Image" width={150} height={150} className="rounded" />
                    <Button
                      className="absolute top-0 right-0 p-1 text-red-500"
                      onClick={() => removeImage(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <DialogFooter className="flex justify-between">
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
      <div className="flex gap-3 flex-wrap">
        {currentImages.map((image, index) => (
          <Image key={index} src={image} alt="Company Image" width={150} height={150} className="rounded" />
        ))}
      </div>
    </div>
  );
};

export default CompanyImages;
