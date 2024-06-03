import { memo } from "react";
import { ControllerRenderProps } from "react-hook-form";

import { Button } from "~components/ui/button";
import { FormControl, FormField, FormItem } from "~components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~components/ui/select";
import { ShopFormType } from "~contexts/shop/shop.type";
import useShop from "~hooks/useShop";
import { OrderByEnum, SortEnum } from "~utils/constants";

const OrderSort = memo(() => {
  const { form, onSubmit } = useShop();

  const sortWatch = form.watch("sort");

  const handleSortChange = (sort: SortEnum) => form.setValue("sort", sort);

  const handleSelectChange = (field: ControllerRenderProps<ShopFormType, "orderBy">, value: string) => {
    field.onChange(value);
    form.handleSubmit(onSubmit)();
  };

  return (
    <div className="flex justify-end gap-6 mt-10">
      <Button
        type="submit"
        variant={sortWatch === SortEnum.POPULAR ? "default" : "outline"}
        onClick={() => handleSortChange(SortEnum.POPULAR)}
      >
        Phổ biến
      </Button>
      <Button
        type="submit"
        variant={sortWatch === SortEnum.NEWEST ? "default" : "outline"}
        onClick={() => handleSortChange(SortEnum.NEWEST)}
      >
        Mới nhất
      </Button>

      <FormField
        control={form.control}
        name="orderBy"
        render={({ field }) => (
          <FormItem>
            <Select onValueChange={(value) => handleSelectChange(field, value)} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sắp xếp theo giá" />
                </SelectTrigger>
              </FormControl>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Giá tiền</SelectLabel>
                  <SelectItem value={OrderByEnum.ASC}>Từ thấp đến cao</SelectItem>
                  <SelectItem value={OrderByEnum.DESC}>Từ cao đên thấp</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
    </div>
  );
});

export default OrderSort;
