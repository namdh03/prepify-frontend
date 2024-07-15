import { IngredientType } from "~types/ingredient.type";

interface SpicesProps {
  spices: IngredientType[];
}

const Spices = ({ spices }: SpicesProps) => {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold">Gia vị</h2>
      <p className="text-sm font-normal leading-6">
        Các gia vị nêm nếm không nằm trong gói nguyên liệu. Để tiện lợi và nhanh chóng hơn hãy chọn thêm gói
        <span className="text-secondary"> gia vị hoàn chỉnh </span> theo chuẩn tỉ lệ vàng của
        <strong className="text-primary font-normal"> Prepify</strong>
      </p>
      <div className="grid grid-cols-3 gap-y-8">
        {spices.map((spice) => (
          <article key={spice.id} className="flex items-center gap-[15px]">
            <figure className="w-[86px] h-[86px] rounded-full">
              <img src={spice.imageURL} alt="" className="block w-full h-full object-cover" />
            </figure>

            <div className="flex flex-col gap-[3px]">
              <span className="text-base font-normal leading-6">{spice.name}</span>
              <span className="text-[#71717A] text-sm font-medium leading-6">{spice.unit.name}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Spices;
