import React from "react";
import { useParams } from "react-router-dom";
import { useGetClientsQuery } from "../clients/clientsApiSlice";
import { useGetProjectsQuery } from "./projectsApiSlice";
import useAuth from "../../hooks/useAuth";
import PulseLoader from "react-spinners/PulseLoader";
import EditProjectForm from "./EditProjectForm";

export default function EditProject() {
  const { projectId } = useParams();

  const { username, isAdmin, isFounder } = useAuth();

  const { project } = useGetProjectsQuery("projectsList", {
    selectFromResult: ({ data }) => ({
      project: data?.entities[projectId],
    }),
  });

  const { clients } = useGetClientsQuery("clientsList", {
    selectFromResult: ({ data }) => ({
      clients: data?.ids.map((projectId) => data?.entities[projectId]),
    }),
  });

  if (!project || !clients?.length)
    return <PulseLoader color={"var(--Forest)"} />;

  if (!isAdmin && !isFounder) {
    if (project.username !== username) {
      return <p className="text-danger errmsg">No Access</p>;
    }
  }

  return <EditProjectForm clients={clients} project={project} />;
}
