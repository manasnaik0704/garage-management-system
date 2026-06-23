import axios from "axios";

const API =
  `${import.meta.env.VITE_API_URL}/customers`;

export const getCustomers = () =>
  axios.get(API);

export const addCustomer = (data) =>
  axios.post(API, data);

export const deleteCustomer = (id) =>
  axios.delete(`${API}/${id}`);