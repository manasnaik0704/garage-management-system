const express = require("express");

const router = express.Router();

const {
  getJobCards,
  createJobCard,
  updateJobStatus,
} = require("../controllers/jobCardController");

router.get("/", getJobCards);

router.post("/", createJobCard);

router.put("/:id/status", updateJobStatus);

module.exports = router;