import axios from "axios";

const API =
  "http://localhost:5001/api/customers";

export const getCustomers = () =>
  axios.get(API);

export const addCustomer = (data) =>
  axios.post(API, data);

export const deleteCustomer = (id) =>
  axios.delete(`${API}/${id}`);