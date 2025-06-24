import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import "./ProjectPhaseBudget.css";

export default function ProjectPhaseBudget({
  value = "Pending Admin",
  onChange,
  phaseName = "",
  fieldType = "budget",
  placeholder = "0",
  isEditing,
  setIsEditing,
}) {
  const { isAdmin, isFounder } = useAuth();
  const canEdit = isAdmin || isFounder;

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (isEditing) {
      if (value === "Pending Admin") {
        setInputValue("");
      } else {
        setInputValue(String(value));
      }
    }
  }, [isEditing, value]);

  const handleClick = () => {
    if (canEdit) {
      setIsEditing(true);
    }
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
  };

  const handleBlur = () => {
    const trimmed = inputValue.trim();

    if (!trimmed) {
      onChange("Pending Admin");
    } else {
      onChange(Number(trimmed));
    }
    setIsEditing(false);
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
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className="form-control form-control-sm"
        style={{ width: "100px", fontSize: "14px" }}
        autoFocus
        placeholder={placeholder}
      />
    );
  }

  return (
    <span
      onClick={handleClick}
      className={`project-budget ${canEdit ? "editable" : "readonly"}`}
      title={canEdit ? "Click to edit" : ""}
    >
      {value === "Pending Admin"
        ? value
        : Number(value).toLocaleString(undefined, {
            style: "currency",
            currency: "USD",
          })}
    </span>
  );
}
