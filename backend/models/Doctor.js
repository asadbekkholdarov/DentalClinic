const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  age: { type: Number, required: true },
  experience: { type: String, required: true },
  specialization: { type: String, required: true },
  contactInfo: { type: String },
});

module.exports = mongoose.model("Doctor", doctorSchema);
