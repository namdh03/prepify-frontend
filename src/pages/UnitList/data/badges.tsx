import { Badge } from "~components/ui/badge";
import { cn } from "~lib/utils";
import { UnitEnum, UnitText } from "~utils/enums";

const badges = {
  [UnitEnum.INGREDIENT]: {
    text: UnitText.INGREDIENT,
    className: cn("text-sm font-normal leading-5 px-5 border-secondary bg-[#CFE4D2]"),
  },
  [UnitEnum.NUTRITION]: {
    text: UnitText.NUTRITION,
    className: cn("text-sm font-normal leading-5 px-5 border-primary bg-orange-300"),
  },
  [UnitEnum.ALL]: (
    <div className="flex items-center gap-3">
      <Badge variant="outline" className={cn("text-sm font-normal leading-5 px-5 border-secondary bg-[#CFE4D2]")}>
        {UnitText.INGREDIENT}
      </Badge>
      <Badge variant="outline" className={cn("text-sm font-normal leading-5 px-5 border-primary bg-orange-300")}>
        {UnitText.NUTRITION}
      </Badge>
    </div>
  ),
  default: {
    text: "Không xác định",
    className: cn("text-sm font-normal leading-5 px-5"),
  },
};

export default badges;
