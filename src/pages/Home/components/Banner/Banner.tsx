import { Link } from "react-router-dom";

import icons from "~assets/icons";
import images from "~assets/imgs";
import { Button } from "~components/ui/button";
import configs from "~configs";
import Container from "~layouts/MainLayout/components/Container";

const Banner = () => {
  return (
    <section className="pt-20 pb-24">
      <Container>
        <div className="flex gap-40">
          <section className="mt-16">
            <h1 className="text-7xl font-bold leading-[1.1]">
              <span>Giảm lãng phí thực phẩm và </span>
              <span className="block text-secondary">tiết kiệm chi phí</span>
            </h1>
            <p className="mt-5 mb-8 text-xl">
              Chúng tôi muốn giải quyết vấn đề lãng phí thực phẩm bằng cách đề xuất công thức nấu ăn và khẩu phần ăn
              dành riêng cho bạn.
            </p>
            <Link to={configs.routes.shop}>
              <Button className="px-11 h-14 leading-[56px] text-xl font-semibold rounded-full">Xem Ngay</Button>
            </Link>
          </section>

          <div className="relative flex-shrink-0 px-9 mr-11">
            <img src={images.homeBanner} alt="" className="block w-[441px] h-[534px]" />
            <img src={icons.bannerCircleDecorate} alt="" className="absolute top-3 left-0 -z-10" />
            <img src={icons.bannerDotDecorate} alt="" className="absolute top-[189px] -right-36 -z-20" />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Banner;
