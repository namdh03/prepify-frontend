import { TableCell, TableRow } from "~components/ui/table";
import { ExtraSpice } from "~types/meal-kit.type";

interface SpiceProps {
  spice: ExtraSpice;
  quantity: number;
}

const Spice = ({ spice, quantity }: SpiceProps) => {
  return (
    <TableRow className="text-center [&>*]:px-4 [&>*]:py-5">
      <TableCell className="text-left">
        <article className="ml-32">
          <section className="flex items-center gap-[10px]">
            <img src={spice.image} alt="" className="w-12 h-12 rounded-[5px] object-contain" />
            <h5 className="w-44 text-sm font-normal leading-5 line-clamp-3 break-keep">{spice?.name}</h5>
          </section>
        </article>
      </TableCell>
      <TableCell>
        <span className="block text-center text-sm font-normal leading-5">
          <sup>₫</sup>
          {spice.price.toLocaleString()}
        </span>
      </TableCell>
      <TableCell>{quantity}</TableCell>
      <TableCell>
        <span className="block text-center text-primary text-sm font-normal leading-5">
          <sup>₫</sup>
          {(spice.price * quantity).toLocaleString()}
        </span>
      </TableCell>
    </TableRow>
  );
};

export default Spice;
