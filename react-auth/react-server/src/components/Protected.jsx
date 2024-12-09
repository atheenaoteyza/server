import React, { useEffect, useState } from "react";
import axios from "axios";

const Protected = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token"); // Get token from localStorage

      if (token) {
        try {
          const response = await axios.get(
            "http://localhost:5001/api/protected",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setData(response.data); // Set the protected data to state
        } catch (error) {
          console.error("Error fetching protected data", error);
        }
      } else {
        // If no token, redirect or handle the case where token is missing
        console.log("No token found. Please log in.");
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Protected Data</h1>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
};

export default Protected;
