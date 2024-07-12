import { PiWarningCircle } from "react-icons/pi";
import { useSearchParams } from "react-router-dom";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import images from "~assets/imgs";
import { Button } from "~components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~components/ui/dialog";
import useCheckAllergies from "~hooks/useCheckAllergies";
import useRecipeDetail from "~hooks/useRecipeDetail";
import Banner from "~layouts/MainLayout/components/Banner";
import Container from "~layouts/MainLayout/components/Container";

import Feedback from "./components/Feedback";
import IngredientInfo from "./components/IngredientInfo";
import RecipeInfo from "./components/RecipeInfo";
import breadcrumbs from "./data/breadcrumbs";

const RecipeDetail = () => {
  const [params] = useSearchParams();
  const { recipe, ingredients } = useRecipeDetail();
  const listRestrictedIngredients = useCheckAllergies(ingredients || []);

  return (
    <>
      {listRestrictedIngredients.length > 0 && (
        <Dialog defaultOpen>
          <DialogContent className="max-w-[600px] px-20 pb-7 gap-[34px]">
            <div className="flex justify-center">
              <PiWarningCircle size={100} color="#EAB308" />
            </div>
            <DialogHeader className="gap-3">
              <DialogTitle className="text-[#18181B] text-2xl font-semibold leading-9 text-center">
                Cảnh báo công thức có thể gây dị ứng!
              </DialogTitle>
              <DialogDescription className="text-[#71717A] text-base font-normal leading-7">
                Lưu ý: Công thức này có chứa
                <span className="text-destructive font-medium">
                  {" "}
                  {listRestrictedIngredients.map((ingredient) => ingredient.name).join(", ")}{" "}
                </span>
                có thể gây dị ứng cho bạn.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="sm:justify-center">
              <DialogClose asChild>
                <Button type="button" className="min-w-[262px]">
                  Tiếp tục
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <Banner
        text={
          <h1 className="mb-32 text-[54px] font-bold leading-[70px] text-[rgba(0,_0,_0,_0.85)]">
            <span>Cửa hàng của </span>
            <span className="block text-secondary">Prepify</span>
          </h1>
        }
        image={images.shopBanner}
        breadcrumbs={[
          ...breadcrumbs,
          {
            to: "#!",
            title: recipe?.name || "Chi tiết sản phẩm",
          },
        ]}
        className="[&_img]:w-[868px]"
      />

      <section className="pt-8 pb-12 bg-[#F6F6F6] rounded-[5px]">
        <Container>
          <RecipeInfo />

          <Tabs
            defaultValue={params.get("rating") || params.get("page") === "feedback" ? "feedback" : "ingredient-info"}
            className="w-full mt-11"
          >
            <TabsList className="w-[450px] grid grid-cols-2 bg-white h-fit">
              <TabsTrigger
                value="ingredient-info"
                className="py-2 data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Thông tin gói nguyên liệu
              </TabsTrigger>
              <TabsTrigger
                value="feedback"
                className="py-2 data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Đánh giá từ người dùng khác
              </TabsTrigger>
            </TabsList>
            <TabsContent value="ingredient-info">
              <IngredientInfo />
            </TabsContent>
            <TabsContent value="feedback">
              <Feedback averageRating={recipe?.star} totalFeedback={recipe?.totalFeedback} />
            </TabsContent>
          </Tabs>
        </Container>
      </section>
    </>
  );
};

export default RecipeDetail;
