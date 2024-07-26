// src/components/dashboard/Statistics.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const Statistics = () => {
  const [report, setReport] = useState([]);

  useEffect(() => {
    axios
      .get("/api/reports/weekly")
      .then((response) => {
        setReport(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the report!", error);
      });
  }, []);

  return (
    <div>
      <h1>Weekly Statistics</h1>
      {report.map((r, index) => (
        <div key={index}>
          <h2>Doctor: {r.doctor}</h2>
          <p>Patients Served: {r.patientsServed}</p>
          <p>Revenue: ${r.revenue}</p>
          <h3>Patient Demographics:</h3>
          <ul>
            {r.demographics.map((demo, i) => (
              <li key={i}>
                Age: {demo.age}, Gender: {demo.gender}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Statistics;
