import React from "react";
import { useGetProjectsQuery } from "./projectsApiSlice";
import Spinner from "react-bootstrap/Spinner";
import Project from "./Project";

export default function ProjectsList() {
  const {
    data: projects,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetProjectsQuery();

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
      <table>
        <thead>
          <tr>
            <th scope="col">Status</th>
            <th scope="col">Created</th>
            <th scope="col">Updated</th>
            <th scope="col">Title</th>
            <th scope="col">Owner</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }
}
