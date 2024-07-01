import { Option } from "~components/common/DataTableFacetedFilter";
import { MealKitStatus } from "~utils/enums";

const status: Option[] = [
  {
    label: MealKitStatus.ACTIVE,
    value: "true",
  },
  {
    label: MealKitStatus.INACTIVE,
    value: "false",
  },
];

export default status;
