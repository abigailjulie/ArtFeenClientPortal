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

    const rowStatusClass = (() => {
      switch (project.status) {
        case "Completed":
          return "bg-dark-subtle opacity-50";
        case "Paused":
          return "bg-warning-subtle opacity-50";
        case "Cancelled":
          return "bg-danger-subtle opacity-50";
        default:
          return "";
      }
    })();

    return (
      <tr className={`bg-body-tertiary shadow mb-3 ${rowStatusClass}`}>
        <td className="p-3">{project.status}</td>
        <td className="p-3">{created}</td>
        <td className="p-3">{updated}</td>
        <td className="p-3">{project.name}</td>
        <td className="p-3">{project.client?.username}</td>
        <td className="p-3 d-flex justify-content-center">
          <button onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  } else return null;
}
