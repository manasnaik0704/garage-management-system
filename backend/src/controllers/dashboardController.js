const db = require("../config/db");

exports.getDashboardStats = (req, res) => {
  const data = {};

  db.query(
    "SELECT COUNT(*) AS total FROM customers",
    (err, customers) => {
      if (err) return res.status(500).json(err);

      data.customers = customers[0].total;

      db.query(
        "SELECT COUNT(*) AS total FROM vehicles",
        (err, vehicles) => {
          if (err) return res.status(500).json(err);

          data.vehicles = vehicles[0].total;

          db.query(
            "SELECT COUNT(*) AS total FROM quotations",
            (err, quotations) => {
              if (err) return res.status(500).json(err);

              data.quotations = quotations[0].total;

              db.query(
                `
                SELECT COUNT(*) AS total
                FROM job_cards
                WHERE status != 'Delivered'
                `,
                (err, jobs) => {
                  if (err)
                    return res.status(500).json(err);

                  data.job_cards = jobs[0].total;

                  res.json(data);
                }
              );
            }
          );
        }
      );
    }
  );
};