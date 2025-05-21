import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Public() {
  const { username, isAdmin, isFounder } = useAuth();

  return (
    <section>
      <h1>Welcome {username}!</h1>

      <p>
        <Link to="/dash/projects">View projects</Link>
      </p>

      <p>
        <Link to="/dash/projects/new">Add New project</Link>
      </p>

      {(isAdmin || isFounder) && (
        <p>
          <Link to="/dash/clients">View Clients</Link>
        </p>
      )}

      {(isAdmin || isFounder) && (
        <p>
          <Link to="/dash/clients/new">Add New Client</Link>
        </p>
      )}
    </section>
  );
}
