import { GetAreasResponse } from "~types/area.type";
import http from "~utils/http";

export const GET_AREAS_QUERY_KEY = "GET_AREAS_QUERY_KEY";

export const GET_AREAS_STALE_TIME = 30 * 1000; // 30 seconds

export const getAreas = () => http.get<GetAreasResponse>("/area");
