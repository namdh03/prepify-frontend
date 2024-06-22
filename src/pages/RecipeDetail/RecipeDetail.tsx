import { useSearchParams } from "react-router-dom";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import images from "~assets/imgs";
import Banner from "~layouts/MainLayout/components/Banner";
import Container from "~layouts/MainLayout/components/Container";

import Feedback from "./components/Feedback";
import IngredientInfo from "./components/IngredientInfo";
import RecipeInfo from "./components/RecipeInfo";
import breadcrumbs from "./data/breadcrumbs";

const RecipeDetail = () => {
  const [params] = useSearchParams();

  return (
    <>
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
            title: "Trứng chiên",
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
              <Feedback />
            </TabsContent>
          </Tabs>
        </Container>
      </section>
    </>
  );
};

export default RecipeDetail;
