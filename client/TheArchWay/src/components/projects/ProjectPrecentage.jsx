import ProjectPrecentageCell from "./ProjectPrecentageCell";

export default function ProjectPrecentage() {
  return (
    <>
      <ul className="list-unstyled">
        <li className="d-flex justify-content-between align-items-center border-bottom border-white">
          <ProjectPrecentageCell
            phase="Predevelopment"
            phaseNum="1"
            phaseBudget="$5,000"
          />
          <span className="ft-large">10%</span>
        </li>
        <li className="d-flex justify-content-between align-items-center border-bottom border-white">
          <ProjectPrecentageCell
            phase="Programming"
            phaseNum="2"
            phaseBudget="$15,000"
          />
          <span className="ft-large">20%</span>
        </li>
        <li className="d-flex justify-content-between align-items-center border-bottom border-white">
          <ProjectPrecentageCell
            phase="Schematic Design"
            phaseNum="3"
            phaseBudget="$20,000"
          />
          <span className="ft-large">30%</span>
        </li>
        <li className="d-flex justify-content-between align-items-center border-bottom border-white">
          <ProjectPrecentageCell
            phase="Design Development"
            phaseNum="4"
            phaseBudget="$45,000"
          />
          <span className="ft-large">50%</span>
        </li>
        <li className="d-flex justify-content-between align-items-center border-bottom border-white">
          <ProjectPrecentageCell
            phase="Construction Documents"
            phaseNum="5"
            phaseBudget="$10,000"
          />
          <span className="ft-large">75%</span>
        </li>
        <li className="d-flex justify-content-between align-items-center border-bottom border-white">
          <ProjectPrecentageCell
            phase="Construction Administration"
            phaseNum="6"
            phaseBudget="$5,000"
          />
          <span className="ft-large">95%</span>
        </li>
        <li className="d-flex justify-content-between align-items-center">
          <ProjectPrecentageCell
            phase="Project Close Out"
            phaseNum="7"
            phaseBudget="$5,000"
          />
          <span className="ft-large">100%</span>
        </li>
      </ul>
    </>
  );
}
