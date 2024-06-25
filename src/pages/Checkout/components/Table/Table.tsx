import { Fragment, memo } from "react";
import { Link } from "react-router-dom";

import { Table as TableShadcn, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~components/ui/table";
import configs from "~configs";
import useCheckout from "~hooks/useCheckout";

import Spice from "../Spice";

const Table = memo(() => {
  const { checkout } = useCheckout();

  return (
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
        {checkout?.items.map((item) => (
          <Fragment key={item.id}>
            <TableRow>
              <TableCell className="px-4 py-5">
                <div className="flex items-center">
                  <Link to={`${configs.routes.shop}/${item.slug}`} className="flex items-center">
                    <img src={item.image} alt="" className="w-20 h-20 rounded-[5px] object-contain" />
                    <h4 className="w-44 ml-[10px] text-sm font-normal leading-5 line-clamp-3 break-keep">
                      {item.name}
                    </h4>
                  </Link>

                  <span className="ml-auto mr-auto text-[#A1A1AA] text-sm font-normal leading-5">
                    {item.serving} người ăn
                  </span>
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
                  {(item.price * item.quantity).toLocaleString()}
                </span>
              </TableCell>
            </TableRow>

            {item.extraSpice && <Spice spice={item.extraSpice} quantity={item.quantity} />}
          </Fragment>
        ))}
      </TableBody>
    </TableShadcn>
  );
});

export default Table;
