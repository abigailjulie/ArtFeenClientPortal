import { useState } from "react";
import ProjectPercentageCell from "./ProjectPercentageCell";
import ProjectPhaseBudget from "./ProjectPhaseBudget";

export default function ProjectPercentage({
  phaseBudgets = {},
  updateNestedField,
  readOnly = false,
}) {
  const [editingStates, setEditingStates] = useState({});

  const handleBudgetChange = (phaseName, fieldType, newValue) => {
    if (updateNestedField && !readOnly) {
      updateNestedField("phaseBudgets", phaseName, newValue, fieldType);
    }
  };

  const setEditingState = (phaseName, fieldType, isEditing) => {
    setEditingStates((prev) => ({
      ...prev,
      [`${phaseName}_${fieldType}`]: isEditing,
    }));
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

  return (
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
                  value={phaseBudgets[phase.name]?.budget || "Pending Admin"}
                  onChange={(value) =>
                    handleBudgetChange(phase.name, "budget", Number(value))
                  }
                  phaseName={phase.name}
                  fieldType="budget"
                  placeholder="Budget"
                  isEditing={editingStates[`${phase.name}_budget`] || false}
                  setIsEditing={(isEditing) =>
                    setEditingState(phase.name, "budget", isEditing)
                  }
                />
                <span>/</span>
                <ProjectPhaseBudget
                  value={phaseBudgets[phase.name]?.spent || "Pending Admin"}
                  onChange={(value) =>
                    handleBudgetChange(phase.name, "spent", Number(value))
                  }
                  phaseName={phase.name}
                  fieldType="spent"
                  placeholder="Spent"
                  isEditing={editingStates[`${phase.name}_spent`] || false}
                  setIsEditing={(isEditing) =>
                    setEditingState(phase.name, "spent", isEditing)
                  }
                />
              </div>
            }
          />
          <span className="ft-large">{phase.percentage}</span>
        </li>
      ))}
    </ul>
  );
}
