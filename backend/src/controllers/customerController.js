const db = require("../config/db");

// Get All Customers
exports.getCustomers = (req, res) => {
  db.query(
    "SELECT * FROM customers ORDER BY id DESC",
    (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(results);
    }
  );
};
exports.getCustomerDetails = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT
      c.*,
      v.vehicle_number,
      v.vehicle_model,
      v.vehicle_make,
      v.km_reading,
      v.fuel_level
    FROM customers c
    LEFT JOIN vehicles v
    ON c.id = v.customer_id
    WHERE c.id = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err)
      return res.status(500).json(err);

    res.json(result);
  });
};

// Add Customer
exports.addCustomer = (req, res) => {
  const { name, mobile, address, notes } = req.body;

  const sql = `
    INSERT INTO customers
    (name, mobile, address, notes)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name, mobile, address, notes],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        success: true,
        message: "Customer Added Successfully",
      });
    }
  );
};

// Delete Customer
exports.deleteCustomer = (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM customers WHERE id=?",
    [id],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        success: true,
        message: "Customer Deleted",
      });
    }
  );
};