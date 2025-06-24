import ProjectPercentage from "../../components/projects/ProjectPercentage";
import ProjectBudgetDisplay from "../../components/projects/ProjectBudgetDisplay";
import ProjectPhaseDisplay from "../../components/projects/ProjectPhaseDisplay";
import ProjectTimelineDisplay from "../../components/projects/ProjectTimelineDisplay";
import useEditProject from "../../hooks/projects/useEditProject";
import "./ProjectStatus.css";

export default function ProjectStatus({ project }) {
  const {
    state: { phaseBudgets },
    actions: { updateNestedField, onSaveProjectClicked },
  } = useEditProject({ project });

  return (
    <section className="py-5">
      <article className="d-flex w-75 mx-auto align-items-center justify-content-between">
        <div className="w-50 pe-4">
          <ProjectPercentage
            phaseBudgets={phaseBudgets}
            updateNestedField={updateNestedField}
          />
        </div>

        <div className="d-flex flex-column w-50 ps-4">
          <ProjectBudgetDisplay
            project={project}
            onSave={onSaveProjectClicked}
          />

          <ProjectPhaseDisplay project={project} />

          <ProjectTimelineDisplay project={project} />
        </div>
      </article>
    </section>
  );
}
