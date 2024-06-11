import { memo } from "react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~components/ui/select";
import { MealKitItem } from "~types/cart.type";

interface SelectProps {
  id: string;
  selectedId: string;
  quantity: number;
  mealKits: MealKitItem[];
  mealKitExisted: (string | undefined)[];
}

const Servings = memo(({ id, selectedId, quantity, mealKits, mealKitExisted }: SelectProps) => {
  const handleValueChange = (serving: string) => {
    console.log(`CALL API TO UPDATE FOR CART ITEM ${id} TO ${serving} WITH ${quantity}`);
  };

  return (
    <Select defaultValue={selectedId} onValueChange={(value) => handleValueChange(value)}>
      <SelectTrigger className="w-[150px] ml-auto mr-auto">
        <SelectValue placeholder="Khẩu phần ăn" />
      </SelectTrigger>
      <SelectContent>
        {mealKits.map((mealKit) => (
          <SelectItem key={mealKit.id} value={mealKit.id} disabled={mealKitExisted.includes(mealKit.id)}>
            {mealKit.serving} người ăn
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
});

export default Servings;
