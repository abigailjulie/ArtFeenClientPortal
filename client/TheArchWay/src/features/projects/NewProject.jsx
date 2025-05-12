import React from "react";
import { useSelector } from "react-redux";
import { selectAllClients } from "./clientsApiSlice";
import { Spinner } from "react-bootstrap";
import NewProjectForm from "./NewProjectForm";

export default function NewProject() {
  const client = useSelector(selectAllClients);

  return client ? (
    <NewProjectForm client={client} />
  ) : (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}
