import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Welcome() {
  return (
    <section
      className="h-100 d-flex flex-column justify-content-center align-items-center"
      style={{
        backgroundColor: "var(--Forest)",
        color: "var(--White)",
      }}
    >
      <h1
        className="text-white fw-bold"
        style={{ fontSize: "var(--ft-Exlarge)" }}
      >
        The ArchWay
      </h1>
      <p>A smarter way to connect clients to the architecture process.</p>
      <p className="d-flex flex-column link-opacity-75 link-offset-2">
        <Link to="/login">Login</Link>
        <Link to="/clients">View All Clients</Link>
        <Link to="/dash/clients/:clientId/projects/new">Add New Project</Link>
      </p>
    </section>
  );
}
