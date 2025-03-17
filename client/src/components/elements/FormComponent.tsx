import { Input } from "../ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

type FormComponentProps = {
  label?: string;
  name: string;
  placeholder: string;
  className?: string;
  control: any;
};

export const FormComponent = ({ className, label, name, placeholder, control }: FormComponentProps) => {
  return (
    <div className={className}>
      <FormLabel className=" text-md md:text-xl font-bold dark:text-white">{label}</FormLabel>
      {label && <hr />}
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                placeholder={placeholder}
                {...field}
                className={`mt-5 shadow-sm focus-visible:ring-1 focus-visible:ring-blue-500`}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
