import { Col, Form, Row } from "react-bootstrap";

export default function ProjectInfoSection({ state, clicked }) {
  const { projectName, projectNumber, projectAddress, projectTelephone } =
    state;
  const {
    onNameChanged,
    onNumberChanged,
    onAddressChanged,
    onTelephoneChanged,
  } = clicked;

  return (
    <>
      <Row>
        <Col className="mb-3">
          <Form.Label htmlFor="name" visuallyHidden>
            Project Name
          </Form.Label>
          <Form.Control
            type="text"
            name="name"
            id="name"
            autoComplete="off"
            value={projectName}
            onChange={onNameChanged}
          />
        </Col>
      </Row>

      <Row>
        <Col className="mb-3">
          <Form.Label htmlFor="number" visuallyHidden>
            Project Number
          </Form.Label>
          <Form.Control
            type="text"
            name="number"
            id="number"
            autoComplete="off"
            value={projectNumber}
            onChange={onNumberChanged}
          />
        </Col>
      </Row>

      <Row>
        <Col className="mb-3">
          <Form.Label htmlFor="address" visuallyHidden>
            Project Address
          </Form.Label>
          <Form.Control
            type="text"
            name="address"
            id="address"
            autoComplete="off"
            value={projectAddress}
            onChange={onAddressChanged}
          />
        </Col>
      </Row>

      <Row>
        <Col className="mb-3">
          <Form.Label htmlFor="telephone" visuallyHidden>
            Project Telephone
          </Form.Label>
          <Form.Control
            type="text"
            name="telephone"
            id="telephone"
            autoComplete="off"
            value={projectTelephone}
            onChange={onTelephoneChanged}
          />
        </Col>
      </Row>
    </>
  );
}
