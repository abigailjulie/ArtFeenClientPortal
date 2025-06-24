import ProjectStepper from "./ProjectStepper";

export default function ProjectPhaseDisplay({ project }) {
  return (
    <article className="d-flex flex-column mb-3">
      <div className="w-auto ms-auto pe-0 text-black">
        {project?.phase?.name}
      </div>
      <ProjectStepper activeStep={project?.phase?.currentTick} maxStep={7} />
      <h4 className="mt-2">Project Phase</h4>
    </article>
  );
}
