import { Input } from "../ui/input";
import { Switch } from "@/components/ui/switch";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Plus } from "lucide-react";
import { useFieldArray } from "react-hook-form";

type EducationDetailsProps = {
  control: any;
  onClick: any;
  Open1: boolean;
};

export const EducationDetails = ({ control, onClick, Open1 }: EducationDetailsProps) => {
  const { fields, append } = useFieldArray({
    control,
    name: "education",
  });

  const addNewEducation = () => {
    append({ school: "", degree: "", cgpa: "", year: "" });
  };

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between">
        <FormLabel className="mt-6 text-md md:text-xl font-bold dark:text-white">Education</FormLabel>
        <Switch className="mt-8 mb-1" onClick={onClick} />
      </div>
      <hr />
      {Open1 && (
        <div>
          {fields.map((education, index) => (
            <div key={education.id} className="mb-2">
              <div className="grid grid-cols-2 items-center space-x-4 justify-center">
                <FormField
                  control={control}
                  name={`education[${index}].school`}
                  render={({ field }) => (
                    <FormItem className="mt-6">
                      <FormControl>
                        <Input
                          placeholder="School Name"
                          {...field}
                          className="shadow-sm focus-visible:ring-1 focus-visible:ring-blue-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`education[${index}].degree`}
                  render={({ field }) => (
                    <FormItem className="mt-6">
                      <FormControl>
                        <Input
                          placeholder="Degree"
                          {...field}
                          className="shadow-sm focus-visible:ring-1 focus-visible:ring-blue-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 items-center space-x-4 justify-center"><FormField
                control={control}
                name={`education[${index}].cgpa`}
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <FormControl>
                      <Input
                        placeholder="CGPA / Percentage"
                        {...field}
                        className="shadow-sm focus-visible:ring-1 focus-visible:ring-blue-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`education[${index}].year`}
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <FormControl>
                      <Input
                        placeholder="Year"
                        {...field}
                        className="shadow-sm focus-visible:ring-1 focus-visible:ring-blue-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /></div>
              
            </div>
          ))}
          <div
            className="text-sm underline text-teal-700 font-bold mt-3 flex items-center cursor-pointer"
            onClick={addNewEducation}
          >
            <Plus className="size-4" />
            Add Education
          </div>
        </div>
      )}
    </div>
  );
};
