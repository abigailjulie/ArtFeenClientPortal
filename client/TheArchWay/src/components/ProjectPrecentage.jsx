import React from "react";
import ProjectPrecentageCell from "./ProjectPrecentageCell";

export default function ProjectPrecentage() {
  return (
    <>
      <ul className="list-unstyled">
        <li className="d-flex justify-content-between align-items-center">
          <ProjectPrecentageCell phase="Predevelopment" phaseNum="1" />
          <span className="ft-large">10%</span>
        </li>
        <li className="d-flex justify-content-between align-items-center">
          <ProjectPrecentageCell phase="Programming" phaseNum="2" />
          <span className="ft-large">20%</span>
        </li>
        <li className="d-flex justify-content-between align-items-center">
          <ProjectPrecentageCell phase="Schematic Design" phaseNum="3" />
          <span className="ft-large">30%</span>
        </li>
        <li className="d-flex justify-content-between align-items-center">
          <ProjectPrecentageCell phase="Design Development" phaseNum="4" />
          <span className="ft-large">50%</span>
        </li>
        <li className="d-flex justify-content-between align-items-center">
          <ProjectPrecentageCell phase="Construction Documents" phaseNum="5" />
          <span className="ft-large">75%</span>
        </li>
        <li className="d-flex justify-content-between align-items-center">
          <ProjectPrecentageCell
            phase="Construction Administration"
            phaseNum="6"
          />
          <span className="ft-large">95%</span>
        </li>
        <li className="d-flex justify-content-between align-items-center">
          <ProjectPrecentageCell phase="Project Close Out" phaseNum="7" />
          <span className="ft-large">100%</span>
        </li>
      </ul>
    </>
  );
}
