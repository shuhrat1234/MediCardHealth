import axios from "../axiosInstance";
import API from "../endpoints";

export const moderatorGet = () => {
  return axios.get(API.moderator.moderator);
};

export const moderatorGetId = (user_id) => {
  return axios.get(API.moderator.moderatorId(user_id));
};

export const moderatorPost = (data) => {
  return axios.post(API.moderator.moderator, data);
};

export const moderatorDelete = (user_id) => {
  return axios.delete(API.moderator.moderatorId(user_id));
};

export const moderatorPut = (user_id) => {
  return axios.put(API.moderator.moderatorId(user_id));
};