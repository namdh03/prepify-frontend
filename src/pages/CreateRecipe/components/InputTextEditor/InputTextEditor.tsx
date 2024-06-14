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
        <FormItem>
          <FormLabel>Các bước nấu</FormLabel>
          <FormControl>
            <RichTextEditor {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputTextEditor;
