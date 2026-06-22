const db = require("../config/db");

const getPayments = (req, res) => {
  const sql = `
    SELECT
      p.*,
      c.name AS customer_name,
      jc.job_card_no
    FROM payments p
    LEFT JOIN customers c
      ON p.customer_id = c.id
    LEFT JOIN job_cards jc
      ON p.job_card_id = jc.id
    ORDER BY p.id DESC
  `;

  db.query(sql, (err, result) => {
    if (err)
      return res.status(500).json(err);

    res.json(result);
  });
};

const createPayment = (req, res) => {
  const {
    customer_id,
    job_card_id,
    amount,
    payment_mode,
    payment_status,
  } = req.body;

  const sql = `
    INSERT INTO payments
    (
      customer_id,
      job_card_id,
      amount,
      payment_mode,
      payment_status
    )
    VALUES (?,?,?,?,?)
  `;

  db.query(
    sql,
    [
      customer_id,
      job_card_id,
      amount,
      payment_mode,
      payment_status,
    ],
    (err, result) => {
      if (err)
        return res.status(500).json(err);

      res.json({
        success: true,
        id: result.insertId,
      });
    }
  );
};

module.exports = {
  getPayments,
  createPayment,
};