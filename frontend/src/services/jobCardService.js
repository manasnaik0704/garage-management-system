import axios from "axios";

const API =
  `${import.meta.env.VITE_API_URL}/jobcards`;

export const getJobCards = () =>
  axios.get(API);

export const createJobCard = (data) =>
  axios.post(API, data);

export const updateJobStatus = (
  id,
  status
) =>
  axios.put(
    `${API}/${id}/status`,
    {
      status
    }
  );