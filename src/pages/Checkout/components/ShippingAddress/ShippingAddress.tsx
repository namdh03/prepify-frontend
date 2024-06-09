import { useMemo } from "react";

import icons from "~assets/icons";
import useAuth from "~hooks/useAuth";
import useCheckout from "~hooks/useCheckout";

import Modal from "../Modal";

const ShippingAddress = () => {
  const { user } = useAuth();
  const { shippingAddress } = useCheckout();
  const addressOrder = useMemo(
    () => shippingAddress.address + shippingAddress.district + shippingAddress.city,
    [shippingAddress],
  );

  return (
    <div className="mt-9 px-10 py-5 rounded-[5px] bg-white border-t-primary border-t-[5px]">
      <div className="flex items-center">
        <img src={icons.maps} alt="" />
        <h3 className="ml-3 text-primary text-2xl font-medium left-9">Địa chỉ nhận hàng</h3>
      </div>

      <div className="flex items-center gap-20 justify-between mt-3">
        <div className="flex flex-col">
          <span className="text-base font-semibold leading-9">{user?.fullname}</span>
          <span className="text-base font-semibold leading-9">{shippingAddress?.phone}</span>
        </div>

        <p className="text-base font-normal leading-9">{addressOrder}</p>

        <Modal />
      </div>
    </div>
  );
};

export default ShippingAddress;
