/* eslint-disable implicit-arrow-linebreak */
import axios from "axios";
import jwtDefaultConfig from "./jwtDefaultConfig";

export default class JwtService {
  // ** jwtConfig <= Will be used by this service
  jwtConfig = { ...jwtDefaultConfig };
  // ** For Refreshing Token
  isAlreadyFetchingAccessToken = false;

  // ** For Refreshing Token
  subscribers = [];

  constructor(jwtOverrideConfig) {
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig };
    //axios.defaults.baseURL = this.jwtConfig.baseURL;
    // ** Request Interceptor
    axios.interceptors.request.use(
      (config) => {
        config.baseURL = this.jwtConfig.baseURL;
        // ** Get token from localStorage
        const accessToken = this.getToken();

        // ** If token is present add it to request's Authorization Header
        if (accessToken) {
          // ** eslint-disable-next-line no-param-reassign
          config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // ** Add request/response interceptor
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        // ** const { config, response: { status } } = error
        const { config, response } = error;
        const originalRequest = config;

        // ** if (status === 401) {
        if (response && response.status === 401) {
          if (!this.isAlreadyFetchingAccessToken) {
            this.isAlreadyFetchingAccessToken = true;
            this.refreshToken().then((r) => {
              this.isAlreadyFetchingAccessToken = false;

              // ** Update accessToken in localStorage
              this.setToken(r.data.accessToken);
              this.setRefreshToken(r.data.refreshToken);

              this.onAccessTokenFetched(r.data.accessToken);
            });
          }
          const retryOriginalRequest = new Promise((resolve) => {
            this.addSubscriber((accessToken) => {
              // ** Make sure to assign accessToken according to your response.
              // ** Check: https://pixinvent.ticksy.com/ticket/2413870
              // ** Change Authorization header
              originalRequest.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`;
              resolve(this.axios(originalRequest));
            });
          });
          return retryOriginalRequest;
        }
        return Promise.reject(error);
      }
    );
  }

  onAccessTokenFetched(accessToken) {
    this.subscribers = this.subscribers.filter((callback) =>
      callback(accessToken)
    );
  }

  addSubscriber(callback) {
    this.subscribers.push(callback);
  }

  getToken() {
    return JSON.parse(localStorage.getItem(this.jwtConfig.storageTokenKeyName));
  }

  getRefreshToken() {
    return localStorage.getItem(this.jwtConfig.storageRefreshTokenKeyName);
  }

  setToken(value) {
    localStorage.setItem(this.jwtConfig.storageTokenKeyName, value);
  }

  setRefreshToken(value) {
    localStorage.setItem(this.jwtConfig.storageRefreshTokenKeyName, value);
  }

  login(...args) {
    return axios.post(this.jwtConfig.loginEndpoint, ...args);
  }

  register(...args) {
    return axios.post(this.jwtConfig.registerEndpoint, ...args);
  }

  refreshToken() {
    return axios.post(this.jwtConfig.refreshEndpoint, {
      refreshToken: this.getRefreshToken(),
    });
  }

  post(endpoint, payload) {
    return axios.post(endpoint, payload);
  }
  get(endpoint, payload) {
    return axios.get(endpoint, payload);
  }
  put(endpoint, payload) {
    return axios.put(endpoint, payload);
  }
  delete(endpoint, payload) {
    return axios.delete(endpoint, payload);
  }
}
