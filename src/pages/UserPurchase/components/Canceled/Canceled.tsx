import images from "~assets/imgs";

import Order from "../Order";

const ordersCanceled = [
  {
    id: "1",
    orderItems: [
      {
        id: "1",
        name: "Spicy seasoned seafood noodles",
        slug: "spicy-seasoned-seafood-noodles",
        image: images.suggest1st,
        price: 2.29,
        quantity: 2,
        serving: 1,
        extraSpice: {
          id: "a",
          name: "Extra spicy",
          image: images.suggest2nd,
          price: 1.5,
        },
      },
      {
        id: "2",
        name: "Salted pasta with mushroom sauce",
        slug: "salted-pasta-with-mushroom-sauce",
        image: images.suggest1st,
        price: 2.99,
        quantity: 1,
        serving: 2,
        extraSpice: {
          id: "b",
          name: "Extra salt",
          image: images.suggest2nd,
          price: 0.5,
        },
      },
    ],
    status: "Canceled",
    orderDate: "2024-06-23T18:06:56.110+00:00",
    totalPrice: 234.78,
  },
  {
    id: "2",
    orderItems: [
      {
        id: "3",
        name: "Spicy seasoned seafood noodles",
        slug: "spicy-seasoned-seafood-noodles",
        image: images.suggest1st,
        price: 2.29,
        quantity: 2,
        serving: 1,
        extraSpice: {
          id: "d",
          name: "Extra spicy",
          image: images.suggest2nd,
          price: 1.5,
        },
      },
      {
        id: "4",
        name: "Salted pasta with mushroom sauce",
        slug: "salted-pasta-with-mushroom-sauce",
        image: images.suggest1st,
        price: 2.99,
        quantity: 1,
        serving: 2,
        extraSpice: {
          id: "c",
          name: "Extra salt",
          image: images.suggest2nd,
          price: 0.5,
        },
      },
    ],
    status: "Canceled",
    orderDate: "2024-06-23T18:06:56.110+00:00",
    totalPrice: 234.78,
  },
];

const Canceled = () => {
  return ordersCanceled.map((order) => (
    <Order
      key={order.id}
      orderItems={order.orderItems}
      status={order.status}
      orderDate={order.orderDate}
      totalPrice={order.totalPrice}
    />
  ));
};

export default Canceled;
