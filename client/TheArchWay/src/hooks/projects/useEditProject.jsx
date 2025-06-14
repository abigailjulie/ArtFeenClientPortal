import { useState, useEffect } from "react";
import {
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} from "../../features/projects/projectsApiSlice";
import { useNavigate } from "react-router-dom";
import useAuth from "../useAuth";
import { parseCurrency } from "../../utils/FormatCurrency";
import { formatDateTime } from "../../utils/dateUtils";
import useProjectFormFields from "./useProjectFormFields";
import { showToast } from "../../utils/showToast";

export default function useEditProject({ project }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isProjectLoaded, setIsProjectLoaded] = useState(false);
  const { isAdmin, isFounder } = useAuth();

  const [
    updateProject,
    {
      isLoading: isUpdateLoading,
      isSuccess: isUpdateSuccess,
      isError: isUpdateError,
      error: updateError,
    },
  ] = useUpdateProjectMutation();

  const [
    deleteProject,
    {
      isLoading: isDelLoading,
      isSuccess: isDelSuccess,
      isError: isDelError,
      error: delError,
    },
  ] = useDeleteProjectMutation();

  const navigate = useNavigate();

  const {
    fields: {
      projectName,
      projectAddress,
      projectNumber,
      projectTelephone,
      clientId,
      status,
      timelineTick,
      expectedCompletionDate,
      financesTick,
      budget,
      spent,
      phaseName,
      phaseTick,
    },
    clicked,
  } = useProjectFormFields({ project });

  useEffect(() => {
    if (project && project.id) {
      setIsProjectLoaded(true);
    }
  }, [project, project?.id]);

  const onSaveProjectClicked = async (e) => {
    e.preventDefault();

    if (!canSave) {
      showToast.error("Please fill in all required fields before saving.");
      return;
    }

    try {
      const result = await updateProject({
        id: project?.id,
        name: projectName,
        number: projectNumber,
        address: projectAddress,
        telephone: projectTelephone,
        status,
        client: clientId,
        timeline: {
          currentTick: timelineTick,
          expectedCompletionDate: expectedCompletionDate
            ? new Date(expectedCompletionDate)
            : project?.timeline.expectedCompletionDate,
        },
        finances: {
          currentTick: financesTick,
          budget: parseCurrency(budget),
          spent: parseCurrency(spent),
        },
        phase: {
          name: phaseName,
          currentTick: phaseTick,
        },
      }).unwrap();

      showToast.success(
        result?.message || `Project ${projectName} updated successfully!`
      );

      setTimeout(() => {
        if (clientId) {
          navigate(`/dash/clients/${clientId}/projects`);
        } else {
          navigate("/dash/projects", { replace: true });
        }
      }, 500);
    } catch (error) {
      showToast.error(
        error?.data?.message ||
          error?.message ||
          "Failed to update project. Please try again."
      );
    }
  };

  const onDeleteProjectClicked = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!project?.id) {
      showToast.error("Cannot delete project: Project ID is missing.");
      return;
    }

    try {
      const result = await deleteProject({ id: project?.id }).unwrap();
      showToast.success(
        result?.message || `Project ${projectName} deleted successfully!`
      );

      setTimeout(() => {
        if (clientId) {
          navigate(`/dash/clients/${clientId}/projects`);
        } else {
          navigate("/dash/projects");
        }
      }, 500);
    } catch (error) {
      showToast.error(
        error?.data?.message || "Failed to delete project. Please try again."
      );
    }
  };

  const created = formatDateTime(project?.createdAt);
  const updated = formatDateTime(project?.updatedAt);

  const isLoading = isUpdateLoading || isDelLoading;

  const hasError = isUpdateError || isDelError;

  const canSave =
    [clientId, project?.id, projectName, status].every(Boolean) && !isLoading;

  return {
    state: {
      project,
      projectName,
      projectAddress,
      projectNumber,
      projectTelephone,
      clientId,
      status,
      timelineTick,
      expectedCompletionDate,
      financesTick,
      budget,
      spent,
      phaseName,
      phaseTick,
      isProjectLoaded,
      hasError,
      isLoading,
      isUpdateError,
      updateError,
      delError,
      created,
      updated,
      isAdmin,
      canSave,
      isFounder,
      showDeleteModal,
      setShowDeleteModal,
    },
    clicked: {
      ...clicked,
      onSaveProjectClicked,
      onDeleteProjectClicked,
      confirmDelete,
    },
  };
}
