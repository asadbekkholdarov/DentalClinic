import { useEffect, useState } from "react";
import axios from "axios";

function Doctors() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/doctors")
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{message.length}</p>
      </header>
    </div>
  );
}

export default Doctors;
