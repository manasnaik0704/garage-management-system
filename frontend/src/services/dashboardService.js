import axios from "axios";

export const getDashboardStats = () => {

  return axios.get(
    `${import.meta.env.VITE_API_URL}/dashboard`
  );

};