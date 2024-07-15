import images from "~assets/imgs";
import { OrderProps } from "~pages/UserPurchase/UserPurchase";

import Order from "../Order";

const All = ({ orders = [] }: OrderProps) => {
  return (
    <section>
      {orders.length === 0 && (
        <article className="flex flex-col items-center justify-center gap-5 min-h-96">
          <img src={images.noOrder} alt="" className="w-[100px] h-[100px]" />
          <span className="text-lg">Chưa có đơn hàng</span>
        </article>
      )}

      {orders.map((order) => (
        <Order
          key={order.id}
          id={order.id}
          orderItems={order.orderItems}
          status={order.status}
          orderDate={order.orderDate}
          totalPrice={order.totalPrice}
          hasFeedback={order.hasFeedback}
        />
      ))}
    </section>
  );
};

export default All;
