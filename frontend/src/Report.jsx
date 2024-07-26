import React, { useEffect, useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

function Report() {
  const [report, setReport] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/reports/daily").then((response) => {
      setReport(response.data);
    });
  }, []);

  const exportToExcel = () => {
    // Flatten the report data for easier processing
    const flattenData = report.flatMap((item) => {
      if (item.demographics.length === 0) {
        return [
          {
            Doctor: item.doctor,
            TotalRevenue: item.total,
            PatientsServed: item.patientsServed,
            PatientName: "No demographics data",
            Age: "",
            Revenue: "",
            Date: "",
          },
        ];
      } else {
        return item.demographics.map((d) => ({
          Doctor: item.doctor,
          TotalRevenue: item.total,
          PatientsServed: item.patientsServed,
          PatientName: d.name,
          Age: d.age,
          Revenue: d.revenue,
          Date: d.date,
        }));
      }
    });

    // Convert JSON data to worksheet
    const worksheet = XLSX.utils.json_to_sheet(flattenData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Daily Report");

    // Generate Excel file and trigger download
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    // Create a Blob from the buffer and save it
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, "daily_report.xlsx");
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">
        REPORT of {new Date().toLocaleDateString()}
      </h2>
      <div className="table-responsive">
        <table className="table table-responsive table-bordered text-center">
          <thead className="thead-dark table-light">
            <tr>
              <th rowSpan="2" className="align-middle">
                Doctor
              </th>
              <th rowSpan="2" className="align-middle">
                Total Revenue
              </th>
              <th rowSpan="2" className="align-middle">
                Patients Served
              </th>
              <th colSpan="4">Demographics</th>
            </tr>
            <tr>
              <th>Patient Name</th>
              <th>Age</th>
              <th>Revenue</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody className="table-striped">
            {report.map((e, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td
                    rowSpan={e.demographics.length + 1}
                    className="align-middle"
                  >
                    {e.doctor}
                  </td>
                  <td
                    rowSpan={e.demographics.length + 1}
                    className="align-middle"
                  >
                    {e.total}
                  </td>
                  <td
                    rowSpan={e.demographics.length + 1}
                    className="align-middle"
                  >
                    {e.patientsServed}
                  </td>
                </tr>
                {e.demographics.length > 0 ? (
                  e.demographics.map((d, idx) => (
                    <tr className="table-striped" key={idx}>
                      <td>{d.name}</td>
                      <td>{d.age}</td>
                      <td>{d.revenue}</td>
                      <td>{d.date}</td>
                    </tr>
                  ))
                ) : (
                  <td></td>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <button className="btn btn-primary mt-4" onClick={exportToExcel}>
        Export to Excel
      </button>
    </div>
  );
}

export default Report;
