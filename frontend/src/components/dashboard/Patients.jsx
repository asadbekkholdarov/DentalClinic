const Patients = () => {
  // const [patients, setPatients] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("/api/patients")
  //     .then((response) => {
  //       setPatients(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("There was an error fetching the patients!", error);
  //     });
  // }, []);

  return (
    <div>
      <h1>Patients</h1>
      <ul>
        {/* {patients.map((patient) => (
          <li key={patient._id}>
            <h2>
              {patient.firstName} {patient.lastName}
            </h2>
            <p>Age: {patient.age}</p>
            <p>Address: {patient.address}</p>
            <p>Phone: {patient.phone}</p>
          </li>
        ))} */}
      </ul>
    </div>
  );
};

export default Patients;
