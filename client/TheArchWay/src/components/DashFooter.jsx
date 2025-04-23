import React from "react";

export default function DashFooter() {
  return (
    <footer className="d-flex">
      <section>
        <p>Copyright 2025 Abigail Design LLC. All Rights Reserved.</p>
      </section>
      <section>
        <h2 className="fw-bold">Resources</h2>
        <ul>
          <li>
            <a
              href="https://www.abigaildesigns.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Portfolio
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/abigailfigaro"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href="https://github.com/abigailjulie"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </li>
        </ul>
      </section>
    </footer>
  );
}
