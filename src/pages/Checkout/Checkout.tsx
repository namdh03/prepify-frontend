import { ChangeEvent } from "react";

import images from "~assets/imgs";
import { Label } from "~components/ui/label";
import { Textarea } from "~components/ui/textarea";
import useCheckout from "~hooks/useCheckout";
import useDocumentTitle from "~hooks/useDocumentTitle";
import Banner from "~layouts/MainLayout/components/Banner";
import Container from "~layouts/MainLayout/components/Container";

import OrderAction from "./components/OrderAction";
import Popup from "./components/Popup";
import ShippingAddress from "./components/ShippingAddress";
import Table from "./components/Table";
import Transport from "./components/Transport";
import breadcrumbs from "./data/breadcrumbs";

const Checkout = () => {
  useDocumentTitle("Prepify | Thanh toán");

  const { form, checkout, isFetching } = useCheckout();
  const noteWatch = form.watch("note");

  const handleNoteChange = (e: ChangeEvent<HTMLTextAreaElement>) => form.setValue("note", e.target.value);

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

      {checkout === null && !isFetching && <Popup />}

      {checkout && (
        <section className="pt-9 pb-36 bg-[#F5F5F5]">
          <Container>
            <h2 className="text-[#18181B] text-xl font-bold leading-9">
              <span>Tổng đơn hàng </span>
              <span className="text-muted-foreground text-lg font-normal">
                ({checkout?.items.length || 0} sản phẩm)
              </span>
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

            <OrderAction />
          </Container>
        </section>
      )}
    </>
  );
};

export default Checkout;
