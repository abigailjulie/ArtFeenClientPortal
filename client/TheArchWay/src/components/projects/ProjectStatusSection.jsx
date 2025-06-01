import { Col, Form, Row } from "react-bootstrap";
import { ProjectTickSelector } from "./ProjectTickSelector";

export default function ProjectStatusSection({ state, clicked }) {
  const clientOptions = clients.map((client) => {
    return (
      <option key={client.id} value={client.id}>
        {client.username}
      </option>
    );
  });

  return (
    <>
      <Row>
        <Col>
          <Form.Label htmlFor="projectStatus" visuallyHidden>
            Status
          </Form.Label>
          <Form.Select
            aria-label="Status select"
            id="projectStatus"
            name="projectStatus"
            value={status}
            onChange={onStatusChanged}
          >
            <option value="Active">Active</option>
            <option value="Paused">Paused</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </Form.Select>
        </Col>

        <Col>
          <Form.Select
            aria-label="Client select"
            id="projectUsername"
            name="username"
            value={clientId}
            onChange={onClientIdChanged}
          >
            {clientOptions}
          </Form.Select>
        </Col>
      </Row>

      <ProjectTickSelector
        name="timeline"
        label="Project Timeline Tick"
        value={timelineTick}
        onChange={onTimelineTickChanged}
      />

      <Row>
        <Col>
          <Form.Group controlId="expectedCompletionDate">
            <Form.Label visuallyHidden>
              Project Expected Completion Date
            </Form.Label>
            <Form.Control
              type="date"
              value={expectedCompletionDate}
              onChange={onExpectedCompletionDateChanged}
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <ProjectTickSelector
        name="finances"
        label="Project Finances Tick"
        value={financesTick}
        onChange={onFinancesTickChanged}
      />

      <Row>
        <Col>
          <Form.Group controlId="spent">
            <Form.Label visuallyHidden>Project Spent</Form.Label>
            <Form.Control
              type="number"
              value={spent}
              onChange={onSpentChanged}
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Label htmlFor="phaseName" visuallyHidden>
            Project Phase Name
          </Form.Label>
          <Form.Select
            aria-label="Phase Name Select"
            id="phaseName"
            name="phaseName"
            value={phaseName}
            onChange={onPhaseNameChanged}
          >
            <option value="Predevelopment">Predevelopment</option>
            <option value="Programming">Programming</option>
            <option value="Schematic Design">Schematic Design</option>
            <option value="Design Development">Design Development</option>
            <option value="Construction Documents">
              Construction Documents
            </option>
            <option value="Construction Administration">
              Construction Administration
            </option>
            <option value="Project Close-out">Project Close-out</option>
          </Form.Select>
        </Col>
      </Row>

      <ProjectTickSelector
        name="phase"
        label="Project Phase Tick"
        value={phaseTick}
        onChange={onPhaseTickChanged}
      />
    </>
  );
}
