const Appointment = require("../models/Appointment");

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate("patient");
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addAppointment = async (req, res) => {
  const { patient, date, reason } = req.body;
  try {
    const newAppointment = new Appointment({ patient, date, reason });
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
