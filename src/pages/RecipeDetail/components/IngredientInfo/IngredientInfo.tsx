import { memo } from "react";

import icons from "~assets/icons";
import images from "~assets/imgs";
import { Separator } from "~components/ui/separator";

type Ingredient = {
  id: string;
  image: string;
  name: string;
  mass: string;
};

type Spice = {
  id: string;
  image: string;
  name: string;
  mass: string;
};

type NutritionalValue = {
  id: string;
  name: string;
  value: string;
};

const ingredientList: Ingredient[] = [
  {
    id: "1",
    image: images.tomato,
    name: "Cà chua",
    mass: "100g",
  },
  {
    id: "2",
    image: images.onion,
    name: "Củ hành",
    mass: "100g",
  },
  {
    id: "3",
    image: images.pasta,
    name: "Mì ý",
    mass: "100g",
  },
  {
    id: "4",
    image: images.beef,
    name: "Thịt bò",
    mass: "100g",
  },
  {
    id: "5",
    image: images.soy,
    name: "Nước tương",
    mass: "100g",
  },
  {
    id: "6",
    image: images.soy,
    name: "Nước tương",
    mass: "6ml",
  },
];

const spices: Spice[] = [
  {
    id: "1",
    image: images.sugar,
    name: "Đường",
    mass: "3g",
  },
  {
    id: "2",
    image: images.pepper,
    name: "Tiêu",
    mass: "3g",
  },
  {
    id: "3",
    image: images.salt,
    name: "Muối",
    mass: "3g",
  },
  {
    id: "4",
    image: images.seasoning,
    name: "Hạt nêm",
    mass: "3g",
  },
];

const nutritionalValues: NutritionalValue[] = [
  {
    id: "1",
    name: "Calories",
    value: "630kcal",
  },
  {
    id: "2",
    name: "Protein",
    value: "34g",
  },
  {
    id: "3",
    name: "Fat",
    value: "38g",
  },
  {
    id: "4",
    name: "Sugar",
    value: "38g",
  },
  {
    id: "5",
    name: "Dietary Fiber",
    value: "38g",
  },
  {
    id: "6",
    name: "Sodium",
    value: "38g",
  },
];

const IngredientInfo = memo(() => {
  return (
    <section className="flex items-start gap-11 mt-6 text-[#18181B]">
      <section className="flex flex-col flex-1 gap-16 px-9 py-[26px] bg-white rounded-[5px] [box-shadow:0px_4px_16px_0px_rgba(0,_0,_0,_0.07)]">
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold">Phân loại</h2>
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-3 gap-y-8">
              {/* // TODO: Loop FoodStyles from service BE */}
              <article className="flex gap-[6px]">
                <div className="px-[9px] py-[7px] bg-[#CFE4D2] rounded-[5px]">
                  <img src={icons.cuisine} alt="" />
                </div>

                <div className="flex flex-col gap-[2px]">
                  <span className="text-sm font-medium leading-6 text-[#71717A]">Ẩm thực</span>
                  <span className="text-sm font-medium leading-6">Việt Nam</span>
                </div>
              </article>
              <article className="flex gap-[6px]">
                <div className="px-[9px] py-[7px] bg-[#CFE4D2] rounded-[5px]">
                  <img src={icons.diet} alt="" />
                </div>

                <div className="flex flex-col gap-[2px]">
                  <span className="text-sm font-medium leading-6 text-[#71717A]">Chế độ ăn</span>
                  <span className="text-sm font-medium leading-6">Cân bằng</span>
                </div>
              </article>
              <article className="flex gap-[6px]">
                <div className="px-[9px] py-[7px] bg-[#CFE4D2] rounded-[5px]">
                  <img src={icons.occasion} alt="" />
                </div>

                <div className="flex flex-col gap-[2px]">
                  <span className="text-sm font-medium leading-6 text-[#71717A]">Dịp ăn</span>
                  <span className="text-sm font-medium leading-6">Ăn cùng gia đình</span>
                </div>
              </article>

              <article className="flex gap-[6px]">
                <div className="px-[9px] py-[7px] bg-[#CFE4D2] rounded-[5px]">
                  <img src={icons.classify} alt="" />
                </div>

                <div className="flex flex-col gap-[2px]">
                  <span className="text-sm font-medium leading-6 text-[#71717A]">Phân loại</span>
                  <span className="text-sm font-medium leading-6">Món khô</span>
                </div>
              </article>
              <article className="flex gap-[6px]">
                <div className="px-[9px] py-[7px] bg-[#CFE4D2] rounded-[5px]">
                  <img src={icons.level} alt="" />
                </div>

                <div className="flex flex-col gap-[2px]">
                  <span className="text-sm font-medium leading-6 text-[#71717A]">Độ khó</span>
                  <span className="text-sm font-medium leading-6">Dễ</span>
                </div>
              </article>
              <article className="flex gap-[6px]">
                <div className="px-[9px] py-[7px] bg-[#CFE4D2] rounded-[5px]">
                  <img src={icons.time} alt="" />
                </div>

                <div className="flex flex-col gap-[2px]">
                  <span className="text-sm font-medium leading-6 text-[#71717A]">Thời gian nấu</span>
                  <span className="text-sm font-medium leading-6">30 phút</span>
                </div>
              </article>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold">Nguyên liệu</h2>
          <p className="text-sm font-normal leading-6">Chất gây dị ứng: Đậu nành, lúa mì, thịt bò</p>
          <div className="grid grid-cols-3 gap-y-8">
            {ingredientList.map((ingredient) => (
              <article className="flex items-center gap-[15px]">
                <figure className="w-[86px] h-[86px] rounded-full">
                  <img src={ingredient.image} alt="" className="block w-full h-full object-cover" />
                </figure>

                <div className="flex flex-col gap-[3px]">
                  <span className="text-base font-normal leading-6">{ingredient.name}</span>
                  <span className="text-[#71717A] text-sm font-medium leading-6">{ingredient.mass}</span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold">Gia vị</h2>
          <p className="text-sm font-normal leading-6">
            Các gia vị nêm nếm không nằm trong gói nguyên liệu. Để tiện lợi và nhanh chóng hơn hãy chọn thêm gói
            <span className="text-secondary"> gia vị hoàn chỉnh </span> theo chuẩn tỉ lệ vàng của
            <strong className="text-primary font-normal"> Prepify</strong>
          </p>
          <div className="grid grid-cols-3 gap-y-8">
            {spices.map((spice) => (
              <article className="flex items-center gap-[15px]">
                <figure className="w-[86px] h-[86px] rounded-full">
                  <img src={spice.image} alt="" className="block w-full h-full object-cover" />
                </figure>

                <div className="flex flex-col gap-[3px]">
                  <span className="text-base font-normal leading-6">{spice.name}</span>
                  <span className="text-[#71717A] text-sm font-medium leading-6">{spice.mass}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="min-w-[345px] px-4 py-[26px] bg-white rounded-[5px] [box-shadow:0px_4px_16px_0px_rgba(0,_0,_0,_0.07)]">
        <h2 className="text-2xl font-semibold">Giá trị dinh dưỡng</h2>
        <p className="mt-6 text-right text-base font-bold leading-7">Trên khẩu phần ăn</p>

        <Separator className="my-[6px]" />

        {nutritionalValues.map((nutritionalValue) => (
          <>
            <article className="flex justify-between">
              <span className="text-sm font-semibold leading-6">{nutritionalValue.name}</span>
              <span className="text-base font-normal leading-6">{nutritionalValue.value}</span>
            </article>
            <Separator className="my-[6px]" />
          </>
        ))}
      </section>
    </section>
  );
});

export default IngredientInfo;
