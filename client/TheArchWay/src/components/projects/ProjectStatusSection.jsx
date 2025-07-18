import { Col, Form, Row } from "react-bootstrap";
import ProjectTickSelector from "./ProjectTickSelector";
import FormSelect from "../FormSelect";
import { isValidCurrency } from "../../utils/FormatCurrency";

export default function ProjectStatusSection({ state, actions, clients }) {
  const clientOptions = clients.map((client) => ({
    value: client.id,
    label: client.username,
  }));

  const statusOptions = [
    { value: "", label: "Select Status..." },
    { value: "Active", label: "Active" },
    { value: "Paused", label: "Paused" },
    { value: "Completed", label: "Completed" },
    { value: "Cancelled", label: "Cancelled" },
  ];

  const phaseOptions = [
    { value: "", label: "Select Phase..." },
    { value: "Predevelopment", label: "Predevelopment" },
    { value: "Programming", label: "Programming" },
    { value: "Schematic Design", label: "Schematic Design" },
    { value: "Design Development", label: "Design Development" },
    { value: "Construction Documents", label: "Construction Documents" },
    {
      value: "Construction Administration",
      label: "Construction Administration",
    },
    { value: "Project Close-out", label: "Project Close-out" },
  ];

  return (
    <>
      <Row>
        <Col className="mb-3">
          <FormSelect
            id="projectStatus"
            name="projectStatus"
            ariaLabel="Select Status"
            options={statusOptions}
            value={state.status}
            onChange={actions.onStatusChanged}
          />
        </Col>

        <Col className="mb-3">
          <FormSelect
            id="projectUsername"
            name="username"
            aria-label="Select Client"
            options={clientOptions}
            value={state.clientId}
            onChange={actions.onClientIdChanged}
          />
        </Col>
      </Row>

      <Row>
        <Col className="mb-3">
          <FormSelect
            id="phaseName"
            name="phaseName"
            ariaLabel="Select Phase Name"
            options={phaseOptions}
            value={state.phaseName}
            onChange={actions.onPhaseNameChanged}
          />
        </Col>
      </Row>

      <Row>
        <Col className="mb-3">
          <Form.Group controlId="spent">
            <Form.Label>Project Spent</Form.Label>
            <Form.Control
              type="text"
              value={state.spent}
              onChange={actions.onSpentChanged}
              isInvalid={!isValidCurrency(state.spent)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid currency amount (e.g., 1,000.00)
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col className="mb-3">
          <Form.Group controlId="budget">
            <Form.Label>Project Budget</Form.Label>
            <Form.Control
              type="text"
              value={state.budget}
              onChange={actions.onBudgetChanged}
              isInvalid={!isValidCurrency(state.budget)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid currency amount (e.g., 1,000.00)
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col className="mb-3">
          <Form.Group controlId="expectedCompletionDate">
            <Form.Label>Project Expected Completion Date</Form.Label>
            <Form.Control
              type="date"
              value={state.expectedCompletionDate}
              onChange={actions.onExpectedCompletionDateChanged}
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <div className="container-sm">
        <ProjectTickSelector
          name="finances"
          label="Project Finances"
          value={state.financesTick}
          onChange={actions.onFinancesTickChanged}
        />

        <ProjectTickSelector
          name="phase"
          label="Project Phase"
          value={state.phaseTick}
          onChange={actions.onPhaseTickChanged}
        />

        <ProjectTickSelector
          name="timeline"
          label="Project Timeline"
          value={state.timelineTick}
          onChange={actions.onTimelineTickChanged}
        />
      </div>
    </>
  );
}
