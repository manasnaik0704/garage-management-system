import axios from "axios";

const API =
  `${import.meta.env.VITE_API_URL}/customer-vehicle`;

export const addCustomerVehicle = (data) => {

  return axios.post(API, data);

};