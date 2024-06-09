import { memo } from "react";
import { Link } from "react-router-dom";

import images from "~assets/imgs";
import { Table as TableShadcn, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~components/ui/table";
import configs from "~configs";
import { CartItem } from "~types/cart.type";

import Popup from "../Popup";

const data: CartItem[] = [
  {
    id: "1",
    name: "Thịt kho hột vịt Thịt kho hột vịt Thịt kho hột vịt Thịt kho hột vịt Thịt kho hột vịt Thịt kho hột vịt",
    slug: "thit-kho-hot-vit",
    image: images.suggest1st,
    servings: "1 người ăn",
    price: 129200,
    quantity: 1,
    total: 200000,
  },
  {
    id: "2",
    name: "Thịt kho hột vịt",
    slug: "thit-kho-hot-vit",
    image: images.suggest2nd,
    servings: "1 người ăn",
    price: 129200,
    quantity: 1,
    total: 200000,
  },
  {
    id: "3",
    name: "Thịt kho hột vịt",
    slug: "thit-kho-hot-vit",
    image: images.suggest1st,
    servings: "1 người ăn",
    price: 129200,
    quantity: 1,
    total: 200000,
  },
  {
    id: "4",
    name: "Thịt kho hột vịt",
    slug: "thit-kho-hot-vit",
    image: images.suggest2nd,
    servings: "1 người ăn",
    price: 129200,
    quantity: 1,
    total: 200000,
  },
];

const Table = memo(() => {
  return (
    <>
      <Popup open={data.length === 0} />

      <TableShadcn className="bg-white text-[#09090B]">
        <TableHeader>
          <TableRow>
            <TableHead className="p-4 text-[#09090B] text-base font-medium leading-5">Gói nguyên liệu</TableHead>
            <TableHead className="p-4 text-[#09090B] text-center text-base font-medium leading-5">Đơn giá</TableHead>
            <TableHead className="p-4 text-[#09090B] text-center text-base font-medium leading-5">Số lượng</TableHead>
            <TableHead className="p-4 text-[#09090B] text-center text-base font-medium leading-5">Thành tiền</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="px-4 py-5">
                <div className="flex items-center">
                  <Link to={`${configs.routes.shop}/${item.slug}`} className="flex items-center">
                    <img src={item.image} alt="" className="w-20 h-20 rounded-[5px]" />
                    <h4 className="w-44 ml-[10px] text-sm font-normal leading-5 line-clamp-3 break-keep">
                      {item.name}
                    </h4>
                  </Link>

                  <span className="ml-auto mr-auto text-[#A1A1AA] text-sm font-normal leading-5">{item.servings}</span>
                </div>
              </TableCell>

              <TableCell>
                <span className="block text-center text-sm font-normal leading-5">
                  <sup>₫</sup>
                  {item.price.toLocaleString()}
                </span>
              </TableCell>

              <TableCell>
                <span className="block text-center text-sm font-normal leading-5">{item.quantity}</span>
              </TableCell>

              <TableCell>
                <span className="block text-center text-primary text-sm font-normal leading-5">
                  <sup>₫</sup>
                  {item.total.toLocaleString()}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableShadcn>
    </>
  );
});

export default Table;
