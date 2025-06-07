import { useState, useMemo } from "react";
import { useGetProjectsQuery } from "../../features/projects/projectsApiSlice";
import { SORT_OPTIONS } from "../../config/sorting";
import { sortProjects } from "../../utils/sortProjects";
import useAuth from "../useAuth";

export const useProjectList = () => {
  const [sortBy, setSortBy] = useState(SORT_OPTIONS.STATUS);
  const { username, isAdmin, isFounder } = useAuth();

  const {
    data: projects,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetProjectsQuery("projectsList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const sortedIds = useMemo(() => {
    if (!isSuccess || !projects) {
      return [];
    }

    const { ids, entities } = projects;

    let filteredIds;
    if (isAdmin || isFounder) {
      filteredIds = [...ids];
    } else {
      filteredIds = ids.filter(
        (projectId) => entities[projectId].client.username === username
      );
    }

    return sortProjects(filteredIds, entities, sortBy);
  }, [projects, isSuccess, isAdmin, isFounder, username, sortBy]);

  return {
    sortedIds,
    isLoading,
    isSuccess,
    isError,
    error,
    sortBy,
    setSortBy,
  };
};
