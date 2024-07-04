import { Button } from "~components/ui/button";
import { Form } from "~components/ui/form";
import useMealKit from "~hooks/useMealKit";
import { LayoutBody } from "~layouts/AdminLayout/components/Layout";

// import FormItems from "./components/FormItems";

const CreateMealKit = () => {
  const { form, onSubmit } = useMealKit();

  return (
    <LayoutBody>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center">
          <h2 className="text-2xl font-bold text-primary mb-8">Thông tin thực đơn</h2>
          <div>{/* <FormItems /> */}</div>
          <Button type="submit" className="mt-4">
            Tạo công thức
          </Button>
        </form>
      </Form>
    </LayoutBody>
  );
};

export default CreateMealKit;
