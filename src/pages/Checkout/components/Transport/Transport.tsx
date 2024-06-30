import { FiTruck } from "react-icons/fi";

import useCheckout from "~hooks/useCheckout";
import { cn } from "~lib/utils";
import { DeliveryMethodEnum } from "~utils/enums";

const Transport = () => {
  const { form, area, checkout } = useCheckout();
  const deliveryMethodWatch = form.watch("deliveryMethod");

  const handleDeliveryMethodChange = (method: DeliveryMethodEnum) => {
    form.setValue("deliveryMethod", method);
  };

  return (
    <div className="flex-1 text-[#18181B] pl-[34px] pr-14 py-7">
      <span className="text-sm font-semibold leading-9">Phương thức vận chuyển</span>

      <article
        className={cn(
          "flex items-center justify-between mt-4 rounded-[5px] border-[1px] border-solid border-[#E4E4E7] px-3 py-1 cursor-pointer",
          {
            "border-primary": deliveryMethodWatch === DeliveryMethodEnum.INSTANT,
          },
        )}
        onClick={() => handleDeliveryMethodChange(DeliveryMethodEnum.INSTANT)}
      >
        <div>
          <span className="text-sm font-normal leading-7">Hoả tốc</span>
          <div className="flex items-center gap-1">
            <FiTruck size={14} className="text-secondary" />
            <p className="text-secondary text-xs font-normal leading-7">
              Đảm bảo nhận hàng vào ngày {checkout?.instantDate.day} tháng {checkout?.instantDate.month}
            </p>
          </div>
        </div>

        <span className="text-base font-normal leading-7">
          <sup>₫</sup>
          {(area?.instantPrice || 0).toLocaleString()}
        </span>
      </article>

      <article
        className={cn(
          "flex items-center justify-between mt-4 rounded-[5px] border-[1px] border-solid border-[#E4E4E7] px-3 py-1 cursor-pointer",
          {
            "border-primary": deliveryMethodWatch === DeliveryMethodEnum.STANDARD,
          },
        )}
        onClick={() => handleDeliveryMethodChange(DeliveryMethodEnum.STANDARD)}
      >
        <div>
          <span className="text-sm font-normal leading-7">Nhanh</span>
          <div className="flex items-center gap-1">
            <FiTruck size={14} className="text-secondary" />
            <p className="text-secondary text-xs font-normal leading-7">
              Đảm bảo nhận hàng vào ngày {checkout?.standardDate.day} tháng {checkout?.standardDate.month}
            </p>
          </div>
        </div>

        <span className="text-base font-normal leading-7">
          <sup>₫</sup>
          {(area?.standardPrice || 0).toLocaleString()}
        </span>
      </article>
    </div>
  );
};

export default Transport;
