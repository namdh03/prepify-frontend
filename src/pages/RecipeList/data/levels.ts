import { MdSignalCellular1Bar, MdSignalCellular3Bar, MdSignalCellular4Bar } from "react-icons/md";

import { Option } from "~components/common/DataTableFacetedFilter";
import { LevelCook } from "~utils/enums";

const levels: Option[] = [
  {
    label: "Dễ",
    value: LevelCook.EASY,
    icon: MdSignalCellular4Bar,
  },
  {
    label: "Trung bình",
    value: LevelCook.MEDIUM,
    icon: MdSignalCellular3Bar,
  },
  {
    label: "Khó",
    value: LevelCook.HARD,
    icon: MdSignalCellular1Bar,
  },
];

export default levels;
