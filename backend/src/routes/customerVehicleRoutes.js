const express = require("express");

const router = express.Router();

const {
  createCustomerVehicle,
} = require("../controllers/customerVehicleController");

router.get("/", (req, res) => {
  res.json([]);
});

router.post(
  "/",
  createCustomerVehicle
);

module.exports = router;