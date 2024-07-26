// backend/routes/patientRoutes.js
const express = require("express");
const {
  createPatient,
  getPatients,
  getPatient,
  updateMedicalHistory,
  deletePatient,
  updatePatient,
} = require("../controllers/patientController");
const router = express.Router();

router.post("/", createPatient);
router.get("/", getPatients);
router.get("/:id", getPatient);
router.put("/:id/medicalHistory", updateMedicalHistory);
router.delete("/:id", deletePatient);
router.put("/:id", updatePatient);

module.exports = router;
