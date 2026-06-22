import axios from "axios";

export const getDashboardStats = () => {
  return axios.get(
    "http://localhost:5001/api/dashboard"
  );
};