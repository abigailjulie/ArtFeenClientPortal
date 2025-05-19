import React from "react";
import { useSelector } from "react-redux";
import { selectAllClients } from "../clients/clientsApiSlice";
import NewProjectForm from "./NewProjectForm";

export default function NewProject() {
  const clients = useSelector(selectAllClients);

  if (!clients?.length) {
    return <p>Not Currently Available</p>;
  }

  return <NewProjectForm clients={clients} />;
}
