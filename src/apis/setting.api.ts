import { SettingListResponse } from "~types/setting.type";
import http from "~utils/http";

export const GET_TABLE_SETTINGS_QUERY_KEY = "GET_TABLE_SETTINGS_QUERY_KEY";

export const GET_TABLE_SETTINGS_STALE_TIME = 30 * 1000; // 30s

export const getTableSettings = () => http.get<SettingListResponse>("/moderator/config");

export const updateSetting = (id: string, value: number | string) =>
  http.put(`/moderator/config/${id}`, {
    value,
  });
