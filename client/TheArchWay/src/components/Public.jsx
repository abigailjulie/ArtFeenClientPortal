import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";
import { selectAllClients } from "../features/clients/clientsApiSlice";

export default function Public() {
  const { username, isAdmin, isFounder } = useAuth();

  const clients = useSelector(selectAllClients);
  const client = clients?.find(
    (currentClient) => currentClient.username === username
  );

  return (
    <section>
      <h1>Welcome {username}!</h1>

      <p>
        <Link to="/dash/projects">View projects</Link>
      </p>

      <p>
        <Link to={`/dash/clients/${client?._id}/projects/new`}>
          Add New project
        </Link>
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
