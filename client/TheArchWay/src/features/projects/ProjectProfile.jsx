import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useGetProjectsQuery } from "./projectsApiSlice";
import { showToast } from "../../utils/showToast";
import Loader from "../../components/Loader";
import ProjectStatus from "./ProjectStatus";

export default function ProjectProfile() {
  const { projectId } = useParams();

  const { project, isLoading, isError, error } = useGetProjectsQuery(
    "projectsList",
    {
      selectFromResult: ({ data, isLoading, isError, error }) => ({
        project: data?.entities[projectId],
        isLoading,
        isError,
        error,
      }),
    }
  );

  useEffect(() => {
    if (isError) {
      showToast.error(error?.data?.message || "Project not found", {
        toastId: "project-profile-error",
      });
    }
  }, [isError, error]);

  if (isLoading) return <Loader />;
  if (!project) return null;

  return (
    <div>
      <h2 className="text-center" style={{ fontSize: "var(--ft-Exlarge)" }}>
        {project?.name}
      </h2>
      <ProjectStatus project={project} />
    </div>
  );
}
