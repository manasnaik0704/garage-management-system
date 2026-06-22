import axios from "axios";

const API =
  "http://localhost:5001/api/quotations";

export const createQuotation = (data) =>
  axios.post(API, data);

export const downloadQuotationPDF = (
  id
) => {
  window.open(
    `http://localhost:5001/api/quotations/${id}/pdf`,
    "_blank"
  );
};

export const getQuotations = () =>
  axios.get(API);