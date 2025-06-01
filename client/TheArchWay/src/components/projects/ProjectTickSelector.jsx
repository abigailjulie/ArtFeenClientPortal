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
      <Form.Label htmlFor={`${name}Tick`} visuallyHidden>
        {label}
      </Form.Label>
      {tickValues.map((tick) => (
        <Col key={tick} xs={1}>
          <Form.Check
            type="radio"
            name={`${name}Tick`}
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
