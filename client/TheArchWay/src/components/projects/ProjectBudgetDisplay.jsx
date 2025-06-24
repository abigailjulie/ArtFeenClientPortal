import { useState } from "react";
import { useUpdateProjectMutation } from "../../features/projects/projectsApiSlice";
import { showToast } from "../../utils/showToast";
import ProjectStepper from "./ProjectStepper";

export default function ProjectBudgetDisplay({ project }) {
  const [isEditing, setIsEditing] = useState(false);
  const [budget, setBudget] = useState(project?.finances?.budget || 0);
  const [spent, setSpent] = useState(project?.finances?.spent || 0);

  const [updateProject, { isLoading }] = useUpdateProjectMutation();

  const handleEdit = () => {
    setBudget(project?.finances?.budget || 0);
    setSpent(project?.finances?.spent || 0);
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await updateProject({
        id: project?.id,
        finances: {
          currentTick: project?.finances?.currentTick,
          budget,
          spent,
        },
      }).unwrap();

      showToast.success("Budget updated successfully");
      setIsEditing(false);
    } catch (error) {
      showToast.error("Failed to update budget");
    }
  };

  const handleCancel = () => {
    setBudget(project?.finances?.budget || 0);
    setSpent(project?.finances?.spent || 0);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <article className="d-flex flex-column mb-3">
        <div className="d-flex align-items-center gap-2 ms-auto">
          <div>
            <label className="form-label small mb-1">Budget:</label>
            <input
              type="number"
              className="form-control form-control-sm"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              style={{ width: "100px" }}
            />
          </div>
          <div>
            <label className="form-label small mb-1">Spent:</label>
            <input
              type="number"
              className="form-control form-control-sm"
              value={spent}
              onChange={(e) => setSpent(Number(e.target.value))}
              style={{ width: "100px" }}
            />
          </div>
          <div className="d-flex flex-column gap-1">
            <button
              onClick={handleSave}
              className="btn btn-sm btn-success"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={handleCancel}
              className="btn btn-sm btn-secondary"
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </div>
        <ProjectStepper
          activeStep={project?.finances?.currentTick}
          maxStep={7}
        />
        <h4 className="mt-2">Project Budget</h4>
      </article>
    );
  }

  return (
    <article className="d-flex flex-column mb-3">
      <button
        onClick={handleEdit}
        className="btn btn-link w-auto ms-auto no-underline-hover pe-0 text-black"
      >
        Spent:
        {project?.finances?.spent?.toLocaleString(undefined, {
          style: "currency",
          currency: "USD",
        })}
        /
        {project?.finances?.budget?.toLocaleString(undefined, {
          style: "currency",
          currency: "USD",
        })}
      </button>
      <ProjectStepper activeStep={project?.finances?.currentTick} maxStep={7} />
      <h4 className="mt-2">Project Budget</h4>
    </article>
  );
}
