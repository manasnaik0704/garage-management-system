const express = require("express");
const router = express.Router();

const {
  getCustomers,
  addCustomer,
  deleteCustomer,
  getCustomerDetails,
} = require("../controllers/customerController");

router.get("/", getCustomers);

router.post("/", addCustomer);

router.get("/:id", getCustomerDetails);

router.delete("/:id", deleteCustomer);

module.exports = router;