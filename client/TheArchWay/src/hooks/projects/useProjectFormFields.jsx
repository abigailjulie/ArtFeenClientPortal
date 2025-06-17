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
    project?.timeline.currentTick || 0
  );
  const [expectedCompletionDate, setExpectedCompletionDate] = useState(
    project?.timeline.expectedCompletionDate
      ? new Date(project?.timeline.expectedCompletionDate)
          .toISOString()
          .split("T")[0]
      : ""
  );
  const [financesTick, setFinancesTick] = useState(
    project?.finances.currentTick || 0
  );
  const [budget, setBudget] = useState(
    formatCurrency(project?.finances.budget || 0)
  );
  const [spent, setSpent] = useState(
    formatCurrency(project?.finances.spent || 0)
  );
  const [phaseName, setPhaseName] = useState(project?.phase.name || "");
  const [phaseTick, setPhaseTick] = useState(project?.phase.currentTick || 0);

  const initializePhaseBudgets = () => {
    if (project?.phaseBudgets) {
      if (project.phaseBudgets instanceof Map) {
        return Object.fromEntries(project.phaseBudgets);
      }
      return project.phaseBudgets;
    }

    return {
      Predevelopment: { budget: 0, spent: 0, number: 1 },
      Programming: { budget: 0, spent: 0, number: 2 },
      "Schematic Design": { budget: 0, spent: 0, number: 3 },
      "Design Development": { budget: 0, spent: 0, number: 4 },
      "Construction Documents": { budget: 0, spent: 0, number: 5 },
      "Construction Administration": { budget: 0, spent: 0, number: 6 },
      "Project Close-out": { budget: 0, spent: 0, number: 7 },
    };
  };

  const [phaseBudgets, setPhaseBudgets] = useState(initializePhaseBudgets());

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
      onTimelineTickChanged,
      onExpectedCompletionDateChanged,
      onFinancesTickChanged,
      onPhaseNameChanged,
      onPhaseTickChanged,
      onPhaseBudgetsChanged,
      updatePhaseBudget,
      onPhaseBudgetChanged,
      onPhaseBudgetBlur,
    },
  };
}
