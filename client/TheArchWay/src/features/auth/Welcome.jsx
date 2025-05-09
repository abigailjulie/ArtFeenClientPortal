import React from "react";
import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <section className="h-100 d-flex flex-column justify-content-center align-items-center">
      <h1>The ArchWay</h1>
      <p>A new way of connected clients to the architecture process.</p>
      <p className="d-flex flex-column">
        <Link to="/login">Login</Link>
        <Link to="/dash/projects">View projects</Link>
        <Link to="/dash/clients">View clients</Link>
      </p>
    </section>
  );
}
