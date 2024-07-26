const express = require("express");
const {
  getAppointments,
  addAppointment,
} = require("../controllers/appointmentController");

const router = express.Router();

router.get("/", getAppointments);
router.post("/", addAppointment);

module.exports = router;
