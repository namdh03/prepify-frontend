import Spinner from "~components/common/Spinner";
import { Button } from "~components/ui/button";
import { Form } from "~components/ui/form";
import useDocumentTitle from "~hooks/useDocumentTitle";
import useIngredient from "~hooks/useIngredient";
import { LayoutBody } from "~layouts/AdminLayout/components/Layout";
import FormItems from "~pages/CreateIngredient/components/FormItems";

const UpdateIngredient = () => {
  useDocumentTitle("Prepify | Cập nhật nguyên liệu");
  const { form, onSubmit, isLoading } = useIngredient();
  return (
    <LayoutBody>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center">
          <h2 className="text-2xl font-bold text-primary mb-8">Thông tin nguyên liệu</h2>
          <div>
            <FormItems />
          </div>
          <Button type="submit" className="mt-4">
            {isLoading ? <Spinner /> : "Chỉnh sửa nguyên liệu"}
          </Button>
        </form>
      </Form>
    </LayoutBody>
  );
};

export default UpdateIngredient;
