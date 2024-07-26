import { useEffect, useState } from "react";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/doctors")
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data.data);
        console.log(data);
      });
  }, []);
  return (
    <div>
      <h1>Our Doctors</h1>
      {doctors.map((e) => (
        <ul key={e.id}>
          <li>
            <b>
              <i>{e.name.toUpperCase()}</i>
            </b>
          </li>
          <p>{e.experience}</p>
          <p>{e.contactInfo}</p>
        </ul>
      ))}
    </div>
  );
};

export default Doctors;
