import React from "react";
import { useParams } from "react-router-dom";
import { useGetClientsQuery } from "../clients/clientsApiSlice";
import PulseLoader from "react-spinners/PulseLoader";
import NewProjectForm from "./NewProjectForm";

export default function NewProject() {
  const { clientId } = useParams();
  const { client } = useGetClientsQuery("clientsList", {
    selectFromResult: ({ data }) => ({
      client: data?.entities[clientId],
    }),
  });

  if (!client) return <PulseLoader color={"var(--Forest)"} />;

  return <NewProjectForm clientId={client.id} />;
}
