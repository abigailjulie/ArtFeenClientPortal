import React, { useState, useEffect } from "react";
import {
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} from "./projectsApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";

export default function EditProjectForm({ project, clients }) {
  const { isAdmin, isFounder } = useAuth();

  const [updateProject, { isLoading, isSuccess, isError, error }] =
    useUpdateProjectMutation();

  const [
    deleteProject,
    { isSuccess: isDelSuccess, isError: isDelError, error: delError },
  ] = useDeleteProjectMutation();

  const navigate = useNavigate();

  const [projectName, setProjectName] = useState(project.name);
  const [projectAddress, setProjectAddress] = useState(project.address);
  const [projectNumber, setProjectNumber] = useState(project.number);
  const [projectTelephone, setProjectTelephone] = useState(project.telephone);
  const [clientId, setClientId] = useState(project.client);
  const [status, setStatus] = useState(project.status);
  const [timelineTick, setTimelineTick] = useState(
    project.timeline.currentTick
  );
  const [expectedCompletionDate, setExpectedCompletionDate] = useState(
    project.timeline.expectedCompletionDate &&
      new Date(project.timeline.expectedCompletionDate)
        .toISOString()
        .split("T")[0]
  );
  const [financesTick, setFinancesTick] = useState(
    project.finances.currentTick
  );
  const [budget, setBudget] = useState(project.finances.budget);
  const [spent, setSpent] = useState(project.finances.spent);
  const [phaseName, setPhaseName] = useState(project.phase.name);
  const [phaseTick, setPhaseTick] = useState(project.phase.currentTick);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      if (clientId) {
        navigate(`/dash/clients/${clientId}/projects`);
      } else {
        navigate("/dash/projects");
      }
    }
  }, [isSuccess, isDelSuccess, navigate, clientId]);

  const onNameChanged = (e) => {
    setProjectName(e.target.value);
  };
  const onNumberChanged = (e) => {
    setProjectNumber(e.target.value);
  };
  const onAddressChanged = (e) => {
    setProjectAddress(e.target.value);
  };
  const onTelephoneChanged = (e) => {
    setProjectTelephone(e.target.value);
  };
  const onClientIdChanged = (e) => {
    setClientId(e.target.value);
  };
  const onStatusChanged = (e) => {
    setStatus(e.target.value);
  };
  const onTimelineTickChanged = (e) => {
    setTimelineTick(e.target.value);
  };
  const onExpectedCompletionDateChanged = (e) => {
    setExpectedCompletionDate(e.target.value);
  };
  const onFinancesTickChanged = (e) => {
    setFinancesTick(e.target.value);
  };
  const onBudgetChanged = (e) => {
    setBudget(e.target.value);
  };
  const onSpentChanged = (e) => {
    setSpent(e.target.value);
  };
  const onPhaseNameChanged = (e) => {
    setPhaseName(e.target.value);
  };
  const onPhaseTickChanged = (e) => {
    setPhaseTick(e.target.value);
  };

  const onSaveProjectClicked = async (e) => {
    e.preventDefault();
    await updateProject({
      id: project.id,
      name: projectName,
      number: projectNumber,
      address: projectAddress,
      telephone: projectTelephone,
      status,
      client: clientId,
      timeline: {
        currentTick: timelineTick,
        expectedCompletionDate: expectedCompletionDate
          ? new Date(expectedCompletionDate)
          : project.timeline.expectedCompletionDate,
      },
      finances: {
        currentTick: financesTick,
        budget,
        spent,
      },
      phase: {
        name: phaseName,
        currentTick: phaseTick,
      },
    });
  };

  const onDeleteProjectClicked = async () => {
    await deleteProject({ id: project.id });
  };

  const created = new Date(project.createdAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  const updated = new Date(project.updatedAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

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

      <form
        className="h-100 d-flex flex-column justify-content-center align-items-center"
        onSubmit={(e) => e.preventDefault()}
      >
        <div>
          <h2>Edit Project:</h2>
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
        </div>
        <label htmlFor="name">Project Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          autoComplete="off"
          value={projectName}
          onChange={onNameChanged}
        />
        <label htmlFor="number">Project Number:</label>
        <input
          type="text"
          name="number"
          id="number"
          autoComplete="off"
          value={projectNumber}
          onChange={onNumberChanged}
        />
        <label htmlFor="address">Project Address:</label>
        <input
          type="text"
          name="address"
          id="address"
          autoComplete="off"
          value={projectAddress}
          onChange={onAddressChanged}
        />
        <label htmlFor="telephone">Project Telephone:</label>
        <input
          type="text"
          name="telephone"
          id="telephone"
          autoComplete="off"
          value={projectTelephone}
          onChange={onTelephoneChanged}
        />
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
      </form>
    </>
  );
}
