import { useMemo } from "react";
import ProjectPercentage from "../../components/projects/ProjectPercentage";
import ProjectBudgetDisplay from "../../components/projects/ProjectBudgetDisplay";
import ProjectPhaseDisplay from "../../components/projects/ProjectPhaseDisplay";
import ProjectTimelineDisplay from "../../components/projects/ProjectTimelineDisplay";
import useEditProject from "../../hooks/projects/useEditProject";
import Loader from "../../components/Loader";
import "./ProjectStatus.css";

export default function ProjectStatus({ project }) {
  const {
    state: {
      phaseBudgets,
      isProjectLoaded,
      budget,
      spent,
      financesTick,
      phaseName,
      phaseTick,
      expectedCompletionDate,
      timelineTick,
    },
    actions: { onSaveProjectClicked },
  } = useEditProject({ project });

  const displayProject = useMemo(
    () => ({
      ...project,
      finances: {
        ...project?.finances,
        budget: budget,
        spent: spent,
        currentTick: financesTick,
      },
      phase: {
        ...project?.phase,
        name: phaseName,
        currentTick: phaseTick,
      },
      timeline: {
        ...project?.timeline,
        expectedCompletionDate: expectedCompletionDate
          ? new Date(expectedCompletionDate)
          : project?.timeline?.expectedCompletionDate,
        currentTick: timelineTick,
      },
    }),
    [
      project,
      budget,
      spent,
      financesTick,
      phaseName,
      phaseTick,
      expectedCompletionDate,
      timelineTick,
    ]
  );

  if (!isProjectLoaded) {
    return <Loader />;
  }

  return (
    <section className="py-5">
      <article className="container">
        <div className="row gx-5">
          <div className="col-12 col-md-6 mb-4 mb-md-0">
            <ProjectPercentage
              phaseBudgets={phaseBudgets}
              projectId={project.id}
            />
          </div>
          <div className="col-12 col-md-6">
            <div className="d-flex flex-column gap-3">
              <ProjectBudgetDisplay project={displayProject} />

              <ProjectPhaseDisplay project={displayProject} />

              <ProjectTimelineDisplay project={displayProject} />
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
