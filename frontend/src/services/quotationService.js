import axios from "axios";

const API =
  `${import.meta.env.VITE_API_URL}/quotations`;

export const createQuotation = (data) =>
  axios.post(API, data);

export const getQuotations = () =>
  axios.get(API);

export const downloadQuotationPDF = (id) => {

  window.open(
    `${import.meta.env.VITE_API_URL}/quotations/${id}/pdf`,
    "_blank"
  );

};