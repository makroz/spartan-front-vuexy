/* eslint-disable no-unused-vars */

import themeConfig from "../../../configs/themeConfig";
let endpoints;
// ** Auth Endpoints
if (themeConfig.mock) {
  endpoints = {
    loginEndpoint: "/jwt/login",
    registerEndpoint: "/jwt/register",
    refreshEndpoint: "/jwt/refresh-token",
    logoutEndpoint: "/jwt/logout",
  };
} else {
  endpoints = {
    loginEndpoint: "admin-login",
    registerEndpoint: "admin-register",
    refreshEndpoint: "admin-refresh-token",
    logoutEndpoint: "admin-logout",
  };
}

export default {
  ...endpoints,
  baseURL: themeConfig.app.API_URL,
  tokenType: "Bearer",
  storageTokenKeyName: "accessToken",
  storageRefreshTokenKeyName: "refreshToken",
};
