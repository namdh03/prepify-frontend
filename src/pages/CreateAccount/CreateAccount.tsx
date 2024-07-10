import Spinner from "~components/common/Spinner";
import { Button } from "~components/ui/button";
import { Form } from "~components/ui/form";
import useAccount from "~hooks/useAccount";
import { LayoutBody } from "~layouts/AdminLayout/components/Layout";

import FormItems from "./components/Form/Form";
import Upload from "./components/Upload";

const CreateAccount = () => {
  const { form, onSubmit, isLoading } = useAccount();

  return (
    <LayoutBody>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold text-primary mb-8">Thông tin tài khoản</h2>
            <div className="mb-8">
              <Upload />
            </div>
            <div>
              <FormItems />
            </div>

            <Button type="submit" className="mt-4">
              {isLoading ? <Spinner /> : "Tạo tài khoản"}
            </Button>
          </div>
        </form>
      </Form>
    </LayoutBody>
  );
};

export default CreateAccount;
