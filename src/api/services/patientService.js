import axios from "../axiosInstance";
import API from "../endpoints";

export const patientGet = () => {
  return axios.get(API.patient.patient);
};

export const patientGetId = (user_id) => {
  return axios.get(API.patient.patientId(user_id));
};

export const patientPost = (data) => {
  return axios.post(API.patient.patient, data);
};

export const patientDelete = (user_id) => {
  return axios.delete(API.patient.patientId(user_id));
};

export const patientPut = (user_id, data) => {
  return axios.put(API.patient.patientId(user_id), data);
};
