import ProjectPrecentage from "../../components/projects/ProjectPrecentage";
import ProjectStepper from "../../components/projects/ProjectStepper";
import { formatCurrency } from "../../utils/FormatCurrency";
import { formatDateTime } from "../../utils/dateUtils";
import "./ProjectStatus.css";

export default function ProjectStatus({ project }) {
  const handleEdit = (section) => {
    showToast.info(`Edit ${section} clicked`);
  };

  return (
    <section className="py-5">
      <article className="d-flex w-75 mx-auto align-items-center justify-content-between">
        <div className="w-50 pe-4">
          <ProjectPrecentage />
        </div>

        <div className="d-flex flex-column w-50 ps-4">
          <article className="d-flex flex-column">
            <button
              onClick={handleEdit}
              className="btn btn-link w-auto ms-auto no-underline-hover pe-0 text-black"
            >
              Spent: ${formatCurrency(project?.finances?.spent)} / $
              {formatCurrency(project?.finances?.budget)}
            </button>
            <ProjectStepper
              activeStep={project?.finances?.currentTick}
              maxStep={7}
            />
            <h4 className="mt-2">Project Budget</h4>
          </article>

          <article className="d-flex flex-column">
            <button
              onClick={handleEdit}
              className="btn btn-link w-auto ms-auto no-underline-hover pe-0 text-black"
            >
              {project?.phase.name}
            </button>
            <ProjectStepper
              activeStep={project?.phase.currentTick}
              maxStep={7}
            />
            <h4 className="mt-2">Project Phase</h4>
          </article>

          <article className="d-flex flex-column">
            <button
              onClick={handleEdit}
              className="btn btn-link w-auto ms-auto no-underline-hover pe-0 text-black"
            >
              {project?.timeline?.expectedCompletionDate
                ? formatDateTime(project?.timeline.expectedCompletionDate)
                : "No date"}
            </button>
            <ProjectStepper
              activeStep={project?.timeline.currentTick}
              maxStep={7}
            />
            <h4 className="mt-2">Project Timeline</h4>
          </article>
        </div>
      </article>
    </section>
  );
}
