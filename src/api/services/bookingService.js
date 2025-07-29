import axios from "../axiosInstance";
import API from "../endpoints";

export const aviability = () => {
  return axios.get(API.booking.aviability);
};

export const bookCreate = (data) => {
  return axios.post(API.booking.bookCreate, data);
};

export const bookList = () => {
  return axios.get(API.booking.bookList);
};

export const bookDelete = (id) =>{
    return axios.delete(API.booking.bookDelete(id))
}
export const bookUpdate = (id) =>{
    return axios.put(API.booking.bookUpdate(id))
}

