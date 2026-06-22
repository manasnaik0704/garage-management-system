require("dotenv").config();
require("./config/db");

const express = require("express");
const cors = require("cors");
const customerRoutes = require("./routes/customerRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const quotationRoutes = require("./routes/quotationRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const customerVehicleRoutes = require("./routes/customerVehicleRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const jobCardRoutes = require(
  "./routes/jobCardRoutes"
);
const paymentRoutes =
  require("./routes/paymentRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/customers", customerRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/quotations", quotationRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/customer-vehicle", customerVehicleRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use(
  "/api/jobcards",
  jobCardRoutes
);
app.use(
  "/api/payments",
  paymentRoutes
);

app.get("/", (req, res) => {
  res.send("Garage Management API Running");
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});