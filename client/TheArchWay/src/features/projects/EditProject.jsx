import { useParams } from "react-router-dom";
import { useGetClientsQuery } from "../clients/clientsApiSlice";
import { useGetProjectsQuery } from "./projectsApiSlice";
import useAuth from "../../hooks/useAuth";
import Loader from "../../components/Loader";
import EditProjectForm from "./EditProjectForm";
import useEditProject from "../../hooks/projects/useEditProject";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";

export default function EditProject() {
  const { projectId } = useParams();

  const { username, isAdmin, isFounder } = useAuth();

  const {
    project,
    isLoading: isProjectLoading,
    isError: isProjectError,
    error: projectError,
  } = useGetProjectsQuery("projectsList", {
    selectFromResult: ({ data, isLoading, isError, error }) => ({
      project: data?.entities[projectId],
      isLoading,
      isError,
      error,
    }),
  });

  const {
    clients,
    isLoading: isClientsLoading,
    isError: isClientsError,
    error: clientsError,
  } = useGetClientsQuery("clientsList", {
    selectFromResult: ({ data, isLoading, isError, error }) => ({
      clients: data?.ids.map((id) => data.entities[id]),
      isLoading,
      isError,
      error,
    }),
  });

  const { state, actions } = useEditProject({ project });

  if (isProjectLoading || isClientsLoading) return <Loader />;
  if (isProjectError || isClientsError)
    return (
      <p className="errmsg">
        {projectError?.data?.message ||
          clientsError?.data?.message ||
          "Error loading data"}
      </p>
    );

  if (!project || !clients?.length)
    return <p className="errmsg">Missing data</p>;

  return (
    <div>
      <h2 className="text-center" style={{ fontSize: "var(--ft-Exlarge)" }}>
        Edit Project
      </h2>
      <EditProjectForm
        state={state}
        clicked={clicked}
        clients={clients}
        project={project}
      />
      <DeleteConfirmationModal
        show={state.showDeleteModal}
        handleClose={() => state.setShowDeleteModal(false)}
        handleConfirm={() => {
          clicked.confirmDelete();
          state.setShowDeleteModal(false);
        }}
        title={`Delete ${project?.name || "Project"}?`}
        message="Are you sure you want to permanently delete this project? This action cannot be undone."
      />
      ;
    </div>
  );
}
