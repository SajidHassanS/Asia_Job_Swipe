import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { useRouter } from "next/navigation";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Image from "next/image";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { updateCompanyProfile, addOrUpdateCompanyLogo, addOrUpdateCompanyImages } from "@/store/slices/companyProfileSlice/companyProfileSlice";

const MultiStepForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([false, false, false]);
  const [formData, setFormData] = useState({
    companyName: "",
    companySize: "",
    foundedYear: "",
    companyDescription: "",
    websiteUrl: "",
    contactNumber: "",
    email: "",
    country: "",
    province: "",
    city: "",
    address: "",
    mediaUrl: "",
    sector: "",
    services: "",
    languages: "",
    companyLogo: null as File | null,
    companyImages: [] as File[],
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const companyId = typeof window !== "undefined" ? localStorage.getItem("_id") : null;

  const nextStep = () => {
    if (validateStep()) {
      const newCompletedSteps = [...completedSteps];
      newCompletedSteps[step - 1] = true;
      setCompletedSteps(newCompletedSteps);
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const submitForm = async () => {
    if (!token || !companyId) return;

    try {
      // Update company profile details
      await dispatch(updateCompanyProfile({
        id: companyId,
        updates: {
          companyName: formData.companyName,
          numberOfEmployees: formData.companySize.toString(), // Convert to string
          foundedYear: formData.foundedYear.toString(), // Convert to string
          sector: formData.sector,
          services: formData.services.split(',').map(service => service.trim()),
          description: formData.companyDescription,
          website: formData.websiteUrl,
          email: formData.email,
          country: formData.country,
          province: formData.province,
          city: formData.city,
          address: formData.address,
          languages: formData.languages.split(',').map(language => language.trim()),
        },
        token: token
      })).unwrap();

      
      // Update company logo
      if (formData.companyLogo) {
        const logoFormData = new FormData();
        logoFormData.append('companyLogo', formData.companyLogo);
        await dispatch(addOrUpdateCompanyLogo({
          companyId: companyId,
          logo: logoFormData,
          token: token
        })).unwrap();
      }

      // Update company images
      if (formData.companyImages.length > 0) {
        await dispatch(addOrUpdateCompanyImages({
          companyId: companyId,
          images: formData.companyImages,
          token: token
        })).unwrap();
      }

      router.push("/dashboard");
    } catch (error: any) {
      if (error.errors) {
        const errorObject: { [key: string]: string } = {};
        error.errors.forEach((err: any) => {
          errorObject[err.path] = err.message;
        });
        setErrors(errorObject);
      } else {
        console.error(error);
      }
    }
  };

  const validateStep = () => {
    const newErrors: { [key: string]: string } = {};
    
    switch (step) {
      case 1:
        if (!formData.companyName) newErrors.companyName = "Company name cannot be empty";
        if (!formData.companySize) {
          newErrors.companySize = "Company size cannot be empty";
        } else if (isNaN(parseInt(formData.companySize, 10))) {
          newErrors.companySize = "Company size must be a number";
        }
        if (!formData.foundedYear) {
          newErrors.foundedYear = "Founded year cannot be empty";
        } else if (isNaN(parseInt(formData.foundedYear, 10))) {
          newErrors.foundedYear = "Founded year must be a number";
        }
        if (!formData.companyDescription) newErrors.companyDescription = "Company description cannot be empty";
        if (!formData.sector) newErrors.sector = "Sector cannot be empty";
        if (!formData.services) newErrors.services = "Services cannot be empty";
        if (!formData.languages) newErrors.languages = "Languages cannot be empty";
        break;
      case 2:
        if (!formData.websiteUrl) {
          newErrors.websiteUrl = "Website URL cannot be empty";
        } else {
          const urlPattern = new RegExp(
            '^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i' // fragment locator
          );
          if (!urlPattern.test(formData.websiteUrl)) {
            newErrors.websiteUrl = "Website should be a valid URL";
          }
        }
        if (!formData.contactNumber) {
          newErrors.contactNumber = "Contact number cannot be empty";
        } else if (isNaN(parseInt(formData.contactNumber, 10))) {
          newErrors.contactNumber = "Contact number must be a number";
        }
        if (!formData.email) newErrors.email = "Email cannot be empty";
        if (!formData.country) newErrors.country = "Country cannot be empty";
        if (!formData.province) newErrors.province = "Province cannot be empty";
        if (!formData.city) newErrors.city = "City cannot be empty";
        if (!formData.address) newErrors.address = "Address cannot be empty";
        break;
      case 3:
        if (!formData.mediaUrl) newErrors.mediaUrl = "Media URL cannot be empty";
        break;
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <>
      <div className="relative">
        <div className="absolute right-0 bottom-0">
          <Image src="/images/tree.png" alt="logo" width={200} height={200} />
        </div>

        <div className="max-w-6xl mx-auto p-4">
          <div className="flex justify-between border mb-8">
            <div
              className={`flex-1 flex justify-center items-center gap-2 py-2 ${
                step >= 1 ? "text-signature" : "text-gray-400"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full ${
                  step > 1 || completedSteps[0]
                    ? "bg-signature"
                    : "bg-secondary text-custom-gray-blue"
                }`}
              >
                {completedSteps[0] ? (
                  <FaCheck className="w-5 h-5 mx-auto mt-3 text-background" />
                ) : (
                  <img
                    src="/images/companydetails.svg"
                    alt="Step 1"
                    className="w-7 h-7 mx-auto mt-3"
                  />
                )}
              </div>
              <div className="mt-2">
                <h1>1/3</h1>
                <h1>Company Details</h1>
              </div>
            </div>
            <div
              className={`flex-1 flex justify-center items-center gap-2 py-2 ${
                step >= 2 ? "text-signature" : "text-gray-400"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full ${
                  step > 2 || completedSteps[1]
                    ? "bg-signature"
                    : "bg-secondary text-custom-gray-blue"
                }`}
              >
                {completedSteps[1] ? (
                  <FaCheck className="w-5 h-5 mx-auto mt-3 text-background" />
                ) : (
                  <img
                    src="/images/phone.svg"
                    alt="Step 2"
                    className="w-7 h-7 mx-auto mt-3"
                  />
                )}
              </div>
              <div className="mt-2">
                <h1 className="text-sm">2/3</h1>
                <h1>Contact Details</h1>
              </div>
            </div>
            <div
              className={`flex-1 flex justify-center items-center gap-2 py-2 ${
                step >= 3 ? "text-signature" : "text-gray-400"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full ${
                  step === 3 || completedSteps[2]
                    ? "bg-signature"
                    : "bg-secondary text-custom-gray-blue"
                }`}
              >
                {completedSteps[2] ? (
                  <FaCheck className="w-5 h-5 mx-auto mt-3 text-background" />
                ) : (
                  <img
                    src="/images/notes.svg"
                    alt="Step 3"
                    className="w-7 h-7 mx-auto mt-3"
                  />
                )}
              </div>
              <div className="mt-2">
                <h1>3/3</h1>
                <h1>Company Media</h1>
              </div>
            </div>
          </div>
          {step === 1 && (
            <Step1
              formData={formData}
              setFormData={setFormData}
              nextStep={nextStep}
              errors={errors}
            />
          )}
          {step === 2 && (
            <Step2
              formData={formData}
              setFormData={setFormData}
              nextStep={nextStep}
              prevStep={prevStep}
              errors={errors}
            />
          )}
          {step === 3 && (
            <Step3
              formData={formData}
              setFormData={setFormData}
              prevStep={prevStep}
              submitForm={submitForm}
              errors={errors}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default MultiStepForm;
