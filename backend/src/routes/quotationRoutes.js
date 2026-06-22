const express = require("express");

const router = express.Router();

const {
  getQuotations,
  createQuotation,
  convertToJobCard,
  downloadQuotationPDF
} = require("../controllers/quotationController");

router.post("/", createQuotation);

router.post("/:id/convert", convertToJobCard);

router.get(
  "/:id/pdf",
  downloadQuotationPDF
);

router.get("/", getQuotations);

module.exports = router;