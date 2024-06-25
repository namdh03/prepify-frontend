import images from "~assets/imgs";

const WaitingForPay = () => {
  return (
    <section>
      <article className="flex flex-col items-center justify-center gap-5 min-h-96">
        <img src={images.noOrder} alt="" className="w-[100px] h-[100px]" />
        <span className="text-lg">Chưa có đơn hàng</span>
      </article>
    </section>
  );
};

export default WaitingForPay;
