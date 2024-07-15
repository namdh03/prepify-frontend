import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "~components/ui/form";
import { Input } from "~components/ui/input";
import useRecipe from "~hooks/useRecipe";

const InputVideoURL = () => {
  const { form } = useRecipe();

  return (
    <FormField
      control={form.control}
      key="videoUrl"
      name="videoUrl"
      render={({ field }) => (
        <FormItem className="flex flex-col w-full my-8">
          <FormLabel>Video hướng dẫn</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="Đường dẫn video"
              className="h-10 bg-white"
              {...field}
              value={field.value}
              onChange={field.onChange}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputVideoURL;
