import { useState, useEffect } from "react";
import {
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} from "../../features/projects/projectsApiSlice";
import { useNavigate } from "react-router-dom";
import useAuth from "../useAuth";
import { formatCurrency, parseCurrency } from "../../utils/FormatCurrency";
import { formatDateTime } from "../../utils/formatDateTime";
import useProjectFormFields from "./useProjectFormFields";

export default function useEditProject({ project }) {
  const { isAdmin, isFounder } = useAuth();

  const [updateProject, { isLoading, isSuccess, isError, error }] =
    useUpdateProjectMutation();

  const [
    deleteProject,
    { isSuccess: isDelSuccess, isError: isDelError, error: delError },
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
    if (isSuccess || isDelSuccess) {
      if (clientId) {
        navigate(`/dash/clients/${clientId}/projects`);
      } else {
        navigate("/dash/projects");
      }
    }
  }, [isSuccess, isDelSuccess, navigate, clientId]);

  const onSaveProjectClicked = async (e) => {
    e.preventDefault();
    await updateProject({
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
    });
  };

  const onDeleteProjectClicked = async () => {
    await deleteProject({ id: project?.id });
  };

  const created = formatDateTime(project?.createdAt);
  const updated = formatDateTime(project?.updatedAt);

  const canSave =
    [clientId, project?.id, projectName, status].every(Boolean) && !isLoading;

  const errorMessage = (error?.data?.message || delError?.data?.message) ?? "";

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
      isLoading,
      isError,
      error,
      delError,
      created,
      updated,
      isAdmin,
      canSave,
      isFounder,
      errorMessage,
    },
    clicked: {
      ...clicked,
      onSaveProjectClicked,
      onDeleteProjectClicked,
    },
  };
}
