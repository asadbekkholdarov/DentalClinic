// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const patientRoutes = require("./routes/patientRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: ["dental-clinic-sage-iota.vercel.app"],
  methods: ["POST", "GET", "DELETE", "UPDATE"],
  credentials: true
}));
app.use(bodyParser.json());

// Database connection
mongoose
  .connect(
    "mongodb+srv://507asadali:ZHnycYHnFtVjMBxK@dentalclinic.t6twnga.mongodb.net/?retryWrites=true&w=majority&appName=DentalClinic"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

//  {
// useNewUrlParser: true,
// useUnifiedTopology: true,
// }
// Routes
app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/reports", reportRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
