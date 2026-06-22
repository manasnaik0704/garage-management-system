const db = require("../config/db");

exports.createCustomerVehicle = (req, res) => {
  const {
    name,
    mobile,
    address,
    notes,

    vehicle_number,
    vehicle_model,
    vehicle_make,

    km_reading,
    fuel_level,
  } = req.body;

  const customerSql = `
    INSERT INTO customers
    (name,mobile,address,notes)
    VALUES (?,?,?,?)
  `;

  db.query(
    customerSql,
    [name, mobile, address, notes],
    (err, customerResult) => {
      if (err)
        return res.status(500).json(err);

      const customerId =
        customerResult.insertId;

      const vehicleSql = `
        INSERT INTO vehicles
        (
          customer_id,
          vehicle_number,
          vehicle_model,
          vehicle_make,
          km_reading,
          fuel_level
        )
        VALUES (?,?,?,?,?,?)
      `;

      db.query(
        vehicleSql,
        [
          customerId,
          vehicle_number,
          vehicle_model,
          vehicle_make,
          km_reading,
          fuel_level,
        ],
        (err) => {
          if (err)
            return res.status(500).json(err);

          res.json({
            success: true,
            message:
              "Customer & Vehicle Added Successfully",
          });
        }
      );
    }
  );
};