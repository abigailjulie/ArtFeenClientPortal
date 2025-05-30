import { useState, useEffect } from "react";
import {
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} from "./projectsApiSlice";
import { useNavigate } from "react-router-dom";
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

  return {
    state: {
      projectName,
      projectAddress,
      projectNumber,
      projectTelephone,
      clientId,
      status,
      timelineTick,
      expectedCompletionDate,
      financesTick,
      budget,
      spent,
      phaseName,
      phaseTick,
    },
    clicked: {
      onNameChanged,
      onNumberChanged,
      onAddressChanged,
      onTelephoneChanged,
      onClientIdChanged,
      onStatusChanged,
      onTimelineTickChanged,
      onExpectedCompletionDateChanged,
      onFinancesTickChanged,
      onBudgetChanged,
      onSpentChanged,
      onPhaseNameChanged,
      onPhaseTickChanged,
      onSaveProjectClicked,
      onDeleteProjectClicked,
    },
  };
}
