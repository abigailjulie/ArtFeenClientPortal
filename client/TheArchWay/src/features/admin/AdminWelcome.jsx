import React from "react";
import { Link } from "react-router-dom";

export default function AdminWelcome() {
  return (
    <section>
      <h2>Admin Dashboard</h2>
      <ul>
        <li>
          <Link to="/dash/clients">Manage Clients</Link>
        </li>
        <li>
          <Link to="/dash/projects">Manage Projects</Link>
        </li>
      </ul>
    </section>
  );
}
