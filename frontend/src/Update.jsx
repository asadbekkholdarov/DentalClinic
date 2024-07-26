import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams } from "react-router-dom";

function Update() {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [medicalHistory, setMedicalHistory] = useState([
    { treatment: "", date: "", doctor: "", revenue: "" },
  ]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/patients/${patientId}`)
      .then((response) => {
        const {
          firstName,
          lastName,
          age,
          gender,
          phone,
          address,
          medicalHistory,
        } = response.data;
        setFirstName(firstName);
        setLastName(lastName);
        setAge(age);
        setGender(gender);
        setPhone(phone);
        setAddress(address);
        setMedicalHistory(
          medicalHistory.length > 0
            ? medicalHistory
            : [{ treatment: "", date: "", doctor: "", revenue: "" }]
        );
      })
      .catch((error) => console.log(error));
  }, [patientId]);

  const handleMedicalHistoryChange = (index, field, value) => {
    setMedicalHistory((prevHistory) =>
      prevHistory.map((entry, i) =>
        i === index ? { ...entry, [field]: value } : entry
      )
    );
  };

  const addMedicalHistoryEntry = () => {
    setMedicalHistory((prevHistory) => [
      ...prevHistory,
      { treatment: "", date: "", doctor: "", revenue: "" },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      firstName,
      lastName,
      age,
      gender,
      phone,
      address,
      medicalHistory: medicalHistory.map((entry) => ({
        ...entry,
        date: entry.date ? new Date(entry.date).toISOString() : undefined,
      })),
    };

    axios
      .put(`http://localhost:5000/api/patients/${patientId}`, userData)
      .then((result) => {
        console.log(result);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mt-5">
      <h2>Update Patient Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                placeholder="Enter first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                placeholder="Enter last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                className="form-control"
                id="age"
                placeholder="Enter age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                placeholder="Enter phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="Enter address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <input
                type="text"
                className="form-control"
                id="gender"
                placeholder="Enter gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </div>
          </div>
        </div>

        <h2 className="m-2">Medical History</h2>
        {medicalHistory.map((entry, index) => (
          <div key={index} className="row border p-3 mb-3">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor={`treatment-${index}`}>Treatment</label>
                <input
                  type="text"
                  className="form-control"
                  id={`treatment-${index}`}
                  placeholder="Enter treatment"
                  value={entry.treatment}
                  onChange={(e) =>
                    handleMedicalHistoryChange(
                      index,
                      "treatment",
                      e.target.value
                    )
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor={`doctor-${index}`}>Doctor</label>
                <input
                  type="text"
                  className="form-control"
                  id={`doctor-${index}`}
                  placeholder="Enter doctor"
                  value={entry.doctor}
                  onChange={(e) =>
                    handleMedicalHistoryChange(index, "doctor", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor={`date-${index}`}>Date</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  id={`date-${index}`}
                  placeholder="Enter date"
                  value={entry.date}
                  onChange={(e) =>
                    handleMedicalHistoryChange(index, "date", e.target.value)
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor={`revenue-${index}`}>Revenue</label>
                <input
                  type="number"
                  className="form-control"
                  id={`revenue-${index}`}
                  placeholder="Enter revenue"
                  value={entry.revenue}
                  onChange={(e) =>
                    handleMedicalHistoryChange(index, "revenue", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-secondary m-2"
          onClick={addMedicalHistoryEntry}
        >
          Add Medical History Entry
        </button>
        <button type="submit" className="btn btn-primary m-2">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Update;
