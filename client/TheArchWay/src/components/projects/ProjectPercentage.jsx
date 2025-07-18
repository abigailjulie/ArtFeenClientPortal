import { useState, useEffect } from "react";
import { showToast } from "../../utils/showToast";
import { useUpdateProjectMutation } from "../../features/projects/projectsApiSlice";
import ProjectPercentageCell from "./ProjectPercentageCell";
import ProjectPhaseBudget from "./ProjectPhaseBudget";
import useAuth from "../../hooks/useAuth";
import DynButton from "../DynButton";
import Loader from "../Loader";

export default function ProjectPercentage({
  phaseBudgets = {},
  projectId,
  onSave,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [localPhaseBudgets, setLocalPhaseBudgets] = useState(
    JSON.parse(JSON.stringify(phaseBudgets))
  );
  const [
    updateProject,
    {
      isLoading: updateLoading,
      isSuccess: updateSuccess,
      isError: updateError,
      error: updateErrorData,
    },
  ] = useUpdateProjectMutation();

  const { isAdmin, isFounder } = useAuth();
  const canEdit = isAdmin || isFounder;

  useEffect(() => {
    setLocalPhaseBudgets(JSON.parse(JSON.stringify(phaseBudgets)));
  }, [phaseBudgets]);

  useEffect(() => {
    if (updateSuccess) {
      showToast.success("Phase budgets updated successfully", {
        toastId: "phase-budgets-success",
      });
      setIsEditing(false);

      if (onSave) {
        onSave(localPhaseBudgets);
      }
    }
  }, [updateSuccess, localPhaseBudgets, onSave]);

  useEffect(() => {
    if (updateError) {
      const message =
        updateErrorData?.data?.message ||
        updateErrorData?.message ||
        "Failed to update phase budgets";
      showToast.error(message, {
        toastId: "project-budgets-error",
      });
    }
  }, [updateError, updateErrorData]);

  const getDisplayValue = (phaseName, fieldType) => {
    const value = localPhaseBudgets[phaseName]?.[fieldType];
    if (value === undefined || value === null || value === "Pending Admin") {
      return "Pending Admin";
    }
    return value;
  };

  const handleBudgetChange = (phaseName, fieldType, newValue) => {
    setLocalPhaseBudgets((prev) => ({
      ...prev,
      [phaseName]: {
        ...prev[phaseName],
        [fieldType]: newValue,
      },
    }));
  };

  const handleSave = async () => {
    try {
      await updateProject({
        id: projectId,
        phaseBudgets: localPhaseBudgets,
      }).unwrap();
    } catch (error) {
      showToast.error(
        `Failed to update phase budgets: ${error.message || error}`,
        {
          toastId: "phase-budget-error",
        }
      );
    }
  };

  const handleCancel = () => {
    setLocalPhaseBudgets(JSON.parse(JSON.stringify(phaseBudgets)));
    setIsEditing(false);
  };

  const handleEdit = () => {
    setLocalPhaseBudgets(JSON.parse(JSON.stringify(phaseBudgets)));
    setIsEditing(true);
  };

  const phases = [
    { name: "Predevelopment", num: "1", percentage: "10%" },
    { name: "Programming", num: "2", percentage: "20%" },
    { name: "Schematic Design", num: "3", percentage: "30%" },
    { name: "Design Development", num: "4", percentage: "50%" },
    { name: "Construction Documents", num: "5", percentage: "75%" },
    { name: "Construction Administration", num: "6", percentage: "95%" },
    { name: "Project Close-out", num: "7", percentage: "100%" },
  ];

  if (updateLoading) {
    return <Loader />;
  }

  return (
    <>
      <ul className="list-unstyled">
        {phases.map((phase, index) => (
          <li
            key={phase.name}
            className={`d-flex justify-content-between align-items-center ${
              index < phases.length - 1 ? "border-bottom border-white" : ""
            }`}
          >
            <ProjectPercentageCell
              phase={phase.name}
              phaseNum={phase.num}
              phaseBudget={
                <div className="d-flex gap-2">
                  <ProjectPhaseBudget
                    value={getDisplayValue(phase.name, "budget")}
                    onChange={(value) =>
                      handleBudgetChange(phase.name, "budget", Number(value))
                    }
                    isEditing={isEditing}
                    placeholder="Budget"
                  />
                  <span>/</span>
                  <ProjectPhaseBudget
                    value={getDisplayValue(phase.name, "spent")}
                    onChange={(value) =>
                      handleBudgetChange(phase.name, "spent", Number(value))
                    }
                    isEditing={isEditing}
                    placeholder="Spent"
                  />
                </div>
              }
            />
            <span className="ft-large">{phase.percentage}</span>
          </li>
        ))}
      </ul>

      {canEdit &&
        (isEditing ? (
          <div className="d-flex gap-2 mt-3">
            <button
              className="btn btn-sm btn-success"
              onClick={handleSave}
              disabled={updateLoading}
            >
              {updateLoading ? "Saving..." : "Save"}
            </button>
            <button
              className="btn btn-sm btn-secondary"
              onClick={handleCancel}
              disabled={updateLoading}
            >
              Cancel
            </button>
          </div>
        ) : (
          <DynButton
            onClick={handleEdit}
            show={true}
            className="mt-3 ms-auto d-block"
            variant="outline-forest"
            title="Enable editing"
          >
            Edit Phase Budgets
          </DynButton>
        ))}
    </>
  );
}
