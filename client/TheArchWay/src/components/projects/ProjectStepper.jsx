import "./ProjectStepper.css";

export default function ProjectStepper({ activeStep, maxStep = 7 }) {
  const steps = Array.from({ length: maxStep + 1 }, (_, i) => i.toString());
  return (
    <div className="w-100">
      <div
        className="bg-light border border-black position-relative"
        style={{ height: "2rem" }}
      >
        <div
          className="salmon position-absolute top-0 start-0"
          style={{
            height: "100%",
            width: `${(activeStep / maxStep) * 100}%`,
            transition: "width 0.4s ease",
          }}
        />
      </div>

      <div className="d-flex justify-content-between mt-2">
        {steps.map((label, index) => (
          <span key={index} className="small">
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
