import { Option } from "~components/common/DataTableFacetedFilter";
import { ACCOUNT_ROLE_TEXT_MAP } from "~utils/constants";
import { Role } from "~utils/enums";

const roles: Option[] = [
  {
    label: ACCOUNT_ROLE_TEXT_MAP[Role.MODERATOR],
    value: Role.MODERATOR,
  },
  {
    label: ACCOUNT_ROLE_TEXT_MAP[Role.SHIPPER],
    value: Role.SHIPPER,
  },
  {
    label: ACCOUNT_ROLE_TEXT_MAP[Role.CUSTOMER],
    value: Role.CUSTOMER,
  },
];

export default roles;
