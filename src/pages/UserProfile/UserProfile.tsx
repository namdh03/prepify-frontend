import { Separator } from "~components/ui/separator";

import Form from "./components/Form";
import Upload from "./components/Upload";

const UserProfile = () => {
  return (
    <div className="flex gap-24">
      <div className="max-w-2xl space-y-6">
        <div>
          <h3 className="text-lg font-medium">Hồ sơ của tôi</h3>
          <p className="text-sm text-muted-foreground">Quản lý thông tin hồ sơ</p>
        </div>
        <Separator className="my-4" />

        <Form />
      </div>

      <Upload />
    </div>
  );
};

export default UserProfile;
