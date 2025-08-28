import React from "react";
import { useLocation, Link } from "react-router-dom";

export const LoginSuccess = () => {
  const location = useLocation();
  const email = location.state?.email;

  return (
    <div className="container mt-5">
      <div className="alert alert-success" role="alert">
        <h4 className="alert-heading">¡Te has logeado con éxito!</h4>
        {email && <p className="mb-0">Bienvenido/a: <strong>{email}</strong></p>}
      </div>

    </div>
  );
};

