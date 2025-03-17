import { Input } from "../ui/input";
import { Switch } from "@/components/ui/switch";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Plus } from "lucide-react";
import { useFieldArray } from "react-hook-form";
import { Textarea } from "../ui/textarea";

type AwardsAchievementsProps = {
  control: any;
  onClick: any;
  Open: boolean;
};
export const AwardsAchievements = ({ control, onClick, Open }: AwardsAchievementsProps) => {
  const { fields, append } = useFieldArray({
    control,
    name: "awardsAchievements",
  });

  const addNewAwards = () => {
    append({ title: "", description: "" });
  };
  return (
    <div className="mt-2">
      <div className="flex items-center justify-between">
        <FormLabel className="mt-6 text-md md:text-xl font-bold dark:text-white">Awards and Achievements</FormLabel>
        <Switch className="mt-8 mb-1" onClick={onClick} />
      </div>
      <hr />
      {Open && (
        <div>
          {fields.map((awardsAchievements, index) => (
            <div key={awardsAchievements.id} className="mb-2">
              <FormField
                control={control}
                name={`awardsAchievements[${index}].title`}
                render={({ field }) => (
                  <FormItem className={`w-full`}>
                    <FormControl>
                      <div>
                        <Input
                          placeholder="Awards and Achievements"
                          {...field}
                          disabled={Open ? false : true}
                          className="mt-5 shadow-sm focus-visible:ring-1 focus-visible:ring-blue-500"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`awardsAchievements[${index}].descriptions`}
                render={({ field }) => (
                  <FormItem className={`w-full`}>
                    <FormControl>
                      <div>
                        <Textarea
                          placeholder="Description"
                          {...field}
                          disabled={Open ? false : true}
                          className="mt-2 shadow-sm focus-visible:ring-1 focus-visible:ring-blue-500"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}

          <div
            className="text-sm underline text-teal-700 font-bold mt-3 flex items-center cursor-pointer"
            onClick={addNewAwards}
          >
            <Plus className="size-4" />
            Add Achievements
          </div>
        </div>
      )}
    </div>
  );
};
