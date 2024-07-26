// backend/controllers/reportController.js
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");

exports.generateReport = async (req, res) => {
  const { period } = req.params;
  const now = new Date();
  let startDate;
  let endDate = new Date(now);

  // Determine the start date based on the period
  if (period === "weekly") {
    startDate = new Date(now.setDate(now.getDate() - 7));
  } else if (period === "monthly") {
    startDate = new Date(now.setMonth(now.getMonth() - 1));
  } else {
    startDate = new Date(now.setDate(now.getDate())); // daily
  }
  console.log(startDate);
  // Reset the time part to the start of the day for the startDate and endDate
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(23, 59, 59, 999);

  try {
    const doctors = await Doctor.find();
    const patients = await Patient.find({
      "medicalHistory.date": {
        $gte: startDate,
        $lte: endDate,
      },
    });

    const report = doctors.map((doctor) => {
      const patientsServed = patients.filter((patient) =>
        patient.medicalHistory.some((history) => history.doctor === doctor.name.toLowerCase())
      );

      const totalRevenue = patientsServed.reduce((sum, patient) => {
        const revenue = patient.medicalHistory
          .filter((history) => history.doctor === doctor.name.toLowerCase())
          .reduce((innerSum, history) => innerSum + (history.revenue || 0), 0);
        return sum + revenue;
      }, 0);

      return {
        doctor: doctor.name.toLowerCase(),
        patientsServed: patientsServed.length,
        total: totalRevenue,
        demographics: patientsServed.map((patient) => ({
          age: patient.age,
          name: patient.firstName,
          revenue:
            patient.medicalHistory
              .filter((history) => history.doctor === doctor.name.toLowerCase())
              .map((e) => e.revenue)[0] || 0,
          date: patient.medicalHistory
            .filter((history) => history.doctor === doctor.name.toLowerCase())
            .map((e) => e.date)[0]
            .toLocaleString(),
        })),
      };
    });

    res.status(200).json(report);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
