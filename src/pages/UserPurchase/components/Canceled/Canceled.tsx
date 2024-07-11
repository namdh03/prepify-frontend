import { OrderProps } from "~pages/UserPurchase/UserPurchase";

import Order from "../Order";

const Canceled = ({ orders = [] }: OrderProps) => {
  return orders.map((order) => (
    <Order
      key={order.id}
      id={order.id}
      orderItems={order.orderItems}
      status={order.status}
      orderDate={order.orderDate}
      totalPrice={order.totalPrice}
      hasFeedback={order.hasFeedback}
    />
  ));
};

export default Canceled;
