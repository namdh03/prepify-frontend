import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "~components/ui/form";
import { Input } from "~components/ui/input";
import useRecipe from "~hooks/useRecipe";

const InputName = () => {
  const { form } = useRecipe();

  return (
    <FormField
      control={form.control}
      key="name"
      name="name"
      render={({ field }) => (
        <FormItem className="flex flex-col w-full my-8">
          <FormLabel>Tên món ăn</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Tên món ăn" className="h-10 bg-white" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputName;
