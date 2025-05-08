import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectClientById } from "./clientsApiSlice";
import { Spinner } from "react-bootstrap";
import EditClientForm from "./EditClientForm";

export default function EditClient() {
  const { id } = useParams();
  const client = useSelector((state) => selectClientById(state, id));

  return client ? (
    <EditClientForm client={client} />
  ) : (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}
