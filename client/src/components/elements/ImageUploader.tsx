import { Input } from "../ui/input";
import { FormField, FormLabel } from "../ui/form";


export const ImageUploader = ({control,handleImageChange}) => {
  return (
    <div className="mb-4">
    <FormLabel className="text-md md:text-xl font-bold dark:text-white">Upload Profile Picture</FormLabel>
    <hr />
    <FormField
      name="profilePicture"
      control={control}
      render={({ field }) => (
        <>
          <Input
            {...field}
            type="file"
            accept="image/*"
            onChange={(e) => {
              field.onChange(e); 
              handleImageChange(e); 
            }}
            className="mt-1 block w-full text-sm text-gray-500"
          />
        </>
      )}
     
    />
  </div>

  )
}
