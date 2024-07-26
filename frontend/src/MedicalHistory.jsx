import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function MedicalHistory() {
  const params = useParams();
  const patientId = params.patientId;
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newEntry, setNewEntry] = useState({
    treatment: "",
    doctor: "",
    revenue: "",
    date: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/patients/${patientId}`)
      .then((response) => {
        console.log(response.data.patient);
        setMedicalHistory(response.data.patient);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntry({
      ...newEntry,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedMedicalHistory = [...medicalHistory.medicalHistory, newEntry];
    axios
      .put(`http://localhost:5000/api/patients/${patientId}`, {
        ...medicalHistory,
        medicalHistory: updatedMedicalHistory,
      })
      .then((response) => {
        setMedicalHistory(response.data.patient);
        setNewEntry({
          treatment: "",
          doctor: "",
          revenue: "",
          date: "",
        });
        setShowForm(false);
      });
  };

  return (
    <div>
      <h2>Medical History</h2>
      <table table-responsiveclassName="table table-responsivetable-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Age</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{medicalHistory.firstName}</td>
            <td>{medicalHistory.lastName}</td>
            <td>{medicalHistory.age}</td>
            <td>{medicalHistory.phone}</td>
            <td>{medicalHistory.address}</td>
            <td>{medicalHistory.gender}</td>
          </tr>
        </tbody>
      </table>
      <table table-responsiveclassName="table">
        <thead>
          <tr>
            <th>Treatment</th>
            <th>Doctor</th>
            <th>Revenue</th>
            <th>Date</th>
          </tr>
        </thead>
        {medicalHistory.medicalHistory
          ? medicalHistory.medicalHistory.map((e, i) => (
              <tbody key={i}>
                <tr>
                  <td>{e.treatment ? e.treatment : "-"}</td>
                  <td>{e.doctor ? e.doctor : "-"}</td>
                  <td>{e.revenue ? e.revenue : 0}</td>
                  <td>{e.date}</td>
                </tr>
              </tbody>
            ))
          : ""}
      </table>
      <button
        className="btn btn-success"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Cancel" : "Add New History"}
      </button>
      {showForm && (
        <div className="d-flex justify-content-center mt-3">
          <form className="form-group col-md-4  " onSubmit={handleSubmit}>
            <div>
              <label>Treatment:</label>
              <input
                className="form-control"
                type="text"
                name="treatment"
                value={newEntry.treatment}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Doctor:</label>
              <input
                className="form-control"
                type="text"
                name="doctor"
                value={newEntry.doctor}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Revenue:</label>
              <input
                className="form-control"
                type="text"
                name="revenue"
                value={newEntry.revenue}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Date:</label>
              <input
                className="form-control"
                type="datetime-local"
                name="date"
                value={newEntry.date}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit">Add Entry</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default MedicalHistory;
