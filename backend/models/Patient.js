// backend/models/Patient.js
const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  medicalHistory: [
    {
      treatment: { type: String },
      date: { type: Date, default: Date.now },
      doctor: { type: String },
      revenue: { type: Number },
    },
  ],
});

module.exports = mongoose.model("Patient", patientSchema);
