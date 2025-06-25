import { useState, useEffect, useCallback } from "react";
import {
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} from "../../features/projects/projectsApiSlice";
import { useNavigate } from "react-router-dom";
import { formatDateTime, formatDateForInput } from "../../utils/dateUtils";
import { showToast } from "../../utils/showToast";
import { initializePhaseBudgets } from "../../utils/projectUtils";
import useAuth from "../useAuth";

const getDraftKey = (projectId) => `project_draft_${projectId}`;

const saveDraftToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    showToast.error(`Failed to save draft to localStorage: ${error.message}`);
  }
};

const getDraftFromStorage = (key) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    showToast.error(`Failed to load draft from localStorage:"${error.message}`);
    return null;
  }
};

const removeDraftFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    showToast.error(
      `Failed to remove draft from localStorage:"${error.message}`
    );
  }
};

export default function useEditProject({ project }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isProjectLoaded, setIsProjectLoaded] = useState(false);
  const [formData, setFormData] = useState({
    projectName: "",
    projectAddress: "",
    projectNumber: "",
    projectTelephone: "",
    clientId: "",
    status: "",
    timelineTick: 0,
    expectedCompletionDate: "",
    financesTick: 0,
    budget: "",
    spent: "",
    phaseName: "",
    phaseTick: 0,
    phaseBudgets: {},
  });
  const { isAdmin, isFounder } = useAuth();

  const navigate = useNavigate();

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

  useEffect(() => {
    if (project && project.id) {
      const draftKey = getDraftKey(project.id);

      const savedDraft = getDraftFromStorage(draftKey);

      const initialData = savedDraft || {
        projectName: project.name || "",
        projectAddress: project.address || "",
        projectNumber: project.number || "",
        projectTelephone: project.telephone || "",
        clientId: project.client || "",
        status: project.status || "",
        timelineTick: project.timeline?.currentTick || 0,
        expectedCompletionDate: project.timeline?.expectedCompletionDate
          ? formatDateForInput(project.timeline.expectedCompletionDate)
          : "",
        financesTick: project.finances?.currentTick || 0,
        budget: project.finances?.budget || "",
        spent: project.finances?.spent || "",
        phaseName: project.phase?.name || "",
        phaseTick: project.phase?.currentTick || 0,
        phaseBudgets: initializePhaseBudgets(project.phaseBudgets),
      };

      setFormData(initialData);
      setIsProjectLoaded(true);
    }
  }, [project]);

  const saveDraft = useCallback(
    (updatedFormData) => {
      if (project?.id) {
        const draftKey = getDraftKey(project.id);
        saveDraftToStorage(draftKey, updatedFormData);
      }
    },
    [project?.id]
  );

  const updateField = useCallback(
    (fieldName, value) => {
      setFormData((prevData) => {
        const updatedData = {
          ...prevData,
          [fieldName]: value,
        };
        saveDraft(updatedData);
        return updatedData;
      });
    },
    [saveDraft]
  );

  const handleCurrencyChange = useCallback(
    (fieldName) => (e) => {
      updateField(fieldName, e.target.value);
    },
    [updateField]
  );

  const clearDraft = useCallback(() => {
    if (project?.id) {
      const draftKey = getDraftKey(project.id);
      removeDraftFromStorage(draftKey);
    }
  }, [project?.id]);

  const created = formatDateTime(project?.createdAt);
  const updated = formatDateTime(project?.updatedAt);

  const isLoading = isUpdateLoading || isDelLoading;

  const hasError = isUpdateError || isDelError;

  const canSave =
    [
      formData.clientId,
      project?.id,
      formData.projectName,
      formData.status,
    ].every(Boolean) && !isLoading;

  const onSaveProjectClicked = useCallback(
    async (e) => {
      e.preventDefault();

      if (!canSave) {
        showToast.error("Please fill in all required fields before saving.");
        return;
      }

      try {
        const formattedPhaseBudgets = {};

        Object.entries(formData.phaseBudgets || {}).forEach(
          ([phaseName, phaseData]) => {
            formattedPhaseBudgets[phaseName] = {
              budget: phaseData.budget,
              spent: phaseData.spent,
              number: phaseData.number,
            };
          }
        );

        const result = await updateProject({
          id: project?.id,
          name: formData.projectName,
          number: formData.projectNumber,
          address: formData.projectAddress,
          telephone: formData.projectTelephone,
          status: formData.status,
          client: formData.clientId,
          timeline: {
            currentTick: formData.timelineTick,
            expectedCompletionDate: formData.expectedCompletionDate
              ? new Date(formData.expectedCompletionDate)
              : project?.timeline.expectedCompletionDate,
          },
          finances: {
            currentTick: formData.financesTick,
            budget: parseFloat(formData.budget.toString().replace(/,/g, "")),
            spent: parseFloat(formData.spent.toString().replace(/,/g, "")),
          },
          phase: {
            name: formData.phaseName,
            currentTick: formData.phaseTick,
          },
          phaseBudgets: formattedPhaseBudgets,
        }).unwrap();

        showToast.success(
          result?.message ||
            `Project ${formData.projectName} updated successfully!`
        );

        clearDraft();

        setTimeout(() => {
          if (formData.clientId) {
            navigate(`/dash/clients/${formData.clientId}/projects`);
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
    },
    [formData, project?.id, canSave, updateProject, clearDraft, navigate]
  );

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
        result?.message ||
          `Project ${formData.projectName} deleted successfully!`
      );

      clearDraft();

      setTimeout(() => {
        if (formData.clientId) {
          navigate(`/dash/clients/${formData.clientId}/projects`);
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

  return {
    state: {
      project,
      ...formData,
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
      hasDraft: project?.id
        ? Boolean(getDraftFromStorage(getDraftKey(project.id)))
        : false,
    },
    actions: {
      onNameChanged: (e) => updateField("projectName", e.target.value),
      onNumberChanged: (e) => updateField("projectNumber", e.target.value),
      onAddressChanged: (e) => updateField("projectAddress", e.target.value),
      onTelephoneChanged: (e) =>
        updateField("projectTelephone", e.target.value),
      onStatusChanged: (e) => updateField("status", e.target.value),
      onClientIdChanged: (e) => updateField("clientId", e.target.value),
      onPhaseNameChanged: (e) => updateField("phaseName", e.target.value),
      onExpectedCompletionDateChanged: (e) =>
        updateField("expectedCompletionDate", e.target.value),

      onBudgetChanged: handleCurrencyChange("budget"),
      onSpentChanged: handleCurrencyChange("spent"),

      onTimelineTickChanged: (tick) => updateField("timelineTick", tick),
      onFinancesTickChanged: (tick) => updateField("financesTick", tick),
      onPhaseTickChanged: (tick) => updateField("phaseTick", tick),

      updateField,
      clearDraft,
      onSaveProjectClicked,
      onDeleteProjectClicked,
      confirmDelete,
    },
  };
}
