import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectClientById } from "./clientsApiSlice";
import { Spinner } from "react-bootstrap";
import EditClientForm from "./EditClientForm";

export default function EditClientProfile() {
  const { clientId } = useParams();
  const client = useSelector((state) => selectClientById(state, clientId));

  return client ? (
    <EditClientForm client={client} />
  ) : (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}
