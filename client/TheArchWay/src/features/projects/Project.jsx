import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { useGetProjectsQuery } from "./projectsApiSlice";
import { useGetClientsQuery } from "../clients/clientsApiSlice";
import useAuth from "../../hooks/useAuth";

const Project = memo(function Project({ projectId }) {
  const { project } = useGetProjectsQuery("projectsList", {
    selectFromResult: ({ data }) => ({
      project: data?.entities[projectId],
    }),
  });

  const { username, isAdmin, isFounder } = useAuth();

  const { clientList } = useGetClientsQuery("clientsList", {
    selectFromResult: ({ data }) => ({
      clientList: data ? Object.values(data.entities) : [],
    }),
  });
  const client = clientList?.find((c) => c.username === username);
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

    const handleEdit = () => {
      if (client?._id) {
        navigate(`/dash/clients/${client._id}/projects/${projectId}/edit`);
      } else {
        navigate(`/dash/projects/${projectId}`);
      }
    };

    const statusClassMap = {
      Completed: "bg-dark-subtle opacity-50",
      Paused: "bg-warning-subtle opacity-50",
      Cancelled: "bg-danger-subtle opacity-50",
    };
    const rowStatusClass = statusClassMap[project.status] || "";

    return (
      <tr className={`bg-body-tertiary shadow mb-3 ${rowStatusClass}`}>
        <td className="p-3">{project.status}</td>
        <td className="p-3">{created}</td>
        <td className="p-3">{updated}</td>
        <td className="p-3">{project.name}</td>
        <td className="p-3">{project.client?.username}</td>
        <td className="p-3 d-flex justify-content-center">
          <button
            onClick={handleEdit}
            title="Edit Project"
            className="btn btn-sm"
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  } else return null;
});

export default Project;
