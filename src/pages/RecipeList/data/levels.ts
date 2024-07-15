import { MdSignalCellular1Bar, MdSignalCellular3Bar, MdSignalCellular4Bar } from "react-icons/md";

import { Option } from "~components/common/DataTableFacetedFilter";
import { LevelCook, LevelCookText } from "~utils/enums";

const levels: Option[] = [
  {
    label: LevelCookText.EASY,
    value: LevelCook.EASY,
    icon: MdSignalCellular4Bar,
  },
  {
    label: LevelCookText.MEDIUM,
    value: LevelCook.MEDIUM,
    icon: MdSignalCellular3Bar,
  },
  {
    label: LevelCookText.HARD,
    value: LevelCook.HARD,
    icon: MdSignalCellular1Bar,
  },
];

export default levels;
