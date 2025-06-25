import useAuth from "../../hooks/useAuth";
import "./ProjectPhaseBudget.css";

export default function ProjectPhaseBudget({
  value = "Pending Admin",
  onChange,
  placeholder = "0",
  isEditing,
}) {
  const { isAdmin, isFounder } = useAuth();
  const canEdit = isAdmin || isFounder;

  if (isEditing && canEdit) {
    return (
      <input
        type="number"
        value={value === "Pending Admin" ? "" : value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="form-control form-control-sm"
        style={{ width: "100px", fontSize: "14px" }}
        placeholder={placeholder}
      />
    );
  }

  return (
    <span
      className={`project-budget ${canEdit ? "editable" : "readonly"}`}
      title={canEdit ? "Click 'Edit Phase Budgets' to change" : ""}
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
