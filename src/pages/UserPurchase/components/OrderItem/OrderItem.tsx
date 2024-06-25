import { OrderItem as OrderItemType } from "~types/order.type";

const OrderItem = ({ id, image, name, serving, quantity, price, extraSpice }: OrderItemType) => {
  return (
    <article key={id}>
      <div className="flex items-center pt-4">
        <img src={image} alt="" className="w-24 h-24 object-contain" />
        <div className="flex flex-col gap-[5px] ml-3 text-[rgba(0,0,0,.87)]">
          <span className="max-w-2xl text-base">{name}</span>
          <span className="text-[rgba(0,0,0,.54)] text-sm">Khẩu phần ăn: {serving} người ăn</span>
          <span className="text-sm">Số lượng: {quantity}</span>
        </div>
        <span className="block ml-auto text-center text-primary text-sm font-normal leading-5">
          <sup>₫</sup>
          {price.toLocaleString()}
        </span>
      </div>

      {extraSpice && (
        <div className="flex items-center pt-3 ml-10">
          <img src={extraSpice.image} alt="" className="w-12 h-w-12 object-contain" />
          <div className="flex flex-col ml-3 gap-1 text-[rgba(0,0,0,.87)]">
            <div className="max-w-2xl text-base">
              <span className="px-[6px] py-1 text-red-500 text-[10px] font-medium rounded border-[1px] border-red-500">
                Mua thêm
              </span>
              <span className="ml-2">Gói gia vị {extraSpice.name}</span>
            </div>
            <span className="text-sm">x{quantity}</span>
          </div>
          <span className="block ml-auto text-center text-primary text-sm font-normal leading-5">
            <sup>₫</sup>
            {extraSpice.price.toLocaleString()}
          </span>
        </div>
      )}
    </article>
  );
};

export default OrderItem;
