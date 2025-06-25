export default function ProjectPercentageCell({
  phase,
  phaseNum,
  phaseBudget,
}) {
  return (
    <div className="d-flex align-items-center px-2">
      <p className="mb-0 me-3 fw-bolder">{phaseNum}</p>
      <div className="d-flex flex-column">
        <span className="mb-0 fw-light">{phase}</span>
        <span className="mb-0 fs-4 fw-bold">{phaseBudget}</span>
      </div>
    </div>
  );
}
