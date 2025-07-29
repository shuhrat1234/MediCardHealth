import axios from "../axiosInstance";
import API from "../endpoints";

export const login = (credentials) => {
  return axios.post(API.auth.login, credentials);
};

export const verify = (credentials) => {
  return axios.post(API.auth.verify, credentials);
};

export const refreshToken = (token) => {
  return axios.post(API.auth.refresh, token);
};
