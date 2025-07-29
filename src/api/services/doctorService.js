import axios from "../axiosInstance";
import API from "../endpoints";

export const doctorGet = () => {
  return axios.get(API.doctor.doctor);
};

export const doctorGetId = (user_id) => {
  return axios.get(API.doctor.doctorId(user_id));
};

export const doctorPost = (data) => {
  return axios.post(API.doctor.doctor, data);
};

export const doctorDelete = (user_id) => {
  return axios.delete(API.doctor.doctorId(user_id));
};

export const doctorPut = (user_id) => {
  return axios.put(API.doctor.doctorId(user_id));
};
