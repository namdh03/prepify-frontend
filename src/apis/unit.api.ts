import { UnitResponse } from "~types/unit.type";
import http from "~utils/http";

export const GET_UNITS_QUERY_KEY = "GET_UNITS_QUERY_KEY";

export const GET_TABLE_UNITS_STALE_TIME = 30 * 1000; // 30s

export const getUnits = () => http.get<UnitResponse>("/units");
