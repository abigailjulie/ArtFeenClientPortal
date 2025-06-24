import { Form } from "react-bootstrap";

export default function ProjectTickSelector({
  name,
  label,
  value,
  onChange,
  tickValues = Array.from({ length: 8 }, (_, i) => i),
}) {
  return (
    <div className="mb-3">
      <Form.Label htmlFor={`${name}Tick`} className="d-block mb-2">
        {label}
      </Form.Label>
      <div className="d-flex justify-content-between">
        {tickValues.map((tick) => (
          <Form.Check
            key={tick}
            type="radio"
            name={name}
            id={`${name}-tick-${tick}`}
            value={tick}
            label={tick}
            checked={Number(value) === tick}
            onChange={() => onChange(tick)}
            className="mx-1"
          />
        ))}
      </div>
    </div>
  );
}
