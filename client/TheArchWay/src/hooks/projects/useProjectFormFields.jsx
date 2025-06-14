import { useState } from "react";
import { formatCurrency } from "../../utils/FormatCurrency";

export default function useProjectFormFields({ project }) {
  const [projectName, setProjectName] = useState(project?.name || "");
  const [projectAddress, setProjectAddress] = useState(project?.address || "");
  const [projectNumber, setProjectNumber] = useState(project?.number || "");
  const [projectTelephone, setProjectTelephone] = useState(
    project?.telephone || ""
  );
  const [clientId, setClientId] = useState(project?.client || "");
  const [status, setStatus] = useState(project?.status || "");
  const [timelineTick, setTimelineTick] = useState(
    project?.timeline.currentTick || 1
  );
  const [expectedCompletionDate, setExpectedCompletionDate] = useState(
    project?.timeline.expectedCompletionDate
      ? new Date(project?.timeline.expectedCompletionDate)
          .toISOString()
          .split("T")[0]
      : ""
  );
  const [financesTick, setFinancesTick] = useState(
    project?.finances.currentTick || 1
  );
  const [budget, setBudget] = useState(
    formatCurrency(project?.finances.budget || 0)
  );
  const [spent, setSpent] = useState(
    formatCurrency(project?.finances.spent || 0)
  );
  const [phaseName, setPhaseName] = useState(project?.phase.name || "");
  const [phaseTick, setPhaseTick] = useState(project?.phase.currentTick || 1);

  const handleCurrencyChange = (setter) => (e) => {
    const formatted = formatCurrency(e.target.value);
    setter(formatted);
  };

  const onBudgetChanged = handleCurrencyChange(setBudget);
  const onSpentChanged = handleCurrencyChange(setSpent);

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
  const onPhaseNameChanged = (e) => {
    setPhaseName(e.target.value);
  };
  const onPhaseTickChanged = (e) => {
    setPhaseTick(e.target.value);
  };
  return {
    fields: {
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
      onBudgetChanged,
      onSpentChanged,
      onNameChanged,
      onNumberChanged,
      onAddressChanged,
      onTelephoneChanged,
      onClientIdChanged,
      onStatusChanged,
      onTimelineTickChanged,
      onExpectedCompletionDateChanged,
      onFinancesTickChanged,
      onPhaseNameChanged,
      onPhaseTickChanged,
    },
  };
}
