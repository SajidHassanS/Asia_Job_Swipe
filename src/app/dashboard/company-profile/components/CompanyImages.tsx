"use client";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { addOrUpdateCompanyImages, deleteCompanyImage, fetchCompanyProfile } from '@/store/slices/companyProfileSlice/companyProfileSlice';
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
  const [imageToDelete, setImageToDelete] = useState<number | null>(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setCurrentImages(companyImages);
  }, [companyImages]);

  const handleSave = async () => {
    if (typeof window !== "undefined") {
      const storedCompanyId = localStorage.getItem("_id");
      const storedAccessToken = localStorage.getItem("accessToken");

      if (storedCompanyId && storedAccessToken) {
        const files = currentImages.map((image, index) => {
          if (image.startsWith('data:')) {
            try {
              return dataURLtoFile(image, `image_${index}.jpg`);
            } catch (error) {
              console.error(error);
              return null;
            }
          } else {
            return null;
          }
        }).filter(file => file !== null) as File[];

        if (files.length > 0) {
          await dispatch(addOrUpdateCompanyImages({
            companyId: storedCompanyId,
            images: files,
            token: storedAccessToken
          })).unwrap();
        }

        setIsEditing(false);
      }
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

  const confirmRemoveImage = (index: number) => {
    setImageToDelete(index);
    setIsConfirmDialogOpen(true);
  };

  const removeImage = async () => {
    if (typeof window !== "undefined") {
      const storedCompanyId = localStorage.getItem("_id");
      const storedAccessToken = localStorage.getItem("accessToken");

      if (storedAccessToken && imageToDelete !== null) {
        const imageUrl = currentImages[imageToDelete];
        const filename = imageUrl.split('&')[1]; // Extract filename after the ampersand (&)

        if (!filename) {
          console.error("Invalid filename.");
          return;
        }

        console.log("Deleting filename: ", filename);

        try {
          await dispatch(deleteCompanyImage({
            filename,
            token: storedAccessToken
          })).unwrap();

          const updatedImages = currentImages.filter((_, i) => i !== imageToDelete);
          setCurrentImages(updatedImages);

          await onUpdate({ companyImages: updatedImages });  // Update the images in the backend

          // Refresh the profile to get the latest images from the backend
          if (storedCompanyId) {
            await dispatch(fetchCompanyProfile(storedCompanyId));
          }

          setIsConfirmDialogOpen(false);
          setImageToDelete(null);
        } catch (error) {
          console.error("Failed to delete the image: ", error);
        }
      }
    }
  };

  const dataURLtoFile = (dataurl: string, filename: string): File => {
    let arr = dataurl.split(',');
    if (arr.length !== 2) {
      throw new Error("Invalid data URL format");
    }

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

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    setIsImageDialogOpen(true);
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
                  <div key={index} className="relative" onClick={() => handleImageClick(image)}>
                    <Image src={image} alt="Company Image" width={150} height={150} className="rounded cursor-pointer" />
                    <Button
                      className="absolute top-0 right-0 p-1 bg-signature rounded-full text-red-600 font-bold"
                      onClick={(e) => { e.stopPropagation(); confirmRemoveImage(index); }}
                    >
                      ✕
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
          <div key={index} className="relative" onClick={() => handleImageClick(image)}>
            <Image src={image} alt="Company Image" width={150} height={150} className="rounded cursor-pointer" />
            <Button
              className="absolute top-0 right-0 p-1 bg-signature rounded-full text-red-600 font-bold"
              onClick={(e) => { e.stopPropagation(); confirmRemoveImage(index); }}
            >
              ✕
            </Button>
          </div>
        ))}
      </div>
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this image?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfirmDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={removeImage}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>View Image</DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <div className="flex justify-center">
              <Image src={selectedImage} alt="Selected Company Image" width={500} height={500} className="rounded" />
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsImageDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CompanyImages;
