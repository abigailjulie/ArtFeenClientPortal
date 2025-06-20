import { useState, useEffect, useCallback } from "react";
import {
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} from "../../features/projects/projectsApiSlice";
import { useNavigate } from "react-router-dom";
import { parseCurrency } from "../../utils/FormatCurrency";
import { formatDateTime } from "../../utils/dateUtils";
import { showToast } from "../../utils/showToast";
import { initializePhaseBudgets } from "../../utils/projectUtils";
import useAuth from "../useAuth";
import useProjectFormFields from "./useProjectFormFields";

const getDraftKey = (projectId) => `project_draft_${projectId}`;

const saveDraftToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    showToast.error("Failed to save draft to localStorage:", error);
  }
};

const getDraftFromStorage = (key) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    showToast.error("Failed to load draft from localStorage:", error);
    return null;
  }
};

const removeDraftFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    showToast.error("Failed to remove draft from localStorage:", error);
  }
};

export default function useEditProject({ project }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isProjectLoaded, setIsProjectLoaded] = useState(false);
  const [formData, setFormData] = useState({});
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
      phaseBudgets,
    },
    clicked,
  } = useProjectFormFields({ project });

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
        expectedCompletionDate: project.timeline?.expectedCompletionDate || "",
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
      const updatedData = {
        ...formData,
        [fieldName]: value,
      };
      setFormData(updatedData);
      saveDraft(updatedData);
    },
    [formData, saveDraft]
  );

  const updateNestedField = useCallback(
    (parentField, childField, value, subField = null) => {
      let updatedData;

      if (subField) {
        updatedData = {
          ...formData,
          [parentField]: {
            ...formData[parentField],
            [childField]: {
              ...formData[parentField]?.[childField],
              [subField]: value,
            },
          },
        };
      } else {
        updatedData = {
          ...formData,
          [parentField]: {
            ...formData[parentField],
            [childField]: value,
          },
        };
      }

      setFormData(updatedData);
      saveDraft(updatedData);
    },
    [formData, saveDraft]
  );

  const clearDraft = useCallback(() => {
    if (project?.id) {
      const draftKey = getDraftKey(project.id);
      removeDraftFromStorage(draftKey);
    }
  }, [project?.id]);

  const onSaveProjectClicked = async (e) => {
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
            budget: parseCurrency(phaseData.budget),
            spent: parseCurrency(phaseData.spent),
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
          budget: parseCurrency(formData.budget),
          spent: parseCurrency(formData.spent),
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
      updateField,
      updateNestedField,
      clearDraft,
      onSaveProjectClicked,
      onDeleteProjectClicked,
      confirmDelete,
    },
  };
}
