import { Fragment, memo, useMemo } from "react";

import icons from "~assets/icons";
import { Separator } from "~components/ui/separator";
import useRecipeDetail from "~hooks/useRecipeDetail";
import { LEVEL_COOK_TEXT_MAP, SPICES_SIGNATURE } from "~utils/constants";
import { LevelCook } from "~utils/enums";

import ImplementationGuide from "../ImplementationGuide";
import Spices from "../Spices";

const listIcons = [icons.cuisine, icons.diet, icons.occasion, icons.classify, icons.level, icons.time];

const IngredientInfo = memo(() => {
  const { recipe, foodStyles, ingredients, nutritions } = useRecipeDetail();
  const spices = useMemo(
    () => ingredients?.filter((ingredient) => ingredient.category === SPICES_SIGNATURE),
    [ingredients],
  );

  return (
    <>
      <section className="flex items-start gap-11 mt-6 text-[#18181B]">
        <section className="flex flex-col flex-1 gap-16 px-9 py-[26px] bg-white rounded-[5px] [box-shadow:0px_4px_16px_0px_rgba(0,_0,_0,_0.07)]">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold">Phân loại</h2>
            <div className="flex flex-col gap-8">
              <div className="grid grid-cols-3 gap-y-8">
                {foodStyles?.map((foodStyle) => (
                  <article key={foodStyle.id} className="flex gap-[6px]">
                    <div className="px-[9px] py-[7px] bg-[#CFE4D2] rounded-[5px]">
                      <img src={listIcons[Math.floor(Math.random() * listIcons.length)]} alt="" />
                    </div>

                    <div className="flex flex-col gap-[2px]">
                      <span className="text-sm font-medium leading-6 text-[#71717A]">{foodStyle.title}</span>
                      <span className="text-sm font-medium leading-6">{foodStyle.name}</span>
                    </div>
                  </article>
                ))}

                <article className="flex gap-[6px]">
                  <div className="px-[9px] py-[7px] bg-[#CFE4D2] rounded-[5px]">
                    <img src={icons.classify} alt="" />
                  </div>

                  <div className="flex flex-col gap-[2px]">
                    <span className="text-sm font-medium leading-6 text-[#71717A]">Phân loại</span>
                    <span className="text-sm font-medium leading-6">{recipe?.category.name}</span>
                  </div>
                </article>
                <article className="flex gap-[6px]">
                  <div className="px-[9px] py-[7px] bg-[#CFE4D2] rounded-[5px]">
                    <img src={icons.level} alt="" />
                  </div>

                  <div className="flex flex-col gap-[2px]">
                    <span className="text-sm font-medium leading-6 text-[#71717A]">Độ khó</span>
                    <span className="text-sm font-medium leading-6">
                      {LEVEL_COOK_TEXT_MAP[recipe?.level as LevelCook]}
                    </span>
                  </div>
                </article>
                <article className="flex gap-[6px]">
                  <div className="px-[9px] py-[7px] bg-[#CFE4D2] rounded-[5px]">
                    <img src={icons.time} alt="" />
                  </div>

                  <div className="flex flex-col gap-[2px]">
                    <span className="text-sm font-medium leading-6 text-[#71717A]">Thời gian nấu</span>
                    <span className="text-sm font-medium leading-6">{recipe?.time || 0} phút</span>
                  </div>
                </article>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold">Nguyên liệu</h2>
            <p className="text-sm font-normal leading-6">Chất gây dị ứng: Đậu nành, lúa mì, thịt bò</p>
            <div className="grid grid-cols-3 gap-y-8">
              {ingredients?.map((ingredient) => (
                <article key={ingredient.id} className="flex items-center gap-[15px]">
                  <figure className="flex-shrink-0 w-[86px] h-[86px]">
                    <img src={ingredient.imageURL} alt="" className="block w-full h-full rounded-full object-cover" />
                  </figure>

                  <div className="flex flex-col gap-[3px]">
                    <span className="text-base font-normal leading-6">{ingredient.name}</span>
                    <span className="text-[#71717A] text-sm font-medium leading-6">
                      {ingredient.amount}
                      {ingredient.unit.name}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {spices && spices.length > 0 && <Spices spices={spices} />}
        </section>

        <section className="min-w-[345px] px-4 py-[26px] bg-white rounded-[5px] [box-shadow:0px_4px_16px_0px_rgba(0,_0,_0,_0.07)]">
          <h2 className="text-2xl font-semibold">Giá trị dinh dưỡng</h2>
          <p className="mt-6 text-right text-base font-bold leading-7">Trên khẩu phần ăn</p>

          <Separator className="my-[6px]" />

          {nutritions?.map((nutritionalValue) => (
            <Fragment key={nutritionalValue.id}>
              <article className="flex justify-between">
                <span className="text-sm font-semibold leading-6">{nutritionalValue.name}</span>
                <span className="text-base font-normal leading-6">
                  {nutritionalValue.amount}
                  {nutritionalValue.units.name}
                </span>
              </article>
              <Separator className="my-[6px]" />
            </Fragment>
          ))}
        </section>
      </section>

      <ImplementationGuide />
    </>
  );
});

export default IngredientInfo;
