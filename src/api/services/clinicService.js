import axios from "../axiosInstance";
import API from "../endpoints";

export const clinicDoctorsGet = (search) => {
  return axios.get(API.clinic.doctors, { params: { search } });
};

export const clinicDoctorGetById = (id) => {
  return axios.get(API.clinic.doctorId(id));
};

export const clinicServicesGet = (search) => {
  return axios.get(API.clinic.services, { params: { search } });
};

export const clinicServiceGetById = (id) => {
  return axios.get(API.clinic.serviceId(id));
};

export const clinicServicePost = (data) => {
  return axios.post(API.clinic.services, data);
};

export const clinicServicePut = (id, data) => {
  return axios.put(API.clinic.serviceId(id), data);
};

export const clinicServicePatch = (id, data) => {
  return axios.patch(API.clinic.serviceId(id), data);
};

export const clinicServiceDelete = (id) => {
  return axios.delete(API.clinic.serviceId(id));
};

export const clinicServiceAddToFillial = (id, fillial_id, data) => {
  return axios.post(API.clinic.serviceAddToFillial(id, fillial_id), data);
};

export const clinicServiceRemoveFromFillial = (id, fillial_id) => {
  return axios.delete(API.clinic.serviceRemoveFromFillial(id, fillial_id));
};