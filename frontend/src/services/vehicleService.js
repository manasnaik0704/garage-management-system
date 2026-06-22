import axios from "axios";

const API =
  "http://localhost:5001/api/vehicles";

export const getVehicles = () =>
  axios.get(API);