import { Routes, Route, Link } from "react-router-dom";
import Patients from "./dashboard/Patients";
import Doctors from "./dashboard/Doctors";
import Statistics from "./dashboard/Statistics";

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <nav>
        <ul>
          <li>
            <Link to="patients">Patients</Link>
          </li>
          <li>
            <Link to="doctors">Doctors</Link>
          </li>
          <li>
            <Link to="statistics">Statistics</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/patients" element={<Patients />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
