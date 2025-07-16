import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";

export default function DynButton({
  icon,
  title,
  onClick,
  show = false,
  variant = "forest",
  disabled = false,
  type = "button",
  className = "",
  children,
}) {
  if (!show) return null;

  const variantClasses = {
    forest: "forest",
    charcoal: "charcoal",
    "outline-forest": "outline-forest",
  };

  const btnClass = `btn ${
    variantClasses[variant] || variantClasses.forest
  } ${className}`.trim();

  return (
    <Button
      className={btnClass}
      title={title}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {icon && <FontAwesomeIcon icon={icon} />}
      {children}
    </Button>
  );
}
