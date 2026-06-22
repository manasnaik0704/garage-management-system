const db = require("../config/db");

// Get All Vehicles
exports.getVehicles = (req, res) => {
  const sql = `
    SELECT
      vehicles.*,
      customers.name AS customer_name,
      customers.mobile
    FROM vehicles
    JOIN customers
    ON vehicles.customer_id = customers.id
    ORDER BY vehicles.id DESC
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);

    res.json(results);
  });
};

// Add Vehicle
exports.addVehicle = (req, res) => {
  const {
    customer_id,
    vehicle_number,
    vehicle_model,
    vehicle_make,
    km_reading,
    fuel_level
  } = req.body;

  const sql = `
    INSERT INTO vehicles
    (
      customer_id,
      vehicle_number,
      vehicle_model,
      vehicle_make,
      km_reading,
      fuel_level
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      customer_id,
      vehicle_number,
      vehicle_model,
      vehicle_make,
      km_reading,
      fuel_level
    ],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        success: true,
        message: "Vehicle Added Successfully"
      });
    }
  );
};

// Delete Vehicle
exports.deleteVehicle = (req, res) => {
  db.query(
    "DELETE FROM vehicles WHERE id=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        success: true,
        message: "Vehicle Deleted"
      });
    }
  );
};