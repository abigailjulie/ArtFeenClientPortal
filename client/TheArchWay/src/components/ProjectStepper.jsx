import React from "react";
import "./ProjectStepper.css";

export default function ProjectStepper({ activeStep }) {
  const steps = ["0", "1", "2", "3", "4", "5", "6", "7"];
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
            width: `${(activeStep / (steps.length - 1)) * 100}%`,
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
