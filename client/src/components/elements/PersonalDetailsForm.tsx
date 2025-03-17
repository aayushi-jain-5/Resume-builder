
import { FormComponent } from "./FormComponent";
import { ImageUploader } from "./ImageUploader";

type PersonalDetailsFormProps={
  control:any;
  setImagePreview?:any;
  value?: number;
}

export const PersonalDetailsForm = ({control,setImagePreview,value}:PersonalDetailsFormProps) => {


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl); 
    }
  };
  return (
    <div className="border border-gray-100 rounded-md p-6 mb-4 bg-white">
      {
        value==4 &&  <ImageUploader control={control} handleImageChange={handleImageChange}  />
      }
     
      <FormComponent label="Personal Details" name="personalDetails.name" control={control} placeholder={"Your Name"} />
      <FormComponent name="personalDetails.summary" control={control} placeholder={"Your Summary  (optional)"} />

      <FormComponent name="personalDetails.workProfile" control={control} placeholder={"Work Profile  (optional)"} />

      <FormComponent name="personalDetails.address" control={control} placeholder={"Address  (optional)"} />

      <FormComponent name="personalDetails.phone" control={control} placeholder={"Phone number"} />

      <FormComponent name="personalDetails.email" control={control} placeholder={"Email id"} />
    </div>
  );
};

