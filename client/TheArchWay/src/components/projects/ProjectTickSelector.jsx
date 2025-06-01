import { Col, Form, Row } from "react-bootstrap";

export default function ProjectTickSelector({
  name,
  label,
  value,
  onChange,
  tickValues = [1, 2, 3, 4, 5, 6, 7, 8, 9],
}) {
  return (
    <Row>
      <Form.Label htmlFor={`${name}Tick`}>{label}</Form.Label>
      {tickValues.map((tick) => (
        <Col key={tick} xs={1} className="mb-3">
          <Form.Check
            type="radio"
            name={name}
            id={`${name}-tick-${tick}`}
            value={tick}
            label={tick}
            checked={Number(value) === tick}
            onChange={onChange}
          />
        </Col>
      ))}
    </Row>
  );
}
