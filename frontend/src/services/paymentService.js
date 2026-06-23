import axios from "axios";

const API =
  `${import.meta.env.VITE_API_URL}/payments`;

export const getPayments = () =>
  axios.get(API);

export const createPayment = (data) =>
  axios.post(API, data);