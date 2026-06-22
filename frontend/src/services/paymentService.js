import axios from "axios";

const API =
  "http://localhost:5001/api/payments";

export const getPayments = () =>
  axios.get(API);

export const createPayment = (data) =>
  axios.post(API, data);