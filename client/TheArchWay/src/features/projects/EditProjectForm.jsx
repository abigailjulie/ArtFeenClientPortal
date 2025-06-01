import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Col, Form, Row, Button } from "react-bootstrap";
import ProjectInfoSection from "../../components/projects/ProjectInfoSection";

export default function EditProjectForm({ state, clicked }) {
  const {} = state;
  const {} = clicked;

  const clientOptions = clients.map((client) => {
    return (
      <option key={client.id} value={client.id}>
        {client.username}
      </option>
    );
  });

  const canSave =
    [clientId, project.id, projectName, status].every(Boolean) && !isLoading;

  const errClass = isError ? "errmsg" : "offscreen";

  const errContent = (error?.data?.message || delError?.data?.message) ?? "";

  let deleteBtn = null;
  if (isAdmin || isFounder) {
    deleteBtn = (
      <button className="btn" title="Delete" onClick={onDeleteProjectClicked}>
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
    );
  }

  return (
    <>
      <p className={errClass}>{errContent}</p>

      <Form onSubmit={(e) => e.preventDefault()}>
        <ProjectInfoSection state={state} clicked={clicked} />
        <div>
          <button
            className="btn"
            title="Save"
            onClick={onSaveProjectClicked}
            disabled={!canSave}
          >
            <FontAwesomeIcon icon={faSave} />
          </button>

          {deleteBtn}
        </div>

        <label htmlFor="projectStatus">Status:</label>
        <select
          id="projectStatus"
          name="projectStatus"
          value={status}
          onChange={onStatusChanged}
        >
          <option value="Active">Active</option>
          <option value="Paused">Paused</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <label htmlFor="projectUsername">Assigned to:</label>
        <select
          id="projectUsername"
          name="username"
          value={clientId}
          onChange={onClientIdChanged}
        >
          {clientOptions}
        </select>
        <fieldset>
          <legend>Project Timeline Tick:</legend>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((tick) => (
            <label key={tick}>
              <input
                type="radio"
                name="timelineTick"
                value={tick}
                checked={Number(timelineTick) === tick}
                onChange={onTimelineTickChanged}
              />
              {tick}
            </label>
          ))}
        </fieldset>
        <label htmlFor="expectedCompletionDate">
          Project Expected Completion Date:
        </label>
        <input
          type="date"
          name="expectedCompletionDate"
          id="expectedCompletionDate"
          value={expectedCompletionDate}
          onChange={onExpectedCompletionDateChanged}
        />
        <fieldset>
          <legend>Project Finances Tick:</legend>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((tick) => (
            <label key={tick}>
              <input
                type="radio"
                name="financesTick"
                value={tick}
                checked={Number(financesTick) === tick}
                onChange={onFinancesTickChanged}
              />
              {tick}
            </label>
          ))}
        </fieldset>
        <label htmlFor="budget">Project Budget:</label>
        <input
          type="number"
          name="budget"
          id="budget"
          value={budget}
          onChange={onBudgetChanged}
        />
        <label htmlFor="spent">Project Spent:</label>
        <input
          type="number"
          name="spent"
          id="spent"
          value={spent}
          onChange={onSpentChanged}
        />
        <label htmlFor="phaseName">Project Phase Name:</label>
        <select
          id="PhaseName"
          name="PhaseName"
          value={phaseName}
          onChange={onPhaseNameChanged}
        >
          <option value="Predevelopment">Predevelopment</option>
          <option value="Programming">Programming</option>
          <option value="Schematic Design">Schematic Design</option>
          <option value="Design Development">Design Development</option>
          <option value="Construction Documents">Construction Documents</option>
          <option value="Construction Administration">
            Construction Administration
          </option>
          <option value="Project Close-out">Project Close-out</option>
        </select>
        <fieldset>
          <legend>Project Phase Tick:</legend>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((tick) => (
            <label key={tick}>
              <input
                type="radio"
                name="phaseTick"
                value={tick}
                checked={Number(phaseTick) === tick}
                onChange={onPhaseTickChanged}
              />
              {tick}
            </label>
          ))}
        </fieldset>
        <div>
          <p>Created: {created}</p>
          <p>Updated: {updated}</p>
        </div>
      </Form>
    </>
  );
}
