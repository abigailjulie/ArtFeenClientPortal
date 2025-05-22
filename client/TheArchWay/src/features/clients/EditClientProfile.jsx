import React from "react";
import { useParams } from "react-router-dom";
import { useGetClientsQuery } from "./clientsApiSlice";
import PulseLoader from "react-spinners/PulseLoader";
import EditClientForm from "./EditClientForm";

export default function EditClientProfile() {
  const { clientId } = useParams();

  const { client } = useGetClientsQuery("clientsList", {
    selectFromResult: ({ data }) => ({
      client: data?.entities[clientId],
    }),
  });

  if (!client) return <PulseLoader color={"var(--Forest)"} />;

  return <EditClientForm client={client} />;
}
