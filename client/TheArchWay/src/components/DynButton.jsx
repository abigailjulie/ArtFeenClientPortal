import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";

export default function DynButton({
  icon,
  title,
  onClick,
  show = false,
  className = "forest",
  disabled = false,
  type = "button",
  children,
}) {
  if (!show) return null;
  return (
    <Button
      className={className}
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
