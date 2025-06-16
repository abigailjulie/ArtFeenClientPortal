import ProjectPrecentageCell from "./ProjectPrecentageCell";
import ProjectPhaseBudget from "./ProjectPhaseBudget";

export default function ProjectPrecentage() {
  return (
    <>
      <ul className="list-unstyled">
        <li className="d-flex justify-content-between align-items-center border-bottom border-white">
          <ProjectPrecentageCell
            phase="Predevelopment"
            phaseNum="1"
            phaseBudget={<ProjectPhaseBudget />}
          />
          <span className="ft-large">10%</span>
        </li>
        <li className="d-flex justify-content-between align-items-center border-bottom border-white">
          <ProjectPrecentageCell
            phase="Programming"
            phaseNum="2"
            phaseBudget={<ProjectPhaseBudget />}
          />
          <span className="ft-large">20%</span>
        </li>
        <li className="d-flex justify-content-between align-items-center border-bottom border-white">
          <ProjectPrecentageCell
            phase="Schematic Design"
            phaseNum="3"
            phaseBudget={<ProjectPhaseBudget />}
          />
          <span className="ft-large">30%</span>
        </li>
        <li className="d-flex justify-content-between align-items-center border-bottom border-white">
          <ProjectPrecentageCell
            phase="Design Development"
            phaseNum="4"
            phaseBudget={<ProjectPhaseBudget />}
          />
          <span className="ft-large">50%</span>
        </li>
        <li className="d-flex justify-content-between align-items-center border-bottom border-white">
          <ProjectPrecentageCell
            phase="Construction Documents"
            phaseNum="5"
            phaseBudget={<ProjectPhaseBudget />}
          />
          <span className="ft-large">75%</span>
        </li>
        <li className="d-flex justify-content-between align-items-center border-bottom border-white">
          <ProjectPrecentageCell
            phase="Construction Administration"
            phaseNum="6"
            phaseBudget={<ProjectPhaseBudget />}
          />
          <span className="ft-large">95%</span>
        </li>
        <li className="d-flex justify-content-between align-items-center">
          <ProjectPrecentageCell
            phase="Project Close Out"
            phaseNum="7"
            phaseBudget={<ProjectPhaseBudget />}
          />
          <span className="ft-large">100%</span>
        </li>
      </ul>
    </>
  );
}
