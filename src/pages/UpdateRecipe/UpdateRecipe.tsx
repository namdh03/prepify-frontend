import Spinner from "~components/common/Spinner";
import { Button } from "~components/ui/button";
import { Form } from "~components/ui/form";
import useRecipe from "~hooks/useRecipe";
import { LayoutBody } from "~layouts/AdminLayout/components/Layout";
import CategoriesFields from "~pages/CreateRecipe/components/CategoriesFields";
import InputIngredients from "~pages/CreateRecipe/components/InputIngredients";
import InputMealKit from "~pages/CreateRecipe/components/InputMealKit/InputMealKit";
import InputName from "~pages/CreateRecipe/components/InputName";
import InputNutrition from "~pages/CreateRecipe/components/InputNutrition";
import InputTextEditor from "~pages/CreateRecipe/components/InputTextEditor";
import InputVideoURL from "~pages/CreateRecipe/components/InputVideoURL";
import Upload from "~pages/CreateRecipe/components/Upload";

const UpdateRecipe = () => {
  const { form, onSubmit, isLoading } = useRecipe();

  return (
    <LayoutBody>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center">
          <div className="flex flex-row justify-between gap-24">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-primary">Thông tin thực đơn</h2>
              <InputName />
              <div className="grid grid-cols-[repeat(2,_1fr)] gap-x-4 gap-y-7">
                <CategoriesFields />
              </div>
              <InputVideoURL />
              <Upload />
              <InputTextEditor />
            </div>
            <div className="flex-1">
              <div className="mb-14">
                <h2 className="text-2xl font-bold text-primary">Nguyên liệu</h2>
                <InputIngredients />
              </div>
              <div className="mb-14">
                <h2 className="text-2xl font-bold text-primary">Thông tin dinh dưỡng</h2>
                <InputNutrition />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-primary">Thông tin gói nguyên liệu</h2>
                <InputMealKit />
              </div>
            </div>
          </div>
          <Button
            type="submit"
            className="mt-4"
            onClick={() => {
              console.log(form.formState.errors);
            }}
          >
            {isLoading ? <Spinner /> : "Update công thức"}
          </Button>
        </form>
      </Form>
    </LayoutBody>
  );
};

export default UpdateRecipe;
