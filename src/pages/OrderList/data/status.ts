import { Option } from "~components/common/DataTableFacetedFilter";
import { ORDER_STATUS_TEXT_MAP } from "~utils/constants";
import { OrderStatus } from "~utils/enums";

const status: Option[] = [
  {
    label: ORDER_STATUS_TEXT_MAP[OrderStatus.PICKED_UP],
    value: OrderStatus.PICKED_UP,
  },
  {
    label: ORDER_STATUS_TEXT_MAP[OrderStatus.DELIVERING],
    value: OrderStatus.DELIVERING,
  },
  {
    label: ORDER_STATUS_TEXT_MAP[OrderStatus.DELIVERED],
    value: OrderStatus.DELIVERED,
  },
  {
    label: ORDER_STATUS_TEXT_MAP[OrderStatus.CREATED],
    value: OrderStatus.CREATED,
  },
  {
    label: ORDER_STATUS_TEXT_MAP[OrderStatus.CANCELED],
    value: OrderStatus.CANCELED,
  },
  {
    label: ORDER_STATUS_TEXT_MAP[OrderStatus.DELAYED],
    value: OrderStatus.DELAYED,
  },
];

export default status;
