import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { LuShoppingCart } from "react-icons/lu";
import { toast } from "react-toastify";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { addToCart } from "~apis/cart.api";
import InputPositiveNumber from "~components/common/InputPositiveNumber";
import Ratings from "~components/common/Ratings";
import { Button } from "~components/ui/button";
import { Checkbox } from "~components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel } from "~components/ui/form";
import { Separator } from "~components/ui/separator";
import { recipeDetailDefaultValues, recipeDetailSchema } from "~contexts/recipe-detail/recipe-detail.schema";
import { RecipeDetailFormType } from "~contexts/recipe-detail/recipe-detail.type";
import useRecipeDetail from "~hooks/useRecipeDetail";
import { cn } from "~lib/utils";
import { AddToCartBody } from "~types/cart.type";
import { SYSTEM_MESSAGES } from "~utils/constants";
import isAxiosError from "~utils/isAxiosError";
import nFormatter from "~utils/nFormatter";

const RecipeInfo = () => {
  const form = useForm<RecipeDetailFormType>({
    resolver: zodResolver(recipeDetailSchema),
    defaultValues: recipeDetailDefaultValues,
  });
  const hasExtraSpiceWatch = form.watch("has_extra_spice");
  const mealKitSelectedId = form.watch("mealkitId");
  const { recipe } = useRecipeDetail();
  const mealKitSelected = useMemo(
    () => recipe?.mealKits.find((mealKit) => mealKit.id === mealKitSelectedId) || recipe?.mealKits[0],
    [mealKitSelectedId, recipe?.mealKits],
  );
  const { mutate } = useMutation({
    mutationFn: (body: AddToCartBody) => addToCart(body),
    onSuccess: () => toast.success("Thêm vào giỏ hàng thành công"),
    onError: (error) => {
      if (isAxiosError<Error>(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error(SYSTEM_MESSAGES.SOMETHING_WENT_WRONG);
      }
    },
  });

  const changeMealKitSelected = (id: string) => form.setValue("mealkitId", id);

  const handleAddToCart = (values: RecipeDetailFormType) => {
    if (!mealKitSelected) return;
    mutate({
      ...values,
      mealkitId: values.mealkitId || mealKitSelected.id,
    });
  };

  return (
    <section className="pt-16 px-5 pb-32 bg-white rounded-[5px]">
      <div className="flex gap-20 items-end">
        <div className="max-w-[570px]">
          <figure className="h-[570px]">
            <img src={recipe?.images[0]} alt="" className="w-full h-full rounded-[5px] object-contain" />
          </figure>
          <ul className="flex items-center gap-4 mt-4">
            <li>
              <img src={recipe?.images[0]} alt="" className="w-[132px] h-[120px] rounded-[5px] object-contain" />
            </li>
            <li>
              <img src={recipe?.images[1]} alt="" className="w-[132px] h-[120px] rounded-[5px] object-contain" />
            </li>
            <li>
              <img src={recipe?.images[0]} alt="" className="w-[132px] h-[120px] rounded-[5px] object-contain" />
            </li>
            <li>
              <img src={recipe?.images[1]} alt="" className="w-[132px] h-[120px] rounded-[5px] object-contain" />
            </li>
          </ul>
        </div>

        <section className="flex-1 pr-14">
          <h1 className="text-primary text-4xl font-medium leading-10">{recipe?.name}</h1>
          <div className="flex items-center gap-4 mt-3 h-6 text-sm font-normal ">
            <div className="flex items-center gap-4 text-[rgba(0,_0,_0,_0.85)]">
              <Ratings rating={recipe?.star || 0} variant="yellow" size={16} />
              <span>{recipe?.star.toFixed(1)}</span>
            </div>

            <Separator orientation="vertical" />

            <div>
              {nFormatter(recipe?.sold)}
              <span className="text-[rgba(0,_0,_0,_0.45)]"> Đã bán</span>
            </div>

            <Separator orientation="vertical" />

            <div>
              {nFormatter(recipe?.totalFeedback)}
              <span className="text-[rgba(0,_0,_0,_0.45)]"> Đánh Giá</span>
            </div>
          </div>
          <span className="block mt-6 text-[30px] font-semibold leading-9">
            <sup>₫</sup>
            {mealKitSelected?.price.toLocaleString() || 0}
          </span>

          <Separator className="my-8" />

          <div className="flex gap-2">
            <span className="px-[6px] py-1 text-red-500 text-[10px] font-medium rounded border-[1px] border-red-500">
              Tiết kiệm hơn
            </span>

            <p className="flex items-center gap-[6px] text-base font-medium leading-6">
              Khi mua cùng <strong className="text-primary">gói gia vị</strong> hoàn chỉnh chỉ với
              <span className="text-destructive">
                <sup>₫</sup>
                {mealKitSelected?.extraSpice?.price.toLocaleString() || 0}
              </span>
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddToCart)}>
              <FormField
                control={form.control}
                name="has_extra_spice"
                render={({ field }) => (
                  <FormItem className="mt-8">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} className="hidden" />
                    </FormControl>

                    <div className="flex items-center gap-4">
                      <Button
                        type="button"
                        variant={"outline"}
                        className={cn("h-14 p-0", {
                          "border-primary text-primary hover:text-primary": hasExtraSpiceWatch,
                        })}
                      >
                        <FormLabel className="px-4 py-2 cursor-pointer">
                          <div className="flex items-center gap-2">
                            <img
                              src={mealKitSelected?.extraSpice?.image}
                              alt="extra-spice"
                              className="w-9 h-9 object-contain"
                            />
                            <span className="text-sm font-normal leading-6">{mealKitSelected?.extraSpice?.name}</span>
                          </div>
                        </FormLabel>
                      </Button>

                      {hasExtraSpiceWatch && <IoIosCheckmarkCircle size={20} className="text-primary" />}
                    </div>
                  </FormItem>
                )}
              />

              <div className="mt-8">
                <h2 className="text-base font-medium leading-6">Khẩu phần ăn</h2>

                <ul className="flex gap-6 mt-8 ">
                  {recipe?.mealKits.map((mealKit) => (
                    <li key={mealKit.id}>
                      <Button
                        type="button"
                        variant={mealKit.id === mealKitSelected?.id ? "default" : "outline"}
                        className="text-sm font-normal leading-5"
                        onClick={() => changeMealKitSelected(mealKit.id)}
                      >
                        {mealKit.serving} người
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>

              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-9 mt-8">
                    <FormLabel className="flex-shrink-0 text-base font-medium leading-6">Số lượng</FormLabel>
                    <FormControl>
                      <InputPositiveNumber
                        min={1}
                        max={99}
                        placeholder="Số lượng"
                        value={field.value}
                        onValueChange={(value) => field.onChange(value)}
                        className="max-w-28 h-10"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Separator className="my-8" />

              <div className="flex gap-12">
                <Button
                  variant={"outline"}
                  className="flex items-center gap-2 w-full h-12 text-primary hover:text-secondary"
                >
                  <LuShoppingCart size={16} />
                  Thêm vào giỏ hàng
                </Button>
                <Button className="w-full h-12">Mua ngay</Button>
              </div>
            </form>
          </Form>
        </section>
      </div>
    </section>
  );
};

export default RecipeInfo;
