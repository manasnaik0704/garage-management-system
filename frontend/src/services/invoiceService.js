import axios from "axios";

const API =
  `${import.meta.env.VITE_API_URL}/invoices`;

export const getInvoices = () =>
  axios.get(API);

export const createInvoice = (data) =>
  axios.post(API, data);

export const updateInvoicePayment = (
  id,
  paid_amount
) =>
  axios.put(
    `${API}/${id}/payment`,
    {
      paid_amount
    }
  );

export const deleteInvoice = (id) =>
  axios.delete(`${API}/${id}`);