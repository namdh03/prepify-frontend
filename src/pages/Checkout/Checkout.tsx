import { ChangeEvent } from "react";
import { toast } from "react-toastify";

import icons from "~assets/icons";
import images from "~assets/imgs";
import { Button } from "~components/ui/button";
import { Label } from "~components/ui/label";
import { Separator } from "~components/ui/separator";
import { Textarea } from "~components/ui/textarea";
import useCheckout from "~hooks/useCheckout";
import Banner from "~layouts/MainLayout/components/Banner";
import Container from "~layouts/MainLayout/components/Container";
import { SYSTEM_MESSAGES } from "~utils/constants";

import ShippingAddress from "./components/ShippingAddress";
import Table from "./components/Table";
import Transport from "./components/Transport";
import breadcrumbs from "./data/breadcrumbs";

const Checkout = () => {
  const { form, isErrorSubmit: isErrorSubmit } = useCheckout();
  const noteWatch = form.watch("note");

  const handleNoteChange = (e: ChangeEvent<HTMLTextAreaElement>) => form.setValue("note", e.target.value);

  const handleShowError = () => toast.error(SYSTEM_MESSAGES.SOMETHING_WENT_WRONG);

  const handleOrder = () => {
    console.log("CALL API ORDER", form.getValues());
  };

  return (
    <>
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

      <section className="pt-9 pb-36 bg-[#F5F5F5]">
        <Container>
          <h2 className="text-[#18181B] text-xl font-bold leading-9">
            <span>Tổng đơn hàng </span>
            <span className="text-muted-foreground text-lg font-normal">(4 sản phẩm)</span>
          </h2>

          <ShippingAddress />

          <div className="mt-9">
            <Table />
          </div>

          <div className="flex items-center mt-9 bg-white">
            <div className="grid w-full gap-1.5 max-w-[464px] pl-9 pr-4 py-20 border-[1px] border-solid border-r-[#E4E4E7] border-transparent">
              <Label htmlFor="notice">Lời nhắn</Label>
              <Textarea
                value={noteWatch}
                onChange={(e) => handleNoteChange(e)}
                placeholder="Lưu ý cho cửa hàng"
                id="notice"
                className="min-h-20 placeholder:text-slate-400"
              />
            </div>

            <Transport />
          </div>

          <div className="mt-9 px-5 pb-5 pt-10 bg-white">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold leading-9">Phương thức thanh toán</h3>
                <img
                  src={icons.VNPAY}
                  alt=""
                  className="w-28 h-24 p-4 rounded-[6px] border-[1px] border-solid border-[#F4F4F5]"
                />
              </div>

              <div className="flex flex-col gap-6 min-w-[450px]">
                <div className="flex items-center justify-between">
                  <span className="text-[#71717A] text-base font-normal leading-7">Tổng tiền hàng:</span>
                  <span className="text-base font-normal leading-7">
                    <sup>₫</sup>
                    {Number(49200).toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#71717A] text-base font-normal leading-7">Phí vận chuyển:</span>
                  <span className="text-base font-normal leading-7">
                    <sup>₫</sup>
                    {Number(49200).toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#71717A] text-base font-normal leading-7">Tổng thanh toán (3 sản phẩm):</span>
                  <span className="text-primary text-xl font-semibold leading-7">
                    <sup>₫</sup>
                    {Number(49200).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
            <Separator className="mt-3" />
            <div className="flex items-center justify-between mt-8">
              <p className="text-sm font-medium leading-6">
                Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo{" "}
                <a href="#!" className="text-[#2563EB] underline">
                  Điều khoản Prepify
                </a>
              </p>
              <Button className="min-w-[180px] h-10" onClick={isErrorSubmit ? handleShowError : handleOrder}>
                Đặt hàng
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Checkout;
