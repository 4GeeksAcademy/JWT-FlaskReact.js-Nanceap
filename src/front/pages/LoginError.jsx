import React from "react";
import { useLocation, Link } from "react-router-dom";

export const LoginError = () => {
  const location = useLocation();
  const message =
    location.state?.message || "Tu usuario o contraseña es incorrecto.";

  return (
    <div className="container mt-5">
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">No se pudo iniciar sesión</h4>
        <p className="mb-0">{message}</p>
      </div>

      <div className="d-flex gap-2">
        <Link to="/login" className="btn btn-outline-primary">
          Volver al login
        </Link>
      </div>
    </div>
  );
};

