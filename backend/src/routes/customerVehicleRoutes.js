const express = require("express");

const router = express.Router();

const {
  createCustomerVehicle,
} = require("../controllers/customerVehicleController");

router.post(
  "/",
  createCustomerVehicle
);

module.exports = router;