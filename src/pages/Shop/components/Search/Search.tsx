import { memo } from "react";
import { FiSearch } from "react-icons/fi";

import { Button } from "~components/ui/button";
import { FormControl, FormField, FormItem } from "~components/ui/form";
import { Input } from "~components/ui/input";
import useShop from "~hooks/useShop";
import { PAGE } from "~utils/constants";

const Search = memo(() => {
  const { form } = useShop();

  const handleResetPage = () => {
    if (form.getValues("keyword")) {
      form.setValue("page", PAGE);
    }
  };

  return (
    <div className="flex gap-4 mx-36">
      <FormField
        control={form.control}
        name="keyword"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormControl>
              <Input
                autoComplete="off"
                placeholder="Tìm kiếm"
                className="h-10 text-base font-normal leading-6 placeholder:text-[#94A3B8]"
                onKeyDown={(e) => e.key === "Enter" && handleResetPage}
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <Button size={"icon"} className="min-w-10 h-10" onClick={handleResetPage}>
        <FiSearch size={16} />
      </Button>
    </div>
  );
});

export default Search;
