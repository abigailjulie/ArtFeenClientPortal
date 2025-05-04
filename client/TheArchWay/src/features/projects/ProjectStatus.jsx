import React from "react";
import ProjectPrecentage from "../../components/ProjectPrecentage";
import ProjectStepper from "../../components/ProjectStepper";
import "./ProjectStatus.css";

export default function ProjectStatus() {
  const handleEdit = () => {
    e.target.value = "";
  };
  return (
    <section>
      <h2 className="text-center">Project Status</h2>
      <article className="d-flex w-75 mx-auto align-items-center justify-content-between">
        <div className="w-50 pe-4">
          <ProjectPrecentage />
        </div>

        <div className="d-flex flex-column w-50 ps-4">
          <article className="d-flex flex-column">
            <button
              onClick={handleEdit}
              className="btn btn-link w-auto ms-auto no-underline-hover pe-0"
            >
              $10,000
            </button>
            <ProjectStepper activeStep={3} />
            <h4 className="mt-2">Project Budget</h4>
          </article>
          <article className="d-flex flex-column">
            <button
              onClick={handleEdit}
              className="btn btn-link w-auto ms-auto no-underline-hover pe-0"
            >
              CD
            </button>
            <ProjectStepper activeStep={4} />
            <h4 className="mt-2">Project Phase</h4>
          </article>
          <article className="d-flex flex-column">
            <button
              onClick={handleEdit}
              className="btn btn-link w-auto ms-auto no-underline-hover pe-0"
            >
              August 2026
            </button>
            <ProjectStepper activeStep={2} />
            <h4 className="mt-2">Project Timeline</h4>
          </article>
        </div>
      </article>
    </section>
  );
}
