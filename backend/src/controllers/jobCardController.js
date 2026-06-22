const db = require("../config/db");

const getJobCards = (req, res) => {
  const sql = `
    SELECT
      jc.*,
      c.name AS customer_name,
      v.vehicle_number
    FROM job_cards jc
    LEFT JOIN customers c
      ON jc.customer_id = c.id
    LEFT JOIN vehicles v
      ON jc.vehicle_id = v.id
    ORDER BY jc.id DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    res.json(result);
  });
};

const createJobCard = (req, res) => {
  const {
    customer_id,
    vehicle_id,
    complaint,
    diagnosis,
    current_km,
    estimated_cost,
    notes,
  } = req.body;

  const jobCardNo =
    "JC-" +
    new Date().getFullYear() +
    "-" +
    Date.now();

  const sql = `
    INSERT INTO job_cards
    (
      quotation_id,
      customer_id,
      vehicle_id,
      job_card_no,
      date_in,
      status,
      notes,
      estimated_cost,
      current_km,
      complaint,
      diagnosis
    )
    VALUES
    (
      ?,?,?,?,?,?,?,?,?,?,?
    )
  `;

  db.query(
    sql,
    [
      null,
      customer_id,
      vehicle_id,
      jobCardNo,
      new Date(),
      "Open",
      notes,
      estimated_cost,
      current_km,
      complaint,
      diagnosis,
    ],
    (err, result) => {
      if (err) {
        console.log("JOB CARD ERROR");
        console.log(err);

        return res.status(500).json(err);
      }

      res.json({
        success: true,
        message: "Job Card Created",
        job_card_no: jobCardNo,
        id: result.insertId,
      });
    }
  );
};
const updateJobStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const sql = `
    UPDATE job_cards
    SET status = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [status, id],
    (err, result) => {
      if (err)
        return res.status(500).json(err);

      res.json({
        success: true,
        message: "Status Updated",
      });
    }
  );
};
module.exports = {
  getJobCards,
  createJobCard,
  updateJobStatus,
};