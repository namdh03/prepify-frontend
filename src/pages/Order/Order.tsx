import ConfettiExplosion from "react-confetti-explosion";
import { Link, useOutletContext } from "react-router-dom";

import icons from "~assets/icons";
import images from "~assets/imgs";
import { Button } from "~components/ui/button";
import configs from "~configs";
import Banner from "~layouts/MainLayout/components/Banner";
import Container from "~layouts/MainLayout/components/Container";
import { VerifyPaymentResponse } from "~types/payment.type";

import breadcrumbs from "./data/breadcrumbs";

const Order = () => {
  const { data } = useOutletContext<Pick<VerifyPaymentResponse, "data">>();

  return (
    <>
      {data.success && (
        <ConfettiExplosion
          force={0.8}
          duration={3000}
          particleCount={250}
          width={1600}
          className="fixed left-1/2 -translate-x-1/2"
        />
      )}

      <Banner
        text={
          <h1 className="max-w-[483px] mb-32 text-[54px] font-bold leading-[70px] text-[rgba(0,_0,_0,_0.85)]">
            <span className="text-primary">Prepify</span>
            <span className="text-secondary"> | </span>
            <span>Giỏ hàng của bạn</span>
          </h1>
        }
        image={images.cartBanner}
        breadcrumbs={breadcrumbs}
        className="[&_img]:w-[1000px] pb-9"
      />

      <section className="pt-20 pb-60 bg-[#F5F5F5]">
        <Container>
          <div className="flex justify-center">
            {data.success ? (
              <article className="flex flex-col items-center gap-8 min-w-[768px] px-36 pt-5 pb-10 bg-white rounded-[10px] [box-shadow:0px_4px_16px_0px_rgba(0,_0,_0,_0.07)]">
                <img src={icons.orderSuccess} alt="" className="w-80 h-64" />
                <h2 className="text-[#18181B] text-3xl font-semibold leading-9">Cảm ơn bạn đã mua hàng!</h2>
                <p className="text-[#71717A] text-xl font-normal leading-7">
                  Hãy theo dõi đơn hàng qua trang{" "}
                  <Link to={configs.routes.userPurchase} className="text-primary">
                    Đơn hàng của tôi
                  </Link>
                </p>
                <div className="flex gap-6">
                  <Link to={configs.routes.userPurchase}>
                    <Button variant={"outline"} className="min-w-48">
                      Xem đơn hàng
                    </Button>
                  </Link>

                  <Link to={configs.routes.shop}>
                    <Button className="min-w-64">Tiếp tục mua hàng</Button>
                  </Link>
                </div>
              </article>
            ) : (
              <article className="flex flex-col items-center gap-8 min-w-[768px] px-36 pt-5 pb-10 bg-white rounded-[10px] [box-shadow:0px_4px_16px_0px_rgba(0,_0,_0,_0.07)]">
                <img src={icons.orderFail} alt="" className="w-32 h-32" />
                <h2 className="text-[#18181B] text-3xl font-semibold leading-9">Thanh toán thất bại!</h2>
                <p className="text-[#71717A] text-xl font-normal leading-7">Vui lòng kiểm tra và thanh toán lại</p>
                <div className="flex gap-6">
                  <Link to={configs.routes.cart}>
                    <Button className="min-w-64">Quay lại giỏ hàng</Button>
                  </Link>
                </div>
              </article>
            )}
          </div>
        </Container>
      </section>
    </>
  );
};

export default Order;
