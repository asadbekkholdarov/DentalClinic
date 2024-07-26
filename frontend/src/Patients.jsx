import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Accordion, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Patients() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/patients")
      .then((response) => setUsers(response.data.patients));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/patients/${id}`)
      .then((res) => {
        console.log(res);
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      })
      .catch((err) => console.log(err));
  };

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(search.toLowerCase()) ||
      user.lastName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="d-flex w-100 bg-primary justify-content-center align-items-center">
      <div className="w-100 bg-white rounded p-3">
        <Link to="/create" className="btn btn-primary mb-3">
          Add+
        </Link>
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-control mb-3"
        />
        <h2>{filteredUsers.length}</h2>
        <table className="table table-responsive">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Actions</th>
              <th>Medical History</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.age}</td>
                <td>{user.phone}</td>
                <td>{user.address}</td>
                <td>
                  <Link
                    to={`/update/${user._id}`}
                    className="btn btn-success me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={(e) => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <Link to={`/patients/${user._id}`} className="btn btn-info">
                    View Medical History
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Patients;
