import { ConfigResponse } from "~types/config.type";
import http from "~utils/http";

export const GET_CONFIGS_QUERY_KEY = "GET_CONFIGS_QUERY_KEY";

export const GET_CONFIGS_STALE_TIME = 30 * 1000;

export const getConfigs = () => http.get<ConfigResponse>("/moderator/config");
