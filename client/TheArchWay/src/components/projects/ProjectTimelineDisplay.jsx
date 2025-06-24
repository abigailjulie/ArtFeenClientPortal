import { formatDateTime } from "../../utils/dateUtils";
import ProjectStepper from "./ProjectStepper";

export default function ProjectTimelineDisplay({ project }) {
  return (
    <article className="d-flex flex-column mb-3">
      <div className="w-auto ms-auto pe-0 text-black">
        {project?.timeline?.expectedCompletionDate
          ? formatDateTime(project?.timeline?.expectedCompletionDate)
          : "No date"}
      </div>
      <ProjectStepper activeStep={project?.timeline?.currentTick} maxStep={7} />
      <h4 className="mt-2">Project Timeline</h4>
    </article>
  );
}
