import { Form } from "react-bootstrap";

export default function FormSelect({
  id,
  name,
  label,
  value,
  onChange,
  ariaLabel,
  options = [],
}) {
  return (
    <>
      <Form.Label htmlFor={id}>{label}</Form.Label>
      <Form.Select
        aria-label={ariaLabel}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Select>
    </>
  );
}
