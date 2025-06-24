import { Col, Form, Row } from "react-bootstrap";
import Loader from "../../components/Loader";

export default function ProjectInfoSection({ state, actions }) {
  if (!state.isProjectLoaded) {
    return <Loader />;
  }

  const { projectName, projectNumber, projectAddress, projectTelephone } =
    state;
  const {
    onNameChanged,
    onNumberChanged,
    onAddressChanged,
    onTelephoneChanged,
  } = actions;

  return (
    <>
      <Row>
        <Col className="mb-3">
          <Form.Label htmlFor="name">Project Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            id="name"
            autoComplete="off"
            placeholder=""
            value={projectName}
            onChange={onNameChanged}
          />
        </Col>
      </Row>

      <Row>
        <Col className="mb-3">
          <Form.Label htmlFor="number">Project Number</Form.Label>
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
          <Form.Label htmlFor="address">Project Address</Form.Label>
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
          <Form.Label htmlFor="telephone">Project Telephone</Form.Label>
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
