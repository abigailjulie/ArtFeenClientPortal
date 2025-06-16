import { useState } from "react";
import { formatCurrency } from "../../utils/FormatCurrency";
import useAuth from "../../hooks/useAuth";
import "./ProjectPhaseBudget.css";

export default function ProjectPhaseBudget() {
  const [value, setValue] = useState("Pending Admin");
  const [isEditing, setIsEditing] = useState(false);
  const { isAdmin, isFounder } = useAuth();

  const canEdit = isAdmin || isFounder;

  const handleClick = () => {
    if (canEdit) {
      setIsEditing(true);
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (value && value !== "Pending Admin") {
      const formatted = formatCurrency(value);
      setValue(formatted);
      if (onChange) {
        onChange(formatted);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleBlur();
    }
  };

  if (isEditing) {
    return (
      <input
        type="text"
        value={value === "Pending Admin" ? "" : value}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className="form-control form-control-sm"
        style={{ width: "100px", fontSize: "14px" }}
        autoFocus
      />
    );
  }

  return (
    <span
      onClick={handleClick}
      className={`project-budget ${canEdit ? "editable" : "readonly"}`}
      title={canEdit ? "Click to edit" : ""}
    >
      ${value}
    </span>
  );
}
