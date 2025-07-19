import React from "react";
import "./DashFooter.css";

export default function DashFooter() {
  return (
    <footer className="bg-custom-dark-grey">
      <section className="pt-5 px-3 mb-4 d-flex flex-column flex-md-row align-items-center justify-content-around">
        <article className="mb-4 mb-md-0">
          <h2 className="abigail-designs-heading-font text-center mb-0">
            Abigail Designs
          </h2>
          <p className="mb-3 ft-small text-center line-height-min letter-spacing-mid">
            REACHING HIGHER
          </p>
          <p className="text-center mb-0">
            Copyright 2025 Abigail Design LLC. All Rights Reserved.
          </p>
        </article>
        <article className="mb-4 mb-md-0">
          <p className="fs-5 fw-bold mb-0">Resources</p>
          <ul className="list-unstyled mb-0">
            <li>
              <a
                href="https://www.abigaildesigns.org"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline link-underline-opacity-0 text-reset"
              >
                Portfolio
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/abigailfigaro"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline link-underline-opacity-0 text-reset"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://github.com/abigailjulie"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline link-underline-opacity-0 text-reset"
              >
                GitHub
              </a>
            </li>
          </ul>
        </article>
      </section>
    </footer>
  );
}
