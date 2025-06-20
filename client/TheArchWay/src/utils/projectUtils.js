export function initializePhaseBudgets(rawPhaseBudgets) {
  if (rawPhaseBudgets) {
    if (rawPhaseBudgets instanceof Map) {
      return Object.fromEntries(rawPhaseBudgets);
    } else if (typeof rawPhaseBudgets === "object") {
      return rawPhaseBudgets;
    }
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
}
