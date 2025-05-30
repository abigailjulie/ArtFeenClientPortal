import React from "react";
import { useGetProjectsQuery } from "./projectsApiSlice";
import PulseLoader from "react-spinners/PulseLoader";
import Project from "./Project";
import "../../components/TableStyles.css";
import useAuth from "../../hooks/useAuth";

export default function ProjectsList() {
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

  if (isLoading) return <PulseLoader color={"var(--Forest)"} />;

  if (isError) return <p className="errmsg">{error?.data?.message}</p>;

  if (isSuccess) {
    const { ids, entities } = projects;

    let filteredIds;
    if (isAdmin || isFounder) {
      filteredIds = [...ids];
    } else {
      filteredIds = ids.filter(
        (projectId) => entities[projectId].client.username === username
      );
    }

    const tableContent =
      ids?.length &&
      filteredIds.map((projectId) => (
        <Project key={projectId} projectId={projectId} />
      ));

    return (
      <div>
        <section className="w-100">
          <table className="w-100 align-items-between table-spaced">
            <thead className="w-100">
              <tr>
                <th className="fs-3 ps-3 pb-3" scope="col">
                  Status
                </th>
                <th
                  className="fs-3 ps-3 pb-3 d-none d-md-table-cell"
                  scope="col"
                >
                  Created
                </th>
                <th
                  className="fs-3 ps-3 pb-3 d-none d-md-table-cell"
                  scope="col"
                >
                  Updated
                </th>
                <th className="fs-3 ps-3 pb-3" scope="col">
                  Title
                </th>
                <th
                  className="fs-3 ps-3 pb-3 d-none d-md-table-cell"
                  scope="col"
                >
                  Owner
                </th>
                <th className="fs-3 ps-3 pb-3 w-5" scope="col">
                  Edit
                </th>
              </tr>
            </thead>
            <tbody>{tableContent}</tbody>
          </table>
        </section>
      </div>
    );
  }
}
