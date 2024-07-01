import { UnitResponse } from "~types/unit.type";
import http from "~utils/http";

export const GET_UNITS_QUERY_KEY = "GET_UNITS_QUERY_KEY";

export const getUnits = () => http.get<UnitResponse>("/units");
