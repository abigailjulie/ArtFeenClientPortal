import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetClientsQuery } from "../features/clients/clientsApiSlice";
import useAuth from "../hooks/useAuth";
import PulseLoader from "react-spinners/PulseLoader";

export default function Public() {
  const navigate = useNavigate();
  const { username, isAdmin, isFounder } = useAuth();

  const { client, isLoading } = useGetClientsQuery("clientsList", {
    selectFromResult: ({ data, isLoading }) => ({
      isLoading,
      client: data?.ids
        .map((id) => data.entities[id])
        .find((c) => c.username === username),
    }),
  });

  useEffect(() => {
    if (!isLoading && client) {
      navigate(`/dash/clients/${client._id}/projects`);
    }
  }, [client, navigate, isLoading]);

  if (isLoading) return <PulseLoader color={"var(--Forest)"} />;

  return (
    <section>
      <h1>Welcome {username}!</h1>

      <p>
        <Link to={`/dash/clients/${client?._id}/projects`}>View projects</Link>
      </p>

      <p>
        <Link to={`/dash/clients/${client?._id}/projects/new`}>
          Add New project
        </Link>
      </p>

      {(isAdmin || isFounder) && (
        <>
          <p>
            <Link to="/dash/clients">View Clients</Link>
          </p>
          <p>
            <Link to="/dash/clients/new">Add New Client</Link>
          </p>
        </>
      )}
    </section>
  );
}
