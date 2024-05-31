import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

import icons from "~/assets/icons";
import images from "~/assets/imgs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "~/components/ui/carousel";
import configs from "~/configs";
import Button from "~/layouts/MainLayout/components/Button";
import Container from "~/layouts/MainLayout/components/Container";
import Product from "~/layouts/MainLayout/components/Product";

const suggestList = [
  {
    id: "1",
    title: "Canh bí đỏ",
    category: "Món Ăn Việt",
    image: images.suggest,
    level: "Dễ nấu",
    time: "30 phút",
    price: 15000,
    star: 5,
    sold: 1200,
  },
  {
    id: "2",
    title: "Canh bí đỏ",
    category: "Món Ăn Việt",
    image: images.suggest,
    level: "Dễ nấu",
    time: "30 phút",
    price: 15000,
    star: 5,
    sold: 1200,
  },
  {
    id: "3",
    title: "Canh bí đỏ",
    category: "Món Ăn Việt",
    image: images.suggest,
    level: "Dễ nấu",
    time: "30 phút",
    price: 15000,
    star: 5,
    sold: 1200,
  },
  {
    id: "4",
    title: "Canh bí đỏ",
    category: "Món Ăn Việt",
    image: images.suggest,
    level: "Dễ nấu",
    time: "30 phút",
    price: 15000,
    star: 5,
    sold: 1200,
  },
  {
    id: "5",
    title: "Canh bí đỏ",
    category: "Món Ăn Việt",
    image: images.suggest,
    level: "Dễ nấu",
    time: "30 phút",
    price: 15000,
    star: 5,
    sold: 1200,
  },
  {
    id: "6",
    title: "Canh bí đỏ",
    category: "Món Ăn Việt",
    image: images.suggest,
    level: "Dễ nấu",
    time: "30 phút",
    price: 15000,
    star: 5,
    sold: 1200,
  },
  {
    id: "7",
    title: "Canh bí đỏ",
    category: "Món Ăn Việt",
    image: images.suggest,
    level: "Dễ nấu",
    time: "30 phút",
    price: 15000,
    star: 5,
    sold: 1200,
  },
  {
    id: "8",
    title: "Canh bí đỏ",
    category: "Món Ăn Việt",
    image: images.suggest,
    level: "Dễ nấu",
    time: "30 phút",
    price: 15000,
    star: 5,
    sold: 1200,
  },
  {
    id: "9",
    title: "Canh bí đỏ",
    category: "Món Ăn Việt",
    image: images.suggest,
    level: "Dễ nấu",
    time: "30 phút",
    price: 15000,
    star: 5,
    sold: 1200,
  },
  {
    id: "10",
    title: "Canh bí đỏ",
    category: "Món Ăn Việt",
    image: images.suggest,
    level: "Dễ nấu",
    time: "30 phút",
    price: 15000,
    star: 5,
    sold: 1200,
  },
];

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
              <Button>
                Xem các sản phẩm <IoIosArrowForward size={24} className="ml-[10px]" />
              </Button>
            </Link>
          </section>

          <div className="relative mt-32">
            <Carousel className="relative -top-[90px] w-full">
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
