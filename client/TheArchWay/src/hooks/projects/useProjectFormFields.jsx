import { useState } from "react";
import { formatCurrency } from "../../utils/FormatCurrency";
import { initializePhaseBudgets } from "../../utils/projectUtils";

export default function useProjectFormFields({
  project,
  timelineTick,
  financesTick,
  phaseTick,
  onTimelineTickChanged,
  onFinancesTickChanged,
  onPhaseTickChanged,
}) {
  const [projectName, setProjectName] = useState(project?.name || "");
  const [projectAddress, setProjectAddress] = useState(project?.address || "");
  const [projectNumber, setProjectNumber] = useState(project?.number || "");
  const [projectTelephone, setProjectTelephone] = useState(
    project?.telephone || ""
  );
  const [clientId, setClientId] = useState(project?.client || "");
  const [status, setStatus] = useState(project?.status || "");
  const [expectedCompletionDate, setExpectedCompletionDate] = useState(
    project?.timeline.expectedCompletionDate
      ? new Date(project?.timeline.expectedCompletionDate)
          .toISOString()
          .split("T")[0]
      : ""
  );
  const [budget, setBudget] = useState(
    formatCurrency(project?.finances.budget || 0)
  );
  const [spent, setSpent] = useState(
    formatCurrency(project?.finances.spent || 0)
  );
  const [phaseName, setPhaseName] = useState(project?.phase.name || "");
  const [phaseBudgets, setPhaseBudgets] = useState(
    initializePhaseBudgets(project?.phaseBudgets)
  );

  const handleCurrencyChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleCurrencyBlur = (getter, setter) => () => {
    const value = getter();
    const formatted = formatCurrency(value);
    setter(formatted);
  };

  const onBudgetChanged = handleCurrencyChange(setBudget);
  const onSpentChanged = handleCurrencyChange(setSpent);

  const onBudgetBlur = handleCurrencyBlur(() => budget, setBudget);
  const onSpentBlur = handleCurrencyBlur(() => spent, setSpent);

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
  const onExpectedCompletionDateChanged = (e) => {
    setExpectedCompletionDate(e.target.value);
  };
  const onPhaseNameChanged = (e) => {
    setPhaseName(e.target.value);
  };
  const onTimelineTickInputChanged = (tick) => onTimelineTickChanged(tick);
  const onFinancesTickInputChanged = (tick) => onFinancesTickChanged(tick);
  const onPhaseTickInputChanged = (tick) => onPhaseTickChanged(tick);

  const updatePhaseBudget = (phaseName, field, value) => {
    setPhaseBudgets((prev) => ({
      ...prev,
      [phaseName]: {
        ...prev[phaseName],
        [field]: value,
      },
    }));
  };

  const onPhaseBudgetChanged = (phaseName, field) => (e) => {
    const value = e.target.value;
    updatePhaseBudget(phaseName, field, value);
  };

  const onPhaseBudgetBlur = (phaseName, field) => () => {
    const currentValue = phaseBudgets[phaseName]?.[field] || 0;
    const formatted = formatCurrency(currentValue);
    updatePhaseBudget(phaseName, field, formatted);
  };

  const onPhaseBudgetsChanged = (newPhaseBudgets) => {
    setPhaseBudgets(newPhaseBudgets);
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
      phaseBudgets,
    },
    clicked: {
      onBudgetChanged,
      onSpentChanged,
      onBudgetBlur,
      onSpentBlur,
      onNameChanged,
      onNumberChanged,
      onAddressChanged,
      onTelephoneChanged,
      onClientIdChanged,
      onStatusChanged,
      onExpectedCompletionDateChanged,
      onPhaseNameChanged,
      onPhaseBudgetsChanged,
      updatePhaseBudget,
      onPhaseBudgetChanged,
      onPhaseBudgetBlur,
      onTimelineTickChanged,
      onFinancesTickChanged,
      onPhaseTickChanged,
    },
  };
}
