import images from "~assets/imgs";
import Banner from "~layouts/MainLayout/components/Banner";
import Container from "~layouts/MainLayout/components/Container";

import RecipeInfo from "./components/RecipeInfo";
import breadcrumbs from "./data/breadcrumbs";

const RecipeDetail = () => {
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
        </Container>
      </section>
    </>
  );
};

export default RecipeDetail;
