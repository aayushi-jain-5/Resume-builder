import { Plus } from "lucide-react";
import { Input } from "../ui/input";
import { useFieldArray } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

type ProjectDetailsProps = {
  control: any;
};

export const ProjectDetails = ({ control }: ProjectDetailsProps) => {
  const { fields, append, update } = useFieldArray({
    control,
    name: "projects",
  });

  const addDescription = (index: number) => {
    const updatedProjects = [...fields];
    console.log(updatedProjects, "updatedProjects");
    // updatedProjects[index] = {
    //   ...updatedProjects[index],
    //   description: [...(updatedProjects[index].description || []), ""],
    // };
    // update(index, updatedProjects[index]);
  };

  return (
    <div>
      <div className="mt-6">
        <FormLabel className="text-md md:text-xl font-bold dark:text-white">Projects</FormLabel>
        <hr />
      </div>

      {fields.map((project, index) => (
        <div key={project.id} className="mb-2">
          <div className="grid grid-cols-2 items-center space-x-2">
            <FormField
              control={control}
              name={`projects[${index}].project`}
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FormControl>
                    <Input
                      placeholder="Add Projects"
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
              name={`projects[${index}].link`}
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FormControl>
                    <Input
                      placeholder="Add Link..."
                      {...field}
                      className="shadow-sm focus-visible:ring-1 focus-visible:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={control}
            name={`projects[${index}].techStack`}
            render={({ field }) => (
              <FormItem className="mt-2 w-96">
                <FormControl>
                  <Input
                    placeholder="Tech Stack"
                    {...field}
                    className="shadow-sm focus-visible:ring-1 focus-visible:ring-blue-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center gap-x-1">
            {project.description.map((_: any, descIndex: number) => (
              <FormField
                control={control}
                name={`projects[${index}].description[${descIndex}]`}
                render={({ field }) => (
                  <FormItem className={`mt-2 w-full`}>
                    <FormControl className="flex flex-row">
                      <Input
                        placeholder="Description"
                        {...field}
                        className={`shadow-sm focus-visible:ring-1 focus-visible:ring-blue-500`}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            ))}

            <div
              className="p-2 bg-teal-500 rounded-md text-white mt-2 cursor-pointer"
              onClick={() => addDescription(index)}
            >
              <Plus className="size-4" />
            </div>
          </div>
        </div>
      ))}

      <div
        className="text-sm underline text-teal-700 font-bold mt-3 flex items-center cursor-pointer"
        onClick={() => append({ project: "", techStack: "", link: "", description: [""] })}
      >
        <Plus className="size-4" />
        Add New Project
      </div>
    </div>
  );
};
