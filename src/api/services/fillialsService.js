import axios from "../axiosInstance";
import API from "../endpoints";

export const fillialsGet = () => {
  return axios.get(API.fillials.fillials);
};

export const fillialsGetId = (user_id) => {
  return axios.get(API.fillials.fillialsId(user_id));
};

export const fillialsPost = (data) => {
  return axios.post(API.fillials.fillials, data);
};

export const fillialsDelete = (user_id) => {
  return axios.delete(API.fillials.fillialsId(user_id));
};

export const fillialsPut = (user_id, data) => {
  return axios.put(API.fillials.fillialsId(user_id), data);
};