const express = require("express");
const {
  createDoctor,
  getDoctors,
  getDoctor,
  updateDoctor, // Include updateDoctor in the import
  deleteDoctor,
} = require("../controllers/doctorController");
const router = express.Router();

router.post("/", createDoctor);
router.get("/", getDoctors);
router.get("/:id", getDoctor);
router.put("/:id", updateDoctor); // Add the update route
router.delete("/:id", deleteDoctor);

module.exports = router;
