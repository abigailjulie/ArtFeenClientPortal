import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <section className="h-100 d-flex flex-column justify-content-center align-items-center">
      <h1>Login</h1>
      <p>A new way of connected clients to the architecture process.</p>
      <p className="d-flex flex-column">
        <Link to="/register/clients">Register clients</Link>
        <Link to="/register/admin">Register admin</Link>
      </p>
    </section>
  );
}
