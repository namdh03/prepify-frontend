import { memo } from "react";
import { Link } from "react-router-dom";

import { CellContext } from "@tanstack/react-table";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~components/ui/select";
import configs from "~configs";
import { CartItem } from "~types/cart.type";

const IngredientPackage = memo(({ table, row }: CellContext<CartItem, unknown>) => {
  const cartItem = row.original;
  const mealKitExisted = table.options.data.map((item) => {
    if (item.recipe.id === cartItem.recipe.id && item.mealKitSelected.id !== cartItem.mealKitSelected.id) {
      return item.mealKitSelected.id;
    }
  });

  const handleValueChange = (serving: string) => {
    console.log(`CALL API TO UPDATE FOR CART ITEM ${cartItem.id} TO ${serving} WITH ${cartItem.quantity}`);
    table.options.meta?.updateCartItem({
      ...row.original,
      mealKitSelected: cartItem.mealKits.find((mealKit) => mealKit.id === serving) || cartItem.mealKitSelected,
    });
  };

  return (
    <div className="flex items-center">
      <Link to={`${configs.routes.shop}/${cartItem.recipe.slug}`} className="flex items-center gap-[10px]">
        <img src={cartItem.image} alt="" className="w-20 h-20 rounded-[5px] object-contain" />
        <h4 className="w-44 text-sm font-normal leading-5 line-clamp-3 break-keep">{cartItem.recipe.name}</h4>
      </Link>

      <Select value={cartItem.mealKitSelected.id} onValueChange={(value) => handleValueChange(value)}>
        <SelectTrigger className="w-[150px] ml-auto mr-auto">
          <SelectValue placeholder="Khẩu phần ăn" />
        </SelectTrigger>
        <SelectContent>
          {cartItem.mealKits.map((mealKit) => (
            <SelectItem key={mealKit.id} value={mealKit.id} disabled={mealKitExisted.includes(mealKit.id)}>
              {mealKit.serving} người ăn
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
});

export default IngredientPackage;
