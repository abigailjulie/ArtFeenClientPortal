import ProjectStepper from "./ProjectStepper";

export default function ProjectBudgetDisplay({ project }) {
  return (
    <article className="d-flex flex-column mb-3">
      <div className="d-flex align-items-center justify-content-end mb-2">
        <span className="text-black">
          Spent:
          {project?.finances?.spent?.toLocaleString(undefined, {
            style: "currency",
            currency: "USD",
          })}
          /
          {project?.finances?.budget?.toLocaleString(undefined, {
            style: "currency",
            currency: "USD",
          })}
        </span>
      </div>
      <ProjectStepper activeStep={project?.finances?.currentTick} maxStep={7} />
      <h4 className="mt-2">Project Budget</h4>
    </article>
  );
}
