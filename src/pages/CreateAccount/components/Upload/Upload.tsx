import { LuUser2 } from "react-icons/lu";

import { Avatar, AvatarFallback, AvatarImage } from "~components/ui/avatar";
import { Button } from "~components/ui/button";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~components/ui/form";
import { Input } from "~components/ui/input";
import useAccount from "~hooks/useAccount";
import getImageData from "~utils/getImageData";

export default function Upload() {
  const { form, preview, setPreview } = useAccount();

  return (
    <div className="flex flex-col items-center gap-y-3">
      <Avatar className="w-24 h-24">
        <AvatarImage src={preview} className="object-cover" />
        <AvatarFallback className="text-2xl">
          <LuUser2 size={50} className="text-gray-600" />
        </AvatarFallback>
      </Avatar>
      <FormField
        control={form.control}
        name="image"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormMessage />
            <Button type="button" size={"sm"} className="w-full p-0">
              <FormLabel className="flex items-center justify-center px-6 w-full text-white">
                Cập nhật ảnh đại diện
              </FormLabel>
            </Button>
            <FormControl>
              <Input
                type="file"
                {...field}
                value={undefined}
                onChange={(event) => {
                  const { files, displayUrl } = getImageData(event);
                  setPreview(displayUrl);
                  field.onChange(files[0]);
                }}
                className="hidden"
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormItem>
        <FormDescription className="text-xs">Dung lượng file tối đa 1 MB</FormDescription>
        <FormDescription className="text-xs">Định dạng:.JPEG, .PNG</FormDescription>
      </FormItem>
    </div>
  );
}
