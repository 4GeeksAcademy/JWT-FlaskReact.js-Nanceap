import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) return navigate("/login");

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/private`, {
      headers: { Authorization: "Bearer " + token }
    })
      .then(resp => {
        if (!resp.ok) throw Error("Unauthorized");
        return resp.json();
      })
      .then(data => setMessage(data.msg))
      .catch(() => navigate("/login"));
  }, []);

  return (
    <div className="container mt-5">
      <h2>{message || "Loading..."}</h2>
    </div>
  );
};



