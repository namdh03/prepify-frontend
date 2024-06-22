import { Separator } from "~components/ui/separator";

// TODO: Waiting for API
const Guide = () => {
  return (
    <ol>
      <li>
        <span className="text-base font-normal leading-6">
          1. Rửa sạch các miếng cá basa, để ráo, ướp cá với ½ muỗng cà phê muối khoảng 15 phút. Hành lá cắt nhuyễn.
        </span>

        <Separator className="my-3" />
      </li>

      <li>
        <span className="text-base font-normal leading-6">
          2. Cách kho cá basa: Bắc chảo không dính lên bếp, cho một muỗng dầu ăn và 2 muỗng cà phê đường vào chảo. Đợi
          cho đến khi đường tan và chuyển màu cánh gián thì cho 1 muỗng tỏi và hành băm nhỏ vào phi thơm, tắt bếp.
        </span>

        <Separator className="my-3" />
      </li>

      <li>
        <span className="text-base font-normal leading-6">
          3. Cách làm cá basa kho tộ: Cho cá vào chảo trên, thêm 1 muỗng nước mắm và 3 muỗng cà phê đường, bật bếp để
          lửa to cho sôi bùng lên thì giảm xuống ở mức lửa nhỏ nhất, thêm 2 muỗng nước lọc, thả ớt trái vào, đun đến khi
          nước sệt lại là được.
        </span>

        <Separator className="my-3" />
      </li>

      <li>
        <span className="text-base font-normal leading-6">
          4. Tắt bếp, rải hành lá vào cùng chút tiêu sẽ giúp cá khô tộ thơm ngon hơn nhé.
        </span>
      </li>
    </ol>
  );
};

export default Guide;
