import React from "react";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div>
      <Link to="/patients" className="btn btn-primary m-2">
        Patients
      </Link>
      <Link to="/create" className="btn btn-primary m-2">
        Create
      </Link>
      <Link to="/report" className="btn btn-primary m-2">
        Report
      </Link>
      <Link to="/doctor" className="btn btn-primary m-2">
        Doctors
      </Link>
    </div>
  );
}

export default Home;
