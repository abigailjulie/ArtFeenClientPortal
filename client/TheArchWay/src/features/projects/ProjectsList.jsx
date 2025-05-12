import React from "react";
import { useGetProjectsQuery } from "./projectsApiSlice";
import Spinner from "react-bootstrap/Spinner";
import Project from "./Project";
import "../../components/TableStyles.css";

export default function ProjectsList() {
  const {
    data: projects,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetProjectsQuery(undefined, {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) return <Spinner animation="border" />;

  if (isError) return <p className="errmsg">{error?.data?.message}</p>;

  if (isSuccess) {
    const { ids } = projects;

    const tableContent = ids?.length
      ? ids.map((projectId) => (
          <Project key={projectId} projectId={projectId} />
        ))
      : null;

    return (
      <div className="mx-5">
        <section className="w-100 px-4 py-2">
          <table className="w-100 align-items-between table-spaced">
            <thead className="w-100">
              <tr>
                <th className="fs-3 ps-3 pb-3" scope="col">
                  Status
                </th>
                <th className="fs-3 ps-3 pb-3" scope="col">
                  Created
                </th>
                <th className="fs-3 ps-3 pb-3" scope="col">
                  Updated
                </th>
                <th className="fs-3 ps-3 pb-3" scope="col">
                  Title
                </th>
                <th className="fs-3 ps-3 pb-3" scope="col">
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
