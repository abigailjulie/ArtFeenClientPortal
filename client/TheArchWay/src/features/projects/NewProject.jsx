import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllClients } from "../clients/clientsApiSlice";
import { Spinner } from "react-bootstrap";
import NewProjectForm from "./NewProjectForm";

export default function NewProject() {
  const { clientId } = useParams();
  const clients = useSelector(selectAllClients);
  const client = clients.find((c) => c._id === clientId);

  return client ? (
    <NewProjectForm client={client} />
  ) : (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}
