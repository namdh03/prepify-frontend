import { Button } from "~components/ui/button";
import { Form } from "~components/ui/form";
import useRecipe from "~hooks/useRecipe";

import CategoriesFields from "./components/CategoriesFields";
import InputIngredients from "./components/InputIngredients";
import InputName from "./components/InputName";
import InputNutrition from "./components/InputNutrition";
import InputTextEditor from "./components/InputTextEditor";
import InputVideoURL from "./components/InputVideoURL";
import Upload from "./components/Upload";

const CreateRecipe = () => {
  const { form, onSubmit } = useRecipe();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center">
        <div className="flex flex-row justify-between gap-24">
          <div>
            <h2 className="text-2xl font-bold text-primary">Thông tin thực đơn</h2>
            <InputName />
            <div className="grid grid-cols-[repeat(2,_1fr)] gap-x-4 gap-y-7">
              <CategoriesFields />
            </div>
            <InputVideoURL />
            <Upload />
            <InputTextEditor />
          </div>
          <div>
            <div className="mb-20">
              <h2 className="text-2xl font-bold text-primary">Nguyên liệu</h2>
              <InputIngredients />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-primary">Thông tin dinh dưỡng</h2>
              <InputNutrition />
            </div>
          </div>
        </div>
        <Button type="submit" className="mt-4">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default CreateRecipe;
