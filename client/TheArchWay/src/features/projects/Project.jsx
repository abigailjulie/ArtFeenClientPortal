import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectProjectsById } from "./projectsApiSlice";
import React from "react";

export default function Project({ projectId }) {
  const project = useSelector((state) => selectProjectsById(state, projectId));

  const navigate = useNavigate();

  if (project) {
    const created = new Date(project.createdAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const updated = new Date(project.updatedAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const handleEdit = () => navigate(`/dash/clients/projects/${projectId}`);

    return (
      <tr>
        <td>
          {project.completed ? <span>Completed</span> : <span>Open</span>}
        </td>
        <td>{created}</td>
        <td>{updated}</td>
        <td>{project.name}</td>
        <td>{project.client?.username}</td>
        <td>
          <button onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  } else return null;
}
