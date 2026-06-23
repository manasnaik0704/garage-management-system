import axios from "axios";

export const getCustomerDetails = (id) => {

  return axios.get(
    `${import.meta.env.VITE_API_URL}/customers/${id}`
  );

};