import React from "react";

export default function ProjectPrecentageCell({ phase, phaseNum }) {
  return (
    <div className="d-flex flex-column">
      <p className="mb-0">{phase}</p>
      <p className="mb-0 fs-4 fw-bold">$10,000</p>
      <p className="mb-0">{phaseNum}</p>
    </div>
  );
}
