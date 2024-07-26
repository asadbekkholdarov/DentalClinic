const Doctor = require("../models/Doctor");

exports.createDoctor = async (req, res) => {
  try {
    const savedDoctor = await Doctor.create(req.body);
    res.status(201).json({
      status: "success",
      data: savedDoctor,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json({
      status: "success",
      length: doctors.length,
      data: doctors,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: doctor,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateDoctor = async (req, res) => {
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: updatedDoctor,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
