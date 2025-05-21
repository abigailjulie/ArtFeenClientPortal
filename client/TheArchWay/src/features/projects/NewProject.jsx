import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectClientById } from "../clients/clientsApiSlice";
import NewProjectForm from "./NewProjectForm";

export default function NewProject() {
  const { clientId } = useParams();
  const client = useSelector((state) => selectClientById(state, clientId));

  if (!client) {
    return <p>Not Currently Available</p>;
  }

  return <NewProjectForm clientId={client.id} />;
}
