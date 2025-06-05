import { useEffect, useState } from "react";

export const useDashHeader = (
  username,
  clientsData,
  clientsSuccess,
  projectsData,
  projectsSuccess
) => {
  const clients = clientsSuccess
    ? clientsData?.ids.map((id) => clientsData.entities[id])
    : [];

  const client = clients?.find(
    (currentClient) => currentClient.username === username
  );

  const projects = projectsSuccess
    ? projectsData.ids.map((id) => projectsData.entities[id])
    : [];

  const clientsProjects = client
    ? projects.filter((project) => {
        const projectClientId =
          typeof project.client === "object"
            ? project.client?._id
            : project.client;
        return projectClientId === client._id;
      })
    : [];

  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const selectedProject = clientsProjects?.find(
    (project) => project._id === selectedProjectId
  );

  useEffect(() => {
    if (clientsProjects?.length > 0 && selectedProjectId === null) {
      setSelectedProjectId(clientsProjects[0]._id);
    }
  }, [clientsProjects, selectedProjectId]);

  return {
    client,
    clients,
    projects,
    clientsProjects,
    selectedProject,
    selectedProjectId,
    setSelectedProjectId,
  };
};
