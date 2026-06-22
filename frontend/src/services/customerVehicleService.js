import axios from "axios";

const API =
  "http://localhost:5001/api/customer-vehicle";

export const addCustomerVehicle = (data) => {
  return axios.post(API, data);
};