import { Fragment, useMemo } from "react";

import { useQuery } from "@tanstack/react-query";

import { GET_RECIPE_DETAIL_QUERY_KEY, GET_RECIPE_DETAIL_STALE_TIME, getCustomerRecipe } from "~apis/recipe.api";
import icons from "~assets/icons";
import Images from "~components/common/Images";
import Ratings from "~components/common/Ratings";
import { Button } from "~components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~components/ui/dialog";
import { Separator } from "~components/ui/separator";
import { DataTableRowActionsProps } from "~pages/OrderList/components/DataTableRowActions/DataTableRowActions";
import Spices from "~pages/RecipeDetail/components/Spices";
import { TableRecipeType } from "~types/recipe.type";
import { LEVEL_COOK_TEXT_MAP, SPICES_SIGNATURE } from "~utils/constants";
import { embedYoutubeURL } from "~utils/embedYoutubeURL";
import { LevelCook } from "~utils/enums";
import nFormatter from "~utils/nFormatter";

interface ModalProps extends DataTableRowActionsProps<TableRecipeType> {
  open: boolean;
  onOpen: (value: boolean) => void;
  onClose: () => void;
}

const listIcons = [icons.cuisine, icons.diet, icons.occasion, icons.classify, icons.level, icons.time];

const Modal = ({ row, open, onOpen, onClose }: ModalProps) => {
  const { data } = useQuery({
    queryKey: [GET_RECIPE_DETAIL_QUERY_KEY, row.original.slug],
    queryFn: () => getCustomerRecipe(row.original.slug as string),
    enabled: Boolean(open && row.original.slug),
    select: (data) => data.data.data,
    staleTime: GET_RECIPE_DETAIL_STALE_TIME,
    refetchOnWindowFocus: false,
    retry: false,
  });
  const spices = useMemo(
    () => data?.ingredients?.filter((ingredient) => ingredient.category === SPICES_SIGNATURE),
    [data?.ingredients],
  );

  return (
    data && (
      <Dialog open={open} onOpenChange={onOpen}>
        <DialogContent className="max-w-[calc(100%-48px)] max-h-[calc(100%-48px)] overflow-y-scroll">
          <DialogHeader>
            <DialogTitle className="mb-3">Thông tin chi tiết công thức</DialogTitle>
            <DialogDescription asChild>
              <section className="p-5 bg-white rounded-[5px] [box-shadow:0px_4px_16px_0px_rgba(0,_0,_0,_0.07)]">
                <div className="flex gap-20">
                  <Images list={data.recipe?.images || []} />

                  <section className="flex-1 pr-14 text-base">
                    <h1 className="text-primary text-4xl font-medium leading-10">{data.recipe?.name}</h1>
                    <div className="flex items-center gap-4 mt-3 h-6 font-normal">
                      <div className="flex items-center gap-4 text-[rgba(0,_0,_0,_0.85)]">
                        <Ratings rating={data.recipe?.star || 0} variant="yellow" size={16} />
                        <span>{data.recipe?.star.toFixed(1)}</span>
                      </div>

                      <Separator orientation="vertical" />

                      <div>
                        {nFormatter(data.recipe?.sold)}
                        <span className="text-[rgba(0,_0,_0,_0.45)]"> Đã bán</span>
                      </div>

                      <Separator orientation="vertical" />

                      <div>
                        {nFormatter(data.recipe?.totalFeedback)}
                        <span className="text-[rgba(0,_0,_0,_0.45)]"> Đánh Giá</span>
                      </div>
                    </div>

                    <Separator className="my-8" />

                    <div className="flex flex-col gap-3">
                      <h2 className="text-xl text-foreground font-medium">Thông tin cơ bản</h2>
                      <ul className="flex flex-col gap-2 list-disc ml-10 mb-[1px]">
                        <li>
                          Tổng số lượng <span className="text-primary font-medium">gói nguyên liệu</span>:
                          <span className="text-foreground"> {data.recipe?.mealKits.length || 0} gói</span>
                        </li>

                        <li>
                          Tổng số lượng <span className="text-primary font-medium">nguyên liệu</span>:
                          <span className="text-foreground"> {data.ingredients?.length || 0} nguyên liệu</span>
                        </li>

                        <li>
                          Tổng số lượng <span className="text-primary font-medium">chất dinh dưỡng</span>:
                          <span className="text-foreground"> {data.nutritions?.length || 0} chất</span>
                        </li>

                        <li>
                          Tổng số lượng <span className="text-primary font-medium">gia vị</span>:
                          <span className="text-foreground"> {spices?.length || 0} loại</span>
                        </li>
                      </ul>
                    </div>

                    <Separator className="my-8" />

                    <div className="flex flex-col gap-6">
                      <h2 className="text-xl text-foreground font-medium">Phân loại</h2>
                      <div className="flex flex-col gap-8">
                        <div className="grid grid-cols-3 gap-y-8">
                          {data.foodStyles?.map((foodStyle) => (
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
                              <span className="text-sm font-medium leading-6">{data.recipe?.category.name}</span>
                            </div>
                          </article>
                          <article className="flex gap-[6px]">
                            <div className="px-[9px] py-[7px] bg-[#CFE4D2] rounded-[5px]">
                              <img src={icons.level} alt="" />
                            </div>

                            <div className="flex flex-col gap-[2px]">
                              <span className="text-sm font-medium leading-6 text-[#71717A]">Độ khó</span>
                              <span className="text-sm font-medium leading-6">
                                {LEVEL_COOK_TEXT_MAP[data.recipe?.level as LevelCook]}
                              </span>
                            </div>
                          </article>
                          <article className="flex gap-[6px]">
                            <div className="px-[9px] py-[7px] bg-[#CFE4D2] rounded-[5px]">
                              <img src={icons.time} alt="" />
                            </div>

                            <div className="flex flex-col gap-[2px]">
                              <span className="text-sm font-medium leading-6 text-[#71717A]">Thời gian nấu</span>
                              <span className="text-sm font-medium leading-6">{data.recipe?.time || 0} phút</span>
                            </div>
                          </article>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </section>
            </DialogDescription>
          </DialogHeader>

          <section className="flex items-start gap-11 mt-10 text-[#18181B]">
            <section className="flex flex-col flex-1 gap-16 px-9 py-[26px] bg-white rounded-[5px] [box-shadow:0px_4px_16px_0px_rgba(0,_0,_0,_0.07)]">
              <div className="flex flex-col gap-6">
                <h2 className="text-2xl font-semibold">Nguyên liệu</h2>
                <p className="text-sm font-normal leading-6">Chất gây dị ứng: Đậu nành, lúa mì, thịt bò</p>
                <div className="grid grid-cols-3 gap-y-8">
                  {data.ingredients?.map((ingredient) => (
                    <article key={ingredient.id} className="flex items-center gap-[15px]">
                      <figure className="flex-shrink-0 w-[86px] h-[86px]">
                        <img
                          src={ingredient.imageURL}
                          alt=""
                          className="block w-full h-full rounded-full object-cover"
                        />
                      </figure>

                      <div className="flex flex-col gap-[3px]">
                        <span className="text-base font-normal leading-6">{ingredient.name}</span>
                        <span className="text-[#71717A] text-sm font-medium leading-6">{ingredient.unit.name}</span>
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

              {data.nutritions?.map((nutritionalValue) => (
                <Fragment key={nutritionalValue.id}>
                  <article className="flex justify-between">
                    <span className="text-sm font-semibold leading-6">{nutritionalValue.name}</span>
                    <span className="text-base font-normal leading-6">{nutritionalValue.units.name}</span>
                  </article>
                  <Separator className="my-[6px]" />
                </Fragment>
              ))}
            </section>
          </section>

          <section className="mt-10 px-7 py-[42px] text-[#18181B] bg-white rounded-[5px] [box-shadow:0px_4px_16px_0px_rgba(0,_0,_0,_0.07)]">
            <h2 className="text-2xl font-semibold">Hướng dẫn thực hiện</h2>
            <div className="flex gap-11 mt-[30px]">
              {data.recipe?.steps && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: data.recipe.steps,
                  }}
                ></div>
              )}

              {data.recipe?.videoUrl && (
                <div className="ml-auto">
                  <iframe
                    width="618"
                    height="315"
                    src={embedYoutubeURL(data.recipe.videoUrl)}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="rounded-[5px]"
                  ></iframe>
                </div>
              )}
            </div>
          </section>

          <DialogFooter>
            <Button onClick={onClose}>Đóng</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  );
};

export default Modal;
