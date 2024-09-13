import axios from "axios";
import React, { useEffect, useState } from "react";

const Profile = ({ token }) => {
  const [resdata, setResData] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    console.log("Fetching data with token:", token);
    fetchData();
  }, [token]);

  const fetchData = async () => {
    if (!token) {
      setMsg("Token is missing.");
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:5000/api/user/get-user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response data:", response.data);
      setResData(response.data.data);
      setMsg(response.data.message);
    } catch (err) {
      console.log("Error:", err);
      setMsg(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div>
      {resdata.length > 0 ? (
        resdata.map((ele, index) => (
          <div key={index}>
            <div className="col">
              <div className="card px-3 py-4 shadow-sm">
                <div className="card-header">{ele.username}</div>
                <div className="card-body">
                  <h5 className="card-title">{ele.email}</h5>
                  <h5 className="card-title">{ele.role}</h5>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>{msg}</p>
      )}
    </div>
  );
};

export default Profile;
