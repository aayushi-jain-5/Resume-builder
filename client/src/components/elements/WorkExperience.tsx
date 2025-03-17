import { Input } from "../ui/input";
import { Plus } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useFieldArray } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

type WorkExperienceProps = {
  control: any;
  onClick: any;
  Open2: boolean;
};

export const WorkExperience = ({ control, onClick, Open2 }: WorkExperienceProps) => {
  const { fields, append } = useFieldArray({
    control,
    name: "workExperience",
  });

  const addNewexperience = () => {
    append({ companyName: "", startDate: "", endDate: "", designation: "",link:"" });
  };
  return (
    <div className="mt-5">
      <div className="flex items-center justify-between">
        <FormLabel className="text-md md:text-xl font-bold dark:text-white text-black">Work Experience</FormLabel>
        <Switch className="mt-4 mb-1" onClick={onClick} />
      </div>

      <hr />
      {Open2 && (
        <div>
          {fields.map((experience, index) => (
            <div key={experience.id} className="mb-2">
              <div className="grid grid-cols-2 items-center space-x-4 justify-center">
              <FormField
                  control={control}
                  name={`workExperience[${index}].link`}
                  render={({ field }) => (
                    <FormItem className={`mt-6`}>
                      <FormControl>
                        <span className="flex items-center gap-1">
                          <Input
                            placeholder="Add Link"
                            {...field}
                            className={`shadow-sm focus-visible:ring-1 focus-visible:ring-blue-500`}
                          />
                        </span>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`workExperience[${index}].companyName`}
                  render={({ field }) => (
                    <FormItem className={`mt-6`}>
                      <FormControl>
                        <span className="flex items-center gap-1">
                          <Input
                            placeholder="Company Name"
                            {...field}
                            className={`shadow-sm focus-visible:ring-1 focus-visible:ring-blue-500`}
                          />
                        </span>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 items-center space-x-4 justify-center">
                <FormField
                  control={control}
                  name={`workExperience[${index}].startDate`}
                  render={({ field }) => (
                    <FormItem className={`mt-2`}>
                      <FormControl>
                        <span className="flex items-center gap-1">
                          <Input
                            placeholder="Start Date"
                            {...field}
                            className={`shadow-sm focus-visible:ring-1 focus-visible:ring-blue-500`}
                          />
                        </span>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`workExperience[${index}].endDate`}
                  render={({ field }) => (
                    <FormItem className={`mt-2`}>
                      <FormControl>
                        <span className="flex items-center gap-1">
                          <Input
                            placeholder="End Date"
                            {...field}
                            className={`shadow-sm focus-visible:ring-1 focus-visible:ring-blue-500`}
                          />
                        </span>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                  control={control}
                  name={`workExperience[${index}].designation`}
                  render={({ field }) => (
                    <FormItem className={`mt-2`}>
                      <FormControl>
                        <span className="flex items-center gap-1">
                          <Input
                            placeholder="Designation"
                            {...field}
                            className={`shadow-sm focus-visible:ring-1 focus-visible:ring-blue-500`}
                          />
                        </span>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
          ))}
          <div
            className="text-sm underline text-teal-700 font-bold mt-3 flex items-center cursor-pointer"
            onClick={addNewexperience}
          >
            <Plus className="size-4" />
            Add Experience
          </div>
        </div>
      )}
    </div>
  );
};
