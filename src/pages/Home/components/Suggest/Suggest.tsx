import Autoplay from "embla-carousel-autoplay";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

import icons from "~assets/icons";
import images from "~assets/imgs";
import { Button } from "~components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "~components/ui/carousel";
import configs from "~configs";
import Container from "~layouts/MainLayout/components/Container";
import Product from "~layouts/MainLayout/components/Product";
import { ShopRecipeType } from "~types/recipe.type";
import { LevelCook } from "~utils/enums";

const suggestList: ShopRecipeType[] = [
  {
    id: "1",
    name: "Canh bí đỏ",
    slug: "canh-bi-do",
    foodStyle: "Món Ăn Việt",
    mainImage: images.suggest1st,
    subImage: images.suggest2nd,
    level: LevelCook.EASY,
    time: 30,
    price: 15000,
    star: 5,
    sold: 1200,
  },
  {
    id: "2",
    name: "Canh bí đỏ",
    slug: "canh-bi-do",
    foodStyle: "Món Ăn Việt",
    mainImage: images.suggest1st,
    subImage: images.suggest2nd,
    level: LevelCook.EASY,
    time: 30,
    price: 15000,
    star: 5,
    sold: 1200,
  },
  {
    id: "3",
    name: "Canh bí đỏ",
    slug: "canh-bi-do",
    foodStyle: "Món Ăn Việt",
    mainImage: images.suggest1st,
    subImage: images.suggest2nd,
    level: LevelCook.EASY,
    time: 30,
    price: 15000,
    star: 5,
    sold: 1200,
  },
  {
    id: "4",
    name: "Canh bí đỏ",
    slug: "canh-bi-do",
    foodStyle: "Món Ăn Việt",
    mainImage: images.suggest1st,
    subImage: images.suggest2nd,
    level: LevelCook.EASY,
    time: 30,
    price: 15000,
    star: 5,
    sold: 1200,
  },
  {
    id: "5",
    name: "Canh bí đỏ",
    slug: "canh-bi-do",
    foodStyle: "Món Ăn Việt",
    mainImage: images.suggest1st,
    subImage: images.suggest2nd,
    level: LevelCook.EASY,
    time: 30,
    price: 15000,
    star: 5,
    sold: 1200,
  },
  {
    id: "6",
    name: "Canh bí đỏ",
    slug: "canh-bi-do",
    foodStyle: "Món Ăn Việt",
    mainImage: images.suggest1st,
    subImage: images.suggest2nd,
    level: LevelCook.EASY,
    time: 30,
    price: 15000,
    star: 5,
    sold: 1200,
  },
  {
    id: "7",
    name: "Canh bí đỏ",
    slug: "canh-bi-do",
    foodStyle: "Món Ăn Việt",
    mainImage: images.suggest1st,
    subImage: images.suggest2nd,
    level: LevelCook.EASY,
    time: 30,
    price: 15000,
    star: 5,
    sold: 1200,
  },
  {
    id: "8",
    name: "Canh bí đỏ",
    slug: "canh-bi-do",
    foodStyle: "Món Ăn Việt",
    mainImage: images.suggest1st,
    subImage: images.suggest2nd,
    level: LevelCook.EASY,
    time: 30,
    price: 15000,
    star: 5,
    sold: 1200,
  },
  {
    id: "9",
    name: "Canh bí đỏ",
    slug: "canh-bi-do",
    foodStyle: "Món Ăn Việt",
    mainImage: images.suggest1st,
    subImage: images.suggest2nd,
    level: LevelCook.EASY,
    time: 30,
    price: 15000,
    star: 5,
    sold: 1200,
  },
  {
    id: "10",
    name: "Canh bí đỏ",
    slug: "canh-bi-do",
    foodStyle: "Món Ăn Việt",
    mainImage: images.suggest1st,
    subImage: images.suggest2nd,
    level: LevelCook.EASY,
    time: 30,
    price: 15000,
    star: 5,
    sold: 1200,
  },
];

const AUTO_PLAY_INTERVAL = 2000;

const Suggest = () => {
  return (
    <section className="relative pt-52 pb-36">
      <div className="absolute -top-[170px] -left-10 w-[482px] h-[469px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,_#34A853_0%,_#29B95F_100%)] filter blur-[286px]"></div>
      <div className="absolute top-[300px] -left-[200px] -z-10 w-[482px] h-[469px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,_#ED620B_0%,_#EFBC9C_100%)] filter blur-[219px]"></div>

      <Container>
        <div className="relative">
          <section className="flex justify-between">
            <div>
              <h2 className="text-[#2D3134] text-5xl font-extrabold">Gợi ý hôm nay</h2>
              <p className="max-w-[680px] mt-9 text-[#676A6C] text-xl leading-[26px]">
                Chào mừng bạn đến với thế giới của các bộ nguyên liệu được chuẩn bị sẵn, nơi chúng tôi mang đến sự tiện
                lợi, đáng tin cậy và đổi mới ngay tại ngưỡng cửa nhà bạn, giúp bạn tiết kiệm thời gian và giảm thiểu
                lãng phí thực phẩm.
              </p>
            </div>

            <Link to={configs.routes.shop}>
              <Button className="px-11 h-[74px] leading-[74px] text-2xl font-semibold rounded-full">
                <span className="leading-4">Xem các sản phẩm </span>
                <IoIosArrowForward size={24} className="ml-[10px] mt-1" />
              </Button>
            </Link>
          </section>

          <div className="relative mt-32">
            <Carousel
              plugins={[
                Autoplay({
                  delay: AUTO_PLAY_INTERVAL,
                }),
              ]}
              className="relative -top-[90px] w-full"
            >
              <CarouselContent className="-ml-16 mb-[90px]">
                {suggestList.map((suggest) => (
                  <CarouselItem key={suggest.id} className="pl-16 basis-1/4">
                    <div className="mt-[90px]">
                      <Product {...suggest} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>

            <div className="absolute -top-[51px] -left-[97px] -z-10 flex">
              {Array.from({ length: 4 }).map((_, index) => (
                <img key={index} src={icons.suggestDecorate} alt="" className="-mr-32" />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Suggest;
