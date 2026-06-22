import axios from "axios";

export const getCustomerDetails = (id) => {
  return axios.get(
    `http://localhost:5001/api/customers/${id}`
  );
};