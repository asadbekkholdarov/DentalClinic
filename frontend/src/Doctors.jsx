import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    lastname: "",
    contactInfo: "",
    experience: "",
    specialization: "",
    age: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/doctors")
      .then((data) => setDoctors(data.data.data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    setNewDoctor({
      ...newDoctor,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/doctors/${id}`)
      .then((res) => {
        setDoctors((prevDoctors) =>
          prevDoctors.filter((doctor) => doctor._id !== id)
        );
      })
      .catch((err) => console.error(err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/doctors",
        newDoctor
      );
      setDoctors([...doctors, response.data.data]);
      setNewDoctor({
        name: "",
        lastname: "",
        contactInfo: "",
        experience: "",
        specialization: "",
        age: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Doctors</h2>
      <table className="table table-responsive table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Lastname</th>
            <th>Contact</th>
            <th>Experience</th>
            <th>Specialization</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor._id}>
              <td>{doctor.name}</td>
              <td>{doctor.lastname || ""}</td>
              <td>{doctor.contactInfo}</td>
              <td>{doctor.experience}</td>
              <td>{doctor.specialization}</td>
              <td>{doctor.age}</td>
              <td>
                <button
                  onClick={() => handleDelete(doctor._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Add New Doctor</h2>
      <button
        className="btn btn-success"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Cancel" : "Add Doctor"}
      </button>
      {showForm && (
        <div className="d-flex justify-content-center mt-3">
          <form onSubmit={handleSubmit} className="form-group col-md-4">
            <div className="form-row">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={newDoctor.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Surname</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastname"
                  value={newDoctor.lastname}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Contact Info</label>
                <input
                  type="text"
                  className="form-control"
                  name="contactInfo"
                  value={newDoctor.contactInfo}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Experience</label>
                <input
                  type="text"
                  className="form-control"
                  name="experience"
                  value={newDoctor.experience}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Specialization</label>
                <input
                  type="text"
                  className="form-control"
                  name="specialization"
                  value={newDoctor.specialization}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Age</label>
              <input
                type="number"
                className="form-control"
                name="age"
                value={newDoctor.age}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Add Doctor
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Doctors;
