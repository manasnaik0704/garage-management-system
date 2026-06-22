const express = require("express");

const router = express.Router();

const {
  getInvoices,
  createInvoice,
  downloadInvoicePDF,
  updatePayment,
  deleteInvoice
} = require("../controllers/invoiceController");

router.get("/", getInvoices);

router.post("/", createInvoice);

router.get("/:id/pdf", downloadInvoicePDF);

router.put("/:id/payment", updatePayment);

router.delete("/:id", deleteInvoice);

module.exports = router;