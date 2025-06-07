import { STATUS_ORDER } from "../config/status";
import { SORT_OPTIONS } from "../config/sorting";

export const sortProjects = (
  projectIds,
  entities,
  sortBy = SORT_OPTIONS.STATUS
) => {
  return [...projectIds].sort((a, b) => {
    const projectA = entities[a];
    const projectB = entities[b];

    const statusA = STATUS_ORDER[projectA.status] || 999;
    const statusB = STATUS_ORDER[projectB.status] || 999;

    if (statusA !== statusB) {
      return statusA - statusB;
    }

    switch (sortBy) {
      case SORT_OPTIONS.CREATED:
        return new Date(projectB.createdAt) - new Date(projectA.createdAt);

      case SORT_OPTIONS.OWNER:
        const ownerA = projectA.client?.username || "";
        const ownerB = projectB.client?.username || "";
        return ownerA.localeCompare(ownerB);

      default:
        return 0;
    }
  });
};
