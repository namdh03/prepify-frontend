import { Cookies } from "react-cookie";

import configs from "~configs";

const cookies = new Cookies(null, { path: "/" });

export const getCookie = (name: string) => {
  return cookies.get(name);
};

export const setCookie = (name: string, value: string) => {
  cookies.set(name, value);
};

export const removeCookie = (name: string) => {
  cookies.remove(name);
};

// Access token
export const getAccessToken = () => {
  return getCookie(configs.cookies.accessToken);
};

export const setAccessToken = (token: string) => {
  setCookie(configs.cookies.accessToken, token);
};

export const removeAccessToken = () => {
  removeCookie(configs.cookies.accessToken);
};

// Refresh token
export const getRefreshToken = () => {
  return getCookie(configs.cookies.refreshToken);
};

export const setRefreshToken = (token: string) => {
  setCookie(configs.cookies.refreshToken, token);
};

export const removeRefreshToken = () => {
  removeCookie(configs.cookies.refreshToken);
};
