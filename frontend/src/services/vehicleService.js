import axios from "axios";

const API =
  `${import.meta.env.VITE_API_URL}/vehicles`;

export const getVehicles = () =>
  axios.get(API);