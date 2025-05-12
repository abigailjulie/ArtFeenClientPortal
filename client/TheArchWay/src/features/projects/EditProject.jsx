import React, { use } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectProjectsById } from "./projectsApiSlice";
import { selectAllClients } from "../clients/clientsApiSlice";
import { Spinner } from "react-bootstrap";
import EditProjectForm from "./EditProjectForm";

export default function EditProject() {
  const { projectId } = useParams();

  const project = useSelector((state) => selectProjectsById(state, projectId));
  const clients = useSelector(selectAllClients);

  return project && clients ? (
    <EditProjectForm clients={clients} project={project} />
  ) : (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}
