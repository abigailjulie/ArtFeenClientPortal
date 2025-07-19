import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetClientsQuery } from "../clients/clientsApiSlice";
import { useGetProjectsQuery } from "./projectsApiSlice";
import Loader from "../../components/Loader";
import EditProjectForm from "./EditProjectForm";
import useEditProject from "../../hooks/projects/useEditProject";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import useTitle from "../../hooks/useTitle";

export default function EditProject() {
  useTitle("The ArchWay | Edit Project");

  const { projectId } = useParams();

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

  const { state, actions, fields, clicked } = useEditProject({ project });

  if (isProjectLoading || isClientsLoading) return <Loader />;

  useEffect(() => {
    if (isProjectError) {
      showToast.error(
        projectError?.data?.message || "Failed to load project data",
        {
          toastId: "projects-error",
        }
      );
    }
  }, [isProjectError, projectError]);

  useEffect(() => {
    if (isClientsError) {
      showToast.error(
        clientsError?.data?.message || "Failed to load clients data",
        {
          toastId: "clients-error",
        }
      );
    }
  }, [isClientsError, clientsError]);

  if (isProjectError || isClientsError)
    return (
      <p>
        {projectError?.data?.message ||
          clientsError?.data?.message ||
          "Error loading data"}
      </p>
    );

  if (!project || !clients?.length) return <p>Missing data</p>;

  return (
    <div>
      <h2 className="text-center" style={{ fontSize: "var(--ft-Exlarge)" }}>
        Edit Project
      </h2>
      <EditProjectForm
        state={state}
        actions={actions}
        clients={clients}
        project={project}
        fields={fields}
        clicked={clicked}
      />
      <DeleteConfirmationModal
        show={state.showDeleteModal}
        handleClose={() => state.setShowDeleteModal(false)}
        handleConfirm={() => {
          actions.confirmDelete();
          state.setShowDeleteModal(false);
        }}
        title={`Delete ${project?.name || "Project"}?`}
        message="Are you sure you want to permanently delete this project? This action cannot be undone."
      />
      ;
    </div>
  );
}
