import RichTextEditor from "~components/common/RichTextEditor";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "~components/ui/form";
import useRecipe from "~hooks/useRecipe";

const InputTextEditor = () => {
  const { form } = useRecipe();

  return (
    <FormField
      control={form.control}
      name="steps"
      render={({ field }) => (
        <FormItem className="w-[440px]">
          <FormLabel>Các bước nấu</FormLabel>
          <FormControl>
            <RichTextEditor {...field} value={field.value} onChange={field.onChange} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputTextEditor;
